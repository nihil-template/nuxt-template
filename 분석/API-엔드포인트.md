# API 엔드포인트 명세

이 문서는 Fantasy Builder API의 모든 엔드포인트를 정의합니다.

## 공통 규칙

### 패스 파라미터 명명
- PK를 받을 때는 `id`가 아닌 `no`를 사용합니다.
  - 예: `:traitNo`, `:skillNo`, `:charNo`, `:prjNo` 등

### 응답 형식
- 모든 목록 조회는 `SearchVo` 기반의 페이징 응답을 반환합니다.
- 상세 조회는 단일 객체를 반환합니다.
- 생성/수정은 생성/수정된 객체를 반환합니다.
- 삭제는 성공 여부를 반환합니다.

### 공통 쿼리 파라미터 (목록 조회)
- `page_no`: 페이지 번호 (1부터 시작)
- `page_size`: 페이지당 항목 수
- `search_type`: 검색 유형
- `search_keyword`: 검색 키워드
- 각 엔티티별 필터 필드 (예: `trait_lcls`, `skill_type` 등)

---

## 1. 전역 특성 (Traits)

### 목록 조회
```
GET /api/traits
```

### 상세 조회
```
GET /api/traits/:traitNo
```

### 생성
```
POST /api/traits
```

### 수정
```
PUT /api/traits/:traitNo
```

### 삭제
```
DELETE /api/traits/:traitNo
```

### 사용 현황 조회
```
GET /api/traits/:traitNo/usage
```

---

## 2. 전역 스킬 (Skills)

### 목록 조회
```
GET /api/skills
```

### 상세 조회
```
GET /api/skills/:skillNo
```

### 생성
```
POST /api/skills
```

### 수정
```
PUT /api/skills/:skillNo
```

### 삭제
```
DELETE /api/skills/:skillNo
```

### 사용 현황 조회
```
GET /api/skills/:skillNo/usage
```

---

## 3. 프로젝트 (Projects)

### 목록 조회
```
GET /api/projects
```

### 상세 조회
```
GET /api/projects/:prjNo
```

### 생성
```
POST /api/projects
```

### 수정
```
PUT /api/projects/:prjNo
```

### 삭제
```
DELETE /api/projects/:prjNo
```

---

## 4. 프로젝트 종속 특성 (Project Traits)

### 목록 조회
```
GET /api/projects/:prjNo/traits
```

### 상세 조회
```
GET /api/projects/:prjNo/traits/:traitNo
```

### 생성
```
POST /api/projects/:prjNo/traits
```

### 수정
```
PUT /api/projects/:prjNo/traits/:traitNo
```

### 삭제
```
DELETE /api/projects/:prjNo/traits/:traitNo
```

---

## 5. 프로젝트 종속 스킬 (Project Skills)

### 목록 조회
```
GET /api/projects/:prjNo/skills
```

### 상세 조회
```
GET /api/projects/:prjNo/skills/:skillNo
```

### 생성
```
POST /api/projects/:prjNo/skills
```

### 수정
```
PUT /api/projects/:prjNo/skills/:skillNo
```

### 삭제
```
DELETE /api/projects/:prjNo/skills/:skillNo
```

---

## 6. 세계관 구조 (Frameworks)

### 목록 조회
```
GET /api/projects/:prjNo/frameworks
```

### 상세 조회
```
GET /api/projects/:prjNo/frameworks/:frmNo
```

### 생성
```
POST /api/projects/:prjNo/frameworks
```

### 수정
```
PUT /api/projects/:prjNo/frameworks/:frmNo
```

### 삭제
```
DELETE /api/projects/:prjNo/frameworks/:frmNo
```

---

## 7. 생물/종족 (Creatures)

### 목록 조회
```
GET /api/projects/:prjNo/creatures
```

### 상세 조회
```
GET /api/projects/:prjNo/creatures/:creatureNo
```

### 생성
```
POST /api/projects/:prjNo/creatures
```

### 수정
```
PUT /api/projects/:prjNo/creatures/:creatureNo
```

### 삭제
```
DELETE /api/projects/:prjNo/creatures/:creatureNo
```

---

## 8. 인물 (Characters)

### 목록 조회
```
GET /api/projects/:prjNo/characters
```

