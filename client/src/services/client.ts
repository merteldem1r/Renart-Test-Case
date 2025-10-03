import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import i18n from "i18next";
import securityHeaders from "./headers.json";
import { supabase } from "../supabaseClient";

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
  timeout: 10000,
  headers: {
    ...securityHeaders.security,
    ...securityHeaders.api,
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

    // Add CSRF token if available
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");
    if (csrfToken) {
      config.headers["X-CSRF-TOKEN"] = csrfToken;
    }

    // Add request timestamp for replay attack prevention
    config.headers["X-Request-Time"] = Date.now().toString();

    // Add environment info (only in development)
    if (import.meta.env.DEV) {
      config.headers["X-Environment"] = "development";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Generic API client functions - FULL RESPONSE VERSION
export const apiGet = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return await apiClient.get<T>(url, config);
};

export const apiPost = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return await apiClient.post<T>(url, data, config);
};

export const apiPut = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return await apiClient.put<T>(url, data, config);
};

export const apiPatch = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return await apiClient.patch<T>(url, data, config);
};

export const apiDelete = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return await apiClient.delete<T>(url, config);
};

// CONVENIENCE FUNCTIONS - DATA ONLY (for backward compatibility)
export const getData = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiGet<T>(url, config);
  return response.data;
};

export const postData = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiPost<T>(url, data, config);
  return response.data;
};

export const putData = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiPut<T>(url, data, config);
  return response.data;
};

export const patchData = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiPatch<T>(url, data, config);
  return response.data;
};

export const deleteData = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiDelete<T>(url, config);
  return response.data;
};

// File upload function - FULL RESPONSE
export const apiUpload = async <T = any>(
  url: string,
  file: File,
  onUploadProgress?: (progressEvent: any) => void
): Promise<AxiosResponse<T>> => {
  const formData = new FormData();
  formData.append("file", file);

  return await apiClient.post<T>(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...securityHeaders.upload,
      ...securityHeaders.security,
    },
    onUploadProgress,
  });
};

// Profile-specific functions - UPDATED TO USE FULL RESPONSE
export const getProfile = async (userId: string) => {
  const response = await apiGet(`/profiles/${userId}`);
  return response.data; // Still return data for convenience
};

export const updateProfile = async (userId: string, profileData: any) => {
  const response = await apiPut(`/profiles/${userId}`, profileData);
  return response.data;
};

export const verifyPhone = async (phoneData: {
  phone: string;
  verification_code: string;
}) => {
  const response = await apiPost("/profiles/verify-phone", phoneData);
  return response.data;
};

// Export the axios instance for custom usage
export default apiClient;
