import React, { Fragment } from 'react';
import {
  Typography,
  Grid,
  Button,
  Stack,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from '@mui/material';
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
import { ReactComponent as CalendarIcon } from '../../images/calendar.svg';
import { format } from 'date-fns';
import { IArticle } from '../../types/article';
import { Link, useLocation } from 'react-router-dom';

type IProps = {
  article: IArticle;
  filter: string;
};

export const ArticleItem: React.FC<IProps> = ({
  article: { id, imageUrl, title, publishedAt, summary },
  filter,
}) => {
  const location = useLocation();

  const returnShortDescription = (text: string) => {
    return text.length <= 100 ? text : `${text.slice(0, 100)}...`;
  };

  const pickKeyWords = (text: string): any => {
    if (filter.trim() === '') return text;
    const regexp = new RegExp(filter.split(' ').join('|'), 'ig');
    const matchValue = text.match(regexp);
    if (matchValue) {
      return text.split(regexp).map((itm, idx, arr) => {
        if (idx < arr.length - 1) {
          const pick = matchValue.shift();
          return (
            <Fragment key={`${itm}-${idx}`}>
              {itm}
              <span style={{ backgroundColor: 'yellow' }}>{pick}</span>
            </Fragment>
          );
        }
        return <Fragment key={`${itm}-${idx}`}>{itm}</Fragment>;
      });
    }
    return text;
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
            <Button
              variant="text"
              component={Link}
              to={`/${id}`}
              state={{ from: location }}
              sx={{
                color: '#363636',
                p: 0,
                fontWeight: 700,
                gap: 6,
                textTransform: 'none',
              }}
            >
              Read more <ArrowIcon />
            </Button>
          </CardActions>
        </Stack>
      </Card>
    </Grid>
  );
};
