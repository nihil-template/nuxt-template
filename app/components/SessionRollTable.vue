<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface Adventurer {
  route_id: string;
  route_name: string;
  description: string;
  is_hidden: string;
}

interface RequestType {
  notice_no: string;
  notice_id: string;
  route_id: string;
  route_name: string;
  notice_group: string;
  notice_name: string;
  recommended_rank: string;
  public_summary: string;
  primary_objective: string;
  field_situation: string;
  unknown_factor: string;
  complication: string;
  record_targets: string;
  failure_condition: string;
  follow_up: string;
  public_notice_text: string;
}

interface Contract {
  concept_id: string;
  notice_no: string;
  route_id: string;
  route_name: string;
  notice_group: string;
  notice_name: string;
  concept_no: string;
  concept_keyword: string;
  public_title: string;
  recommended_rank: string;
  public_summary: string;
  primary_objective: string;
  field_situation: string;
  unknown_factor: string;
  complication: string;
  record_target: string;
  failure_condition: string;
  follow_up: string;
  public_notice_text: string;
}

interface Theme {
  주사위: string;
  테마: string;
  '몬스터 예시': string;
  '환경 설명': string;
}

interface Terrain {
  주사위: string;
  지형명: string;
  '지형 설명': string;
}

interface RollResult {
  id: number;
  adventurer: string;
  requestType: string;
  contract: string;
  keyword: string;
  rank: string;
  summary: string;
  objective: string;
  situation: string;
  unknown: string;
  complication: string;
  record: string;
  failure: string;
  followup: string;
  theme: string;
  themeMonster: string;
  themeDesc: string;
  terrain: string;
  terrainDesc: string;
  timestamp: Date;
}

const rollHistory = ref<RollResult[]>([]);
const currentResult = ref<RollResult | null>(null);
const includePioneer = ref(false);
const isRolling = ref(false);
const isLoading = ref(true);
const loadError = ref<string | null>(null);
const selectedHistoryId = ref<number | null>(null);

const adventurers = ref<Adventurer[]>([]);
const requestTypes = ref<RequestType[]>([]);
const contracts = ref<Contract[]>([]);
const themes = ref<Theme[]>([]);
const terrains = ref<Terrain[]>([]);

// CSV 파싱 함수
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

function parseCSV<T>(text: string): T[] {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  
  const headers = parseCSVLine(lines[0].replace(/^\ufeff/, ''));
  
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const entry: Record<string, string> = {};
    headers.forEach((header, index) => {
      entry[header.trim()] = values[index]?.trim() || '';
    });
    return entry as unknown as T;
  });
}

// CSV 파일 로드
async function loadCSV() {
  try {
    const files = [
      { name: '모험가 분류', url: '/data/roll-tables/모험가 분류.csv' },
      { name: '의뢰 유형', url: '/data/roll-tables/의뢰 유형.csv' },
      { name: '공고 상세 내용', url: '/data/roll-tables/공고 상세 내용.csv' },
      { name: '테마', url: '/data/roll-tables/테마.csv' },
      { name: '지형', url: '/data/roll-tables/지형.csv' },
    ];
    
    const responses = await Promise.all(
      files.map(f => fetch(f.url).then(res => {
        if (!res.ok) throw new Error(`${f.name} 파일 로드 실패: ${res.status}`);
        return res.text();
      }))
    );
    
    adventurers.value = parseCSV<Adventurer>(responses[0]);
    requestTypes.value = parseCSV<RequestType>(responses[1]);
    contracts.value = parseCSV<Contract>(responses[2]);
    themes.value = parseCSV<Theme>(responses[3]);
    terrains.value = parseCSV<Terrain>(responses[4]);
    
    isLoading.value = false;
    loadError.value = null;
  } catch (error) {
    console.error('CSV 로드 실패:', error);
    loadError.value = error instanceof Error ? error.message : '알 수 없는 오류';
    isLoading.value = false;
  }
}

