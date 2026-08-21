import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useGetQuery } from '../app/composables/query/useGetQuery';
import { useDeleteMutation } from '../app/composables/query/useDeleteMutation';
import { usePostMutation } from '../app/composables/query/usePostMutation';

const mockFetch = vi.fn();
const itemQueryKeys = {
  create: [
    'items',
    'create',
  ] as const,
  detail: (
    itemId: string,
  ) => [
    'items',
    'detail',
    itemId,
  ] as const,
  remove: [
    'items',
    'remove',
  ] as const,
};

vi.stubGlobal('$fetch', mockFetch);

describe('useGetQuery', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('does not fetch automatically and fetches when refetch is called', async () => {
    mockFetch.mockResolvedValue({
      id: 'item-1',
    });
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    let query: ReturnType<typeof useGetQuery<{ id: string }>> | undefined;

    mount(defineComponent({
      setup() {
        query = useGetQuery<{ id: string }>({
          key: itemQueryKeys.detail('item-1'),
          queryOptions: {
            enabled: false,
          },
          url: '/api/items/item-1',
        });

        return () => null;
      },
    }), {
      global: {
        plugins: [
          [
            VueQueryPlugin,
            {
              queryClient,
            },
          ],
        ],
      },
    });

    expect(mockFetch).not.toHaveBeenCalled();

    await query?.refetch();

    expect(mockFetch).toHaveBeenCalledWith('/api/items/item-1', {
      body: undefined,
      headers: undefined,
      method: 'GET',
      query: undefined,
    });
  });

  it('passes mutation variables to an internal POST fetcher', async () => {
    const onSuccess = vi.fn();
    const queryClient = new QueryClient();
    let mutation: ReturnType<
      typeof usePostMutation<
        { id: string },
        { title: string }
      >
    > | undefined;

    mockFetch.mockResolvedValue({
      id: 'document-1',
    });

    mount(defineComponent({
      setup() {
        mutation = usePostMutation<
          { id: string },
          { title: string }
        >({
          key: itemQueryKeys.create,
          mutationOptions: {
            onSuccess,
          },
          params: {
            projectId: 'project-1',
          },
          url: '/api/documents',
        });

        return () => null;
      },
    }), {
      global: {
        plugins: [
          [
            VueQueryPlugin,
            {
              queryClient,
            },
          ],
        ],
      },
    });

    await mutation?.mutateAsync({
      title: '새 문서',
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
    expect(onSuccess).toHaveBeenCalledOnce();
  });

  it('allows DELETE requests to carry a batch body', async () => {
    const queryClient = new QueryClient();
    let mutation: ReturnType<
      typeof useDeleteMutation<
        undefined,
        { ids: string[] }
      >
    > | undefined;

    mockFetch.mockResolvedValue(undefined);

    mount(defineComponent({
      setup() {
        mutation = useDeleteMutation<
          undefined,
          { ids: string[] }
        >({
          key: itemQueryKeys.remove,
          url: '/api/documents',
        });

        return () => null;
      },
    }), {
      global: {
        plugins: [
          [
            VueQueryPlugin,
            {
              queryClient,
            },
          ],
        ],
      },
    });

    await mutation?.mutateAsync({
      ids: [
        'document-1',
        'document-2',
      ],
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/documents', {
      body: {
        ids: [
          'document-1',
          'document-2',
        ],
      },
      headers: undefined,
      method: 'DELETE',
      query: undefined,
    });
  });
});
