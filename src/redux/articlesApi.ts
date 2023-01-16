import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Articles } from '../types/articles';
import { IArticle } from '../types/article';
import { IQuery } from '../types/query';

export const articlesApi = createApi({
  reducerPath: 'articles',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spaceflightnewsapi.net',
  }),
  tagTypes: ['Article'],
  endpoints: builder => ({
    getArticles: builder.query<Articles, IQuery>({
      query: ({ filter, page }) =>
        `/v3/articles?_where[_or][0][title_contains]=${filter}&_where[_or][1][summary_contains]=${filter}&_limit=12&_start=${page}`,
      providesTags: ['Article'],
      transformResponse: (response: Articles, _meta, args) => {
        const firstArray: Articles = [];
        const secondArray: Articles = [];
        response.forEach(page => {
          if (page.title.toLowerCase().includes(args.filter.toLowerCase())) {
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
      query: filter =>
        `/v3/articles/count?_where[_or][0][title_contains]=${filter}&_where[_or][1][summary_contains]=${filter}`,
      providesTags: ['Article'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useGetArticlesCountQuery,
} = articlesApi;
