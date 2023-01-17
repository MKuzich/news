import React from 'react';
import {
  Box,
  Typography,
  TextField,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { articlesApi } from '../../redux/articlesApi';
import { setPage } from '../../redux/searchSlice';

import { ReactComponent as SearchIcon } from '../../images/search.svg';

export const Filter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') ?? '';
  const dispatch = useDispatch();

  const onInputChangeFilter = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const normalizedValue = e.target.value
      .split(' ')
      .filter(itm => itm !== ' ' && itm !== '')
      .join(' ');

    if (normalizedValue === filter) return;

    const nextParams: { filter?: string } =
      normalizedValue === '' ? {} : { filter: normalizedValue };

    dispatch(articlesApi.util.resetApiState());
    dispatch(setPage(0));
    setSearchParams(nextParams);
  };

  return (
    <Box sx={{ maxWidth: 600, mb: 40 }}>
      <InputLabel htmlFor="filter-articles" sx={{ mb: 10 }}>
        <Typography component="span" variant="subtitle2">
          Filter by keywords
        </Typography>
      </InputLabel>
      <TextField
        onChange={debounce(onInputChangeFilter, 500)}
        fullWidth
        defaultValue={filter}
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
  );
};
