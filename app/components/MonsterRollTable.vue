<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface OriginContext { origin_id: string; origin_ko: string; definition: string; }
interface FieldState { state_id: string; state_ko: string; definition: string; }
interface MajorType { roll_min: number; roll_max: number; type_en: string; type_ko: string; field_definition: string; }
interface Subtype { subtype_id: string; major_type_en: string; major_type_ko: string; subtype_ko: string; subtype_en: string; classification_axis: string; definition: string; example_keywords: string; }
interface Size { roll_min: number; roll_max: number; size_en: string; size_ko: string; field_note: string; }
interface LeaderStatus { roll_min: number; roll_max: number; leader_grade_ko: string; is_leader: string; leader_grade_en: string; definition: string; }
interface SocialPattern { social_id: string; social_ko: string; definition: string; }
interface BehaviorPattern { behavior_id: string; behavior_ko: string; definition: string; field_evidence: string; }
interface Movement { movement_id: string; movement_ko: string; field_observation: string; tactical_note: string; }
interface Sense { sense_id: string; sense_ko: string; field_observation: string; tactical_note: string; }
interface AttackMode { attack_mode_id: string; attack_mode_ko: string; definition: string; field_sign: string; }
interface DamageType { damage_type_en: string; damage_type_ko: string; field_interpretation: string; trace_hint: string; }
interface Trace { trace_id: string; trace_ko: string; trace_category: string; definition: string; field_use: string; tags: string; }
interface Resource { resource_id: string; resource_ko: string; resource_category: string; definition: string; use_note: string; hazard_level: string; tags: string; }
interface RiskSignal { risk_id: string; risk_ko: string; definition: string; classification_note: string; }
interface SubtypeTraceLink { link_id: string; major_type_en: string; subtype_id: string; trace_id: string; weight: number; required: string; notes: string; }
interface SubtypeResourceLink { link_id: string; major_type_en: string; subtype_id: string; resource_id: string; weight: number; required: string; notes: string; }
interface FieldStateTraceLink { link_id: string; field_state_id: string; trace_id: string; weight: number; required: string; notes: string; }
interface FieldStateResourceLink { link_id: string; field_state_id: string; resource_id: string; weight: number; required: string; notes: string; }
interface RiskSignalTraceLink { link_id: string; risk_signal_id: string; trace_id: string; weight: number; required: string; notes: string; }
interface RiskSignalResourceLink { link_id: string; risk_signal_id: string; resource_id: string; weight: number; required: string; notes: string; }
interface TraceResourceLink { link_id: string; trace_id: string; resource_id: string; weight_bonus: number; notes: string; }
interface TypeCommonDrop { major_type_en: string; major_type_ko: string; type_common_drops: string; }
interface SubtypeUniqueDrop { major_type_en: string; major_type_ko: string; subtype_id: string; subtype_ko: string; drop_count: number; subtype_unique_drops: string; }
interface SpecialConditionDrop { rule_id: string; condition_group: string; condition_value: string; drop_ko: string; drop_policy: string; notes: string; }

interface MonsterResult {
  originContext: OriginContext | null; fieldState: FieldState | null; majorType: MajorType | null;
  primarySubtype: Subtype | null; secondarySubtypes: Subtype[]; size: Size | null; leaderStatus: LeaderStatus | null;
  socialPattern: SocialPattern | null; behaviorPatterns: BehaviorPattern[]; movements: Movement[]; senses: Sense[];
  attackRanges: AttackMode[]; attackDeliveries: AttackMode[]; damageTypes: DamageType[]; traces: Trace[];
  resources: Resource[]; riskSignals: RiskSignal[]; drops: string[]; observedName: string; summaryText: string;
}

interface LockState {
  originContext: boolean; fieldState: boolean; majorType: boolean; subtypes: boolean; size: boolean;
  leaderStatus: boolean; socialPattern: boolean; behaviorPatterns: boolean; movements: boolean;
  senses: boolean; attackRanges: boolean; attackDeliveries: boolean; damageTypes: boolean;
  traces: boolean; resources: boolean; riskSignals: boolean;
}

const originContexts = ref<OriginContext[]>([]); const fieldStates = ref<FieldState[]>([]);
const majorTypes = ref<MajorType[]>([]); const subtypes = ref<Subtype[]>([]); const sizes = ref<Size[]>([]);
const leaderStatuses = ref<LeaderStatus[]>([]); const socialPatterns = ref<SocialPattern[]>([]);
const behaviorPatterns = ref<BehaviorPattern[]>([]); const movements = ref<Movement[]>([]); const senses = ref<Sense[]>([]);
const attackModes = ref<AttackMode[]>([]); const damageTypes = ref<DamageType[]>([]); const traces = ref<Trace[]>([]);
const resources = ref<Resource[]>([]); const riskSignals = ref<RiskSignal[]>([]);
const subtypeTraceLinks = ref<SubtypeTraceLink[]>([]); const subtypeResourceLinks = ref<SubtypeResourceLink[]>([]);
const fieldStateTraceLinks = ref<FieldStateTraceLink[]>([]); const fieldStateResourceLinks = ref<FieldStateResourceLink[]>([]);
const riskSignalTraceLinks = ref<RiskSignalTraceLink[]>([]); const riskSignalResourceLinks = ref<RiskSignalResourceLink[]>([]);
const traceResourceLinks = ref<TraceResourceLink[]>([]);
const typeCommonDrops = ref<TypeCommonDrop[]>([]);
const subtypeUniqueDrops = ref<SubtypeUniqueDrop[]>([]);
const specialConditionDrops = ref<SpecialConditionDrop[]>([]);

