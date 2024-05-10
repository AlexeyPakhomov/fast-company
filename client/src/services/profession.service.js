import httpService from './http.service';
import url from '../config/url';

const professionService = {
  get: async () => {
    const { data } = await httpService.get(url.professionEndpoint);
    return data;
  },
};

export default professionService;
