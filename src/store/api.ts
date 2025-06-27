import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/' // This would be your actual API base URL
  }),
  tagTypes: ['News', 'Movies', 'Music'],
  endpoints: (builder) => ({
    // These would be real API endpoints in a production app
    getNews: builder.query({
      query: (category) => `news?category=${category}`,
      providesTags: ['News']
    }),
    getMovies: builder.query({
      query: (genre) => `movies?genre=${genre}`,
      providesTags: ['Movies']
    }),
    getMusic: builder.query({
      query: (genre) => `music?genre=${genre}`,
      providesTags: ['Music']
    })
  })
});

export const { useGetNewsQuery, useGetMoviesQuery, useGetMusicQuery } = api;