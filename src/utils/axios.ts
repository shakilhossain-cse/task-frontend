import axios from "axios";
import { getFromLocalStorage } from "./localStorage";
import { useAuthActions } from "../store/auth/Provider";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../enums/routes";

const HttpClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 5000,
  headers: { Accept: "application/json" },
});

HttpClient.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

HttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
   const {signOut} = useAuthActions();
   const {navigate} = useNavigate();
    
    if (error.response && error.response.status === 401) {
      signOut(() => {
        navigate(RoutePaths.Login)
      })
      
    }
    return Promise.reject(error);
  }
);

export { HttpClient};
