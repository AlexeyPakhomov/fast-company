import axios from 'axios';
import config from '../config.json';
import url from '../config/url';
import httpService from './http.service';
import localStorageService from './localStorage.service';

export const httpAuth = axios.create();

const authService = {
  register: async (payload) => {
    let register;
    //console.log('authService_registerPayload', payload);
    if (config.isFirebase) {
      const { email, password } = payload;
      register = await httpAuth.post(url.signUpEndpoint, {
        email,
        password,
        returnSecureToken: true,
      });
      //console.log('authService_registerFirebase', register.data);
    } else {
      register = await httpService.post(url.signUpEndpoint, payload);
      //console.log('authService_registerDB', register.data);
    }

    return register.data;
  },

  login: async ({ email, password }) => {
    let login;
    //console.log('authService_loginPayload');

    if (config.isFirebase) {
      login = await httpAuth.post(url.signInEndpoint, {
        email,
        password,
        returnSecureToken: true,
      });
      //console.log('authService_loginFirebase', login.data);
    } else {
      login = await httpService.post(url.signInEndpoint, {
        email,
        password,
      });
      //console.log('authService_loginDB', login.data);
    }
    return login.data;
  },

  refresh: async () => {
    let refresh;

    //console.log('refresh START 2');
    if (config.isFirebase) {
      refresh = await httpAuth.post(url.refreshTokenEndpoint, {
        grant_type: 'refresh_token',
        refresh_token: localStorageService.getRefreshToken(),
      });
      //console.log('authServiceRefreshFirebase', refresh);
    } else {
      //console.log('Отправляем запрос ТОКЕН 3');
      //console.log(httpService.post(url.refreshTokenEndpoint));
      //refresh = await httpAuth.post(url.refreshTokenEndpoint, {
      //  refresh_token: localStorageService.getRefreshToken(),
      //});
      //console.log('Получаем ответ ТОКЕН 4', refresh);
    }

    return refresh.data;
  },
};

export default authService;

//const KEY = process.env.REACT_APP_FIREBASE_KEY;

//const signUpEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`;
//const signInEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`;
//const refreshTokenEndpoint = `https://securetoken.googleapis.com/v1/token?key=${KEY}`;

//console.log(httpAuth(url.signInEndpoint));
