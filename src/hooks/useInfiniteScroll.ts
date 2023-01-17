import { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectPage, setPage } from '../redux/searchSlice';
import { useGetArticlesCountQuery } from '../redux/articlesApi';

export const useInfiniteScroll = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') ?? '';
  const { data } = useGetArticlesCountQuery(filter);
  const summaryPages = data ?? 0;
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const loadMoreRef = useRef(null);
  const downloadedPages = page + 12;

  const handleObserver = useCallback(
    (entries: Array<any>) => {
      const [target] = entries;
      if (target.isIntersecting && summaryPages > downloadedPages) {
        dispatch(setPage(downloadedPages));
      }
    },
    [summaryPages, downloadedPages, dispatch]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    const node = loadMoreRef.current;

    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [handleObserver]);

  return { loadMoreRef };
};
