import axios, {AxiosRequestConfig} from "axios";
import {BASE_URL} from "./constants";

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
};

export const httpClient = axios.create(config);