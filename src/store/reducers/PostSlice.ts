import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPost } from '../../models/IPost.ts'

interface PostState {
  favoritePosts: IPost[]
  isLoading: boolean
  error: string
}

const initialState: PostState = {
  favoritePosts: [],
  isLoading: false,
  error: '',
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addFavouritePost(state, action: PayloadAction<IPost>) {
      state.favoritePosts.unshift(action.payload)
    },
    deleteFavouritePost(state, action: PayloadAction<IPost>) {
      state.favoritePosts = state.favoritePosts.filter(
        (post) => post.id !== action.payload.id
      )
    },
  },
})

export default postSlice.reducer
