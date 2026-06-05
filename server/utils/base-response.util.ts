import { ResponseCode } from '~/data/response-code.data';
import { ResponseMessage } from '~/data/response-message.data';
import type { ListDataType } from '~/types/response.types';

export class BaseResponse {
  static async data<TData>(data: TData, code: keyof ResponseCode, message: ResponseMessage) {
    return {
      data,
      error: false,
      code,
      message,
    };
  }

  static async list<TData>(data: ListDataType<TData>, code: keyof ResponseCode, message: ResponseMessage) {
    return {
      data,
      error: false,
      code,
      message,
    };
  }

  async page() {

  }

  static async error(code: keyof ResponseCode, message: ResponseMessage) {
    return {
      data: null,
      error: true,
      code,
      message,
    };
  }
}
