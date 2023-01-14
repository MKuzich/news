import React from 'react';
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
import EastIcon from '@mui/icons-material/East';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { format } from 'date-fns';
import { IArticle } from '../../types/article';
import { PickedWord } from './ArticleItem.styled';

type IProps = {
  article: IArticle;
  filter: string;
};

export const ArticleItem: React.FC<IProps> = ({
  article: { id, imageUrl, title, publishedAt, summary },
  filter,
}) => {
  const returnShortDescription = (text: string) => {
    return text.length <= 100 ? text : `${text.slice(0, 100)}...`;
  };

  const pickKeyWords = (text: string): any => {
    return text.split(filter);
  };

  return (
    <Grid key={id} item xs={4} display="flex">
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          border: 1,
          borderRadius: 2,
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
              <Stack direction="row" alignItems="center" spacing={8}>
                <CalendarTodayOutlinedIcon
                  sx={{ color: '#363636', fontSize: 14 }}
                />
                <Typography variant="subtitle1">
                  {format(new Date(publishedAt), 'MMMM do, y')}
                </Typography>
              </Stack>
              <Typography variant="h2">{title}</Typography>
            </Stack>

            <Typography variant="body1">
              {returnShortDescription(summary)}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              p: 0,
            }}
          >
            <Button
              variant="text"
              sx={{ color: '#363636', p: 0, fontWeight: 700 }}
            >
              Read more <EastIcon />
            </Button>
          </CardActions>
        </Stack>
      </Card>
    </Grid>
  );
};