const result = ref<MonsterResult | null>(null);
const locks = ref<LockState>({ originContext: false, fieldState: false, majorType: false, subtypes: false, size: false, leaderStatus: false, socialPattern: false, behaviorPatterns: false, movements: false, senses: false, attackRanges: false, attackDeliveries: false, damageTypes: false, traces: false, resources: false, riskSignals: false });
const isLoading = ref(true); const loadError = ref<string | null>(null); const isRolling = ref(false);

function parseCSVLine(line: string): string[] { const result: string[] = []; let current = ''; let inQuotes = false; for (let i = 0; i < line.length; i++) { const char = line[i]; if (char === '"') { inQuotes = !inQuotes; } else if (char === ',' && !inQuotes) { result.push(current.trim()); current = ''; } else { current += char; } } result.push(current.trim()); return result; }
function parseCSV<T>(text: string): T[] { const lines = text.trim().replace(/\r/g, '').split('\n'); if (lines.length < 2) return []; const headers = parseCSVLine(lines[0].replace(/^\ufeff/, '')); return lines.slice(1).map(line => { const values = parseCSVLine(line); const entry: Record<string, string> = {}; headers.forEach((header, index) => { entry[header.trim()] = values[index]?.trim() || ''; }); return entry as unknown as T; }); }

async function loadCSV() {
  try {
    const files = [
      { name: '출현 맥락', url: '/몬스터 데이터 테이블/monster_origin_context_table.csv', target: originContexts },
      { name: '현장 상태', url: '/몬스터 데이터 테이블/monster_field_state_table.csv', target: fieldStates },
      { name: '대분류', url: '/몬스터 데이터 테이블/monster_type_major_table.csv', target: majorTypes },
      { name: '하위 분류', url: '/몬스터 데이터 테이블/monster_subtype_table.csv', target: subtypes },
      { name: '크기', url: '/몬스터 데이터 테이블/monster_size_table.csv', target: sizes },
      { name: '우두머리', url: '/몬스터 데이터 테이블/monster_leader_status_table.csv', target: leaderStatuses },
      { name: '사회성', url: '/몬스터 데이터 테이블/monster_social_pattern_table.csv', target: socialPatterns },
      { name: '행동', url: '/몬스터 데이터 테이블/monster_behavior_pattern_table.csv', target: behaviorPatterns },
      { name: '이동', url: '/몬스터 데이터 테이블/monster_movement_record_table.csv', target: movements },
      { name: '감각', url: '/몬스터 데이터 테이블/monster_sense_record_table.csv', target: senses },
      { name: '공격', url: '/몬스터 데이터 테이블/monster_attack_mode_table.csv', target: attackModes },
      { name: '피해', url: '/몬스터 데이터 테이블/monster_damage_type_table.csv', target: damageTypes },
      { name: '흔적', url: '/몬스터 데이터 테이블/monster_trace_table.csv', target: traces },
      { name: '자원', url: '/몬스터 데이터 테이블/monster_resource_table.csv', target: resources },
      { name: '위험', url: '/몬스터 데이터 테이블/monster_risk_signal_table.csv', target: riskSignals },
      { name: '서브타입 - 흔적', url: '/몬스터 데이터 테이블/monster_subtype_trace_link_table.csv', target: subtypeTraceLinks },
      { name: '서브타입 - 자원', url: '/몬스터 데이터 테이블/monster_subtype_resource_link_table.csv', target: subtypeResourceLinks },
      { name: '현장상태 - 흔적', url: '/몬스터 데이터 테이블/monster_field_state_trace_link_table.csv', target: fieldStateTraceLinks },
      { name: '현장상태 - 자원', url: '/몬스터 데이터 테이블/monster_field_state_resource_link_table.csv', target: fieldStateResourceLinks },
      { name: '위험징후 - 흔적', url: '/몬스터 데이터 테이블/monster_risk_signal_trace_link_table.csv', target: riskSignalTraceLinks },
      { name: '위험징후 - 자원', url: '/몬스터 데이터 테이블/monster_risk_signal_resource_link_table.csv', target: riskSignalResourceLinks },
      { name: '흔적 - 자원', url: '/몬스터 데이터 테이블/monster_trace_resource_link_table.csv', target: traceResourceLinks },
      { name: '공통 드랍', url: '/몬스터 데이터 테이블/드랍/monster_type_common_drops_v4.csv', target: typeCommonDrops },
      { name: '고유 드랍', url: '/몬스터 데이터 테이블/드랍/monster_subtype_unique_drops_v4.csv', target: subtypeUniqueDrops },
      { name: '특수 조건', url: '/몬스터 데이터 테이블/드랍/monster_special_condition_drops_v4.csv', target: specialConditionDrops },
    ];
    const responses = await Promise.all(files.map(f => fetch(f.url).then(res => { if (!res.ok) throw new Error(`${f.name} 파일 로드 실패`); return res.text(); })));
    originContexts.value = parseCSV<OriginContext>(responses[0]); fieldStates.value = parseCSV<FieldState>(responses[1]);
    majorTypes.value = parseCSV<MajorType>(responses[2]); subtypes.value = parseCSV<Subtype>(responses[3]); sizes.value = parseCSV<Size>(responses[4]);
    leaderStatuses.value = parseCSV<LeaderStatus>(responses[5]); socialPatterns.value = parseCSV<SocialPattern>(responses[6]);
    behaviorPatterns.value = parseCSV<BehaviorPattern>(responses[7]); movements.value = parseCSV<Movement>(responses[8]); senses.value = parseCSV<Sense>(responses[9]);
    attackModes.value = parseCSV<AttackMode>(responses[10]); damageTypes.value = parseCSV<DamageType>(responses[11]); traces.value = parseCSV<Trace>(responses[12]);
    resources.value = parseCSV<Resource>(responses[13]); riskSignals.value = parseCSV<RiskSignal>(responses[14]);
    subtypeTraceLinks.value = parseCSV<SubtypeTraceLink>(responses[15]); subtypeResourceLinks.value = parseCSV<SubtypeResourceLink>(responses[16]);
    fieldStateTraceLinks.value = parseCSV<FieldStateTraceLink>(responses[17]); fieldStateResourceLinks.value = parseCSV<FieldStateResourceLink>(responses[18]);
    riskSignalTraceLinks.value = parseCSV<RiskSignalTraceLink>(responses[19]); riskSignalResourceLinks.value = parseCSV<RiskSignalResourceLink>(responses[20]);
    traceResourceLinks.value = parseCSV<TraceResourceLink>(responses[21]);
    typeCommonDrops.value = parseCSV<TypeCommonDrop>(responses[22]);
    subtypeUniqueDrops.value = parseCSV<SubtypeUniqueDrop>(responses[23]);
    specialConditionDrops.value = parseCSV<SpecialConditionDrop>(responses[24]);
    isLoading.value = false;
  } catch (error) { loadError.value = error instanceof Error ? error.message : '알 수 없는 오류'; isLoading.value = false; }
}

