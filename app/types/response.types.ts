import type {
  responseCodeData,
} from '~/data/response-code.data';
import type {
  responseMessageData,
} from '~/data/response-message.data';

export type TResponseCode = typeof responseCodeData[keyof typeof responseCodeData];
export type TResponseMessage = typeof responseMessageData[keyof typeof responseMessageData];

export interface TBaseResponse<TData> {
  data: TData;
  error: boolean;
  code: TResponseCode;
  message: TResponseMessage;
}

export interface TListData<TData> {
  list: TData[]; // 목록 데이터
  page: number; // 현재 페이지
  pageSize: number; // 페이지 크기
  totalElements: number; // 총 데이터 수
  numberOfElements: number; // 조회된 데이터 수
  startIndex: number; // 현재 목록 시작 순번
  endIndex: number; // 현재 목록 마지막 순번
  hasPrev: boolean; // 이전 페이지 존재 여부
  hasNext: boolean; // 다음 페이지 존재 여부
  isFirst: boolean; // 최초 페이지 여부
  isLast: boolean; // 마지막 페이지 여부
  empty: boolean; // 조회된 데이터가 없을 경우
  totalPages: number; // 모든 페이지 수
}
