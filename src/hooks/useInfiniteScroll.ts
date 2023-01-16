import { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPage, setPage } from '../redux/searchSlice';

export const useInfiniteScroll = (summaryPages: number) => {
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const loadMoreRef = useRef(null);
  const downloadedPages = page + 6;

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

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [handleObserver]);

  return { loadMoreRef };
};