function randomSelect<T>(array: T[]): T { return array[Math.floor(Math.random() * array.length)]; }
function rollDice(sides: number): number { return Math.floor(Math.random() * sides) + 1; }
function rollWithWeight<T extends { roll_min?: number; roll_max?: number }>(array: T[]): T { const roll = rollDice(100); for (const item of array) { const min = item.roll_min ?? 1; const max = item.roll_max ?? 100; if (roll >= min && roll <= max) { return item; } } return array[0]; }
function selectMultiple<T>(array: T[], count: number): T[] { const shuffled = [...array].sort(() => Math.random() - 0.5); return shuffled.slice(0, count); }

function generateOriginContext(): OriginContext { return randomSelect(originContexts.value); }
function generateFieldState(origin: OriginContext): FieldState { const originId = origin.origin_id.toLowerCase(); const filtered = fieldStates.value.filter(state => { const stateId = state.state_id.toLowerCase(); if (originId === 'field') return ['field_normal', 'leader_individual', 'alpha_individual'].includes(stateId); if (originId === 'settlement_edge') return ['settlement_edge', 'leader_individual', 'alpha_individual'].includes(stateId); if (originId === 'ruin') return ['field_normal', 'leader_individual'].includes(stateId); if (originId === 'dungeon_inner') return ['dungeon_interior', 'dungeon_guardian_bound', 'dungeon_boss'].includes(stateId); if (originId === 'dungeon_guardian') return ['dungeon_guardian', 'dungeon_guardian_bound'].includes(stateId); if (originId === 'angra_fog') return ['angra_fog_creature', 'angra_predator', 'totem_minion'].includes(stateId); if (originId === 'totem_guardian') return ['totem_guardian'].includes(stateId); if (originId === 'resonance_zone') return ['resonance_1', 'resonance_2', 'resonance_3', 'guardian_precursor'].includes(stateId); if (originId === 'blackstone_site') return ['blackstone_reactive', 'blackstone_crystallized'].includes(stateId); return true; }); return filtered.length > 0 ? randomSelect(filtered) : randomSelect(fieldStates.value); }
function generateMajorType(origin: OriginContext, fieldState: FieldState): MajorType { const originId = origin.origin_id.toLowerCase(); const stateId = fieldState.state_id.toLowerCase(); let filtered = majorTypes.value; if (['dungeon_guardian', 'totem_guardian'].includes(stateId)) { filtered = majorTypes.value.filter(t => ['Monstrosity', 'Undead', 'Construct', 'Dragon', 'Aberration', 'Elemental', 'Giant'].includes(t.type_en)); } else if (['dungeon_interior', 'dungeon_guardian_bound'].includes(stateId)) { filtered = majorTypes.value.filter(t => ['Monstrosity', 'Undead', 'Ooze', 'Construct', 'Aberration', 'Beast'].includes(t.type_en)); } else if (['angra_fog_creature', 'angra_predator', 'totem_minion'].includes(stateId)) { filtered = majorTypes.value.filter(t => ['Monstrosity', 'Beast', 'Plant', 'Aberration', 'Undead', 'Ooze', 'Elemental'].includes(t.type_en)); } return rollWithWeight(filtered); }
function generateSubtypes(majorType: MajorType, count: number): Subtype[] { const filtered = subtypes.value.filter(s => s.major_type_en === majorType.type_en); if (filtered.length === 0) return []; const selected: Subtype[] = []; const available = [...filtered]; for (let i = 0; i < Math.min(count, available.length); i++) { const subtype = randomSelect(available); selected.push(subtype); const index = available.indexOf(subtype); if (index > -1) available.splice(index, 1); } return selected; }
function generateSize(majorType: MajorType, fieldState: FieldState): Size { const stateId = fieldState.state_id.toLowerCase(); if (['dungeon_guardian', 'totem_guardian'].includes(stateId)) { const filtered = sizes.value.filter(s => ['Large', 'Huge', 'Gargantuan'].includes(s.size_en)); if (filtered.length > 0) return randomSelect(filtered); } if (['Dragon', 'Giant'].includes(majorType.type_en)) { const filtered = sizes.value.filter(s => ['Large', 'Huge', 'Gargantuan'].includes(s.size_en)); if (filtered.length > 0 && Math.random() > 0.3) return randomSelect(filtered); } return rollWithWeight(sizes.value); }
function generateLeaderStatus(fieldState: FieldState): LeaderStatus { const stateId = fieldState.state_id.toLowerCase(); if (['dungeon_guardian', 'totem_guardian'].includes(stateId)) { const filtered = leaderStatuses.value.filter(l => l.leader_grade_ko === '가디언급'); if (filtered.length > 0) return randomSelect(filtered); } if (stateId === 'guardian_precursor') { const filtered = leaderStatuses.value.filter(l => ['알파 개체', '군주 개체', '가디언급'].includes(l.leader_grade_ko)); if (filtered.length > 0) return randomSelect(filtered); } return rollWithWeight(leaderStatuses.value); }
function generateSocialPattern(leaderStatus: LeaderStatus): SocialPattern { const leaderGrade = leaderStatus.leader_grade_ko; if (leaderGrade === '개체') { const filtered = socialPatterns.value.filter(s => ['단독', '쌍', '소규모 무리'].includes(s.social_ko)); if (filtered.length > 0) return randomSelect(filtered); } else if (leaderGrade === '무리 우두머리') { const filtered = socialPatterns.value.filter(s => ['소규모 무리', '둥지', '위계 집단'].includes(s.social_ko)); if (filtered.length > 0) return randomSelect(filtered); } else if (leaderGrade === '알파 개체') { const filtered = socialPatterns.value.filter(s => ['대규모 무리', '위계 집단', '군락'].includes(s.social_ko)); if (filtered.length > 0) return randomSelect(filtered); } else if (leaderGrade === '군주 개체') { const filtered = socialPatterns.value.filter(s => ['대규모 무리', '위계 집단', '지역 지배'].includes(s.social_ko)); if (filtered.length > 0) return randomSelect(filtered); } else if (leaderGrade === '가디언급') { const filtered = socialPatterns.value.filter(s => ['단독', '하위 개체 동반'].includes(s.social_ko)); if (filtered.length > 0) return randomSelect(filtered); } return randomSelect(socialPatterns.value); }
function generateBehaviorPatterns(fieldState: FieldState, count: number): BehaviorPattern[] { const stateId = fieldState.state_id.toLowerCase(); let filtered = behaviorPatterns.value; if (['dungeon_guardian', 'totem_guardian'].includes(stateId)) { filtered = behaviorPatterns.value.filter(b => ['수호형', '영역형', '지휘형', '광폭형'].includes(b.behavior_ko)); } else if (stateId.includes('angra')) { filtered = behaviorPatterns.value.filter(b => ['추격형', '매복형', '유인형', '오염 확산형'].includes(b.behavior_ko)); } return selectMultiple(filtered, count); }
function generateMovements(majorType: MajorType, count: number): Movement[] { const filtered = movements.value.filter(m => { if (majorType.type_en === 'Undead') return ['floating', 'teleport', 'burrow'].includes(m.movement_id); if (majorType.type_en === 'Construct') return ['mechanical', 'floating'].includes(m.movement_id); if (majorType.type_en === 'Ooze') return ['oozing', 'burrow'].includes(m.movement_id); return true; }); return selectMultiple(filtered.length > 0 ? filtered : movements.value, count); }
function generateSenses(majorType: MajorType, origin: OriginContext, count: number): Sense[] { const originId = origin.origin_id.toLowerCase(); let filtered = senses.value; if (originId === 'dungeon_inner' || originId === 'dungeon_guardian') { filtered = senses.value.filter(s => ['darkvision', 'tremorsense', 'blindsight'].includes(s.sense_id)); } else if (originId === 'angra_fog') { filtered = senses.value.filter(s => ['darkvision', 'smell', 'vibration'].includes(s.sense_id)); } return selectMultiple(filtered.length > 0 ? filtered : senses.value, count); }
function generateAttackRanges(majorType: MajorType, count: number): AttackMode[] { const filtered = attackModes.value.filter(a => a.attack_mode_id.includes('range')); const melee = attackModes.value.filter(a => a.attack_mode_id.includes('melee')); const result: AttackMode[] = []; if (filtered.length > 0 && Math.random() > 0.4) { result.push(randomSelect(filtered)); } if (melee.length > 0) { result.push(...selectMultiple(melee, Math.max(1, count - result.length))); } return result; }
function generateAttackDeliveries(majorType: MajorType, count: number): AttackMode[] { const filtered = attackModes.value.filter(a => a.attack_mode_id.includes('deliver')); if (filtered.length === 0) return attackModes.value.slice(0, count); return selectMultiple(filtered, count); }
function generateDamageTypes(majorType: MajorType, count: number): DamageType[] { if (majorType.type_en === 'Undead') { const necrotic = damageTypes.value.filter(d => d.damage_type_ko === '사령'); if (necrotic.length > 0) { return [randomSelect(necrotic), ...selectMultiple(damageTypes.value.filter(d => d.damage_type_ko !== '사령'), count - 1)]; } } return selectMultiple(damageTypes.value, count); }
function generateTraces(primarySubtype: Subtype, secondarySubtypes: Subtype[], fieldState: FieldState, riskSignals: RiskSignal[], count: number): Trace[] { const traceMap = new Map<string, { trace_id: string; weight: number }>(); const primaryLinks = subtypeTraceLinks.value.filter(l => l.subtype_id === primarySubtype.subtype_id && l.major_type_en === primarySubtype.major_type_en); primaryLinks.forEach(l => { traceMap.set(l.trace_id, { trace_id: l.trace_id, weight: l.weight }); }); secondarySubtypes.forEach(sub => { const secLinks = subtypeTraceLinks.value.filter(l => l.subtype_id === sub.subtype_id && l.major_type_en === sub.major_type_en); secLinks.forEach(l => { const existing = traceMap.get(l.trace_id); if (existing) { existing.weight += l.weight * 0.5; } else { traceMap.set(l.trace_id, { trace_id: l.trace_id, weight: l.weight * 0.5 }); } }); }); const fieldLinks = fieldStateTraceLinks.value.filter(l => l.field_state_id === fieldState.state_id); fieldLinks.forEach(l => { const existing = traceMap.get(l.trace_id); if (existing) { existing.weight += l.weight * 0.3; } else { traceMap.set(l.trace_id, { trace_id: l.trace_id, weight: l.weight * 0.3 }); } }); const sorted = Array.from(traceMap.values()).sort((a, b) => b.weight - a.weight); return sorted.slice(0, count).map(item => traces.value.find(t => t.trace_id === item.trace_id)!).filter(Boolean); }
function generateResources(primarySubtype: Subtype, secondarySubtypes: Subtype[], fieldState: FieldState, riskSignals: RiskSignal[], traces: Trace[], count: number): Resource[] { const resourceMap = new Map<string, { weight: number }>(); const primaryLinks = subtypeResourceLinks.value.filter(l => l.subtype_id === primarySubtype.subtype_id && l.major_type_en === primarySubtype.major_type_en); primaryLinks.forEach(l => { resourceMap.set(l.resource_id, { weight: l.weight }); }); secondarySubtypes.forEach(sub => { const secLinks = subtypeResourceLinks.value.filter(l => l.subtype_id === sub.subtype_id && l.major_type_en === sub.major_type_en); secLinks.forEach(l => { const existing = resourceMap.get(l.resource_id); if (existing) { existing.weight += l.weight * 0.5; } else { resourceMap.set(l.resource_id, { weight: l.weight * 0.5 }); } }); }); traces.forEach(trace => { const traceLinks = traceResourceLinks.value.filter(l => l.trace_id === trace.trace_id); traceLinks.forEach(l => { const existing = resourceMap.get(l.resource_id); if (existing) { existing.weight += (l.weight_bonus || 0) * 0.4; } else { resourceMap.set(l.resource_id, { weight: (l.weight_bonus || 0) * 0.4 }); } }); }); const sorted = Array.from(resourceMap.entries()).sort((a, b) => b[1].weight - a[1].weight); return sorted.slice(0, count).map(([id]) => resources.value.find(r => r.resource_id === id)!).filter(Boolean); }
function generateRiskSignals(fieldState: FieldState, count: number): RiskSignal[] { const stateId = fieldState.state_id.toLowerCase(); let filtered = riskSignals.value; if (stateId.includes('dungeon')) { filtered = riskSignals.value.filter(r => r.risk_ko.includes('룬') || r.risk_ko.includes('공간')); } else if (stateId.includes('angra')) { filtered = riskSignals.value.filter(r => r.risk_ko.includes('오염') || r.risk_ko.includes('부식')); } if (filtered.length === 0 || count === 0) return []; return selectMultiple(filtered, Math.min(count, filtered.length)); }
function generateDrops(majorType: MajorType, primarySubtype: Subtype, secondarySubtypes: Subtype[], fieldState: FieldState): string[] {
  const drops: string[] = [];
  const commonDrop = typeCommonDrops.value.find(d => d.major_type_en === majorType.type_en);
  if (commonDrop) { const items = commonDrop.type_common_drops.split(',').map(s => s.trim()); const count = 3 + Math.floor(Math.random() * 3); drops.push(...selectMultiple(items, Math.min(count, items.length))); }
  const primaryDrop = subtypeUniqueDrops.value.find(d => d.subtype_id === primarySubtype.subtype_id);
  if (primaryDrop) { const items = primaryDrop.subtype_unique_drops.split(',').map(s => s.trim()); const count = Math.min(parseInt(primaryDrop.drop_count) || 3, items.length); drops.push(...selectMultiple(items, count)); }
  secondarySubtypes.forEach(sub => { const subDrop = subtypeUniqueDrops.value.find(d => d.subtype_id === sub.subtype_id); if (subDrop) { const items = subDrop.subtype_unique_drops.split(',').map(s => s.trim()); drops.push(...selectMultiple(items, Math.min(2, items.length))); } });
  specialConditionDrops.value.forEach(special => { const stateId = fieldState.state_id.toLowerCase(); const conditionGroup = special.condition_group.toLowerCase(); if (conditionGroup.includes('앙그라') && stateId.includes('angra') && special.drop_policy === 'always_add') { drops.push(special.drop_ko); } if (conditionGroup.includes('가디언') && ['dungeon_guardian', 'totem_guardian'].includes(stateId) && special.drop_policy === 'always_add') { drops.push(special.drop_ko); } });
  return [...new Set(drops)];
}
function validateCombinations(primarySubtype: Subtype, traces: Trace[], resources: Resource[], fieldState: FieldState, riskSignals: RiskSignal[]): { valid: boolean; issues: string[] } { const issues: string[] = []; const subtypeKo = primarySubtype.subtype_ko; if (subtypeKo.includes('골격형') && primarySubtype.major_type_en === 'Undead') { const boneResources = resources.filter(r => r.tags.includes('bone') || r.resource_ko.includes('뼈') || r.resource_ko.includes('두개골') || r.resource_ko.includes('골')); if (boneResources.length === 0) { issues.push('골격형 언데드인데 뼈 계열 자원이 없습니다.'); } } if (subtypeKo.includes('점액') || subtypeKo.includes('점액성')) { const slimeResources = resources.filter(r => r.resource_ko.includes('점액') || r.resource_ko.includes('산성') || r.resource_ko.includes('흡수')); if (slimeResources.length === 0) { issues.push('점액형 몬스터인데 점액·산성 계열 자원이 없습니다.'); } } return { valid: issues.length === 0, issues }; }
function generateSummary(origin: OriginContext, fieldState: FieldState, majorType: MajorType, subtypes: Subtype[], size: Size, leaderStatus: LeaderStatus): string { const subtypeNames = subtypes.map(s => s.subtype_ko.replace(majorType.type_ko, '').trim()).join(', '); const location = origin.origin_ko; const state = fieldState.state_ko; const typeSubtypeCombo = subtypes.length > 0 ? `${majorType.type_ko} - ${subtypeNames}` : majorType.type_ko; return `${location}에서 확인된 ${size.size_ko} 크기의 ${typeSubtypeCombo}. ${state} 상태이다. ${leaderStatus.leader_grade_ko}로.`; }
function generateObservedName(majorType: MajorType, primarySubtype: Subtype, fieldState: FieldState, size: Size): string { const locationPrefixes: Record<string, string> = { field_normal: '평야', settlement_edge: '변경', dungeon_interior: '지하', angra_fog_creature: '안개', resonance_1: '공명', blackstone_reactive: '흑석' }; const prefix = locationPrefixes[fieldState.state_id] || '야생'; const subtypeName = primarySubtype.subtype_ko.replace(majorType.type_ko, '').trim(); return `${majorType.type_ko} - ${subtypeName} (${prefix})`; }

