import React from 'react';
import {
  Typography,
  Grid,
  Stack,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from '@mui/material';
import { format } from 'date-fns';

import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
import { ReactComponent as CalendarIcon } from '../../images/calendar.svg';
import { IArticle } from '../../types/article';
import { ButtonLink } from '../ButtonLink/ButtonLink';
import { usePickKeyWords } from '../../hooks/usePickKeyWords';

type IProps = {
  article: IArticle;
};

export const ArticleItem: React.FC<IProps> = ({
  article: { id, imageUrl, title, publishedAt, summary },
}) => {
  const pickKeyWords = usePickKeyWords();

  const returnShortDescription = (text: string) => {
    return text.length <= 100 ? text : `${text.slice(0, 100)}...`;
  };

  return (
    <Grid key={id} item xs={4} display="flex">
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          border: 1,
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
          borderRadius: '5px',
          borderColor: '#EAEAEA',
        }}
      >
        <CardMedia sx={{ height: 217 }} image={imageUrl} title={title} />
        <Stack flexGrow={1} p={25}>
          <CardContent
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 0,
              mb: 20,
            }}
          >
            <Stack gap={25} mb={20}>
              <Stack direction="row" alignItems="stratch" spacing={8}>
                <CalendarIcon />
                <Typography component="span" variant="subtitle1">
                  {format(new Date(publishedAt), 'MMMM do, y')}
                </Typography>
              </Stack>
              <Typography component="h2" variant="h2">
                {pickKeyWords(title)}
              </Typography>
            </Stack>

            <Typography component="p" variant="body1">
              {pickKeyWords(returnShortDescription(summary))}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              p: 0,
            }}
          >
            <ButtonLink link={`/${id}`}>
              Read more <ArrowIcon />
            </ButtonLink>
          </CardActions>
        </Stack>
      </Card>
    </Grid>
  );
};
