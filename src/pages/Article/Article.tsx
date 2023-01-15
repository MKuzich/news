import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { Container, Button, Paper, Typography } from '@mui/material';
import { ReactComponent as BackArrowIcon } from '../../images/back-arrow.svg';
import { useGetArticleByIdQuery } from '../../redux/articlesApi';
import { BackgroundHeader } from './Article.styled';

const Article: React.FC = () => {
  const location = useLocation();
  const backLink = location.state.from;
  const { articleId } = useParams();
  const { data } = useGetArticleByIdQuery(articleId!);
  return (
    <section>
      <Container
        disableGutters
        sx={{
          px: 75,
          pt: 150,
          pb: 45,
          overflow: 'hidden',
          position: 'relative',
        }}
        maxWidth="xl"
      >
        <div>
          <Paper
            sx={{
              px: 75,
              pt: 35,
              pb: 50,
              mb: 35,
              borderColor: '#E5E5E5',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
              borderRadius: '5px',
            }}
          >
            <Typography component="h1" variant="h2" textAlign="center" mb={50}>
              {data?.title}
            </Typography>
            <Typography component="p" variant="body2">
              {data?.summary}
            </Typography>
          </Paper>
          <Button
            variant="text"
            component={Link}
            to={backLink}
            sx={{
              color: '#363636',
              p: 0,
              fontWeight: 700,
              gap: 6,
              textTransform: 'none',
            }}
          >
            <BackArrowIcon />
            Back to homepage
          </Button>
        </div>
        <BackgroundHeader imageUrl={data?.imageUrl} />
      </Container>
    </section>
  );
};

export default Article;
