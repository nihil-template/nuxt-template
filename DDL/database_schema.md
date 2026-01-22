# Database Schema DDL

이 문서는 `src/models`의 모든 모델을 SQL DDL로 변환한 것입니다.

## 공통 필드

모든 테이블에는 다음 공통 필드가 포함됩니다:

- `use_yn`: 사용 여부 (Y/N), 기본값 'Y'
- `del_yn`: 삭제 여부 (Y/N), 기본값 'N'
- `crt_no`: 생성자 번호
- `crt_dt`: 생성 일시, 기본값 CURRENT_TIMESTAMP
- `updt_no`: 수정자 번호
- `updt_dt`: 수정 일시, 기본값 CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP
- `del_no`: 삭제자 번호
- `del_dt`: 삭제 일시

---

## 1. projects (프로젝트)

```sql
CREATE TABLE projects (
    prj_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 프로젝트 번호
    prj_nm VARCHAR(255) NOT NULL, -- 프로젝트 명
    genre_type VARCHAR(255), -- 장르
    prj_desc TEXT, -- 프로젝트 개요
    cvr_img_url VARCHAR(255), -- 대표 이미지 URL
    prj_expln VARCHAR(255), -- 프로젝트 설명
    prj_ver VARCHAR(255), -- 프로젝트 버전
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_prj_nm (prj_nm)
);
```

---

## 2. frameworks (세계관 구조)

```sql
CREATE TABLE frameworks (
    frm_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 구조 번호
    prj_no INTEGER NOT NULL, -- 프로젝트 번호
    frm_nm VARCHAR(255) NOT NULL, -- 구조 명
    def_desc TEXT, -- 본질적 정의
    aply_scope TEXT, -- 적용 범위
    strc_elem TEXT, -- 구조적 요소
    mech_desc TEXT, -- 작동 원리
    narr_aply TEXT, -- 서사적 적용
    keywords VARCHAR(255), -- 핵심 키워드
    link_docs TEXT, -- 연관 설정(문서)
    rmk TEXT, -- 비고
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_prj_no (prj_no),
    FOREIGN KEY (prj_no) REFERENCES projects(prj_no)
);
```

---

## 3. skills (전역 스킬)

```sql
CREATE TABLE skills (
    skill_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 스킬 번호
    skill_nm VARCHAR(255) NOT NULL, -- 스킬 명
    skill_type VARCHAR(255) NOT NULL, -- 스킬 유형
    skill_lcls VARCHAR(255) NOT NULL, -- 스킬 계통
    skill_expln TEXT, -- 스킬 설명
    trgt_type VARCHAR(255), -- 대상 유형
    dmg_type VARCHAR(255), -- 피해 유형
    stat_eff_type VARCHAR(255), -- 상태 이상 유형
    use_cost VARCHAR(255), -- 소모 비용
    cool_time VARCHAR(255), -- 재사용 대기시간
    cast_time VARCHAR(255), -- 시전 시간
    use_cnd TEXT, -- 사용 조건
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_skill_nm (skill_nm)
);
```

---

## 3-1. project_skills (프로젝트 종속 스킬)

```sql
CREATE TABLE project_skills (
    skill_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 스킬 번호
    prj_no INTEGER NOT NULL, -- 프로젝트 번호
    skill_nm VARCHAR(255) NOT NULL, -- 스킬 명
    skill_type VARCHAR(255) NOT NULL, -- 스킬 유형
    skill_lcls VARCHAR(255) NOT NULL, -- 스킬 계통
    skill_expln TEXT, -- 스킬 설명
    trgt_type VARCHAR(255), -- 대상 유형
    dmg_type VARCHAR(255), -- 피해 유형
    stat_eff_type VARCHAR(255), -- 상태 이상 유형
    use_cost VARCHAR(255), -- 소모 비용
    cool_time VARCHAR(255), -- 재사용 대기시간
    cast_time VARCHAR(255), -- 시전 시간
    use_cnd TEXT, -- 사용 조건
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_prj_no (prj_no),
    INDEX idx_skill_nm (skill_nm),
    FOREIGN KEY (prj_no) REFERENCES projects(prj_no)
);
```

---

## 4. traits (전역 특성)

```sql
CREATE TABLE traits (
    trait_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 특성 번호
    trait_nm VARCHAR(255) NOT NULL, -- 특성 명
    trait_expln TEXT, -- 특성 설명
    trait_lcls VARCHAR(255) NOT NULL, -- 특성 대분류
    trait_mcls VARCHAR(255) NOT NULL, -- 특성 중분류
    aply_trgt VARCHAR(255) NOT NULL, -- 적용 대상 (CHAR, CREATURE, ITEM, NATION, ORG, REGION 등)
    cnfl_trait_no INTEGER, -- 상충 특성 번호 (전역 특성만 참조)
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_trait_nm (trait_nm),
    INDEX idx_cnfl_trait_no (cnfl_trait_no),
    FOREIGN KEY (cnfl_trait_no) REFERENCES traits(trait_no)
);
```

