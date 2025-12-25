import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'sonner';
import { enableAxiosMock } from './mockService';

// Default configuration
const config: AxiosRequestConfig = {
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export class ApiService {
  private instance: AxiosInstance;
  // private sessionId: string | null;

  constructor() {
    this.instance = axios.create(config);

    if (import.meta.env.DEV) {
      enableAxiosMock(this.instance);
    }

    this.instance.defaults.withCredentials = true;

    // Request Interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        //Attach token if it exists
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error) => {
        const message =
          error.response?.data?.message ||
          error.message ||
          'An unexpected error occurred';
        toast.error(message, {
          position: 'top-center',
        });

        return Promise.reject(error);
      }
    );
  }

  public get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.get(url, config);
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return await this.instance.post(url, data, config);
    // return res.data;
  }

  public postForm<T>(
    url: string,
    data?: FormData,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    });
  }

  public put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.put(url, data, config);
  }

  public putForm<T>(
    url: string,
    data?: FormData,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    });
  }

  public delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.delete(url, config);
  }
}
export const apiService = new ApiService();
