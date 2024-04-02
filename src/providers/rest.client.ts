import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type DefaultOptions = {
  timeout?: number;
};

type Middleware<D, Res> = {
  beforeRequest?: (config: AxiosRequestConfig<D>) => any;
  afterResponse?: (response: AxiosResponse<Res, D>) => any;
};

type THeaders = Record<string, string>;

type Response<T> = AxiosResponse<T>;

export abstract class RestClient {
  private client: AxiosInstance;

  constructor(
    baseURL: string,
    headers: THeaders = {},
    defaultOptions: DefaultOptions = {},
  ) {
    this.client = axios.create({
      baseURL,
      headers,
      timeout: defaultOptions.timeout,
    });
  }

  public addMiddleware<D, Res>(middleware: Middleware<D, Res>) {
    if (middleware.beforeRequest) {
      this.client.interceptors.request.use((config) =>
        middleware.beforeRequest!(config),
      );
    }

    if (middleware.afterResponse) {
      this.client.interceptors.response.use((response) =>
        middleware.afterResponse!(response),
      );
    }
  }

  public async get<T>(
    endpoint: string,
    params?: Record<string, any>,
    headers?: THeaders,
  ): Promise<Response<T>> {
    return this.client.get<T>(endpoint, {
      params,
      headers,
    });
  }

  public async post<D, T>(
    endpoint: string,
    data: D,
    params?: Record<string, any>,
    headers?: THeaders,
  ): Promise<Response<T>> {
    return this.client.post<T>(endpoint, data, { headers, params });
  }

  public async put<D, T>(
    endpoint: string,
    data: D,
    params?: Record<string, any>,
    headers?: THeaders,
  ): Promise<Response<T>> {
    return this.client.put<T>(endpoint, data, { headers, params });
  }

  public async delete<T>(
    endpoint: string,
    params?: Record<string, any>,
    headers?: THeaders,
  ): Promise<Response<T>> {
    return this.client.delete<T>(endpoint, { headers, params });
  }
}
