import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  InputLabel,
  InputAdornment,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useGetArticlesQuery } from '../../redux/articlesApi';
import { ArticlesList } from '../../components/ArticlesList/ArticlesList';

const Home: React.FC = () => {
  const [filter, setFilter] = useState('');
  const { data } = useGetArticlesQuery(filter);

  const onInputChangeFilter = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setFilter(e.target.value.trim());
  return (
    <Paper>
      <Container disableGutters sx={{ px: 75, pt: 50, pb: 63 }} maxWidth="xl">
        <Box>
          <Box sx={{ maxWidth: 600, mb: 40 }}>
            <InputLabel shrink htmlFor="filter-articles" sx={{ mb: 10 }}>
              <Typography variant="subtitle2">Filter by keywords</Typography>
            </InputLabel>
            <TextField
              onChange={onInputChangeFilter}
              fullWidth
              id="filter-articles"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Typography>{`Results: ${data?.length ?? 0}`}</Typography>
          <ArticlesList data={data ?? []} filter={filter} />
        </Box>
      </Container>
    </Paper>
  );
};

export default Home;