// 필터링된 모험가 (개척자 포함 여부)
const filteredAdventurers = computed(() => {
  if (includePioneer.value) {
    return adventurers.value;
  }
  return adventurers.value.filter(a => a.route_id !== 'pioneer');
});

// 최대 10 개만 표시
const displayHistory = computed(() => {
  return rollHistory.value.slice(0, 10);
});

// 복사용 한 줄 텍스트
const copyText = computed(() => {
  if (!currentResult.value) return '';
  const r = currentResult.value;
  return `[모험가] ${r.adventurer} [의뢰] ${r.requestType} [순위] ${r.rank} [제목] ${r.contract} [키워드] ${r.keyword} [요약] ${r.summary} [목표] ${r.objective} [현장] ${r.situation} [미지] ${r.unknown} [변수] ${r.complication} [기록] ${r.record} [실패] ${r.failure} [후속] ${r.followup} [테마] ${r.theme} (${r.themeMonster}) ${r.themeDesc} [지형] ${r.terrain} ${r.terrainDesc}`;
});

// 랜덤 선택 함수
function randomSelect<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// 주사위 굴리기 (1dN)
function rollDice(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

// 롤 실행
async function handleRoll() {
  if (filteredAdventurers.value.length === 0 || isLoading.value) return;
  
  isRolling.value = true;
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const selectedAdventurer = randomSelect(filteredAdventurers.value);
    
    const filteredRequests = requestTypes.value.filter(
      r => r.route_id === selectedAdventurer.route_id
    );
    const selectedRequest = filteredRequests.length > 0 
      ? randomSelect(filteredRequests) 
      : randomSelect(requestTypes.value);
    
    const filteredContracts = contracts.value.filter(
      c => c.notice_no === selectedRequest.notice_no
    );
    const selectedContract = filteredContracts.length > 0 
      ? randomSelect(filteredContracts) 
      : randomSelect(contracts.value);
    
    const themeDice = rollDice(60);
    const selectedTheme = themes.value.find(t => parseInt(t['주사위']) === themeDice) 
      || randomSelect(themes.value);
    
    const terrainDice = rollDice(100);
    const selectedTerrain = terrains.value.find(t => parseInt(t['주사위']) === terrainDice) 
      || randomSelect(terrains.value);
    
    const result: RollResult = {
      id: Date.now(),
      adventurer: selectedAdventurer.route_name,
      requestType: selectedRequest.notice_name,
      contract: selectedContract.public_title,
      keyword: selectedContract.concept_keyword,
      rank: selectedContract.recommended_rank,
      summary: selectedContract.public_summary,
      objective: selectedContract.primary_objective,
      situation: selectedContract.field_situation,
      unknown: selectedContract.unknown_factor,
      complication: selectedContract.complication,
      record: selectedContract.record_target,
      failure: selectedContract.failure_condition,
      followup: selectedContract.follow_up,
      theme: selectedTheme['테마'],
      themeMonster: selectedTheme['몬스터 예시'],
      themeDesc: selectedTheme['환경 설명'],
      terrain: selectedTerrain['지형명'],
      terrainDesc: selectedTerrain['지형 설명'],
      timestamp: new Date(),
    };
    
    currentResult.value = result;
    selectedHistoryId.value = result.id;
    
    rollHistory.value.unshift(result);
    if (rollHistory.value.length > 10) {
      rollHistory.value.pop();
    }
  } catch (error) {
    console.error('롤 실행 중 오류:', error);
  } finally {
    isRolling.value = false;
  }
}

function clearHistory() {
  rollHistory.value = [];
  currentResult.value = null;
  selectedHistoryId.value = null;
}

function selectHistory(item: RollResult) {
  currentResult.value = item;
  selectedHistoryId.value = item.id;
}

function copyToClipboard() {
  if (copyText.value) {
    navigator.clipboard.writeText(copyText.value);
  }
}

