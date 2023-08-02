import { useAppDispatch, useAppSelector } from './hooks/redux.ts'
import { postSlice } from './store/reducers/PostSlice.ts'
import { postApi } from './services/PostService.ts'
import { IPost } from './models/IPost.ts'

function App() {
  const dispatch = useAppDispatch()

  const { favoritePosts } = useAppSelector((state) => state.postReducer)
  const { addFavouritePost, deleteFavouritePost } = postSlice.actions

  const { data: posts } = postApi.useFetchAllPostsQuery(10)

  const handleAddFav = (post: IPost) => {
    dispatch(addFavouritePost(post))
  }

  const handlerDeleteFav = (post: IPost) => {
    dispatch(deleteFavouritePost(post))
  }

  return (
    <div>
      <h2>FAVORITES:</h2>
      {favoritePosts.map((fav) => (
        <div key={fav.id}>{fav.title}</div>
      ))}

      <h2>POSTS:</h2>
      {posts?.map((post) => (
        <div key={post.id}>
          {post.title}
          <button onClick={() => handleAddFav(post)}>add to fav</button>
          <button onClick={() => handlerDeleteFav(post)}>
            delete from fav
          </button>
        </div>
      ))}
    </div>
  )
}

export default App