async function generateAll() { if (isLoading.value) return; isRolling.value = true; try { const originContext = generateOriginContext(); const fieldState = generateFieldState(originContext); const majorType = generateMajorType(originContext, fieldState); const subtypes = generateSubtypes(majorType, 1); const size = generateSize(majorType, fieldState); const leaderStatus = generateLeaderStatus(fieldState); const socialPattern = generateSocialPattern(leaderStatus); const behaviorPatterns = generateBehaviorPatterns(fieldState, 1 + Math.floor(Math.random() * 2)); const movements = generateMovements(majorType, 1 + Math.floor(Math.random() * 2)); const senses = generateSenses(majorType, originContext, 2 + Math.floor(Math.random() * 2)); const attackRanges = generateAttackRanges(majorType, 1 + Math.floor(Math.random() * 1)); const attackDeliveries = generateAttackDeliveries(majorType, 1 + Math.floor(Math.random() * 2)); const damageTypes = generateDamageTypes(majorType, 1 + Math.floor(Math.random() * 2)); const riskSignals = generateRiskSignals(fieldState, Math.floor(Math.random() * 2)); const traces = generateTraces(subtypes[0], subtypes.slice(1), fieldState, riskSignals, 3 + Math.floor(Math.random() * 3)); const resources = generateResources(subtypes[0], subtypes.slice(1), fieldState, riskSignals, traces, 2 + Math.floor(Math.random() * 3)); const drops = generateDrops(majorType, subtypes[0], subtypes.slice(1), fieldState); const validation = validateCombinations(subtypes[0], traces, resources, fieldState, riskSignals); if (!validation.valid) { console.warn('금지 조합 경고:', validation.issues); } result.value = { originContext, fieldState, majorType, primarySubtype: subtypes[0] || null, secondarySubtypes: subtypes.slice(1), size, leaderStatus, socialPattern, behaviorPatterns, movements, senses, attackRanges, attackDeliveries, damageTypes, traces, resources, riskSignals, drops, observedName: generateObservedName(majorType, subtypes[0], fieldState, size), summaryText: generateSummary(originContext, fieldState, majorType, subtypes, size, leaderStatus) }; } finally { isRolling.value = false; } }

