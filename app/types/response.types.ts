import type { ResponseCode } from '~/data/response-code.data';
import type { ResponseMessage } from '~/data/response-message.data';

export interface BaseResponseType<TData> {
  data: TData | null;
  error: boolean;
  code: ResponseCode;
  message: ResponseMessage;
}

export interface ListDataType<TData> {
  list: TData[];
  pageInfo: {
    totalElements: number;
    filteredElements: number;
    page: number;
    pageSize: number;
    totalPages: number;
    isFirst: boolean;
    isLast: boolean;
    hasPrev: boolean;
    hasNext: boolean;
    isEmpty: boolean;
    numberOfElements: number;
  };
}
