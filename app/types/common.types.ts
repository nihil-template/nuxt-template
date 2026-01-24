export type OpenGraphType
  = | 'article'
    | 'book'
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_station'
    | 'profile'
    | 'website'
    | 'video.tv_show'
    | 'video.other'
    | 'video.movie'
    | 'video.episode';

export interface SiteMetadata {
  title: string;
  url: string;
  description?: string;
  author?: string;
  keywords?: string;
  type?: OpenGraphType;
  tags?: string;
  section?: string;
  created?: string;
  updated?: string;
  imageLink?: string;
  imageAlt?: string;
  robots?:
    | 'index, follow'
    | 'noindex, nofollow'
    | 'index, nofollow'
    | 'noindex, follow';
}

export interface AppConfig {
  site: {
    title: string;
    description: string;
    keywords: string;
    url: string;
    type: OpenGraphType;
    version: string;
  };
  author: {
    name: string;
    url: string;
  };
  images: {
    cover: {
      link: string;
      alt: string;
    };
    logo: string;
    darkLogo: string;
  };
  google: {
    verification: string;
    adSrc: string;
    analyticsId: string;
  };
  api: {
    route: string;
  };
}

/**
 * 응답 코드 타입
 *
 * 모든 API 응답에서 사용되는 응답 코드를 정의합니다.
 * HTTP 상태 코드의 영문 이름을 기준으로 정의되었습니다.
 *
 * 이 프로젝트는 모든 응답을 HTTP 200 상태 코드로 반환하며,
 * 실제 성공/실패 여부는 응답 본문의 `code` 필드로 구분합니다.
 */
export type ResponseCode
  // ============================================
  // 성공 응답 (2xx)
  // ============================================
  = | 'OK' // 200 - 요청 성공
    | 'CREATED' // 201 - 리소스 생성 성공
    | 'ACCEPTED' // 202 - 요청 수락됨 (비동기 처리)
    | 'NO_CONTENT' // 204 - 성공했으나 반환할 내용 없음

  // ============================================
  // 클라이언트 에러 (4xx)
  // ============================================
    | 'BAD_REQUEST' // 400 - 잘못된 요청
    | 'UNAUTHORIZED' // 401 - 인증 필요
    | 'FORBIDDEN' // 403 - 권한 없음
    | 'NOT_FOUND' // 404 - 리소스를 찾을 수 없음
    | 'METHOD_NOT_ALLOWED' // 405 - 허용되지 않은 HTTP 메서드
    | 'CONFLICT' // 409 - 리소스 충돌 (중복 등)
    | 'VALIDATION_ERROR' // 422 - 입력값 검증 실패
    | 'UNPROCESSABLE_ENTITY' // 422 - 처리할 수 없는 엔티티

  // ============================================
  // 서버 에러 (5xx)
  // ============================================
    | 'INTERNAL_SERVER_ERROR' // 500 - 내부 서버 오류
    | 'BAD_GATEWAY' // 502 - 게이트웨이 오류
    | 'SERVICE_UNAVAILABLE' // 503 - 서비스 사용 불가

  // ============================================
  // 기타 에러
  // ============================================
    | 'ERROR' // 일반적인 에러 (구체적인 에러 코드를 사용할 수 없을 때)
    | string; // 기타 응답 코드 (확장성)

/**
 * API 응답 타입
 *
 * 모든 API 응답은 HTTP 200 상태 코드를 반환하며,
 * 실제 성공/실패 여부는 `error` 필드와 `code` 필드로 판단합니다.
 *
 * - `error: false` + `code: 'OK' | 'CREATED' | 'ACCEPTED' | 'NO_CONTENT'` → 성공
 * - `error: true` + `code: 'UNAUTHORIZED' | 'FORBIDDEN' | ...` → 에러
 */
export interface ResponseType<TData = null> {
  error: boolean;
  message: string;
  data: TData;
  code: ResponseCode;
  responseTime: number;
}

export interface ListDataType<TData = null> {
  list: TData[];
  totalCnt: number;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
