# 인터렉티브 맵 (Interactive Map)

대규모 월드맵을 위한 인터렉티브 맵 뷰어입니다.

## 🗺️ 주요 기능

### 기본 기능
- ✅ 축소/확대 (Zoom In/Out)
- ✅ 클릭 시 사용자 정의 마커 생성
- ✅ 마커 종류: 랜드마크, 세션 위치
- ✅ 마커 클릭 시 상세 정보 모달
  - 이미지 추가
  - 설명 입력
  - 문서 링크 입력
  - 수정/삭제 가능
- ✅ 확대/축소 시 마커 크기 고정

### 추가 기능
- ✅ 마커 카테고리별 필터링
- ✅ 마커 검색 (이름/설명/태그)
- ✅ 마커 데이터 내보내기/가져오기 (JSON)
- ✅ 로컬 스토리지 자동 저장
- ✅ 커스텀 마커 아이콘 (카테고리별 색상)

## 📁 폴더 구조

```
app/pages/tools/interactive-map/
├── index.vue              # 메인 페이지
├── README.md              # 이 파일

app/components/interactive-map/
├── InteractiveMapCore.vue     # 맵 코어 컴포넌트
├── InteractiveMapPinModal.vue # 마커 상세/편집 모달
└── InteractiveMapCreateModal.vue # 마커 생성 모달

app/data/interactive-map/
├── map-config.ts          # 맵 설정 (크기, 줌 레벨 등)
└── pins.ts                # 초기 핀 데이터

app/types/interactive-map/
└── index.ts               # 타입 정의

scripts/
└── generate-tiles.ts      # 타일 생성 스크립트
```

## 🖼️ 대용량 이미지 처리

### 타일 렌더링 사용법

원본 이미지가 큰 경우 (예: 16320x9258), 타일로 분할하여 렌더링합니다.

#### 1 단계: 원본 이미지 배치

```bash
# 원본 이미지를 다음 경로에 배치합니다
public/maps/luxterra-original.jpg
```

#### 2 단계: 타일 생성

```bash
cd /home/nihilncunia/coding/app/fa-tools
pnpm tsx scripts/generate-tiles.ts
```

#### 3 단계: 자동 타일 로드

타일이 생성되면 맵이 자동으로 타일 렌더링을 사용합니다.
타일이 없으면 `luxterra-preview.jpg` 를 사용합니다.

### 타일 구조

```
public/tiles/luxterra/
├── 0/           # 줌 레벨 0 (가장 축소)
│   ├── 0-0.webp
│   └── ...
├── 1/           # 줌 레벨 1
│   ├── 0-0.webp
│   ├── 0-1.webp
│   └── ...
├── 2/           # 줌 레벨 2
├── 3/
└── 4/           # 줌 레벨 4 (가장 확대)
```

## 🛠️ 설정 수정

### 맵 크기 변경

`app/data/interactive-map/map-config.ts` 에서 수정:

```typescript
export const interactiveMapConfig: MapConfig = {
  id: 'luxterra',
  name: '룩스테라 전도',
  width: 16320,    // 원본 이미지 너비
  height: 9258,    // 원본 이미지 높이
  minZoom: -4,     // 최소 줌 레벨
  maxZoom: 2,      // 최대 줌 레벨
  tileSize: 512,   // 타일 크기
}
```

### 초기 핀 데이터 수정

`app/data/interactive-map/pins.ts` 에서 수정:

```typescript
export const initialPins: MapPinData[] = [
  {
    id: 'landmark-1',
    kind: 'landmark',
    name: '쿠아리온 왕국',
    x: 8160,
    y: 4629,
    description: '설명...',
    imageUrl: '/images/locations/kuarion.jpg',
    documentUrl: 'https://notion.so/...',
    tags: ['왕국', '신성 왕국'],
    visibility: 'public',
  },
]
```

## 🎨 마커 타입

| 타입 | 색상 | 용도 |
|------|------|------|
| `landmark` | 🔵 파랑 | 왕국, 도시, 던전 등 랜드마크 |
| `session` | 🟢 초록 | 세션 기록, 이벤트 발생 위치 |

## 💾 데이터 저장

- 마커 데이터는 **로컬 스토리지**에 자동 저장됩니다
- `내보내기` 버튼으로 JSON 파일 다운로드 가능
- `가져오기` 버튼으로 JSON 파일 업로드 가능

## 🚀 사용법

1. 브라우저에서 `/tools/interactive-map` 으로 이동
2. 지도를 드래그하여 이동
3. 휠 또는 줌 컨트롤로 확대/축소
4. `마커 생성` 버튼 클릭 후 지도에서 위치 선택
5. 마커 클릭하여 상세 정보 확인/편집
6. 필터 버튼으로 마커 타입 토글
7. 검색창으로 마커 검색

## 📝 메모

- 좌표계: Leaflet 은 `[y, x]` 순서를 사용합니다 (위도, 경도)
- 데이터 저장소는 `x, y` 좌표를 사용합니다
- 마커 생성 시 좌표는 정수로 반올림됩니다
