import { env } from "@/env";
import { useAuthStore } from "@/store/auth-store";
import axios, { type AxiosRequestConfig } from "axios";

type DefaultResponse = {
  result  ?:  boolean
  error   ?:  string
  message ?:  string
}

const API_URL = window.location.hostname == "localhost" ? env.VITE_API_URL_DEV : env.VITE_API_URL_PROD;

export const userHeader: AxiosRequestConfig = {
  headers: {
    "Content-Type"  : "application/json",
    "api-key"       : env.VITE_API_KEY,
  }
}

const getAuthToken = () => {
  const { token } = useAuthStore.getState()
  return token
}

export const apiGet = async <T>(
  /** API url, only specify the pathname, not the whole url since the host url is indicated in .env file unless otherwise not */
  url     :   string,
  config  ?:  AxiosRequestConfig<any>
): Promise<T & DefaultResponse> => {
  try {
    const token = getAuthToken()
    const configData = {
      ...config,
      headers: {
        ...userHeader.headers,
        ...(config?.headers || {}),
        Authorization: ["Bearer", token].join(" ")
      }
    }
    const response = await axios.get([API_URL, url].join(""), configData);
    return response.data as T & DefaultResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) console.error('Axios error:', error.message)
    else console.error('Unexpected error:', error)
    throw error
  }
}

export const apiPost = async <T>(
  /** API url, only specify the pathname, not the whole url since the host url is indicated in .env file unless otherwise not */
  url     : string,
  data    ?: any,
  config  ?: AxiosRequestConfig<any>
): Promise<T & DefaultResponse> => {
  try {
    const token = getAuthToken()
    const configData = {
      ...config,
      headers: {
        ...userHeader.headers,
        ...(config?.headers || {}),
        Authorization: ["Bearer", token].join(" ")
      }
    }
    const response = await axios.post([API_URL, url].join(""), data, configData);
    return response.data as T & DefaultResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) console.error('Axios error:', error.message)
    else console.error('Unexpected error:', error)
    throw error
  }
};

export const apiPatch = async <T>(
  /** API url, only specify the pathname, not the whole url since the host url is indicated in .env file unless otherwise not */
  url     :   string,
  data    ?:  any,
  config  ?:  AxiosRequestConfig<any>
): Promise<T & DefaultResponse> => {
  try {
    const token = getAuthToken()
    const configData = {
      ...config,
      headers: {
        ...userHeader.headers,
        ...(config?.headers || {}),
        Authorization: ["Bearer", token].join(" ")
      }
    }
    const response = await axios.patch([API_URL, url].join(""), data, configData);
    return response.data as T & DefaultResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) console.error('Axios error:', error.message)
    else console.error('Unexpected error:', error)
    throw error
  }
};