onMounted(() => {
  loadCSV();
});
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-2xl font-bold text-black-900 mb-6">세션 롤 테이블</h1>
    
    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="text-center py-12 text-black-500">
      <svg class="w-8 h-8 mx-auto mb-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
      </svg>
      <p>데이터를 불러오는 중...</p>
    </div>
    
    <!-- 에러 상태 -->
    <div v-else-if="loadError" class="text-center py-12">
      <div class="text-red-600 mb-4">
        <svg class="w-12 h-12 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <circle cx="12" cy="16" r="1"/>
        </svg>
        <p class="text-lg font-semibold">데이터 로드 실패</p>
      </div>
      <p class="text-sm text-black-600 mb-4">{{ loadError }}</p>
      <button
        @click="loadCSV"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        다시 시도
      </button>
    </div>
    
    <template v-else>
      <div class="flex gap-6">
        <!-- 왼쪽: 생성 이력 -->
        <div class="w-72 flex-shrink-0">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-black-900">생성 이력</h2>
            <span class="text-xs text-black-500">{{ rollHistory.length }} / 10</span>
          </div>
          
          <div class="space-y-2 max-h-[700px] overflow-y-auto pr-2">
            <div
              v-for="item in displayHistory"
              :key="item.id"
              @click="selectHistory(item)"
              :class="[
                'p-3 bg-white border rounded-lg cursor-pointer transition-all hover:border-blue-300',
                selectedHistoryId === item.id ? 'border-blue-500 bg-blue-50' : 'border-black-100'
              ]"
            >
              <div class="flex flex-wrap items-center gap-1 mb-1">
                <span class="px-1.5 py-0.5 bg-black-100 text-black-700 text-xs rounded">
                  {{ item.adventurer }}
                </span>
                <span class="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
                  {{ item.rank }}
                </span>
              </div>
              <div class="text-sm font-medium text-black-900 truncate">{{ item.contract }}</div>
              <div class="text-xs text-black-500 mt-1">
                {{ item.timestamp.toLocaleTimeString() }}
              </div>
            </div>
            
            <div
              v-if="rollHistory.length === 0"
              class="text-center py-8 text-black-500 text-sm"
            >
              생성된 공고가 없습니다
            </div>
          </div>
          
          <button
            v-if="rollHistory.length > 0"
            @click="clearHistory"
            class="w-full mt-3 py-2 text-sm text-black-600 hover:text-red-600 transition-colors border border-black-200 rounded-lg hover:bg-red-50"
          >
            이력 지우기
          </button>
        </div>

        <!-- 오른쪽: 결과 및 컨트롤 -->
        <div class="flex-1 space-y-4">
          <!-- 옵션 + 버튼 + 복사 -->
          <div class="flex items-center gap-4">
            <div class="p-4 bg-black-50 rounded-lg">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  v-model="includePioneer"
                  type="checkbox"
                  class="w-5 h-5 rounded border-black-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="text-sm font-medium text-black-700">
                  개척자 공고 포함
                </span>
              </label>
            </div>
            
            <button
              @click="handleRoll"
              :disabled="isRolling || filteredAdventurers.length === 0"
              class="flex-1 py-4 px-8 bg-blue-600 hover:bg-blue-700 disabled:bg-black-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="1"/>
                <circle cx="8" cy="8" r="1"/>
                <circle cx="16" cy="16" r="1"/>
                <circle cx="8" cy="16" r="1"/>
                <circle cx="16" cy="8" r="1"/>
              </svg>
              <span>{{ isRolling ? '굴리는 중...' : '공고 생성하기' }}</span>
            </button>
            
            <button
              v-if="currentResult"
              @click="copyToClipboard"
              class="py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-lg transition-all flex items-center gap-2 shadow-lg"
              title="한 줄로 복사"
            >
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <span>복사</span>
            </button>
          </div>

          <!-- 결과 표시 -->
          <div v-if="currentResult" class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div class="space-y-4">
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                  {{ currentResult.adventurer }}
                </span>
                <span class="px-3 py-1 bg-indigo-500 text-white text-sm font-semibold rounded-full">
                  {{ currentResult.requestType }}
                </span>
                <span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">
                  {{ currentResult.rank }}
                </span>
              </div>
              
              <div class="pt-3 border-t border-blue-200">
                <div class="text-xs text-black-500 mb-1">공고 제목</div>
                <div class="text-xl font-bold text-blue-700">{{ currentResult.contract }}</div>
                <div class="text-sm text-black-600 mt-1">
                  <span class="font-semibold">키워드:</span> {{ currentResult.keyword }}
                </div>
              </div>
              
              <div class="pt-3 border-t border-blue-200">
                <div class="text-xs text-black-500 mb-1">요약</div>
                <p class="text-black-800">{{ currentResult.summary }}</p>
              </div>
              
              <div class="grid grid-cols-2 gap-4 pt-3 border-t border-blue-200">
                <div>
                  <div class="text-xs text-black-500 mb-1">테마</div>
                  <div class="text-md font-semibold text-black-700">{{ currentResult.theme }}</div>
                  <div class="text-xs text-black-600 mt-1">
                    <span class="font-semibold">몬스터:</span> {{ currentResult.themeMonster }}
                  </div>
                  <div class="text-xs text-black-600 mt-1">
                    <span class="font-semibold">환경:</span> {{ currentResult.themeDesc }}
                  </div>
                </div>
                <div>
                  <div class="text-xs text-black-500 mb-1">지형</div>
                  <div class="text-md font-semibold text-black-700">{{ currentResult.terrain }}</div>
                  <div class="text-xs text-black-600 mt-1">
                    {{ currentResult.terrainDesc }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 text-center py-8 text-black-400">
            왼쪽 이력을 선택하거나 상단 버튼을 눌러 공고를 생성하세요
          </div>

          <!-- 공고 상세 정보 (한 줄) -->
          <div v-if="currentResult" class="p-4 bg-white rounded-lg border border-black-200">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-semibold text-black-900">공고 상세 (한 줄)</h3>
              <button
                @click="copyToClipboard"
                class="text-xs text-blue-600 hover:text-blue-700 underline"
              >
                복사
              </button>
            </div>
            <p class="text-xs text-black-700 font-mono whitespace-pre-wrap break-all">
              {{ copyText }}
            </p>
          </div>

          <!-- 상세 정보 -->
          <div v-if="currentResult" class="p-6 bg-white rounded-lg border border-black-200">
            <h3 class="text-lg font-semibold text-black-900 mb-4">공고 상세 정보</h3>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="text-xs font-semibold text-black-500 uppercase mb-1">주요 목표</div>
                <p class="text-sm text-black-800">{{ currentResult.objective }}</p>
              </div>
              <div>
                <div class="text-xs font-semibold text-black-500 uppercase mb-1">현장 상황</div>
                <p class="text-sm text-black-800">{{ currentResult.situation }}</p>
              </div>
              <div>
                <div class="text-xs font-semibold text-black-500 uppercase mb-1">미지 요소</div>
                <p class="text-sm text-black-800">{{ currentResult.unknown }}</p>
              </div>
              <div>
                <div class="text-xs font-semibold text-black-500 uppercase mb-1">복잡성 / 변수</div>
                <p class="text-sm text-black-800">{{ currentResult.complication }}</p>
              </div>
              <div>
                <div class="text-xs font-semibold text-black-500 uppercase mb-1">기록 대상</div>
                <p class="text-sm text-black-800">{{ currentResult.record }}</p>
              </div>
              <div>
                <div class="text-xs font-semibold text-black-500 uppercase mb-1">실패 조건</div>
                <p class="text-sm text-black-800">{{ currentResult.failure }}</p>
              </div>
              <div class="col-span-2">
                <div class="text-xs font-semibold text-black-500 uppercase mb-1">후속 조치</div>
                <p class="text-sm text-black-800">{{ currentResult.followup }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
