# 스킬(Skills) API 엔드포인트

이 문서는 Fantasy Builder API의 스킬(Skills) 관련 엔드포인트를 정의합니다.

## 1. 전역 스킬 (Skills)

### 목록 조회
```
GET /skills
Status: 200
```

**Authentication:**
- Required: Yes (Authenticated)
- Roles: ALL

**Authorization:**
- Read: Owner or Public (공유된 스킬(`shrn_yn = 'Y'`) 또는 소유자만 조회 가능)
- Write: N/A

**Query Parameters:**
- `page_no`: number (optional, default: 1) - 페이지 번호
- `page_size`: number (optional, default: 10) - 페이지당 항목 수
- `search_type`: string (optional) - 검색 유형
- `search_keyword`: string (optional) - 검색 키워드
- `skill_no_list`: string (optional) - 스킬 번호 리스트 (쉼표로 구분)
- `skill_type`: string (optional) - 스킬 유형 (Active / Passive)
- `skill_lcls`: string (optional) - 스킬 계통

**Response (Success):**
```json
{
  "data": {
    "list": [
      {
        "skill_no": "number",
        "skill_nm": "string",
        "skill_type": "string",
        "skill_lcls": "string",
        "skill_expln": "string | null",
        "trgt_type": "string | null",
        "dmg_type": "string | null",
        "stat_eff_type": "string | null",
        "use_cost": "string | null",
        "cool_time": "string | null",
        "cast_time": "string | null",
        "use_cnd": "string | null",
        "use_yn": "string",
        "shrn_yn": "string",
        "del_yn": "string",
        "crt_no": "number | null",
        "crt_dt": "string (datetime) | null",
        "updt_no": "number | null",
        "updt_dt": "string (datetime) | null",
        "del_no": "number | null",
        "del_dt": "string (datetime) | null",
        "total_cnt": "number",
        "row_no": "number"
      }
    ],
    "totalCnt": "number"
  },
  "error": false,
  "code": "OK",
  "message": "조회에 성공했습니다."
}
```

**Response (Error):**
```json
{
  "data": null,
  "error": true,
  "code": "ERROR_CODE",
  "message": "에러 메시지"
}
```

---

### 상세 조회
```
GET /skills/:skillNo
Status: 200
```

**Authentication:**
- Required: Yes (Authenticated)
- Roles: ALL

**Authorization:**
- Read: Owner or Public (공유된 스킬(`shrn_yn = 'Y'`) 또는 소유자만 조회 가능)
- Write: N/A

**Path Parameters:**
- `skillNo`: number (required) - 스킬 번호

**Response (Success):**
```json
{
  "data": {
    "skill_no": "number",
    "skill_nm": "string",
    "skill_type": "string",
    "skill_lcls": "string",
    "skill_expln": "string | null",
    "trgt_type": "string | null",
    "dmg_type": "string | null",
    "stat_eff_type": "string | null",
    "use_cost": "string | null",
    "cool_time": "string | null",
    "cast_time": "string | null",
    "use_cnd": "string | null",
    "use_yn": "string",
    "shrn_yn": "string",
    "del_yn": "string",
    "crt_no": "number | null",
    "crt_dt": "string (datetime) | null",
    "updt_no": "number | null",
    "updt_dt": "string (datetime) | null",
    "del_no": "number | null",
    "del_dt": "string (datetime) | null"
  },
  "error": false,
  "code": "OK",
  "message": "조회에 성공했습니다."
}
```

**Response (Error):**
```json
{
  "data": null,
  "error": true,
  "code": "SKILL_NOT_FOUND",
  "message": "스킬을 찾을 수 없습니다."
}
```

---

### 생성
```
POST /skills
Status: 200
```

**Authentication:**
- Required: Yes (Authenticated)
- Roles: ALL

**Authorization:**
- Read: N/A
- Write: Owner (생성자는 자동으로 소유자가 됨)

