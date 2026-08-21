import type {
  ApiGetOptions,
  ApiMethod,
  ApiParams,
  ApiRequestOptions,
} from '~/types/api.types';

export class ApiClient {
  async request<
    TResponse,
    TBody = unknown,
    TParams extends ApiParams = ApiParams,
  >(
    method: ApiMethod,
    url: string,
    input: ApiRequestOptions<TBody, TParams> = {},
  ): Promise<TResponse> {
    const {
      body,
      headers,
      options,
      params,
    } = input;

    return await $fetch<TResponse>(url, {
      ...options,
      method,
      query: params,
      body: body as BodyInit | Record<string, unknown> | null | undefined,
      headers,
    });
  }

  async get<
    TResponse,
    TParams extends ApiParams = ApiParams,
  >(
    url: string,
    input: ApiGetOptions<TParams> = {},
  ): Promise<TResponse> {
    return await this.request<TResponse, never, TParams>('GET', url, input);
  }

  async post<
    TResponse,
    TBody = unknown,
    TParams extends ApiParams = ApiParams,
  >(
    url: string,
    input: ApiRequestOptions<TBody, TParams> = {},
  ): Promise<TResponse> {
    return await this.request<TResponse, TBody, TParams>('POST', url, input);
  }

  async put<
    TResponse,
    TBody = unknown,
    TParams extends ApiParams = ApiParams,
  >(
    url: string,
    input: ApiRequestOptions<TBody, TParams> = {},
  ): Promise<TResponse> {
    return await this.request<TResponse, TBody, TParams>('PUT', url, input);
  }

  async patch<
    TResponse,
    TBody = unknown,
    TParams extends ApiParams = ApiParams,
  >(
    url: string,
    input: ApiRequestOptions<TBody, TParams> = {},
  ): Promise<TResponse> {
    return await this.request<TResponse, TBody, TParams>('PATCH', url, input);
  }

  async delete<
    TResponse,
    TBody = unknown,
    TParams extends ApiParams = ApiParams,
  >(
    url: string,
    input: ApiRequestOptions<TBody, TParams> = {},
  ): Promise<TResponse> {
    return await this.request<TResponse, TBody, TParams>('DELETE', url, input);
  }
}

export const api = new ApiClient();
