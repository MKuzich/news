import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

type SearchState = {
  page: number;
};

const slice = createSlice({
  name: 'search',
  initialState: { page: 0 } as SearchState,
  reducers: {
    setPage: (state, { payload: page }: PayloadAction<number>) => {
      state.page = page;
    },
  },
});

export const { setPage } = slice.actions;

export default slice.reducer;

export const selectPage = (state: RootState): number => state.search.page;
