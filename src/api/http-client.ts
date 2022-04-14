/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-empty-interface */
import Axios, { AxiosInstance, AxiosResponse } from 'axios';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

const handleResponse = ({ data }: AxiosResponse) => data;

const handleError = (error: any) => Promise.reject(error);

abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  private readonly _handleResponse: typeof handleResponse;

  protected readonly _handleError: typeof handleError;

  public constructor(baseURL: string) {
    this.instance = Axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this._handleResponse = handleResponse.bind(this);
    this._handleError = handleError.bind(this);
    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };
}

export default HttpClient;