---

## 4-1. project_traits (프로젝트 종속 특성)

```sql
CREATE TABLE project_traits (
    trait_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 특성 번호
    prj_no INTEGER NOT NULL, -- 프로젝트 번호
    trait_nm VARCHAR(255) NOT NULL, -- 특성 명
    trait_expln TEXT, -- 특성 설명
    trait_lcls VARCHAR(255) NOT NULL, -- 특성 대분류
    trait_mcls VARCHAR(255) NOT NULL, -- 특성 중분류
    aply_trgt VARCHAR(255) NOT NULL, -- 적용 대상
    cnfl_trait_no INTEGER, -- 상충 특성 번호 (전역 또는 동일 프로젝트 특성 참조)
    cnfl_trait_type VARCHAR(255), -- 상충 특성 타입 (GLOBAL: 전역 특성, PROJECT: 프로젝트 종속 특성)
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_prj_no (prj_no),
    INDEX idx_trait_nm (trait_nm),
    INDEX idx_cnfl_trait_no (cnfl_trait_no),
    FOREIGN KEY (prj_no) REFERENCES projects(prj_no)
);
```

---

## 4-1. project_traits (프로젝트 종속 특성)

```sql
CREATE TABLE project_traits (
    trait_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 특성 번호
    prj_no INTEGER NOT NULL, -- 프로젝트 번호
    trait_nm VARCHAR(255) NOT NULL, -- 특성 명
    trait_expln TEXT, -- 특성 설명
    trait_lcls VARCHAR(255) NOT NULL, -- 특성 대분류
    trait_mcls VARCHAR(255) NOT NULL, -- 특성 중분류
    aply_trgt VARCHAR(255) NOT NULL, -- 적용 대상 (CHAR, CREATURE, ITEM, NATION, ORG, REGION 등)
    cnfl_trait_no INTEGER, -- 상충 특성 번호 (전역 또는 동일 프로젝트 특성 참조)
    cnfl_trait_type VARCHAR(255), -- 상충 특성 타입 (GLOBAL: 전역, PROJECT: 프로젝트 종속)
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_prj_no (prj_no),
    INDEX idx_trait_nm (trait_nm),
    INDEX idx_cnfl_trait_no (cnfl_trait_no),
    FOREIGN KEY (prj_no) REFERENCES projects(prj_no)
);
```

---

## 5. creatures (생물/종족)

```sql
CREATE TABLE creatures (
    creature_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 생물 번호
    prj_no INTEGER NOT NULL, -- 프로젝트 번호
    creature_nm VARCHAR(255) NOT NULL, -- 생물 명
    creature_type VARCHAR(255) NOT NULL, -- 생물 유형
    danger_grd VARCHAR(255), -- 위험도 등급
    ident_stat VARCHAR(255) NOT NULL, -- 식별 상태
    creature_expln TEXT, -- 생물 개요
    bio_char TEXT, -- 생물학적 특징 (확인 정보)
    lifespan_growth TEXT, -- 수명 및 성장
    body_feat TEXT, -- 신체적 특징
    sense_diet TEXT, -- 감각 및 식생
    reprod_info TEXT, -- 번식
    eco_habit TEXT, -- 생태 및 습성 (확인 정보)
    habitat_env TEXT, -- 거주 환경
    lang_name TEXT, -- 언어 및 작명
    life_style TEXT, -- 생활 양식
    faith_taboo TEXT, -- 신앙 및 금기
    soc_struct TEXT, -- 사회 구조
    psych_tend TEXT, -- 심리적 경향
    abil_weak TEXT, -- 주요 능력 및 약점 (확인 정보)
    civ_tech_lvl TEXT, -- 문명/기술 수준
    spec_trait TEXT, -- 고유 특성
    weakness TEXT, -- 약점
    est_eco TEXT, -- 추정 생태 (미확인 정보)
    rumor_lore TEXT, -- 소문 및 전승 (미확인 정보)
    poten_thrt TEXT, -- 잠재 위협 (미확인 정보)
    intel_lvl VARCHAR(255), -- 지성 수준
    drop_rsrc TEXT, -- 획득 가능 자원
    hostile_rel VARCHAR(255), -- 적대적 관계
    hist_desc TEXT, -- 주요 역사
    rmk TEXT, -- 비고
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_prj_no (prj_no),
    INDEX idx_creature_nm (creature_nm),
    FOREIGN KEY (prj_no) REFERENCES projects(prj_no)
);
```

---

## 6. characters (인물)

