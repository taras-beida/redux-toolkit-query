import { Col, Empty, Row } from 'antd'

import { postApi } from '../services/PostService.ts'
import PostCard from './PostCard.tsx'
import CreatePostButton from './CreatePostButton.tsx'

const Posts = () => {
  const { data: posts, isLoading } = postApi.useFetchAllPostsQuery(24)

  if (!isLoading && !posts?.length) {
    return (
      <Empty>
        <CreatePostButton />
      </Empty>
    )
  }

  return (
    <Row gutter={16} justify="start">
      {posts?.map((post) => (
        <Col key={post.id} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
          <PostCard post={post} />
        </Col>
      ))}
    </Row>
  )
}

export default Posts
