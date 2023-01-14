import React from 'react';
import { Grid } from '@mui/material';

import { ArticleItem } from '../ArticleItem/ArticleItem';

import { IArticle } from '../../types/article';

type IProps = {
  data: IArticle[];
  filter: string;
};

export const ArticlesList: React.FC<IProps> = ({ data, filter }) => {
  return (
    <Grid container spacing={45}>
      {data.map(article => (
        <ArticleItem article={article} filter={filter} />
      ))}
    </Grid>
  );
};