```sql
CREATE TABLE characters (
    char_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 인물 번호
    prj_no INTEGER NOT NULL, -- 프로젝트 번호
    char_nm VARCHAR(255) NOT NULL, -- 인물 명
    alias_nm VARCHAR(255), -- 이명 및 별명
    role_type VARCHAR(255) NOT NULL, -- 역할 유형
    logline TEXT, -- 한 줄 정의
    narr_func VARCHAR(255), -- 서사적 기능
    race_no INTEGER, -- 종족 번호
    ntn_no INTEGER, -- 국가 번호
    org_no INTEGER, -- 조직 번호
    org_rank VARCHAR(255), -- 조직 내 직위
    origin_desc TEXT, -- 출신 배경
    join_rsn TEXT, -- 소속 이유
    org_rel_stat VARCHAR(255), -- 조직 관계 상태
    real_age VARCHAR(255), -- 실제 나이
    app_age VARCHAR(255), -- 외관 나이
    gender VARCHAR(255), -- 성별
    sex_orient VARCHAR(255), -- 성적 지향
    sex_pref TEXT, -- 성적 기호
    height_val VARCHAR(255), -- 신장
    weight_val VARCHAR(255), -- 체중
    body_desc TEXT, -- 체형 묘사
    health_stat TEXT, -- 건강 상태
    dsbl_desc TEXT, -- 장애 및 제약
    visual_pnt TEXT, -- 기억 포인트
    fst_impr TEXT, -- 첫인상
    mslw_lv1_phys TEXT, -- 매슬로 1단계 생리적 욕구
    mslw_lv2_safe TEXT, -- 매슬로 2단계 안전의 욕구
    mslw_lv3_soc TEXT, -- 매슬로 3단계 소속 및 애정
    mslw_lv4_estm TEXT, -- 매슬로 4단계 존경의 욕구
    mslw_lv5_self TEXT, -- 매슬로 5단계 자아실현
    like_list TEXT, -- 좋아하는 것
    hate_list TEXT, -- 싫어하는 것
    align_ord VARCHAR(255), -- 성향 질서-혼돈
    align_moral VARCHAR(255), -- 성향 선-악
    core_val VARCHAR(255), -- 핵심 가치관
    val_cnfl TEXT, -- 가치 충돌
    world_view TEXT, -- 세계관 관점
    pers_pos TEXT, -- 긍정적 특성
    pers_neg TEXT, -- 부정적 특성
    main_emot VARCHAR(255), -- 대표 정서
    tone_type VARCHAR(255), -- 기본 어조
    soc_mthd TEXT, -- 사회적 화법
    habit_desc TEXT, -- 말버릇 및 습관
    sign_line TEXT, -- 대표 대사
    emot_expr_json TEXT, -- 감정 표현 상세
    core_desire TEXT, -- 핵심 욕망
    core_dfcn TEXT, -- 핵심 결핍
    core_taboo TEXT, -- 절대 금기
    goal_short TEXT, -- 단기 목표
    obstacle TEXT, -- 주요 방해물
    exp_cost TEXT, -- 예상 대가
    rule_abandon TEXT, -- 판단 규칙 버림
    rule_keep TEXT, -- 판단 규칙 지킴
    moral_accept TEXT, -- 용납 가능한 악
    moral_reject TEXT, -- 용납 불가한 악
    cnfl_trgr TEXT, -- 갈등 트리거
    emot_accum TEXT, -- 감정 누적 신호
    expl_type VARCHAR(255), -- 폭발 형태
    self_perc TEXT, -- 자기 인식
    ext_perc TEXT, -- 타인 인식
    secret_json TEXT, -- 비밀 정보
    trma_core VARCHAR(255), -- 핵심 상처
    trma_evnt TEXT, -- 관련 사건
    false_blf TEXT, -- 왜곡된 신념
    main_fear TEXT, -- 주요 두려움
    trma_trgr TEXT, -- 재발 트리거
    cmbt_styl TEXT, -- 전투 스타일
    cmbt_str TEXT, -- 전투 강점
    cmbt_weak TEXT, -- 전투 약점
    abil_cost TEXT, -- 능력의 대가
    arc_start TEXT, -- 변화 시작점
    arc_end TEXT, -- 변화 도착점
    rmk TEXT, -- 비고
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_prj_no (prj_no),
    INDEX idx_char_nm (char_nm),
    INDEX idx_race_no (race_no),
    INDEX idx_ntn_no (ntn_no),
    INDEX idx_org_no (org_no),
    FOREIGN KEY (prj_no) REFERENCES projects(prj_no),
    FOREIGN KEY (race_no) REFERENCES creatures(creature_no),
    FOREIGN KEY (ntn_no) REFERENCES nations(ntn_no),
    FOREIGN KEY (org_no) REFERENCES organizations(org_no)
);
```

---

## 7. items (아이템)

