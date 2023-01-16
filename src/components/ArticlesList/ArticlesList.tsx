import React, { useEffect } from 'react';
import { Grid, CircularProgress, Box } from '@mui/material';
import { useGetArticlesQuery } from '../../redux/articlesApi';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useSelector } from 'react-redux';
import { selectPage } from '../../redux/searchSlice';

type IProps = {
  filter: string;
  summaryPages: number;
};

export const ArticlesList: React.FC<IProps> = ({ filter, summaryPages }) => {
  const page: number = useSelector(selectPage);
  const { loadMoreRef } = useInfiniteScroll(summaryPages);
  const { data, isFetching } = useGetArticlesQuery({ filter, page });

  useEffect(() => {
    console.log('page changes: ', page);
  }, [page]);

  return (
    <>
      <Grid container spacing={45}>
        {data?.map(article => (
          <ArticleItem key={article.title} article={article} filter={filter} />
        ))}
      </Grid>
      {isFetching && (
        <Box
          sx={{
            height: 200,
            display: 'flex',
            justifyContent: 'center',
            alighnItems: 'center',
            m: 60,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <div ref={loadMoreRef}></div>
    </>
  );
};
