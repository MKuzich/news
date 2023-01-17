import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export const Loader: React.FC = () => (
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
);
