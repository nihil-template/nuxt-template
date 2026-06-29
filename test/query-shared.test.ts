import { describe, expect, it } from 'vitest';

import { buildFetchRequestOptions,
  createMutationState,
  normalizeRequestInput } from '../app/composables/query/shared';

describe('normalizeRequestInput', () => {
  it('keeps params and body together with merged headers', () => {
    const normalized = normalizeRequestInput('POST', {
      params: {
 page: 2,
keyword: 'nuxt', 
},
      body: { title: 'entry' },
      headers: { Authorization: 'Bearer token' },
      options: { credentials: 'include' },
    });

    expect(normalized.method).toBe('POST');
    expect(normalized.query).toEqual({
 page: 2,
keyword: 'nuxt', 
});
    expect(normalized.body).toEqual({ title: 'entry' });
    expect(normalized.headers).toEqual({ Authorization: 'Bearer token' });
    expect(normalized.fetchOptions).toMatchObject({ credentials: 'include' });
  });

  it('omits body when it is not provided', () => {
    const normalized = normalizeRequestInput('GET', {
      params: { page: 1 },
    });

    expect(normalized.method).toBe('GET');
    expect(normalized.query).toEqual({ page: 1 });
    expect(normalized.body).toBeUndefined();
  });
});

describe('buildFetchRequestOptions', () => {
  it('returns query, body, and fetch overrides in a single object', () => {
    const normalized = normalizeRequestInput('PATCH', {
      params: { id: 7 },
      body: { active: true },
      options: { credentials: 'same-origin' },
    });

    expect(buildFetchRequestOptions(normalized)).toMatchObject({
      method: 'PATCH',
      query: { id: 7 },
      body: { active: true },
      credentials: 'same-origin',
    });
  });
});

describe('createMutationState', () => {
  it('starts with an idle mutation state', () => {
    const state = createMutationState<number, Error>();

    expect(state.pending.value).toBe(false);
    expect(state.data.value).toBeUndefined();
    expect(state.error.value).toBeNull();
  });
});
