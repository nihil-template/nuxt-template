import type {
  TListData,
} from '~/types/response.types';

const DEFAULT_PAGE_SIZE = 10;

export function pageData<TData>(
  data: TData[],
  page?: number,
  pageSize?: number,
): TListData<TData> {
  const totalElements = data.length;
  const isUnpagedRequest = page === undefined && pageSize === undefined;
  const requestedPage = Number.isInteger(page) && page > 0
    ? page
    : 1;
  const requestedPageSize = isUnpagedRequest
    ? Math.max(totalElements, 1)
    : Number.isInteger(pageSize) && pageSize > 0
      ? pageSize
      : DEFAULT_PAGE_SIZE;
  const totalPages = Math.ceil(totalElements / requestedPageSize);
  const currentPage = totalPages === 0
    ? 1
    : Math.min(requestedPage, totalPages);
  const startOffset = (currentPage - 1) * requestedPageSize;
  const list = data.slice(
    startOffset,
    startOffset + requestedPageSize,
  );
  const numberOfElements = list.length;

  return {
    list,
    page: currentPage,
    pageSize: requestedPageSize,
    totalElements,
    numberOfElements,
    startIndex: numberOfElements === 0 ? 0 : startOffset + 1,
    endIndex: startOffset + numberOfElements,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
    isFirst: currentPage === 1,
    isLast: totalPages === 0 || currentPage === totalPages,
    empty: numberOfElements === 0,
    totalPages,
  };
}
