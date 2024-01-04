import * as AxiosLogger from 'axios-logger'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

AxiosLogger.setGlobalConfig({
  data: false,
})

export function createClient(): AxiosInstance {
  let config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_URL,
  }

  const instance = axios.create(config)
  if (typeof window !== 'undefined') {
    instance.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger)
    instance.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger)
  }
  return instance
}
