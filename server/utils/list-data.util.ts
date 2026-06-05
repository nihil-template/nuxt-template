export interface ListDataPageOptions {
  /**
   * 검색 조건 없이 존재하는 전체 아이템 수
   */
  totalElements?: number;

  /**
   * 검색/필터 조건에 매칭된 전체 아이템 수
   */
  filteredElements?: number;

  /**
   * 현재 페이지. 0부터 시작한다.
   */
  page?: number;

  /**
   * 한 페이지에 보여줄 아이템 수
   */
  pageSize?: number;
}

export class ListData {
  static async data<TData>(data: TData[], options: ListDataPageOptions = {}) {
    const totalElements = options.totalElements ?? data.length;
    const filteredElements = options.filteredElements ?? totalElements;
    const page = Math.max(options.page ?? 0, 0);
    const pageSize = Math.max(options.pageSize ?? data.length, 0);
    const totalPages
      = pageSize === 0
        ? 0
        : Math.ceil(filteredElements / pageSize);

    return {
      list: data,
      pageInfo: {
        totalElements,
        filteredElements,
        page,
        pageSize,
        totalPages,
        isFirst: page === 0,
        isLast: totalPages === 0 || page >= totalPages - 1,
        hasPrev: page > 0 && totalPages > 0,
        hasNext: page < totalPages - 1,
        isEmpty: data.length === 0,
        numberOfElements: data.length,
      },
    };
  }
}
