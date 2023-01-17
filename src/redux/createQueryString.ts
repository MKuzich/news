export const createQueryString = (filter: string): string => {
  if (filter === '') return '';
  return filter
    .split(' ')
    .map(
      (itm, idx) =>
        `_where[_or][${idx * 2}][title_contains]=${itm}&_where[_or][${
          idx * 2 + 1
        }][summary_contains]=${itm}`
    )
    .join('&');
};
