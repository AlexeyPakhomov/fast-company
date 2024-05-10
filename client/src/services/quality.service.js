import httpService from './http.service';
import url from '../config/url';

const qualityService = {
  get: async () => {
    const { data } = await httpService.get(url.qualityEndpoint);
    return data;
  },
};

export default qualityService;
