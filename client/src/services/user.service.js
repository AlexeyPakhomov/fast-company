import url from '../config/url';
import httpService from './http.service';
import localStorageService from './localStorage.service';

const userService = {
  get: async () => {
    const { data } = await httpService.get(url.user);
    return data;
  },
  create: async (userData) => {
    const { data } = await httpService.put(url.user + userData._id, userData);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(url.user + localStorageService.getUserId());
    return data;
  },
  updateCurrentUser: async (userData) => {
    const { data } = await httpService.patch(url.user + userData._id, userData);
    return data;
  },
};

export default userService;
