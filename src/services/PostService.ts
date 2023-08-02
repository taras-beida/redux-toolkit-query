import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPost } from '../models/IPost.ts'
import { IComment } from '../models/IComment.ts'

export const postApi = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API}` }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    /*
      QUERY
    */
    fetchAllPosts: build.query<IPost[], number>({
      query: (limit = 10) => ({
        url: '/posts',
        params: {
          _limit: limit,
        },
      }),
      providesTags: ['Post'],
    }),
    fetchPostComments: build.query<IComment[], number>({
      query: (postId) => ({
        url: `/posts/${postId}/comments`,
        params: {
          _limit: 50,
        },
      }),
    }),

    /*
      MUTATION
    */
    addPost: build.mutation<IPost, Partial<IPost>>({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: build.mutation<IPost, number>({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
})
