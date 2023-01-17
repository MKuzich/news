import React from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectPage } from '../../redux/searchSlice';
import { useGetArticlesQuery } from '../../redux/articlesApi';

import { ArticleItem } from '../ArticleItem/ArticleItem';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Loader } from '../Loader/Loader';

export const ArticlesList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') ?? '';
  const page: number = useSelector(selectPage);
  const { loadMoreRef } = useInfiniteScroll();
  const { data, isFetching, isSuccess } = useGetArticlesQuery({ filter, page });

  return (
    <>
      <Grid container spacing={45}>
        {isSuccess &&
          data.map(article => (
            <ArticleItem key={article.title} article={article} />
          ))}
      </Grid>
      {isFetching && <Loader />}
      <div ref={loadMoreRef}></div>
    </>
  );
};