function rerollStep(step: keyof LockState) { if (!result.value || locks.value[step] || isLoading.value) return; const originContext = result.value.originContext!; const fieldState = result.value.fieldState!; const majorType = result.value.majorType!; const subtypes = [result.value.primarySubtype!, ...result.value.secondarySubtypes].filter(Boolean) as Subtype[]; switch (step) { case 'originContext': result.value.originContext = generateOriginContext(); break; case 'fieldState': result.value.fieldState = generateFieldState(originContext); break; case 'majorType': result.value.majorType = generateMajorType(originContext, fieldState); break; case 'subtypes': const newSubtypes = generateSubtypes(majorType, 1); result.value.primarySubtype = newSubtypes[0] || null; result.value.secondarySubtypes = newSubtypes.slice(1); break; case 'size': result.value.size = generateSize(majorType, fieldState); break; case 'leaderStatus': result.value.leaderStatus = generateLeaderStatus(fieldState); break; case 'socialPattern': result.value.socialPattern = generateSocialPattern(result.value.leaderStatus!); break; case 'behaviorPatterns': result.value.behaviorPatterns = generateBehaviorPatterns(fieldState, 1 + Math.floor(Math.random() * 2)); break; case 'movements': result.value.movements = generateMovements(majorType, 1 + Math.floor(Math.random() * 2)); break; case 'senses': result.value.senses = generateSenses(majorType, originContext, 2 + Math.floor(Math.random() * 2)); break; case 'attackRanges': result.value.attackRanges = generateAttackRanges(majorType, 1 + Math.floor(Math.random() * 1)); break; case 'attackDeliveries': result.value.attackDeliveries = generateAttackDeliveries(majorType, 1 + Math.floor(Math.random() * 2)); break; case 'damageTypes': result.value.damageTypes = generateDamageTypes(majorType, 1 + Math.floor(Math.random() * 2)); break; case 'traces': result.value.traces = generateTraces(subtypes[0], subtypes.slice(1), fieldState, result.value.riskSignals, 3 + Math.floor(Math.random() * 3)); result.value.resources = generateResources(subtypes[0], subtypes.slice(1), fieldState, result.value.riskSignals, result.value.traces, result.value.resources.length || 3); break; case 'resources': result.value.resources = generateResources(subtypes[0], subtypes.slice(1), fieldState, result.value.riskSignals, result.value.traces, result.value.resources.length || 3); break; case 'riskSignals': result.value.riskSignals = generateRiskSignals(fieldState, result.value.riskSignals.length || 1); break; } if (result.value) { const subtypes = [result.value.primarySubtype!, ...result.value.secondarySubtypes].filter(Boolean) as Subtype[]; result.value.drops = generateDrops(result.value.majorType!, result.value.primarySubtype!, result.value.secondarySubtypes, result.value.fieldState!); result.value.summaryText = generateSummary(result.value.originContext!, result.value.fieldState!, result.value.majorType!, subtypes, result.value.size!, result.value.leaderStatus!); result.value.observedName = generateObservedName(result.value.majorType!, result.value.primarySubtype!, result.value.fieldState!, result.value.size!); } }
function toggleLock(step: keyof LockState) { locks.value[step] = !locks.value[step]; }
onMounted(() => { loadCSV(); });
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold text-black-900 mb-2">몬스터 롤 테이블</h1>
    <p class="text-sm text-black-500 mb-6">몬스터 관찰 데이터를 무작위로 생성하여 도감 기록을 만드세요</p>
    
    <div v-if="isLoading" class="text-center py-12 text-black-500">
      <svg class="w-8 h-8 mx-auto mb-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
      </svg>
      <p>데이터를 불러오는 중...</p>
    </div>
    
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
      <button @click="loadCSV" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">다시 시도</button>
    </div>
    
    <template v-else>
      <div class="flex gap-4 mb-6">
        <button @click="generateAll" :disabled="isRolling" class="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-black-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg">
          {{ isRolling ? '생성 중...' : '전체 생성하기' }}
        </button>
      </div>
      
      <div v-if="result" class="p-6 bg-white rounded-lg border border-black-200">
        <div class="flex items-center justify-between mb-4 pb-3 border-b border-black-100">
          <h2 class="text-xl font-bold text-blue-700">{{ result.observedName }}</h2>
          <button @click="generateAll" :disabled="isRolling" class="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-black-300 text-white rounded transition">전체 재생성</button>
        </div>
        
        <div class="space-y-3 text-sm">
          <p class="text-black-800 leading-relaxed">{{ result.summaryText }}</p>
          
          <p class="text-black-600">
            <span class="font-semibold text-black-900">출현 맥락:</span>
            <span class="ml-2">{{ result.originContext?.origin_ko }}</span>
            <span class="mx-2 text-black-300">|</span>
            <span class="font-semibold text-black-900">현장 상태:</span>
            <span class="ml-2">{{ result.fieldState?.state_ko }}</span>
          </p>
          
          <p class="text-black-600">
            <span class="font-semibold text-black-900">분류:</span>
            <span class="ml-2">{{ result.majorType?.type_ko }}</span>
            <span class="text-black-400">─</span>
            <span>{{ result.primarySubtype?.subtype_ko.replace(result.majorType.type_ko, '').trim() }}</span>
            <span v-for="subtype in result.secondarySubtypes" :key="subtype.subtype_id">, {{ subtype.subtype_ko.replace(result.majorType.type_ko, '').trim() }}</span>
          </p>
          
          <p class="text-black-600">
            <span class="font-semibold text-black-900">크기:</span>
            <span class="ml-2">{{ result.size?.size_ko }} ({{ result.size?.size_en }})</span>
            <span class="mx-2 text-black-300">|</span>
            <span class="font-semibold text-black-900">우두머리:</span>
            <span class="ml-2">{{ result.leaderStatus?.leader_grade_ko }}</span>
          </p>
          
          <p class="text-black-600">
            <span class="font-semibold text-black-900">사회성:</span>
            <span class="ml-2">{{ result.socialPattern?.social_ko }}</span>
          </p>
          
          <p class="text-black-600">
            <span class="font-semibold text-black-900">행동:</span>
            <span class="ml-2" v-for="(behavior, i) in result.behaviorPatterns" :key="behavior.behavior_id">
              <span v-if="i > 0">, </span>{{ behavior.behavior_ko }}
            </span>
          </p>
          
          <p class="text-black-600">
            <span class="font-semibold text-black-900">이동:</span>
            <span class="ml-2" v-for="(move, i) in result.movements" :key="move.movement_id">
              <span v-if="i > 0">, </span>{{ move.movement_ko }}
            </span>
          </p>
          
          <p class="text-black-600">
            <span class="font-semibold text-black-900">감각:</span>
            <span class="ml-2" v-for="(sense, i) in result.senses" :key="sense.sense_id">
              <span v-if="i > 0">, </span>{{ sense.sense_ko }}
            </span>
          </p>
          
          <p class="text-black-600">
            <span class="font-semibold text-black-900">공격:</span>
            <span class="ml-2">거리 {{ result.attackRanges.map(r => r.attack_mode_ko).join(', ') }}</span>
            <span class="mx-2 text-black-300">|</span>
            <span>전달 {{ result.attackDeliveries.map(d => d.attack_mode_ko).join(', ') }}</span>
            <span class="mx-2 text-black-300">|</span>
            <span>피해 {{ result.damageTypes.map(d => d.damage_type_ko).join(', ') }}</span>
          </p>
          
          <p class="text-black-600">
            <span class="font-semibold text-black-900">흔적:</span>
            <span class="ml-2" v-for="(trace, i) in result.traces" :key="trace.trace_id">
              <span v-if="i > 0">, </span>{{ trace.trace_ko }}
            </span>
          </p>
          
          <p class="text-black-600">
            <span class="font-semibold text-black-900">위험 징후:</span>
            <span class="ml-2" v-if="result.riskSignals.length === 0">없음</span>
            <span class="ml-2" v-for="(risk, i) in result.riskSignals" :key="risk.risk_id">
              <span v-if="i > 0">, </span>{{ risk.risk_ko }}
            </span>
          </p>
          
          <p class="text-black-600">
            <span class="font-semibold text-black-900">드랍:</span>
            <span class="ml-2" v-for="(drop, i) in result.drops" :key="drop">
              <span v-if="i > 0">, </span>{{ drop }}
            </span>
          </p>
          
          <p class="text-black-600">
            <span class="font-semibold text-black-900">자원:</span>
            <span class="ml-2" v-for="(resource, i) in result.resources" :key="resource.resource_id">
              <span v-if="i > 0">, </span>{{ resource.resource_ko }}
            </span>
          </p>
        </div>
        
        <div class="mt-4 pt-3 border-t border-black-100 flex gap-2 flex-wrap">
          <button @click="toggleLock('originContext')" class="text-xs px-2 py-1 rounded border" :class="locks.originContext ? 'bg-yellow-100 border-yellow-300' : 'bg-black-50 border-black-200'">
            {{ locks.originContext ? '🔒 맥락' : '🔓 맥락' }}
          </button>
          <button @click="toggleLock('fieldState')" class="text-xs px-2 py-1 rounded border" :class="locks.fieldState ? 'bg-yellow-100 border-yellow-300' : 'bg-black-50 border-black-200'">
            {{ locks.fieldState ? '🔒 상태' : '🔓 상태' }}
          </button>
          <button @click="toggleLock('majorType')" class="text-xs px-2 py-1 rounded border" :class="locks.majorType ? 'bg-yellow-100 border-yellow-300' : 'bg-black-50 border-black-200'">
            {{ locks.majorType ? '🔒 분류' : '🔓 분류' }}
          </button>
          <button @click="toggleLock('subtypes')" class="text-xs px-2 py-1 rounded border" :class="locks.subtypes ? 'bg-yellow-100 border-yellow-300' : 'bg-black-50 border-black-200'">
            {{ locks.subtypes ? '🔒 서브' : '🔓 서브' }}
          </button>
          <button @click="toggleLock('size')" class="text-xs px-2 py-1 rounded border" :class="locks.size ? 'bg-yellow-100 border-yellow-300' : 'bg-black-50 border-black-200'">
            {{ locks.size ? '🔒 크기' : '🔓 크기' }}
          </button>
          <button @click="toggleLock('leaderStatus')" class="text-xs px-2 py-1 rounded border" :class="locks.leaderStatus ? 'bg-yellow-100 border-yellow-300' : 'bg-black-50 border-black-200'">
            {{ locks.leaderStatus ? '🔒 우두' : '🔓 우두' }}
          </button>
          <button @click="toggleLock('socialPattern')" class="text-xs px-2 py-1 rounded border" :class="locks.socialPattern ? 'bg-yellow-100 border-yellow-300' : 'bg-black-50 border-black-200'">
            {{ locks.socialPattern ? '🔒 사회' : '🔓 사회' }}
          </button>
          <button @click="toggleLock('behaviorPatterns')" class="text-xs px-2 py-1 rounded border" :class="locks.behaviorPatterns ? 'bg-yellow-100 border-yellow-300' : 'bg-black-50 border-black-200'">
            {{ locks.behaviorPatterns ? '🔒 행동' : '🔓 행동' }}
          </button>
          <button @click="toggleLock('movements')" class="text-xs px-2 py-1 rounded border" :class="locks.movements ? 'bg-yellow-100 border-yellow-300' : 'bg-black-50 border-black-200'">
            {{ locks.movements ? '🔒 이동' : '🔓 이동' }}
          </button>
          <button @click="toggleLock('senses')" class="text-xs px-2 py-1 rounded border" :class="locks.senses ? 'bg-yellow-100 border-yellow-300' : 'bg-black-50 border-black-200'">
            {{ locks.senses ? '🔒 감각' : '🔓 감각' }}
          </button>
          <button @click="toggleLock('attackRanges')" class="text-xs px-2 py-1 rounded border" :class="locks.attackRanges ? 'bg-yellow-100 border-yellow-300' : 'bg-black-50 border-black-200'">
            {{ locks.attackRanges ? '🔒 공격' : '🔓 공격' }}
          </button>
          <button @click="toggleLock('traces')" class="text-xs px-2 py-1 rounded border" :class="locks.traces ? 'bg-yellow-100 border-yellow-300' : 'bg-black-50 border-black-200'">
            {{ locks.traces ? '🔒 흔적' : '🔓 흔적' }}
          </button>
          <button @click="toggleLock('resources')" class="text-xs px-2 py-1 rounded border" :class="locks.resources ? 'bg-yellow-100 border-yellow-300' : 'bg-black-50 border-black-200'">
            {{ locks.resources ? '🔒 자원' : '🔓 자원' }}
          </button>
          <button @click="toggleLock('riskSignals')" class="text-xs px-2 py-1 rounded border" :class="locks.riskSignals ? 'bg-yellow-100 border-yellow-300' : 'bg-black-50 border-black-200'">
            {{ locks.riskSignals ? '🔒 위험' : '🔓 위험' }}
          </button>
        </div>
      </div>
      
      <div v-else class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 text-center py-12 text-black-400">
        상단 버튼을 눌러 몬스터 관찰 데이터를 생성하세요
      </div>
    </template>
  </div>
</template>
