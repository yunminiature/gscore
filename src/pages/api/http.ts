import axios, {AxiosRequestConfig} from "axios";
import {BASE_URL} from "./constants";
import store from "../../store";

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
};

export const httpClient = axios.create(config);

httpClient.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  if (token !== null) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});