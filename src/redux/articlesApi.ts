import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Articles } from '../types/articles';
import { IArticle } from '../types/article';
import { IQuery } from '../types/query';
import { createQueryString } from './createQueryString';

export const articlesApi = createApi({
  reducerPath: 'articles',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spaceflightnewsapi.net',
  }),
  tagTypes: ['Article'],
  endpoints: builder => ({
    getArticles: builder.query<Articles, IQuery>({
      query: ({ filter, page }) =>
        `/v3/articles?${createQueryString(filter)}&_limit=12&_start=${page}`,
      providesTags: ['Article'],
      transformResponse: (response: Articles, _meta, args) => {
        if (args.filter === '') return response;
        const firstArray: Articles = [];
        const secondArray: Articles = [];
        response.forEach(page => {
          if (
            args.filter
              .toLowerCase()
              .split(' ')
              .some(word => page.title.toLowerCase().includes(word))
          ) {
            firstArray.push(page);
          } else {
            secondArray.push(page);
          }
        });
        return [...firstArray, ...secondArray];
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
    getArticleById: builder.query<IArticle, string>({
      query: id => `/v3/articles/${id}`,
      providesTags: ['Article'],
    }),
    getArticlesCount: builder.query<number, string>({
      query: filter => `/v3/articles/count?${createQueryString(filter)}`,
      providesTags: ['Article'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useGetArticlesCountQuery,
} = articlesApi;