### 상세 조회
```
GET /api/projects/:prjNo/characters/:charNo
```

### 생성
```
POST /api/projects/:prjNo/characters
```

### 수정
```
PUT /api/projects/:prjNo/characters/:charNo
```

### 삭제
```
DELETE /api/projects/:prjNo/characters/:charNo
```

---

## 9. 아이템 (Items)

### 목록 조회
```
GET /api/projects/:prjNo/items
```

### 상세 조회
```
GET /api/projects/:prjNo/items/:itemNo
```

### 생성
```
POST /api/projects/:prjNo/items
```

### 수정
```
PUT /api/projects/:prjNo/items/:itemNo
```

### 삭제
```
DELETE /api/projects/:prjNo/items/:itemNo
```

---

## 10. 지역 (Regions)

### 목록 조회
```
GET /api/projects/:prjNo/regions
```

### 상세 조회
```
GET /api/projects/:prjNo/regions/:regionNo
```

### 생성
```
POST /api/projects/:prjNo/regions
```

### 수정
```
PUT /api/projects/:prjNo/regions/:regionNo
```

### 삭제
```
DELETE /api/projects/:prjNo/regions/:regionNo
```

---

## 11. 국가 (Nations)

### 목록 조회
```
GET /api/projects/:prjNo/nations
```

### 상세 조회
```
GET /api/projects/:prjNo/nations/:ntnNo
```

### 생성
```
POST /api/projects/:prjNo/nations
```

### 수정
```
PUT /api/projects/:prjNo/nations/:ntnNo
```

### 삭제
```
DELETE /api/projects/:prjNo/nations/:ntnNo
```

---

## 12. 조직 (Organizations)

### 목록 조회
```
GET /api/projects/:prjNo/organizations
```

### 상세 조회
```
GET /api/projects/:prjNo/organizations/:orgNo
```

### 생성
```
POST /api/projects/:prjNo/organizations
```

### 수정
```
PUT /api/projects/:prjNo/organizations/:orgNo
```

### 삭제
```
DELETE /api/projects/:prjNo/organizations/:orgNo
```

---

## 13. 사건 (Events)

### 목록 조회
```
GET /api/projects/:prjNo/events
```

### 상세 조회
```
GET /api/projects/:prjNo/events/:eventNo
```

### 생성
```
POST /api/projects/:prjNo/events
```

### 수정
```
PUT /api/projects/:prjNo/events/:eventNo
```

### 삭제
```
DELETE /api/projects/:prjNo/events/:eventNo
```

---

## 14. 전승/설화 (Lores)

### 목록 조회
```
GET /api/projects/:prjNo/lores
```

### 상세 조회
```
GET /api/projects/:prjNo/lores/:loreNo
```

### 생성
```
POST /api/projects/:prjNo/lores
```

### 수정
```
PUT /api/projects/:prjNo/lores/:loreNo
```

### 삭제
```
DELETE /api/projects/:prjNo/lores/:loreNo
```

---

## 15. 예제 (Exes)

### 목록 조회
```
GET /api/exes
```

### 상세 조회
```
GET /api/exes/:id
```

### 생성
```
POST /api/exes
```

### 수정
```
PUT /api/exes/:id
```

### 삭제
```
DELETE /api/exes/:id
```

---

## 매핑 테이블 엔드포인트

## 16. 인물-스킬 매핑 (Char Skill Maps)

### 목록 조회
```
GET /api/projects/:prjNo/characters/:charNo/skills
```

### 상세 조회
```
GET /api/projects/:prjNo/characters/:charNo/skills/:skillNo
Query: skill_type=GLOBAL|PROJECT
```

### 생성
```
POST /api/projects/:prjNo/characters/:charNo/skills
Body: { skill_no, skill_type: 'GLOBAL' | 'PROJECT', prof_lvl?, skill_rmk? }
```

### 수정
```
PUT /api/projects/:prjNo/characters/:charNo/skills/:skillNo
Query: skill_type=GLOBAL|PROJECT
Body: { prof_lvl?, skill_rmk? }
```

### 삭제
```
DELETE /api/projects/:prjNo/characters/:charNo/skills/:skillNo
Query: skill_type=GLOBAL|PROJECT
```

---

