export class ResponseMessage {
  static CONTINUE = '요청 계속 진행.';
  static SWITCHING_PROTOCOLS = '프로토콜 전환 완료.';
  static PROCESSING = '요청 처리 중.';
  static EARLY_HINTS = '사전 정보 전달 완료.';

  static OK = '요청 완료.';
  static CREATED = '생성 완료.';
  static ACCEPTED = '요청 접수 완료.';
  static NON_AUTHORITATIVE_INFORMATION = '비공식 정보 전달 완료.';
  static NO_CONTENT = '처리 완료.';
  static RESET_CONTENT = '콘텐츠 초기화 완료.';
  static PARTIAL_CONTENT = '일부 콘텐츠 전달 완료.';
  static MULTI_STATUS = '다중 상태 전달 완료.';
  static ALREADY_REPORTED = '이미 보고 완료.';
  static IM_USED = '인스턴스 조작 완료.';

  static MULTIPLE_CHOICES = '선택지 확인 필요.';
  static MOVED_PERMANENTLY = '영구 이동 완료.';
  static FOUND = '임시 위치 확인 완료.';
  static SEE_OTHER = '다른 위치 확인 필요.';
  static NOT_MODIFIED = '변경 없음.';
  static TEMPORARY_REDIRECT = '임시 리다이렉트 필요.';
  static PERMANENT_REDIRECT = '영구 리다이렉트 필요.';

  static BAD_REQUEST = '잘못된 요청 에러.';
  static UNAUTHORIZED = '인증 에러.';
  static PAYMENT_REQUIRED = '결제 필요 에러.';
  static FORBIDDEN = '권한 에러.';
  static NOT_FOUND = '조회 에러.';
  static METHOD_NOT_ALLOWED = '허용되지 않은 메서드 에러.';
  static NOT_ACCEPTABLE = '허용되지 않은 응답 형식 에러.';
  static PROXY_AUTHENTICATION_REQUIRED = '프록시 인증 에러.';
  static REQUEST_TIMEOUT = '요청 시간 초과 에러.';
  static CONFLICT = '충돌 에러.';
  static GONE = '만료된 리소스 에러.';
  static LENGTH_REQUIRED = '콘텐츠 길이 누락 에러.';
  static PRECONDITION_FAILED = '사전 조건 실패 에러.';
  static PAYLOAD_TOO_LARGE = '요청 데이터 크기 초과 에러.';
  static URI_TOO_LONG = '요청 주소 길이 초과 에러.';
  static UNSUPPORTED_MEDIA_TYPE = '지원하지 않는 미디어 형식 에러.';
  static RANGE_NOT_SATISFIABLE = '요청 범위 에러.';
  static EXPECTATION_FAILED = '요청 기대 조건 실패 에러.';
  static I_AM_A_TEAPOT = '처리 불가 에러.';
  static MISDIRECTED_REQUEST = '잘못 전달된 요청 에러.';
  static VALIDATION_ERROR = '검증 에러.';
  static UNPROCESSABLE_ENTITY = '처리할 수 없는 데이터 에러.';
  static LOCKED = '잠긴 리소스 에러.';
  static FAILED_DEPENDENCY = '의존성 실패 에러.';
  static TOO_EARLY = '이른 요청 에러.';
  static UPGRADE_REQUIRED = '업그레이드 필요 에러.';
  static PRECONDITION_REQUIRED = '사전 조건 필요 에러.';
  static TOO_MANY_REQUESTS = '요청 횟수 초과 에러.';
  static REQUEST_HEADER_FIELDS_TOO_LARGE = '요청 헤더 크기 초과 에러.';
  static UNAVAILABLE_FOR_LEGAL_REASONS = '법적 사유로 사용할 수 없음 에러.';

  static INTERNAL_SERVER_ERROR = '서버 에러.';
  static NOT_IMPLEMENTED = '구현되지 않은 기능 에러.';
  static BAD_GATEWAY = '게이트웨이 에러.';
  static SERVICE_UNAVAILABLE = '서비스 사용 불가 에러.';
  static GATEWAY_TIMEOUT = '게이트웨이 시간 초과 에러.';
  static HTTP_VERSION_NOT_SUPPORTED = '지원하지 않는 HTTP 버전 에러.';
  static VARIANT_ALSO_NEGOTIATES = '콘텐츠 협상 에러.';
  static INSUFFICIENT_STORAGE = '저장 공간 부족 에러.';
  static LOOP_DETECTED = '반복 요청 감지 에러.';
  static NOT_EXTENDED = '확장 필요 에러.';
  static NETWORK_AUTHENTICATION_REQUIRED = '네트워크 인증 필요 에러.';

  static ERROR = '에러.';
}
