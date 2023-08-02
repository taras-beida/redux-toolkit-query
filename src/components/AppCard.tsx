import { FC, useMemo, useState } from 'react'

import { Card } from 'antd'
import { CommentOutlined, StarFilled, StarOutlined } from '@ant-design/icons'

import { IPost } from '../models/IPost.ts'
import { postSlice } from '../store/reducers/PostSlice.ts'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'

import AppModal from './AppModal.tsx'
import AppCardComments from './AppCardComments.tsx'

interface Props {
  post: IPost
}

const AppCard: FC<Props> = ({ post }) => {
  const { title, body } = post

  const dispatch = useAppDispatch()

  const { favoritePosts } = useAppSelector((state) => state.postReducer)
  const { addFavouritePost, deleteFavouritePost } = postSlice.actions

  const isFavourite = useMemo(
    () => favoritePosts.includes(post),
    [favoritePosts, post]
  )

  const [isShowComment, setShowComments] = useState(false)

  const handleFavorite = () => {
    if (isFavourite) {
      dispatch(deleteFavouritePost(post))
    } else {
      dispatch(addFavouritePost(post))
    }
  }

  return (
    <Card
      title={title}
      className="app-card"
      actions={[
        isFavourite ? (
          <StarFilled
            key="star"
            style={{ color: 'green' }}
            onClick={handleFavorite}
          />
        ) : (
          <StarOutlined key="star" onClick={handleFavorite} />
        ),
        <CommentOutlined
          key="comments"
          onClick={() => setShowComments(true)}
        />,
      ]}
    >
      <div className="app-card-body">
        <div>{body}</div>
      </div>

      <AppModal
        isOpen={isShowComment}
        title="Comments"
        handleCancel={() => setShowComments(false)}
      >
        <AppCardComments postId={post.id} />
      </AppModal>
    </Card>
  )
}

export default AppCard