**Request Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "skill_nm": "string (required)",
  "skill_type": "string (required)",
  "skill_lcls": "string (required)",
  "skill_expln": "string (optional)",
  "trgt_type": "string (optional)",
  "dmg_type": "string (optional)",
  "stat_eff_type": "string (optional)",
  "use_cost": "string (optional)",
  "cool_time": "string (optional)",
  "cast_time": "string (optional)",
  "use_cnd": "string (optional)"
}
```

**Response (Success):**
```json
{
  "data": {
    "skill_no": "number",
    "skill_nm": "string",
    "skill_type": "string",
    "skill_lcls": "string",
    "skill_expln": "string | null",
    "trgt_type": "string | null",
    "dmg_type": "string | null",
    "stat_eff_type": "string | null",
    "use_cost": "string | null",
    "cool_time": "string | null",
    "cast_time": "string | null",
    "use_cnd": "string | null",
    "use_yn": "string",
    "shrn_yn": "string",
    "del_yn": "string",
    "crt_no": "number | null",
    "crt_dt": "string (datetime) | null",
    "updt_no": "number | null",
    "updt_dt": "string (datetime) | null",
    "del_no": "number | null",
    "del_dt": "string (datetime) | null"
  },
  "error": false,
  "code": "OK",
  "message": "스킬이 생성되었습니다."
}
```

**Response (Error):**
```json
{
  "data": null,
  "error": true,
  "code": "VALIDATION_ERROR",
  "message": "입력값이 올바르지 않습니다."
}
```

---

### 수정
```
PATCH /skills/:skillNo
Status: 200
```

**Authentication:**
- Required: Yes (Authenticated)
- Roles: ALL

**Authorization:**
- Read: N/A
- Write: Owner or Admin (소유자 또는 관리자만 수정 가능)

**Request Headers:**
```
Authorization: Bearer {token}
```

**Path Parameters:**
- `skillNo`: number (required) - 스킬 번호

**Request Body:**
```json
{
  "skill_nm": "string (optional)",
  "skill_type": "string (optional)",
  "skill_lcls": "string (optional)",
  "skill_expln": "string (optional)",
  "trgt_type": "string (optional)",
  "dmg_type": "string (optional)",
  "stat_eff_type": "string (optional)",
  "use_cost": "string (optional)",
  "cool_time": "string (optional)",
  "cast_time": "string (optional)",
  "use_cnd": "string (optional)"
}
```

**Response (Success):**
```json
{
  "data": {
    "skill_no": "number",
    "skill_nm": "string",
    "skill_type": "string",
    "skill_lcls": "string",
    "skill_expln": "string | null",
    "trgt_type": "string | null",
    "dmg_type": "string | null",
    "stat_eff_type": "string | null",
    "use_cost": "string | null",
    "cool_time": "string | null",
    "cast_time": "string | null",
    "use_cnd": "string | null",
    "use_yn": "string",
    "shrn_yn": "string",
    "del_yn": "string",
    "crt_no": "number | null",
    "crt_dt": "string (datetime) | null",
    "updt_no": "number | null",
    "updt_dt": "string (datetime) | null",
    "del_no": "number | null",
    "del_dt": "string (datetime) | null"
  },
  "error": false,
  "code": "OK",
  "message": "스킬이 수정되었습니다."
}
```

**Response (Error):**
```json
{
  "data": null,
  "error": true,
  "code": "SKILL_NOT_FOUND",
  "message": "스킬을 찾을 수 없습니다."
}
```

---

### 삭제
```
DELETE /skills/:skillNo
Status: 200
```

**Authentication:**
- Required: Yes (Authenticated)
- Roles: ALL

**Authorization:**
- Read: N/A
- Write: Owner only (소유자만 삭제 가능, 관리자는 권한은 있으나 정책상 사용하지 않음)

**Request Headers:**
```
Authorization: Bearer {token}
```

**Path Parameters:**
- `skillNo`: number (required) - 스킬 번호

**Response (Success):**
```json
{
  "data": null,
  "error": false,
  "code": "OK",
  "message": "스킬이 삭제되었습니다."
}
```

**Response (Error):**
```json
{
  "data": null,
  "error": true,
  "code": "SKILL_NOT_FOUND",
  "message": "스킬을 찾을 수 없습니다."
}
```

---

### 사용 현황 조회
```
GET /skills/:skillNo/usage
Status: 200
```

**Authentication:**
- Required: Yes (Authenticated)
- Roles: ALL

**Authorization:**
- Read: Owner or Public (공유된 스킬(`shrn_yn = 'Y'`) 또는 소유자만 조회 가능)
- Write: N/A

**Path Parameters:**
- `skillNo`: number (required) - 스킬 번호

**Response (Success):**
```json
{
  "data": {
    "characters": "number",
    "creatures": "number",
    "items": "number",
    "nations": "number",
    "organizations": "number",
    "regions": "number"
  },
  "error": false,
  "code": "OK",
  "message": "조회에 성공했습니다."
}
```

**Response (Error):**
```json
{
  "data": null,
  "error": true,
  "code": "SKILL_NOT_FOUND",
  "message": "스킬을 찾을 수 없습니다."
}
```

---

## 2. 프로젝트 종속 스킬 (Project Skills)

### 목록 조회
```
GET /projects/:prjNo/skills
Status: 200
```

**Authentication:**
- Required: Yes (Authenticated)
- Roles: ALL

**Authorization:**
- Read: Owner or Public (해당 프로젝트가 공개되어 있거나(`shrn_yn = 'Y'`) 프로젝트 소유자인 경우만 조회 가능)
- Write: N/A

**Path Parameters:**
- `prjNo`: number (required) - 프로젝트 번호

**Query Parameters:**
- `page_no`: number (optional, default: 1) - 페이지 번호
- `page_size`: number (optional, default: 10) - 페이지당 항목 수
- `search_type`: string (optional) - 검색 유형
- `search_keyword`: string (optional) - 검색 키워드
- `skill_no_list`: string (optional) - 스킬 번호 리스트 (쉼표로 구분)
- `skill_type`: string (optional) - 스킬 유형 (Active / Passive)
- `skill_lcls`: string (optional) - 스킬 계통

**Response (Success):**
```json
{
  "data": {
    "list": [
      {
        "skill_no": "number",
        "prj_no": "number",
        "skill_nm": "string",
        "skill_type": "string",
        "skill_lcls": "string",
        "skill_expln": "string | null",
        "trgt_type": "string | null",
        "dmg_type": "string | null",
        "stat_eff_type": "string | null",
        "use_cost": "string | null",
        "cool_time": "string | null",
        "cast_time": "string | null",
        "use_cnd": "string | null",
        "use_yn": "string",
        "shrn_yn": "string",
        "del_yn": "string",
        "crt_no": "number | null",
        "crt_dt": "string (datetime) | null",
        "updt_no": "number | null",
        "updt_dt": "string (datetime) | null",
        "del_no": "number | null",
        "del_dt": "string (datetime) | null",
        "total_cnt": "number",
        "row_no": "number"
      }
    ],
    "totalCnt": "number"
  },
  "error": false,
  "code": "OK",
  "message": "조회에 성공했습니다."
}
```

**Response (Error):**
```json
{
  "data": null,
  "error": true,
  "code": "ERROR_CODE",
  "message": "에러 메시지"
}
```

---

### 상세 조회
```
GET /projects/:prjNo/skills/:skillNo
Status: 200
```

**Authentication:**
- Required: Yes (Authenticated)
- Roles: ALL

**Authorization:**
- Read: Owner or Public (해당 프로젝트가 공개되어 있거나(`shrn_yn = 'Y'`) 프로젝트 소유자인 경우만 조회 가능)
- Write: N/A

**Path Parameters:**
- `prjNo`: number (required) - 프로젝트 번호
- `skillNo`: number (required) - 스킬 번호

**Response (Success):**
```json
{
  "data": {
    "skill_no": "number",
    "prj_no": "number",
    "skill_nm": "string",
    "skill_type": "string",
    "skill_lcls": "string",
    "skill_expln": "string | null",
    "trgt_type": "string | null",
    "dmg_type": "string | null",
    "stat_eff_type": "string | null",
    "use_cost": "string | null",
    "cool_time": "string | null",
    "cast_time": "string | null",
    "use_cnd": "string | null",
    "use_yn": "string",
    "shrn_yn": "string",
    "del_yn": "string",
    "crt_no": "number | null",
    "crt_dt": "string (datetime) | null",
    "updt_no": "number | null",
    "updt_dt": "string (datetime) | null",
    "del_no": "number | null",
    "del_dt": "string (datetime) | null"
  },
  "error": false,
  "code": "OK",
  "message": "조회에 성공했습니다."
}
```

**Response (Error):**
```json
{
  "data": null,
  "error": true,
  "code": "PROJECT_SKILL_NOT_FOUND",
  "message": "프로젝트 종속 스킬을 찾을 수 없습니다."
}
```

---

### 생성
```
POST /projects/:prjNo/skills
Status: 200
```

**Authentication:**
- Required: Yes (Authenticated)
- Roles: ALL

**Authorization:**
- Read: N/A
- Write: Owner or Admin (프로젝트 소유자 또는 관리자만 생성 가능)

**Request Headers:**
```
Authorization: Bearer {token}
```

**Path Parameters:**
- `prjNo`: number (required) - 프로젝트 번호

**Request Body:**
```json
{
  "skill_nm": "string (required)",
  "skill_type": "string (required)",
  "skill_lcls": "string (required)",
  "skill_expln": "string (optional)",
  "trgt_type": "string (optional)",
  "dmg_type": "string (optional)",
  "stat_eff_type": "string (optional)",
  "use_cost": "string (optional)",
  "cool_time": "string (optional)",
  "cast_time": "string (optional)",
  "use_cnd": "string (optional)"
}
```

**Response (Success):**
```json
{
  "data": {
    "skill_no": "number",
    "prj_no": "number",
    "skill_nm": "string",
    "skill_type": "string",
    "skill_lcls": "string",
    "skill_expln": "string | null",
    "trgt_type": "string | null",
    "dmg_type": "string | null",
    "stat_eff_type": "string | null",
    "use_cost": "string | null",
    "cool_time": "string | null",
    "cast_time": "string | null",
    "use_cnd": "string | null",
    "use_yn": "string",
    "shrn_yn": "string",
    "del_yn": "string",
    "crt_no": "number | null",
    "crt_dt": "string (datetime) | null",
    "updt_no": "number | null",
    "updt_dt": "string (datetime) | null",
    "del_no": "number | null",
    "del_dt": "string (datetime) | null"
  },
  "error": false,
  "code": "OK",
  "message": "프로젝트 종속 스킬이 생성되었습니다."
}
```

**Response (Error):**
```json
{
  "data": null,
  "error": true,
  "code": "VALIDATION_ERROR",
  "message": "입력값이 올바르지 않습니다."
}
```

---

### 수정
```
PATCH /projects/:prjNo/skills/:skillNo
Status: 200
```

**Authentication:**
- Required: Yes (Authenticated)
- Roles: ALL

**Authorization:**
- Read: N/A
- Write: Owner or Admin (프로젝트 소유자 또는 관리자만 수정 가능)

**Request Headers:**
```
Authorization: Bearer {token}
```

**Path Parameters:**
- `prjNo`: number (required) - 프로젝트 번호
- `skillNo`: number (required) - 스킬 번호

**Request Body:**
```json
{
  "skill_nm": "string (optional)",
  "skill_type": "string (optional)",
  "skill_lcls": "string (optional)",
  "skill_expln": "string (optional)",
  "trgt_type": "string (optional)",
  "dmg_type": "string (optional)",
  "stat_eff_type": "string (optional)",
  "use_cost": "string (optional)",
  "cool_time": "string (optional)",
  "cast_time": "string (optional)",
  "use_cnd": "string (optional)"
}
```

**Response (Success):**
```json
{
  "data": {
    "skill_no": "number",
    "prj_no": "number",
    "skill_nm": "string",
    "skill_type": "string",
    "skill_lcls": "string",
    "skill_expln": "string | null",
    "trgt_type": "string | null",
    "dmg_type": "string | null",
    "stat_eff_type": "string | null",
    "use_cost": "string | null",
    "cool_time": "string | null",
    "cast_time": "string | null",
    "use_cnd": "string | null",
    "use_yn": "string",
    "shrn_yn": "string",
    "del_yn": "string",
    "crt_no": "number | null",
    "crt_dt": "string (datetime) | null",
    "updt_no": "number | null",
    "updt_dt": "string (datetime) | null",
    "del_no": "number | null",
    "del_dt": "string (datetime) | null"
  },
  "error": false,
  "code": "OK",
  "message": "프로젝트 종속 스킬이 수정되었습니다."
}
```

**Response (Error):**
```json
{
  "data": null,
  "error": true,
  "code": "PROJECT_SKILL_NOT_FOUND",
  "message": "프로젝트 종속 스킬을 찾을 수 없습니다."
}
```

---

### 삭제
```
DELETE /projects/:prjNo/skills/:skillNo
Status: 200
```

**Authentication:**
- Required: Yes (Authenticated)
- Roles: ALL

**Authorization:**
- Read: N/A
- Write: Owner only (프로젝트 소유자만 삭제 가능, 관리자는 권한은 있으나 정책상 사용하지 않음)

**Request Headers:**
```
Authorization: Bearer {token}
```

**Path Parameters:**
- `prjNo`: number (required) - 프로젝트 번호
- `skillNo`: number (required) - 스킬 번호

**Response (Success):**
```json
{
  "data": null,
  "error": false,
  "code": "OK",
  "message": "프로젝트 종속 스킬이 삭제되었습니다."
}
```

**Response (Error):**
```json
{
  "data": null,
  "error": true,
  "code": "PROJECT_SKILL_NOT_FOUND",
  "message": "프로젝트 종속 스킬을 찾을 수 없습니다."
}
```
