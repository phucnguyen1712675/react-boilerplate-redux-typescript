/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-empty-interface */
import HttpClient from 'api/http-client';
import { AxiosRequestConfig } from 'axios';

const handleRequest = (config: AxiosRequestConfig) => {
  // config.headers['Authorization'] = 'Bearer ...';
  return config;
};

abstract class ProtectedHttpClient extends HttpClient {
  private readonly _handleRequest: typeof handleRequest;

  public constructor(baseURL: string) {
    super(baseURL);
    this._handleRequest = handleRequest.bind(this);
    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    );
  };
}

export default ProtectedHttpClient;
