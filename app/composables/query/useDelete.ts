import { appConfig } from '~/config/app.config';
import type { ResponseType } from '~/types/common.types';

export function useDelete<TData = unknown>(url: string, callback?: (data: ResponseType<TData>) => void, errorCallback?: (error: ResponseType<TData>) => void) {
  const token = useCookie('token');

  const { data: response, status, error, execute, ...other } = useAsyncData<ResponseType<TData>>(
    `delete-${url}`,
    async () => {
      const authToken = token.value;
      const headers: HeadersInit = {};

      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      return await $fetch<ResponseType<TData>>(url, {
        method: 'DELETE',
        baseURL: appConfig.api.route,
        headers,
      });
    },
    {
      immediate: false,
    }
  );

  const del = async () => {
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
    delete: del,
    response,
    status,
    error,
    ...other,
  };
}
