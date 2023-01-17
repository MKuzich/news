import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Container, Paper, Typography } from '@mui/material';
import { ReactComponent as BackArrowIcon } from '../../images/back-arrow.svg';
import { useGetArticleByIdQuery } from '../../redux/articlesApi';
import { BackgroundHeader } from './Article.styled';
import { ButtonLink } from '../../components/ButtonLink/ButtonLink';
import { Loader } from '../../components/Loader/Loader';

const Article: React.FC = () => {
  const location = useLocation();
  const backLink = location.state?.from ?? '/';
  const { articleId } = useParams();
  const { data, isFetching, isSuccess } = useGetArticleByIdQuery(articleId!);
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
            {isFetching && <Loader />}
            {isSuccess && (
              <>
                <Typography
                  component="h1"
                  variant="h2"
                  textAlign="center"
                  mb={50}
                >
                  {data.title}
                </Typography>
                <Typography component="p" variant="body2">
                  {data.summary}
                </Typography>
              </>
            )}
          </Paper>
          <ButtonLink link={backLink} style={{ marginLeft: 75 }}>
            <BackArrowIcon />
            Back to homepage
          </ButtonLink>
        </div>
        {isSuccess && <BackgroundHeader imageUrl={data.imageUrl} />}
      </Container>
    </section>
  );
};

export default Article;
