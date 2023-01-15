import React from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  InputLabel,
  InputAdornment,
  Divider,
} from '@mui/material';
import { ReactComponent as SearchIcon } from '../../images/search.svg';
import { useGetArticlesCountQuery } from '../../redux/articlesApi';
import { ArticlesList } from '../../components/ArticlesList/ArticlesList';
import { useSearchParams } from 'react-router-dom';

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') ?? '';
  const { data } = useGetArticlesCountQuery(filter);

  const onInputChangeFilter = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputValue = e.target.value.trim();
    const nextParams: { filter?: string } =
      inputValue !== '' ? { filter: inputValue } : {};
    setSearchParams(nextParams);
  };
  return (
    <section>
      <Container disableGutters sx={{ px: 75, pt: 50, pb: 63 }} maxWidth="xl">
        <Box>
          <Box sx={{ maxWidth: 600, mb: 40 }}>
            <InputLabel htmlFor="filter-articles" sx={{ mb: 10 }}>
              <Typography component="span" variant="subtitle2">
                Filter by keywords
              </Typography>
            </InputLabel>
            <TextField
              value={filter}
              onChange={onInputChangeFilter}
              fullWidth
              id="filter-articles"
              sx={{
                borderColor: '#EAEAEA',
                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
                borderRadius: '5px',
              }}
              inputProps={{
                sx: {
                  paddingTop: 13,
                  paddingBottom: 13,
                  color: '#575757',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { paddingLeft: 20 },
              }}
            />
          </Box>

          <Typography component="span" variant="subtitle2">{`Results: ${
            data ?? 0
          }`}</Typography>
          <Divider sx={{ mb: 45 }} />
          <ArticlesList filter={filter} />
        </Box>
      </Container>
    </section>
  );
};

export default Home;
