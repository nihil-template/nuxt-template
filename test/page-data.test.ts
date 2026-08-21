import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  responseCodeData,
} from '../app/data/response-code.data';
import {
  responseMessageData,
} from '../app/data/response-message.data';
import {
  BaseResponse,
} from '../server/utils/baseResponse';
import {
  pageData,
} from '../server/utils/pageData';

describe('pageData', () => {
  it('요청한 페이지 크기만큼 목록 메타데이터를 계산한다', () => {
    const result = pageData(
      Array.from({ length: 30, }, (_, index) => index + 1),
      2,
      10,
    );

    expect(result).toEqual({
      list: [
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
      ],
      page: 2,
      pageSize: 10,
      totalElements: 30,
      numberOfElements: 10,
      startIndex: 11,
      endIndex: 20,
      hasPrev: true,
      hasNext: true,
      isFirst: false,
      isLast: false,
      empty: false,
      totalPages: 3,
    });
  });
});

describe('BaseResponse.list', () => {
  it('계산된 페이지 데이터를 그대로 응답에 담는다', () => {
    const data = pageData(
      [
        'first',
        'second',
      ],
      1,
      10,
    );
    const result = BaseResponse.list(
      data,
      responseCodeData.OK,
      responseMessageData.OK,
    );

    expect(result).toMatchObject({
      data,
      error: false,
      code: responseCodeData.OK,
      message: responseMessageData.OK,
    });
  });
});
