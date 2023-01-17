import React from 'react';
import { Container, Box, Typography, Divider } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { useGetArticlesCountQuery } from '../../redux/articlesApi';

import { Filter } from '../../components/Filter/Filter';
import { ArticlesList } from '../../components/ArticlesList/ArticlesList';

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') ?? '';
  const { data } = useGetArticlesCountQuery(filter);
  return (
    <section>
      <Container disableGutters sx={{ px: 75, pt: 50, pb: 63 }} maxWidth="xl">
        <Box>
          <Filter />
          <Typography component="span" variant="subtitle2">{`Results: ${
            data ?? 0
          }`}</Typography>
          <Divider sx={{ mb: 45 }} />
          <ArticlesList />
        </Box>
      </Container>
    </section>
  );
};

export default Home;
