import { combineReducers, configureStore } from '@reduxjs/toolkit'

import postReducer from './reducers/PostSlice.ts'
import { postApi } from '../services/PostService.ts'

const rootReducer = combineReducers({
  postReducer,
  [postApi.reducerPath]: postApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postApi.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
