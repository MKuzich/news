import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Articles } from '../types/articles';
import { IArticle } from '../types/article';

export const articlesApi = createApi({
  reducerPath: 'articles',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spaceflightnewsapi.net',
  }),
  tagTypes: ['Article'],
  endpoints: builder => ({
    getArticles: builder.query<Articles, string>({
      query: keyword =>
        `/v3/articles?_where[_or][0][title_contains]=${keyword}&_where[_or][1][summary_contains]=${keyword}`,
      providesTags: ['Article'],
    }),
    getArticleById: builder.query<IArticle, string>({
      query: id => `/v3/articles/${id}`,
      providesTags: ['Article'],
    }),
    getArticlesCount: builder.query<number, string>({
      query: keyword =>
        `/v3/articles/count?_where[_or][0][title_contains]=${keyword}&_where[_or][1][summary_contains]=${keyword}`,
      providesTags: ['Article'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useGetArticlesCountQuery,
} = articlesApi;
