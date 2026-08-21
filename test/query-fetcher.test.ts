import { afterEach, describe, expect, it, vi } from 'vitest';

import { requestApi } from '../app/composables/query/fetcher';

const mockFetch = vi.fn();

vi.stubGlobal('$fetch', mockFetch);

describe('requestApi', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('keeps params and body inside the query hook fetcher', async () => {
    mockFetch.mockResolvedValue({
      id: 'document-1',
    });

    await expect(requestApi<{ id: string }>({
      body: {
        title: '새 문서',
      },
      method: 'POST',
      params: {
        projectId: 'project-1',
      },
      url: '/api/documents',
    })).resolves.toEqual({
      id: 'document-1',
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/documents', {
      body: {
        title: '새 문서',
      },
      headers: undefined,
      method: 'POST',
      query: {
        projectId: 'project-1',
      },
    });
  });
});