## 17. 인물-특성 매핑 (Char Trait Maps)

### 목록 조회
```
GET /api/projects/:prjNo/characters/:charNo/traits
```

### 상세 조회
```
GET /api/projects/:prjNo/characters/:charNo/traits/:traitNo
Query: trait_type=GLOBAL|PROJECT
```

### 생성
```
POST /api/projects/:prjNo/characters/:charNo/traits
Body: { trait_no, trait_type: 'GLOBAL' | 'PROJECT', trait_rmk? }
```

### 수정
```
PUT /api/projects/:prjNo/characters/:charNo/traits/:traitNo
Query: trait_type=GLOBAL|PROJECT
Body: { trait_rmk? }
```

### 삭제
```
DELETE /api/projects/:prjNo/characters/:charNo/traits/:traitNo
Query: trait_type=GLOBAL|PROJECT
```

---

## 18. 인물-아이템 매핑 (Char Item Maps)

### 목록 조회
```
GET /api/projects/:prjNo/characters/:charNo/items
```

### 상세 조회
```
GET /api/projects/:prjNo/characters/:charNo/items/:ownNo
```

### 생성
```
POST /api/projects/:prjNo/characters/:charNo/items
Body: { item_no, item_cnt?, equip_yn?, rmk? }
```

### 수정
```
PUT /api/projects/:prjNo/characters/:charNo/items/:ownNo
Body: { item_cnt?, equip_yn?, rmk? }
```

### 삭제
```
DELETE /api/projects/:prjNo/characters/:charNo/items/:ownNo
```

---

## 19. 인물-인물 관계 (Char Relations)

### 목록 조회
```
GET /api/projects/:prjNo/characters/:charNo/relations
```

### 상세 조회
```
GET /api/projects/:prjNo/characters/:charNo/relations/:relNo
```

### 생성
```
POST /api/projects/:prjNo/characters/:charNo/relations
Body: { trgt_char_no, rel_type, rel_desc?, intimacy_lvl? }
```

### 수정
```
PUT /api/projects/:prjNo/characters/:charNo/relations/:relNo
Body: { rel_type?, rel_desc?, intimacy_lvl? }
```

### 삭제
```
DELETE /api/projects/:prjNo/characters/:charNo/relations/:relNo
```

---

## 20. 인물-그룹 관계 (Char Group Relations)

### 목록 조회
```
GET /api/projects/:prjNo/characters/:charNo/group-relations
```

### 상세 조회
```
GET /api/projects/:prjNo/characters/:charNo/group-relations/:relNo
```

### 생성
```
POST /api/projects/:prjNo/characters/:charNo/group-relations
Body: { trgt_ref_type, trgt_ref_no, rel_type, rel_desc?, role_desc? }
```

### 수정
```
PUT /api/projects/:prjNo/characters/:charNo/group-relations/:relNo
Body: { rel_type?, rel_desc?, role_desc? }
```

### 삭제
```
DELETE /api/projects/:prjNo/characters/:charNo/group-relations/:relNo
```

---

## 21. 종족-특성 매핑 (Creature Trait Maps)

### 목록 조회
```
GET /api/projects/:prjNo/creatures/:creatureNo/traits
```

### 상세 조회
```
GET /api/projects/:prjNo/creatures/:creatureNo/traits/:mapNo
```

### 생성
```
POST /api/projects/:prjNo/creatures/:creatureNo/traits
Body: { trait_no, trait_type: 'GLOBAL' | 'PROJECT', trait_rmk? }
```

### 수정
```
PUT /api/projects/:prjNo/creatures/:creatureNo/traits/:mapNo
Body: { trait_rmk? }
```

### 삭제
```
DELETE /api/projects/:prjNo/creatures/:creatureNo/traits/:mapNo
```

---

## 22. 종족-스킬 매핑 (Creature Skill Maps)

### 목록 조회
```
GET /api/projects/:prjNo/creatures/:creatureNo/skills
```

### 상세 조회
```
GET /api/projects/:prjNo/creatures/:creatureNo/skills/:mapNo
```

### 생성
```
POST /api/projects/:prjNo/creatures/:creatureNo/skills
Body: { skill_no, skill_type: 'GLOBAL' | 'PROJECT', prof_lvl?, skill_rmk? }
```

