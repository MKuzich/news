import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const Error: React.FC = () => {
  return (
    <section>
      <Container
        disableGutters
        sx={{
          px: 75,
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        maxWidth="xl"
      >
        <Box>
          <Typography variant="h2" component="h1">
            Error 404: Page not found!
          </Typography>
        </Box>
      </Container>
    </section>
  );
};

export default Error;
