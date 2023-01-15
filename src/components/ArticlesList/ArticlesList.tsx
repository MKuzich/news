import React from 'react';
import { Grid } from '@mui/material';

import { useGetArticlesQuery } from '../../redux/articlesApi';

import { ArticleItem } from '../ArticleItem/ArticleItem';

type IProps = {
  filter: string;
};

export const ArticlesList: React.FC<IProps> = ({ filter }) => {
  const { data } = useGetArticlesQuery(filter);
  return (
    <Grid container spacing={45}>
      {data?.map(article => (
        <ArticleItem key={article.title} article={article} filter={filter} />
      ))}
    </Grid>
  );
};
