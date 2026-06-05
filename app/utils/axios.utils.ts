import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

import { appConfig } from '~/config/app.config';
import type { BaseResponseType } from '~/types/response.types';

export class Api {
  static instance() {
    return axios.create({
      baseURL: appConfig.api.route,
    });
  }

  static async get<TData>(url: string, config: AxiosRequestConfig = {}): Promise<BaseResponseType<TData>> {
    const response = await this.instance().get<BaseResponseType<TData>>(url, config);

    return response.data;
  }

  static async post<TData, TPostData>(
    url: string,
    postData: TPostData,
    config: AxiosRequestConfig = {}
  ): Promise<BaseResponseType<TData>> {
    const response = await this.instance().post<
      BaseResponseType<TData>,
      AxiosResponse<BaseResponseType<TData>>,
      TPostData
    >(url, postData, config);

    return response.data;
  }

  static async put<TData, TPutData>(
    url: string,
    putData: TPutData,
    config: AxiosRequestConfig = {}
  ): Promise<BaseResponseType<TData>> {
    const response = await this.instance().put<
      BaseResponseType<TData>,
      AxiosResponse<BaseResponseType<TData>>,
      TPutData
    >(url, putData, config);

    return response.data;
  }

  static async patch<TData, TPatchData>(
    url: string,
    patchData: TPatchData,
    config: AxiosRequestConfig = {}
  ): Promise<BaseResponseType<TData>> {
    const response = await this.instance().patch<
      BaseResponseType<TData>,
      AxiosResponse<BaseResponseType<TData>>,
      TPatchData
    >(url, patchData, config);

    return response.data;
  }

  static async delete<TData>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<BaseResponseType<TData>> {
    const response = await this.instance().delete<
      BaseResponseType<TData>,
      AxiosResponse<BaseResponseType<TData>>
    >(url, config);

    return response.data;
  }
}
