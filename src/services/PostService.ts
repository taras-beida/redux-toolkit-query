import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPost } from '../models/IPost.ts'
import { IComment } from '../models/IComment.ts'

export const postApi = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API}` }),
  endpoints: (build) => ({
    fetchAllPosts: build.query<IPost[], number>({
      query: (limit = 10) => ({
        url: '/posts',
        params: {
          _limit: limit,
        },
      }),
    }),
    fetchPostComments: build.query<IComment[], number>({
      query: (postId) => ({
        url: `/posts/${postId}/comments`,
        params: {
          _limit: 10,
        },
      }),
    }),
  }),
})
