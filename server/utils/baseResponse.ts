import type {
  TResponseCode,
  TResponseMessage,
  TBaseResponse,
  TListData,
} from '~/types/response.types';

/**
 * 기본 응답 객체
 */
export class BaseResponse {

  /**
   * @desc
   * @param data
   * @param code
   * @param message
   */
  public static data<TData>(
    data: TData,
    code: TResponseCode,
    message: TResponseMessage,
  ): TBaseResponse<TData> {
    return {
      data,
      error: false,
      code,
      message,
    };
  }

  /**
   *
   * @param data
   * @param code
   * @param message
   */
  public static list<TData>(
    data: TListData<TData>,
    code: TResponseCode,
    message: TResponseMessage,
  ): TBaseResponse<TListData<TData>> {
    return {
      data,
      error: false,
      code,
      message,
    };
  }

  /**
   *
   * @param code
   * @param message
   */
  public static error(code: TResponseCode, message: TResponseMessage): TBaseResponse<null> {
    return {
      data: null,
      error: true,
      code,
      message,
    };
  }
}
