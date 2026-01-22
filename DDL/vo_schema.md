# VO (Value Object) Schema

이 문서는 `src/vos`의 모든 VO를 정리한 것입니다.
**DB 컬럼에 해당하는 필드는 제외**하고, **요청/응답에 필요한 필드만** 포함합니다.

## 공통 필드 (SearchVo)

모든 VO는 `SearchVo`를 상속받으며, 다음 공통 필드를 포함합니다:

### 응답 메타 데이터 (Response Meta)
- `total_cnt`: 총 건수
- `row_no`: 행 번호

### 요청 파라미터 (Request Params)
- `page_no`: 페이지 번호 (1부터 시작)
- `page_size`: 페이지당 항목 수
- `strt_row`: 시작 행 번호
- `end_row`: 종료 행 번호
- `search_type`: 검색 유형/조건
- `search_keyword`: 검색 키워드

---

## 1. ProjectVo (프로젝트)

**DB 컬럼이 아닌 필드:**
- `prj_no_list`: 프로젝트 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

## 2. FrameworkVo (세계관 구조)

**DB 컬럼이 아닌 필드:**
- `frm_no_list`: 구조 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

## 3. SkillVo (전역 스킬)

**DB 컬럼이 아닌 필드:**
- `skill_no_list`: 스킬 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

## 3-1. ProjectSkillVo (프로젝트 종속 스킬)

**DB 컬럼이 아닌 필드:**
- `skill_no_list`: 스킬 번호 리스트 (검색 필터용)
- `prj_no_list`: 프로젝트 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

## 4. TraitVo (전역 특성)

**DB 컬럼이 아닌 필드:**
- `trait_no_list`: 특성 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

## 4-1. ProjectTraitVo (프로젝트 종속 특성)

**DB 컬럼이 아닌 필드:**
- `trait_no_list`: 특성 번호 리스트 (검색 필터용)
- `prj_no_list`: 프로젝트 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

## 5. CreatureVo (생물/종족)

**DB 컬럼이 아닌 필드:**
- `creature_no_list`: 생물 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

## 6. CharacterVo (인물)

**DB 컬럼이 아닌 필드:**
- `char_no_list`: 인물 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

## 7. ItemVo (아이템)

**DB 컬럼이 아닌 필드:**
- `item_no_list`: 아이템 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

## 8. RegionVo (지역)

**DB 컬럼이 아닌 필드:**
- `region_no_list`: 지역 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

## 9. NationVo (국가)

**DB 컬럼이 아닌 필드:**
- `ntn_no_list`: 국가 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

## 10. OrganizationVo (조직)

**DB 컬럼이 아닌 필드:**
- `org_no_list`: 조직 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

## 11. EventVo (사건/역사)

**DB 컬럼이 아닌 필드:**
- `event_no_list`: 사건 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

## 12. LoreVo (전승/설화)

**DB 컬럼이 아닌 필드:**
- `lore_no_list`: 전승 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

## 13. ExVo (예제)

**DB 컬럼이 아닌 필드:**
- `created_at`: 생성 일시 (ISO 8601 형식: YYYY-MM-DDTHH:mm:ss.sssZ)
- `updated_at`: 수정 일시 (ISO 8601 형식: YYYY-MM-DDTHH:mm:ss.sssZ)
- `sort_by`: 정렬 기준 컬럼명 (목록 조회 시 사용)

**공통 필드:** SearchVo의 모든 필드

---

## 매핑 테이블 VO

### 14. CharSkillMapVo (인물-스킬 매핑)

