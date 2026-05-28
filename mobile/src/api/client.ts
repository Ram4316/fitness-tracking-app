import axios, { AxiosInstance } from 'axios';

import { appConfig } from '../config/config';

export type GetToken = () => Promise<string | null>;

export const createApiClient = (getToken: GetToken): AxiosInstance => {
  const client = axios.create({
    baseURL: appConfig.apiBaseUrl,
    timeout: 15000,
  });

  client.interceptors.request.use(async config => {
    const token = await getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: 'Bearer ' + token,
      };
    }
    return config;
  });

  return client;
};
