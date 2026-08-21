import { describe, expect, it } from 'vitest';

import { exampleQueryKeys } from '../app/keys/example.query-keys';

describe('exampleQueryKeys', () => {
  it('builds stable all, list, and detail query key scopes', () => {
    expect(exampleQueryKeys.all()).toEqual([
      'examples',
    ]);
    expect(exampleQueryKeys.lists()).toEqual([
      'examples',
      'list',
    ]);
    expect(exampleQueryKeys.list({
      page: 1,
    })).toEqual([
      'examples',
      'list',
      {
        page: 1,
      },
    ]);
    expect(exampleQueryKeys.detail('example-1')).toEqual([
      'examples',
      'detail',
      'example-1',
    ]);
  });
});