**DB 컬럼이 아닌 필드:**
- `char_no_list`: 인물 번호 리스트 (검색 필터용)
- `skill_no_list`: 스킬 번호 리스트 (검색 필터용)
- `skill_type_list`: 스킬 타입 리스트 (GLOBAL, PROJECT) (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

### 15. CharTraitMapVo (인물-특성 매핑)

**DB 컬럼이 아닌 필드:**
- `char_no_list`: 인물 번호 리스트 (검색 필터용)
- `trait_no_list`: 특성 번호 리스트 (검색 필터용)
- `trait_type_list`: 특성 타입 리스트 (GLOBAL, PROJECT) (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

### 15-1. CreatureTraitMapVo (종족-특성 매핑)

**DB 컬럼이 아닌 필드:**
- `creature_no_list`: 종족 번호 리스트 (검색 필터용)
- `trait_no_list`: 특성 번호 리스트 (검색 필터용)
- `trait_type_list`: 특성 타입 리스트 (GLOBAL, PROJECT) (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

### 15-2. CreatureSkillMapVo (종족-스킬 매핑)

**DB 컬럼이 아닌 필드:**
- `creature_no_list`: 종족 번호 리스트 (검색 필터용)
- `skill_no_list`: 스킬 번호 리스트 (검색 필터용)
- `skill_type_list`: 스킬 타입 리스트 (GLOBAL, PROJECT) (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

### 16. CharItemMapVo (인물-아이템 매핑)

**DB 컬럼이 아닌 필드:**
- `own_no_list`: 소유 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

### 17. CharRelationVo (인물-관계)

**DB 컬럼이 아닌 필드:**
- `rel_no_list`: 관계 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

### 18. CharGroupRelationVo (인물-그룹 관계)

**DB 컬럼이 아닌 필드:**
- `rel_no_list`: 관계 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

### 19. ItemSkillMapVo (아이템-스킬 매핑)

**DB 컬럼이 아닌 필드:**
- `map_no_list`: 매핑 번호 리스트 (검색 필터용)
- `item_no_list`: 아이템 번호 리스트 (검색 필터용)
- `skill_no_list`: 스킬 번호 리스트 (검색 필터용)
- `skill_type_list`: 스킬 타입 리스트 (GLOBAL, PROJECT) (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

### 20. ItemTraitMapVo (아이템-특성 매핑)

**DB 컬럼이 아닌 필드:**
- `map_no_list`: 매핑 번호 리스트 (검색 필터용)
- `item_no_list`: 아이템 번호 리스트 (검색 필터용)
- `trait_no_list`: 특성 번호 리스트 (검색 필터용)
- `trait_type_list`: 특성 타입 리스트 (GLOBAL, PROJECT) (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

### 21. LoreCharMapVo (전승-인물 매핑)

**DB 컬럼이 아닌 필드:**
- `map_no_list`: 매핑 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

### 22. LoreItemMapVo (전승-아이템 매핑)

**DB 컬럼이 아닌 필드:**
- `map_no_list`: 매핑 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

### 23. NtnTraitMapVo (국가-특성 매핑)

**DB 컬럼이 아닌 필드:**
- `map_no_list`: 매핑 번호 리스트 (검색 필터용)
- `ntn_no_list`: 국가 번호 리스트 (검색 필터용)
- `trait_no_list`: 특성 번호 리스트 (검색 필터용)
- `trait_type_list`: 특성 타입 리스트 (GLOBAL, PROJECT) (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

### 24. OrgTraitMapVo (조직-특성 매핑)

**DB 컬럼이 아닌 필드:**
- `map_no_list`: 매핑 번호 리스트 (검색 필터용)
- `org_no_list`: 조직 번호 리스트 (검색 필터용)
- `trait_no_list`: 특성 번호 리스트 (검색 필터용)
- `trait_type_list`: 특성 타입 리스트 (GLOBAL, PROJECT) (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

### 25. RegionTraitMapVo (지역-특성 매핑)

**DB 컬럼이 아닌 필드:**
- `map_no_list`: 매핑 번호 리스트 (검색 필터용)
- `region_no_list`: 지역 번호 리스트 (검색 필터용)
- `trait_no_list`: 특성 번호 리스트 (검색 필터용)
- `trait_type_list`: 특성 타입 리스트 (GLOBAL, PROJECT) (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

### 26. GroupRelationVo (집단 관계)

**DB 컬럼이 아닌 필드:**
- `rel_no_list`: 관계 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

### 27. EventEntryVo (사건 참여)

**DB 컬럼이 아닌 필드:**
- `entry_no_list`: 참여 번호 리스트 (검색 필터용)

**공통 필드:** SearchVo의 모든 필드

---

## 요약

### 모든 VO에 공통으로 포함되는 필드 (SearchVo)

#### 응답 메타 데이터
- `total_cnt`: 총 건수
- `row_no`: 행 번호

#### 요청 파라미터
- `page_no`: 페이지 번호 (1부터 시작)
- `page_size`: 페이지당 항목 수
- `strt_row`: 시작 행 번호
- `end_row`: 종료 행 번호
- `search_type`: 검색 유형/조건
- `search_keyword`: 검색 키워드

### 각 VO별 추가 필드

#### 주요 엔티티 VO
- **ProjectVo**: `prj_no_list`
- **FrameworkVo**: `frm_no_list`
- **SkillVo** (전역 스킬): `skill_no_list`
- **ProjectSkillVo** (프로젝트 종속 스킬): `skill_no_list`, `prj_no_list`
- **TraitVo** (전역 특성): `trait_no_list`
- **ProjectTraitVo** (프로젝트 종속 특성): `trait_no_list`, `prj_no_list`
- **CreatureVo**: `creature_no_list`
- **CharacterVo**: `char_no_list`
- **ItemVo**: `item_no_list`
- **RegionVo**: `region_no_list`
- **NationVo**: `ntn_no_list`
- **OrganizationVo**: `org_no_list`
- **EventVo**: `event_no_list`
- **LoreVo**: `lore_no_list`
- **ExVo**: `created_at`, `updated_at`, `sort_by`

#### 매핑 테이블 VO
- **CharSkillMapVo**: `char_no_list`, `skill_no_list`, `skill_type_list`
- **CharTraitMapVo**: `char_no_list`, `trait_no_list`, `trait_type_list`
- **CreatureTraitMapVo**: `creature_no_list`, `trait_no_list`, `trait_type_list`
- **CreatureSkillMapVo**: `creature_no_list`, `skill_no_list`, `skill_type_list`
- **CharItemMapVo**: `own_no_list`
- **CharRelationVo**: `rel_no_list`
- **CharGroupRelationVo**: `rel_no_list`
- **ItemSkillMapVo**: `map_no_list`, `item_no_list`, `skill_no_list`, `skill_type_list`
- **ItemTraitMapVo**: `map_no_list`, `item_no_list`, `trait_no_list`, `trait_type_list`
- **LoreCharMapVo**: `map_no_list`
- **LoreItemMapVo**: `map_no_list`
- **NtnTraitMapVo**: `map_no_list`, `ntn_no_list`, `trait_no_list`, `trait_type_list`
- **OrgTraitMapVo**: `map_no_list`, `org_no_list`, `trait_no_list`, `trait_type_list`
- **RegionTraitMapVo**: `map_no_list`, `region_no_list`, `trait_no_list`, `trait_type_list`
- **GroupRelationVo**: `rel_no_list`
- **EventEntryVo**: `entry_no_list`

---

## 참고사항

1. **DB 컬럼 제외**: 모든 VO는 DB 모델의 필드를 포함하지만, 이 문서에서는 DB 컬럼이 아닌 요청/응답 전용 필드만 정리했습니다.

2. **SearchVo 상속**: 모든 VO는 `SearchVo`를 상속받아 검색 및 페이징 관련 필드를 공통으로 사용합니다.

3. **PK List 필드**: 각 VO는 해당 테이블의 PK 번호 리스트를 필터링하기 위한 필드를 포함합니다.

4. **ExVo 특수 필드**: `ExVo`는 추가로 `created_at`, `updated_at`, `sort_by` 필드를 포함합니다.

5. **CommonVo**: 모든 VO는 `CommonVo`를 통해 공통 필드(use_yn, del_yn, crt_no, crt_dt, updt_no, updt_dt, del_no, del_dt)를 상속받지만, 이는 DB 컬럼이므로 이 문서에서는 제외했습니다.

6. **전역 풀 vs 프로젝트 종속**:
   - **전역 풀**: `SkillVo`, `TraitVo`는 모든 프로젝트가 공유하는 전역 스킬/특성입니다.
   - **프로젝트 종속**: `ProjectSkillVo`, `ProjectTraitVo`는 특정 프로젝트에 종속된 스킬/특성입니다.
   - 매핑 테이블 VO들은 `skill_type_list`, `trait_type_list` 필드를 통해 전역(GLOBAL) 또는 프로젝트 종속(PROJECT)을 구분할 수 있습니다.

7. **매핑 테이블 타입 필드**: 특성/스킬 매핑 테이블 VO들은 `trait_type_list`, `skill_type_list` 필드를 포함하여 전역 풀과 프로젝트 종속 풀을 모두 참조할 수 있도록 설계되었습니다.
