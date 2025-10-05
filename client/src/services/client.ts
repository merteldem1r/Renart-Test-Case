import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import i18n from "i18next";
import { supabase } from "../supabaseClient";
import securityHeaders from "./headers.json";

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
  timeout: 10000,
  headers: {
    ...securityHeaders.auth,
  },
});

// Request interceptor - add auth token and security headers
apiClient.interceptors.request.use(
  async (config) => {
    // Add auth token from supabase
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Add dynamic language header
    const currentLanguage = i18n.language || i18n.options.fallbackLng || "en";
    config.headers["Accept-Language"] = `${currentLanguage},en;q=0.9`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const apiGet = async <T = any>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await apiClient.get<T>(url, config);
};

export const apiPost = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await apiClient.post<T>(url, data, config);
};

export default apiClient;
