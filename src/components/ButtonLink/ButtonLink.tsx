import React from 'react';
import { Button } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';

type IProps = {
  children: React.ReactNode;
  link: string;
  style?: object;
};

export const ButtonLink: React.FC<IProps> = ({ children, link, style }) => {
  const location = useLocation();
  return (
    <Button
      variant="text"
      component={Link}
      to={link}
      state={{ from: location }}
      sx={{
        ...{
          color: '#363636',
          p: 0,
          fontWeight: 700,
          gap: 6,
          textTransform: 'none',
        },
        ...style,
      }}
    >
      {children}
    </Button>
  );
};