```sql
CREATE TABLE items (
    item_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 아이템 번호
    prj_no INTEGER NOT NULL, -- 프로젝트 번호
    item_nm VARCHAR(255) NOT NULL, -- 아이템 명
    cls_main VARCHAR(255) NOT NULL, -- 대분류
    cls_sub VARCHAR(255), -- 소분류
    item_grd VARCHAR(255), -- 등급
    logline VARCHAR(255), -- 한 줄 정의
    app_desc TEXT, -- 외형 묘사
    visual_feat TEXT, -- 시각적 특징
    attr_type VARCHAR(255), -- 속성
    dmg_type VARCHAR(255), -- 피해 유형
    main_func TEXT, -- 주요 기능
    sub_eff TEXT, -- 부가 효과
    spec_abil TEXT, -- 특수 능력
    ego_type VARCHAR(255), -- 자아(Ego) 유형
    ego_desc TEXT, -- 자아 성격
    use_cond TEXT, -- 사용 조건
    use_mthd TEXT, -- 사용 방법
    trns_cond TEXT, -- 인계 조건
    strg_mthd TEXT, -- 보관 방법
    use_lmt TEXT, -- 사용 제약
    use_cost TEXT, -- 대가(리스크)
    side_eff TEXT, -- 부작용
    durability_desc TEXT, -- 파손 가능성
    hist_past TEXT, -- 관련 사건(과거)
    curr_stat TEXT, -- 현재 상태
    rmk TEXT, -- 비고
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_prj_no (prj_no),
    INDEX idx_item_nm (item_nm),
    FOREIGN KEY (prj_no) REFERENCES projects(prj_no)
);
```

---

## 8. regions (지역)

```sql
CREATE TABLE regions (
    region_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 지역 번호
    prj_no INTEGER NOT NULL, -- 프로젝트 번호
    up_region_no INTEGER, -- 상위 지역 번호
    region_nm VARCHAR(255) NOT NULL, -- 지역 명
    region_type VARCHAR(255), -- 지역 유형
    explor_stat VARCHAR(255), -- 탐사 상태
    region_expln TEXT, -- 지역 설명
    loc_desc TEXT, -- 위치 묘사
    climate_env VARCHAR(255), -- 기후 및 환경
    terrain_feat TEXT, -- 지형 특징
    env_spec TEXT, -- 특수 환경
    func_feat TEXT, -- 기능적 특징
    danger_lvl VARCHAR(255), -- 위험도 등급
    danger_fctr TEXT, -- 위험 요소
    inhabit_info TEXT, -- 서식 생물 (확인됨)
    unknown_entity TEXT, -- 미지의 존재
    main_fclty TEXT, -- 주요 시설
    rsrc_list TEXT, -- 자원 목록
    ntn_no INTEGER, -- 소속 국가 번호
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_prj_no (prj_no),
    INDEX idx_region_nm (region_nm),
    INDEX idx_up_region_no (up_region_no),
    INDEX idx_ntn_no (ntn_no),
    FOREIGN KEY (prj_no) REFERENCES projects(prj_no),
    FOREIGN KEY (up_region_no) REFERENCES regions(region_no),
    FOREIGN KEY (ntn_no) REFERENCES nations(ntn_no)
);
```

---

## 9. nations (국가)

```sql
CREATE TABLE nations (
    ntn_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 국가 번호
    prj_no INTEGER NOT NULL, -- 프로젝트 번호
    ntn_nm VARCHAR(255) NOT NULL, -- 국가 명
    ntn_type VARCHAR(255), -- 국가 유형
    logline VARCHAR(255), -- 한 줄 정의
    capital_nm VARCHAR(255), -- 수도 명
    ruler_txt VARCHAR(255), -- 통치자 정보
    pol_sys VARCHAR(255), -- 정치 체제
    admin_law TEXT, -- 행정 및 법률 체계
    state_rlgn VARCHAR(255), -- 국교
    rlgn_desc TEXT, -- 종교 현황
    nat_idlg TEXT, -- 국가 이념
    main_plcy TEXT, -- 주요 정책
    taboo_act TEXT, -- 금기 사항
    dipl_plcy TEXT, -- 외교 정책
    intr_cnfl TEXT, -- 내부 갈등
    hidden_fact TEXT, -- 숨겨진 비밀
    econ_struct TEXT, -- 경제 구조
    soc_cltr TEXT, -- 사회 및 문화 특징
    mil_pwr TEXT, -- 군사력
    hist_desc TEXT, -- 주요 역사
    curr_issue TEXT, -- 현재 현안
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_prj_no (prj_no),
    INDEX idx_ntn_nm (ntn_nm),
    FOREIGN KEY (prj_no) REFERENCES projects(prj_no)
);
```

---

## 10. organizations (조직)

```sql
CREATE TABLE organizations (
    org_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 조직 번호
    prj_no INTEGER NOT NULL, -- 프로젝트 번호
    org_nm VARCHAR(255) NOT NULL, -- 조직 명
    org_type VARCHAR(255), -- 조직 유형
    logline VARCHAR(255), -- 한 줄 정의
    org_theme VARCHAR(255), -- 핵심 테마
    purp_pub VARCHAR(255), -- 명시적 목적
    purp_hid VARCHAR(255), -- 숨겨진 목적
    fnd_bg TEXT, -- 설립 배경
    org_strc TEXT, -- 조직 구조
    org_scale VARCHAR(255), -- 인원 규모
    join_cond TEXT, -- 가입 조건
    exit_rule TEXT, -- 탈퇴 및 배신 규율
    main_act TEXT, -- 주요 활동
    act_area TEXT, -- 활동 지역
    act_mthd TEXT, -- 활동 방식
    fund_src TEXT, -- 자금원
    key_fig TEXT, -- 주요 인물 정보
    hist_desc TEXT, -- 주요 역사
    curr_stat TEXT, -- 현재 상태
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_prj_no (prj_no),
    INDEX idx_org_nm (org_nm),
    FOREIGN KEY (prj_no) REFERENCES projects(prj_no)
);
```

