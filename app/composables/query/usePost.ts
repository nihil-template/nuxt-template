import { appConfig } from '~/config/app.config';
import type { ResponseType } from '~/types/common.types';

export function usePost<TData = unknown>(url: string, callback?: (data: ResponseType<TData>) => void, errorCallback?: (error: ResponseType<TData>) => void) {
  const token = useCookie('token');
  const bodyRef = ref<string | Record<string, any> | ReadableStream | Blob | ArrayBuffer | ArrayBufferView | null | undefined>(undefined);

  const { data: response, status, error, execute, ...other } = useAsyncData<ResponseType<TData>>(
    `post-${url}`,
    async () => {
      const authToken = token.value;
      const headers: HeadersInit = {};

      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      return await $fetch<ResponseType<TData>>(url, {
        method: 'POST',
        baseURL: appConfig.api.route,
        body: bodyRef.value,
        headers,
      });
    },
    {
      immediate: false,
    }
  );

  const post = async (body: string | Record<string, any> | ReadableStream | Blob | ArrayBuffer | ArrayBufferView) => {
    bodyRef.value = body;
    try {
      await execute();
      if (callback && response.value) {
        callback(response.value);
      }
      return response.value;
    }
    catch (err: any) {
      if (errorCallback && err?.response?._data) {
        errorCallback(err.response._data);
      }
      else if (errorCallback && err) {
        errorCallback(err);
      }
      throw err;
    }
  };

  return {
    post,
    response,
    status,
    error,
    ...other,
  };
}
