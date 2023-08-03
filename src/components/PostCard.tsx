import { FC, useEffect, useMemo, useState } from 'react'

import { Card, message, Popconfirm } from 'antd'
import {
  CommentOutlined,
  DeleteOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons'

import { IPost } from '../models/IPost.ts'
import { postSlice } from '../store/reducers/PostSlice.ts'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'
import { postApi } from '../services/PostService.ts'

import AppModal from './AppModal.tsx'
import PostCardComments from './PostCardComments.tsx'

interface Props {
  post: IPost
}

const PostCard: FC<Props> = ({ post }) => {
  const { id, title, body } = post

  const dispatch = useAppDispatch()

  const [deletePost, { data: deletedPost }] = postApi.useDeletePostMutation()
  const { favoritePosts } = useAppSelector((state) => state.postReducer)
  const { addFavouritePost, deleteFavouritePost } = postSlice.actions
  const [isShowComment, setShowComments] = useState(false)

  const isFavourite = useMemo(
    () => favoritePosts.includes(post),
    [favoritePosts, post]
  )

  const handleFavorite = () => {
    if (isFavourite) {
      dispatch(deleteFavouritePost(post))
    } else {
      dispatch(addFavouritePost(post))
    }
  }

  const handleDelete = () => {
    deletePost(id)
  }

  useEffect(() => {
    if (deletedPost) message.success('Successfully deleted')
  }, [deletedPost])

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
        <Popconfirm
          title="Delete the post"
          description="Are you sure to delete this post?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined key="delete" />
        </Popconfirm>,
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
        <PostCardComments postId={post.id} />
      </AppModal>
    </Card>
  )
}

export default PostCard