---

## 11. events (사건/역사)

```sql
CREATE TABLE events (
    event_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 사건 번호
    prj_no INTEGER NOT NULL, -- 프로젝트 번호
    event_nm VARCHAR(255) NOT NULL, -- 사건 명
    occur_time VARCHAR(255), -- 발생 시기
    occur_loc VARCHAR(255), -- 발생 장소
    smry TEXT, -- 사건 요약
    cause_pub TEXT, -- 표면적 원인
    cause_real TEXT, -- 실제 원인
    side_a_char TEXT, -- Side A: 주요 인물
    side_a_org TEXT, -- Side A: 관련 조직
    side_a_ntn TEXT, -- Side A: 관련 국가
    side_b_char TEXT, -- Side B: 주요 인물
    side_b_org TEXT, -- Side B: 관련 조직
    side_b_ntn TEXT, -- Side B: 관련 국가
    side_c_char TEXT, -- Side C: 제3세력/중재
    side_c_org TEXT, -- Side C: 관련 조직
    side_c_ntn TEXT, -- Side C: 관련 국가
    flow_trgr TEXT, -- 발단(Trigger)
    flow_crisis TEXT, -- 전개(Crisis)
    flow_climax TEXT, -- 절정(Climax)
    flow_concl TEXT, -- 결말(Conclusion)
    dmg_rslt TEXT, -- 직접적 피해
    soc_chng TEXT, -- 사회적 변화
    curr_conn TEXT, -- 현재 영향
    rec_official TEXT, -- 공식 기록
    truth_hid TEXT, -- 숨겨진 진실
    rmk TEXT, -- 비고
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_prj_no (prj_no),
    INDEX idx_event_nm (event_nm),
    FOREIGN KEY (prj_no) REFERENCES projects(prj_no)
);
```

---

## 12. lores (전승/설화)

```sql
CREATE TABLE lores (
    lore_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 전승 번호
    prj_no INTEGER NOT NULL, -- 프로젝트 번호
    lore_nm VARCHAR(255) NOT NULL, -- 전승 명
    lore_type VARCHAR(255), -- 전승 유형
    main_subj VARCHAR(255), -- 주요 소재
    smry TEXT, -- 요약
    trans_mthd VARCHAR(255), -- 전승 방식
    pub_perc TEXT, -- 대중의 인식
    lore_plot TEXT, -- 전승 줄거리
    real_fact TEXT, -- 실제 사실
    dist_rsn TEXT, -- 왜곡된 이유
    diff_desc TEXT, -- 차이점
    cltr_impact TEXT, -- 문화적 영향
    plot_conn TEXT, -- 플롯 연결
    rmk TEXT, -- 비고
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_prj_no (prj_no),
    INDEX idx_lore_nm (lore_nm),
    FOREIGN KEY (prj_no) REFERENCES projects(prj_no)
);
```

---

## 13. exes (예제)

```sql
CREATE TABLE exes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT, -- Ex 고유 식별자 (ID)
    name VARCHAR(255) NOT NULL, -- Ex 이름
    description VARCHAR(255), -- Ex 설명
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_name (name)
);
```

---

## 매핑 테이블 (Mapping Tables)

### 14. char_skill_maps (인물-스킬 매핑)

```sql
CREATE TABLE char_skill_maps (
    char_no INTEGER NOT NULL, -- 인물 번호
    skill_no INTEGER NOT NULL, -- 스킬 번호
    skill_type VARCHAR(255) NOT NULL, -- 스킬 타입 (GLOBAL: 전역 스킬, PROJECT: 프로젝트 종속 스킬)
    prof_lvl VARCHAR(255), -- 숙련도 또는 레벨
    skill_rmk VARCHAR(255), -- 스킬 비고
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    PRIMARY KEY (char_no, skill_no, skill_type),
    INDEX idx_char_no (char_no),
    INDEX idx_skill_no (skill_no),
    INDEX idx_skill_type (skill_type),
    FOREIGN KEY (char_no) REFERENCES characters(char_no)
);
```

---

### 15. char_trait_maps (인물-특성 매핑)

```sql
CREATE TABLE char_trait_maps (
    char_no INTEGER NOT NULL, -- 인물 번호
    trait_no INTEGER NOT NULL, -- 특성 번호
    trait_type VARCHAR(255) NOT NULL, -- 특성 타입 (GLOBAL: 전역 특성, PROJECT: 프로젝트 종속 특성)
    trait_rmk VARCHAR(255), -- 특성 비고
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    PRIMARY KEY (char_no, trait_no, trait_type),
    INDEX idx_char_no (char_no),
    INDEX idx_trait_no (trait_no),
    INDEX idx_trait_type (trait_type),
    FOREIGN KEY (char_no) REFERENCES characters(char_no)
);
```

