import type { FetchOptions } from 'ofetch';
import type { Ref } from 'vue';

export type QueryParams = Record<string, unknown>;

export type QueryHeaders = HeadersInit;

export type QueryBody = BodyInit | Record<string, unknown> | null | undefined;
export type QueryMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

export type QueryFetchOptions = Omit<
  FetchOptions<'json'>,
  'body' | 'headers' | 'method' | 'query'
>;

export interface QueryRequestInput<
  TBody = QueryBody,
  TParams extends QueryParams = QueryParams,
> {
  params?: TParams;
  body?: TBody;
  headers?: QueryHeaders;
  options?: QueryFetchOptions;
}

export interface NormalizedRequest<
  TBody = QueryBody,
  TParams extends QueryParams = QueryParams,
> {
  method: QueryMethod;
  query?: TParams;
  body?: TBody;
  headers?: QueryHeaders;
  fetchOptions: QueryFetchOptions;
}

export interface MutationState<TData, TError = Error> {
  pending: Ref<boolean>;
  data: Ref<TData | undefined>;
  error: Ref<TError | null>;
}

export interface MutationResult<TData, TError = Error>
  extends MutationState<TData, TError> {
  execute: <TBody = QueryBody, TParams extends QueryParams = QueryParams>(
    overrides?: QueryRequestInput<TBody, TParams>,
  ) => Promise<TData>;
  reset: () => void;
}
