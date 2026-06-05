import { testKeys } from '~/utils/query/test.keys';

export async function useGetTest() {
  const { data: response, ...query } = useGet<string>({
    key: testKeys.all,
    url: '/test',
  });

  return {
    response,
    ...query,
  };
}