---

### 16. char_item_maps (인물-아이템 매핑)

```sql
CREATE TABLE char_item_maps (
    own_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 소유 번호
    char_no INTEGER NOT NULL, -- 인물 번호
    item_no INTEGER NOT NULL, -- 아이템 번호
    item_cnt INTEGER DEFAULT 1, -- 수량
    equip_yn VARCHAR(1) DEFAULT 'N', -- 착용 여부
    rmk VARCHAR(255), -- 비고
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_char_no (char_no),
    INDEX idx_item_no (item_no),
    FOREIGN KEY (char_no) REFERENCES characters(char_no),
    FOREIGN KEY (item_no) REFERENCES items(item_no)
);
```

---

### 17. char_relations (인물-관계)

```sql
CREATE TABLE char_relations (
    rel_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 관계 번호
    src_char_no INTEGER NOT NULL, -- 주체 인물 번호
    trgt_char_no INTEGER NOT NULL, -- 대상 인물 번호
    rel_type VARCHAR(255) NOT NULL, -- 관계 유형
    rel_desc TEXT, -- 관계 설명
    intimacy_lvl INTEGER, -- 친밀도
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_src_char_no (src_char_no),
    INDEX idx_trgt_char_no (trgt_char_no),
    FOREIGN KEY (src_char_no) REFERENCES characters(char_no),
    FOREIGN KEY (trgt_char_no) REFERENCES characters(char_no)
);
```

---

### 18. char_group_relations (인물-그룹 관계)

```sql
CREATE TABLE char_group_relations (
    rel_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 관계 번호
    char_no INTEGER NOT NULL, -- 인물 번호
    trgt_ref_type VARCHAR(255) NOT NULL, -- 대상 유형 (ORG/NTN)
    trgt_ref_no INTEGER NOT NULL, -- 대상 식별자
    rel_type VARCHAR(255) NOT NULL, -- 관계 유형 (소속/적대/우호 등)
    rel_desc TEXT, -- 관계 상세 내용
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_char_no (char_no),
    INDEX idx_trgt_ref_no (trgt_ref_no),
    FOREIGN KEY (char_no) REFERENCES characters(char_no)
);
```

---

### 19. item_skill_maps (아이템-스킬 매핑)

```sql
CREATE TABLE item_skill_maps (
    map_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 매핑 번호
    item_no INTEGER NOT NULL, -- 아이템 번호
    skill_no INTEGER NOT NULL, -- 스킬 번호
    skill_type VARCHAR(255) NOT NULL DEFAULT 'GLOBAL', -- 스킬 타입 (GLOBAL: 전역, PROJECT: 프로젝트 종속)
    prof_lvl VARCHAR(255), -- 숙련도/레벨 (아이템의 경우 위력이나 등급 등)
    skill_rmk TEXT, -- 스킬 비고(아이템 특화 설명)
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_item_no (item_no),
    INDEX idx_skill_no (skill_no),
    INDEX idx_skill_type (skill_type),
    FOREIGN KEY (item_no) REFERENCES items(item_no)
);
```

---

### 20. item_trait_maps (아이템-특성 매핑)

```sql
CREATE TABLE item_trait_maps (
    map_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 매핑 번호
    item_no INTEGER NOT NULL, -- 아이템 번호
    trait_no INTEGER NOT NULL, -- 특성 번호
    trait_type VARCHAR(255) NOT NULL, -- 특성 타입 (GLOBAL: 전역 특성, PROJECT: 프로젝트 종속 특성)
    trait_rmk TEXT, -- 특성 비고(아이템 특화 설명)
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_item_no (item_no),
    INDEX idx_trait_no (trait_no),
    INDEX idx_trait_type (trait_type),
    FOREIGN KEY (item_no) REFERENCES items(item_no)
);
```

---

### 21. lore_char_maps (전승-인물 매핑)

```sql
CREATE TABLE lore_char_maps (
    map_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 매핑 번호
    lore_no INTEGER NOT NULL, -- 전승 번호
    char_no INTEGER NOT NULL, -- 인물 번호
    role_desc TEXT, -- 역할
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_lore_no (lore_no),
    INDEX idx_char_no (char_no),
    FOREIGN KEY (lore_no) REFERENCES lores(lore_no),
    FOREIGN KEY (char_no) REFERENCES characters(char_no)
);
```

---

### 22. lore_item_maps (전승-아이템 매핑)

```sql
CREATE TABLE lore_item_maps (
    map_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 매핑 번호
    lore_no INTEGER NOT NULL, -- 전승 번호
    item_no INTEGER NOT NULL, -- 아이템 번호
    role_desc TEXT, -- 역할
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_lore_no (lore_no),
    INDEX idx_item_no (item_no),
    FOREIGN KEY (lore_no) REFERENCES lores(lore_no),
    FOREIGN KEY (item_no) REFERENCES items(item_no)
);
```

