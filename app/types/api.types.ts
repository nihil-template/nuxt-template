import type {
  FetchOptions,
  ResponseType,
} from 'ofetch';

export type ApiMethod =
  | 'DELETE'
  | 'GET'
  | 'PATCH'
  | 'POST'
  | 'PUT';

export type ApiParams = object;

export type ApiFetchOptions = Omit<
  FetchOptions<ResponseType>,
  'body' | 'headers' | 'method' | 'query'
>;

export interface ApiRequestOptions<
  TBody = unknown,
  TParams extends ApiParams = ApiParams,
> {
  params?: TParams;
  body?: TBody;
  headers?: HeadersInit;
  options?: ApiFetchOptions;
}

export type ApiGetOptions<
  TParams extends ApiParams = ApiParams,
> = Omit<ApiRequestOptions<never, TParams>, 'body'>;
