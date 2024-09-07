import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.defaults.timeout = 10 * 1000;
axios.defaults.baseURL = 'http://localhost:8080';

class API {
  get = (
    url: string,
    params: { [key: string]: any } = {},
    config: { [key: string]: any } = {},
  ) => {
    return axios.get(url, { params, ...config });
  };

  post = (url: string, data: { [key: string]: any }, config: { [key: string]: any } = {}) => {
    return axios.post(url, data, config);
  };

  put = (url: string, data: { [key: string]: any }, config: { [key: string]: any } = {}) => {
    return axios.put(url, data, config);
  };

  patch = (url: string, data: { [key: string]: any }, config: { [key: string]: any } = {}) => {
    return axios.patch(url, data, config);
  };

  delete = (url: string, params: { [key: string]: any }, config: { [key: string]: any } = {}) => {
    return axios.delete(url, { params, ...config });
  };
}

export default API;