---

### 23. ntn_trait_maps (국가-특성 매핑)

```sql
CREATE TABLE ntn_trait_maps (
    map_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 매핑 번호
    ntn_no INTEGER NOT NULL, -- 국가 번호
    trait_no INTEGER NOT NULL, -- 특성 번호
    trait_type VARCHAR(255) NOT NULL, -- 특성 타입 (GLOBAL: 전역 특성, PROJECT: 프로젝트 종속 특성)
    trait_rmk TEXT, -- 특성 비고(국가 특화 설명)
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_ntn_no (ntn_no),
    INDEX idx_trait_no (trait_no),
    INDEX idx_trait_type (trait_type),
    FOREIGN KEY (ntn_no) REFERENCES nations(ntn_no)
);
```

---

### 24. org_trait_maps (조직-특성 매핑)

```sql
CREATE TABLE org_trait_maps (
    map_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 매핑 번호
    org_no INTEGER NOT NULL, -- 조직 번호
    trait_no INTEGER NOT NULL, -- 특성 번호
    trait_type VARCHAR(255) NOT NULL, -- 특성 타입 (GLOBAL: 전역 특성, PROJECT: 프로젝트 종속 특성)
    trait_rmk TEXT, -- 특성 비고(조직 특화 설명)
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_org_no (org_no),
    INDEX idx_trait_no (trait_no),
    INDEX idx_trait_type (trait_type),
    FOREIGN KEY (org_no) REFERENCES organizations(org_no)
);
```

---

### 25. region_trait_maps (지역-특성 매핑)

```sql
CREATE TABLE region_trait_maps (
    map_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 매핑 번호
    region_no INTEGER NOT NULL, -- 지역 번호
    trait_no INTEGER NOT NULL, -- 특성 번호
    trait_type VARCHAR(255) NOT NULL, -- 특성 타입 (GLOBAL: 전역 특성, PROJECT: 프로젝트 종속 특성)
    trait_rmk TEXT, -- 특성 비고(지역 특화 설명)
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_region_no (region_no),
    INDEX idx_trait_no (trait_no),
    INDEX idx_trait_type (trait_type),
    FOREIGN KEY (region_no) REFERENCES regions(region_no)
);
```

---

### 26. group_relations (집단 관계)

```sql
CREATE TABLE group_relations (
    rel_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 관계 번호
    prj_no INTEGER NOT NULL, -- 프로젝트 번호
    src_type VARCHAR(255) NOT NULL, -- 주체 유형 (NTN: 국가, ORG: 조직)
    src_no INTEGER NOT NULL, -- 주체 번호
    trgt_type VARCHAR(255) NOT NULL, -- 대상 유형 (NTN: 국가, ORG: 조직)
    trgt_no INTEGER NOT NULL, -- 대상 번호
    rel_type VARCHAR(255) NOT NULL, -- 관계 유형 (전쟁, 동맹 등)
    rel_desc TEXT, -- 상세 설명
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_prj_no (prj_no),
    INDEX idx_src_no (src_no),
    INDEX idx_trgt_no (trgt_no),
    FOREIGN KEY (prj_no) REFERENCES projects(prj_no)
);
```

---

### 27. event_entries (사건 참여)

```sql
CREATE TABLE event_entries (
    entry_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 참여 번호
    event_no INTEGER NOT NULL, -- 사건 번호
    entry_type VARCHAR(255) NOT NULL, -- 참여 대상 유형
    entry_trgt_no INTEGER NOT NULL, -- 참여 대상 번호
    entry_side VARCHAR(255), -- 참여 진영 (Side A/B/C 등)
    role_desc TEXT, -- 역할 및 비중
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_event_no (event_no),
    INDEX idx_entry_trgt_no (entry_trgt_no),
    FOREIGN KEY (event_no) REFERENCES events(event_no)
);
```

---

### 28. creature_trait_maps (종족-특성 매핑)

```sql
CREATE TABLE creature_trait_maps (
    map_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 매핑 번호
    creature_no INTEGER NOT NULL, -- 종족 번호
    trait_no INTEGER NOT NULL, -- 특성 번호
    trait_type VARCHAR(255) NOT NULL, -- 특성 타입 (GLOBAL: 전역 특성, PROJECT: 프로젝트 종속 특성)
    trait_rmk TEXT, -- 특성 비고(종족 특화 설명)
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_creature_no (creature_no),
    INDEX idx_trait_no (trait_no),
    INDEX idx_trait_type (trait_type),
    FOREIGN KEY (creature_no) REFERENCES creatures(creature_no)
);
```

---

### 29. creature_skill_maps (종족-스킬 매핑)

