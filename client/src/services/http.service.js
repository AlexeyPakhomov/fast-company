import axios from 'axios';
import configFile from '../config.json';
import { toast } from 'react-toastify';
import localStorageService from './localStorage.service';
import authService from './auth.service';
import url from '../config/url';

const http = configFile.isFirebase
  ? axios.create({
      baseURL: configFile.apiEndpointFirebase,
    })
  : axios.create({
      baseURL: configFile.apiEndpoint,
    });

http.interceptors.request.use(
  async (config) => {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();

    if (configFile.isFirebase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json';

      if (refreshToken && expiresDate < Date.now()) {
        //console.log('update refreshFirebase START');
        const data = await authService.refresh(refreshToken);
        //console.log('update refreshFirebase', data);
        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          localId: data.user_id,
          expiresIn: data.expires_in,
        });
      }
      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.params = { ...config.params, auth: accessToken };
      }
    } else {
      //console.log(((new Date(+expiresDate) - Date.now()) / 1000 / 60).toFixed(0));

      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const expiresDate = localStorageService.getTokenExpiresDate();
const refreshToken = localStorageService.getRefreshToken();

if (refreshToken && expiresDate < Date.now()) {
  //console.log('UPDATE TOKEN 1');
  try {
    const { data } = await http.post(url.refreshTokenEndpoint, {
      refresh_token: localStorageService.getRefreshToken(),
    });
    //console.log('DATA TOKEN', data);

    localStorageService.setTokens({
      refreshToken: data.refreshToken,
      idToken: data.accessToken,
      localId: data.userId,
      expiresIn: data.expires_in,
    });
  } catch (error) {
    console.log('Error updating token: ', error);
  }
}

const transformObject = (obj) => {
  //console.log('obj', obj);
  return obj && !obj._id
    ? Object.values(obj) // Object.keys(obj).map((data) => ({ ...obj[data] }))
    : obj;
};

http.interceptors.response.use(
  (res) => {
    if (configFile.isFirebase) {
      //console.log('res.data', res.data);
      res.data = { content: transformObject(res.data) };
      //console.log('res.data.content', res.data.content);
    } else {
      res.data = { content: res.data };
    }

    return res;
  },
  (error) => {
    const expectedErrors =
      error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedErrors) {
      console.log('httpService', error);
      toast.error('Ошибка сервера');
    }

    return Promise.reject(error);
  },
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
