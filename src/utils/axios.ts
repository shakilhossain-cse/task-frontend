import axios, { AxiosInstance, AxiosError } from "axios";
import { RoutePaths } from "../enums/routes";
import { getFromLocalStorage } from "./localStorage";
import { IUser } from "../interfaces/type";

const handleUnauthorized = (error: AxiosError) => {
  if (error.response && error.response.status === 401) {
    window.location.href = RoutePaths.Login
  }
  return Promise.reject(error);
};

const createHttpClient = (): AxiosInstance => {
 
  const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 5000,
    headers: { Accept: "application/json" },
  });

  httpClient.interceptors.request.use(
    (config) => {

      const data = getFromLocalStorage('auth') as IUser;
      if (data) {
        config.headers.Authorization = `Bearer ${data.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  httpClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => handleUnauthorized(error)
  );

  return httpClient;
};

export const HttpClient = createHttpClient();