```sql
CREATE TABLE creature_skill_maps (
    map_no INTEGER PRIMARY KEY AUTO_INCREMENT, -- 매핑 번호
    creature_no INTEGER NOT NULL, -- 종족 번호
    skill_no INTEGER NOT NULL, -- 스킬 번호
    skill_type VARCHAR(255) NOT NULL, -- 스킬 타입 (GLOBAL: 전역 스킬, PROJECT: 프로젝트 종속 스킬)
    prof_lvl VARCHAR(255), -- 기본 숙련도/레벨 (종족 고유 스킬의 경우)
    skill_rmk TEXT, -- 스킬 비고(종족 특화 설명)
    use_yn VARCHAR(1) DEFAULT 'Y',
    del_yn VARCHAR(1) DEFAULT 'N',
    crt_no INTEGER,
    crt_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updt_no INTEGER,
    updt_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    del_no INTEGER,
    del_dt DATETIME,
    INDEX idx_creature_no (creature_no),
    INDEX idx_skill_no (skill_no),
    INDEX idx_skill_type (skill_type),
    FOREIGN KEY (creature_no) REFERENCES creatures(creature_no)
);
```

---

## 테이블 관계도 요약

### 주요 엔티티
- **projects**: 모든 엔티티의 최상위 그룹
- **frameworks**: 세계관 구조/법칙
- **skills**: 전역 스킬 (모든 프로젝트 공유)
- **project_skills**: 프로젝트 종속 스킬 (프로젝트별 독립)
- **traits**: 전역 특성 (모든 프로젝트 공유)
- **project_traits**: 프로젝트 종속 특성 (프로젝트별 독립)
- **creatures**: 생물/종족
- **characters**: 인물
- **items**: 아이템
- **regions**: 지역
- **nations**: 국가
- **organizations**: 조직
- **events**: 사건/역사
- **lores**: 전승/설화

### 매핑 테이블
- **char_skill_maps**: 인물 ↔ 스킬 (전역/프로젝트 종속 모두 지원, skill_type 필드)
- **char_trait_maps**: 인물 ↔ 특성 (전역/프로젝트 종속 모두 지원, trait_type 필드)
- **char_item_maps**: 인물 ↔ 아이템 (소유)
- **char_relations**: 인물 ↔ 인물 (관계)
- **char_group_relations**: 인물 ↔ 그룹 (조직/국가)
- **creature_trait_maps**: 종족 ↔ 특성 (전역/프로젝트 종속 모두 지원, trait_type 필드)
- **creature_skill_maps**: 종족 ↔ 스킬 (전역/프로젝트 종속 모두 지원, skill_type 필드)
- **item_skill_maps**: 아이템 ↔ 스킬 (전역/프로젝트 종속 모두 지원, skill_type 필드)
- **item_trait_maps**: 아이템 ↔ 특성 (전역/프로젝트 종속 모두 지원, trait_type 필드)
- **lore_char_maps**: 전승 ↔ 인물
- **lore_item_maps**: 전승 ↔ 아이템
- **ntn_trait_maps**: 국가 ↔ 특성 (전역/프로젝트 종속 모두 지원, trait_type 필드)
- **org_trait_maps**: 조직 ↔ 특성 (전역/프로젝트 종속 모두 지원, trait_type 필드)
- **region_trait_maps**: 지역 ↔ 특성 (전역/프로젝트 종속 모두 지원, trait_type 필드)
- **group_relations**: 집단 ↔ 집단 (국가/조직 간)
- **event_entries**: 사건 ↔ 참여 대상 (다형 참조)

---

## 참고사항

1. **AUTO_INCREMENT**: MySQL/MariaDB 기준으로 작성되었습니다. PostgreSQL의 경우 `SERIAL` 또는 `GENERATED ALWAYS AS IDENTITY`를 사용하세요.

2. **TEXT 타입**: 긴 텍스트 필드는 `TEXT` 타입으로 정의했습니다. 필요에 따라 `MEDIUMTEXT` 또는 `LONGTEXT`로 변경할 수 있습니다.

3. **외래키 제약**: 
   - 일부 테이블(예: `char_group_relations`, `group_relations`, `event_entries`)은 다형 참조를 위해 외래키 제약이 없습니다.
   - 특성/스킬 매핑 테이블들(`char_trait_maps`, `char_skill_maps`, `creature_trait_maps`, `creature_skill_maps`, `item_trait_maps`, `item_skill_maps`, `ntn_trait_maps`, `org_trait_maps`, `region_trait_maps`)은 전역 풀과 프로젝트 종속을 모두 참조할 수 있도록 `trait_type`, `skill_type` 필드로 구분하며, 외래키 제약은 없습니다. (애플리케이션 레벨에서 참조 무결성 관리)

4. **인덱스**: 주요 검색 필드와 외래키에 인덱스를 추가했습니다. 성능 최적화를 위해 추가 인덱스가 필요할 수 있습니다.

5. **공통 필드**: 모든 테이블에 공통 필드(use_yn, del_yn, crt_no, crt_dt, updt_no, updt_dt, del_no, del_dt)가 포함되어 있습니다.