### 수정
```
PUT /api/projects/:prjNo/creatures/:creatureNo/skills/:mapNo
Body: { prof_lvl?, skill_rmk? }
```

### 삭제
```
DELETE /api/projects/:prjNo/creatures/:creatureNo/skills/:mapNo
```

---

## 23. 아이템-스킬 매핑 (Item Skill Maps)

### 목록 조회
```
GET /api/projects/:prjNo/items/:itemNo/skills
```

### 상세 조회
```
GET /api/projects/:prjNo/items/:itemNo/skills/:mapNo
```

### 생성
```
POST /api/projects/:prjNo/items/:itemNo/skills
Body: { skill_no, skill_type: 'GLOBAL' | 'PROJECT', prof_lvl?, skill_rmk? }
```

### 수정
```
PUT /api/projects/:prjNo/items/:itemNo/skills/:mapNo
Body: { prof_lvl?, skill_rmk? }
```

### 삭제
```
DELETE /api/projects/:prjNo/items/:itemNo/skills/:mapNo
```

---

## 24. 아이템-특성 매핑 (Item Trait Maps)

### 목록 조회
```
GET /api/projects/:prjNo/items/:itemNo/traits
```

### 상세 조회
```
GET /api/projects/:prjNo/items/:itemNo/traits/:mapNo
```

### 생성
```
POST /api/projects/:prjNo/items/:itemNo/traits
Body: { trait_no, trait_type: 'GLOBAL' | 'PROJECT', trait_rmk? }
```

### 수정
```
PUT /api/projects/:prjNo/items/:itemNo/traits/:mapNo
Body: { trait_rmk? }
```

### 삭제
```
DELETE /api/projects/:prjNo/items/:itemNo/traits/:mapNo
```

---

## 25. 전승-인물 매핑 (Lore Char Maps)

### 목록 조회
```
GET /api/projects/:prjNo/lores/:loreNo/characters
```

### 상세 조회
```
GET /api/projects/:prjNo/lores/:loreNo/characters/:mapNo
```

### 생성
```
POST /api/projects/:prjNo/lores/:loreNo/characters
Body: { char_no, role_desc? }
```

### 수정
```
PUT /api/projects/:prjNo/lores/:loreNo/characters/:mapNo
Body: { role_desc? }
```

### 삭제
```
DELETE /api/projects/:prjNo/lores/:loreNo/characters/:mapNo
```

---

## 26. 전승-아이템 매핑 (Lore Item Maps)

### 목록 조회
```
GET /api/projects/:prjNo/lores/:loreNo/items
```

### 상세 조회
```
GET /api/projects/:prjNo/lores/:loreNo/items/:mapNo
```

### 생성
```
POST /api/projects/:prjNo/lores/:loreNo/items
Body: { item_no, role_desc? }
```

### 수정
```
PUT /api/projects/:prjNo/lores/:loreNo/items/:mapNo
Body: { role_desc? }
```

### 삭제
```
DELETE /api/projects/:prjNo/lores/:loreNo/items/:mapNo
```

---

## 27. 국가-특성 매핑 (Nation Trait Maps)

### 목록 조회
```
GET /api/projects/:prjNo/nations/:ntnNo/traits
```

### 상세 조회
```
GET /api/projects/:prjNo/nations/:ntnNo/traits/:mapNo
```

### 생성
```
POST /api/projects/:prjNo/nations/:ntnNo/traits
Body: { trait_no, trait_type: 'GLOBAL' | 'PROJECT', trait_rmk? }
```

### 수정
```
PUT /api/projects/:prjNo/nations/:ntnNo/traits/:mapNo
Body: { trait_rmk? }
```

### 삭제
```
DELETE /api/projects/:prjNo/nations/:ntnNo/traits/:mapNo
```

---

## 28. 조직-특성 매핑 (Organization Trait Maps)

### 목록 조회
```
GET /api/projects/:prjNo/organizations/:orgNo/traits
```

### 상세 조회
```
GET /api/projects/:prjNo/organizations/:orgNo/traits/:mapNo
```

### 생성
```
POST /api/projects/:prjNo/organizations/:orgNo/traits
Body: { trait_no, trait_type: 'GLOBAL' | 'PROJECT', trait_rmk? }
```

