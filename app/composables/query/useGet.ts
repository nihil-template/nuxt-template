import { appConfig } from '~/config/app.config';
import type { ResponseType } from '~/types/common.types';

export async function useGet<TData = unknown>(
  url: string,
  body?: string | Record<string, any> | ReadableStream | Blob | ArrayBuffer | ArrayBufferView,
  callback?: (data: ResponseType<TData> | undefined) => void,
  errorCallback?: (error: ResponseType<TData>) => void,
  options?: {
    enabled?: boolean | Ref<boolean> | ComputedRef<boolean>;
  }
) {
  const token = useCookie('token');
  const authToken = token.value;

  const enabled = options?.enabled ?? true;
  const enabledValue = unref(enabled);

  const watchOptions = typeof enabled === 'object'
    ? [ enabled, ]
    : false;

  const { data: response, ...other } = await useFetch<ResponseType<TData>>(url, {
    method: 'GET',
    baseURL: appConfig.api.route,
    ...(body && { body, }),
    immediate: enabledValue,
    watch: watchOptions,
    onRequest({ options: requestOptions, }) {
      if (authToken) {
        const headers = new Headers(requestOptions.headers);
        headers.set('Authorization', `Bearer ${authToken}`);
        requestOptions.headers = headers;
      }
    },
    onResponse({ response: res, }) {
      if (callback && res._data) {
        callback(res._data);
      }
    },
    onResponseError({ response: errorResponse, }) {
      if (errorCallback && errorResponse._data) {
        errorCallback(errorResponse._data);
      }
    },
  });

  // enabled가 reactive인 경우 watch하여 자동으로 execute
  if (typeof enabled === 'object' && enabledValue === false) {
    watch(enabled, (newValue) => {
      if (newValue && other.status.value === 'idle') {
        other.execute();
      }
    });
  }

  return {
    response,
    ...other,
  };
}