### 수정
```
PUT /api/projects/:prjNo/organizations/:orgNo/traits/:mapNo
Body: { trait_rmk? }
```

### 삭제
```
DELETE /api/projects/:prjNo/organizations/:orgNo/traits/:mapNo
```

---

## 29. 지역-특성 매핑 (Region Trait Maps)

### 목록 조회
```
GET /api/projects/:prjNo/regions/:regionNo/traits
```

### 상세 조회
```
GET /api/projects/:prjNo/regions/:regionNo/traits/:mapNo
```

### 생성
```
POST /api/projects/:prjNo/regions/:regionNo/traits
Body: { trait_no, trait_type: 'GLOBAL' | 'PROJECT', trait_rmk? }
```

### 수정
```
PUT /api/projects/:prjNo/regions/:regionNo/traits/:mapNo
Body: { trait_rmk? }
```

### 삭제
```
DELETE /api/projects/:prjNo/regions/:regionNo/traits/:mapNo
```

---

## 30. 집단 관계 (Group Relations)

### 목록 조회
```
GET /api/projects/:prjNo/group-relations
```

### 상세 조회
```
GET /api/projects/:prjNo/group-relations/:relNo
```

### 생성
```
POST /api/projects/:prjNo/group-relations
Body: { src_type, src_no, trgt_type, trgt_no, rel_type, rel_desc? }
```

### 수정
```
PUT /api/projects/:prjNo/group-relations/:relNo
Body: { rel_type?, rel_desc? }
```

### 삭제
```
DELETE /api/projects/:prjNo/group-relations/:relNo
```

---

## 31. 사건 참여 (Event Entries)

### 목록 조회
```
GET /api/projects/:prjNo/events/:eventNo/entries
```

### 상세 조회
```
GET /api/projects/:prjNo/events/:eventNo/entries/:entryNo
```

### 생성
```
POST /api/projects/:prjNo/events/:eventNo/entries
Body: { entry_type, entry_trgt_no, entry_side?, role_desc? }
```

### 수정
```
PUT /api/projects/:prjNo/events/:eventNo/entries/:entryNo
Body: { entry_side?, role_desc? }
```

### 삭제
```
DELETE /api/projects/:prjNo/events/:eventNo/entries/:entryNo
```

---

## 통합 검색 엔드포인트

## 32. 특성 통합 검색

### 전역 + 프로젝트 종속 특성 통합 검색
```
GET /api/projects/:prjNo/traits/search
Query: 
  - trait_type_list: GLOBAL,PROJECT (선택)
  - search_keyword: 검색 키워드
  - trait_lcls: 대분류
  - trait_mcls: 중분류
  - aply_trgt: 적용 대상
```

---

## 33. 스킬 통합 검색

### 전역 + 프로젝트 종속 스킬 통합 검색
```
GET /api/projects/:prjNo/skills/search
Query:
  - skill_type_list: GLOBAL,PROJECT (선택)
  - search_keyword: 검색 키워드
  - skill_type: 스킬 유형
  - skill_lcls: 스킬 계통
```

---

## 참고사항

1. **복합 키 처리**: 
   - `char_skill_maps`, `char_trait_maps`는 복합 키(`char_no`, `skill_no`/`trait_no`, `skill_type`/`trait_type`)를 사용하므로, 상세 조회/수정/삭제 시 쿼리 파라미터로 `skill_type` 또는 `trait_type`을 함께 전달해야 합니다.

2. **매핑 테이블의 PK**:
   - 대부분의 매핑 테이블은 `map_no`를 PK로 사용합니다.
   - `char_skill_maps`, `char_trait_maps`는 복합 키를 PK로 사용합니다.

3. **프로젝트 컨텍스트**:
   - 프로젝트 종속 엔티티와 매핑 테이블은 모두 `/api/projects/:prjNo/` 경로 하위에 위치합니다.
   - 전역 풀(`traits`, `skills`)만 프로젝트 컨텍스트 없이 접근 가능합니다.

4. **예제(Exes) 테이블**:
   - 예제 테이블은 프로젝트와 무관하므로 `/api/exes` 경로를 사용합니다.
   - PK가 `id`이므로 `:id`를 사용합니다.
