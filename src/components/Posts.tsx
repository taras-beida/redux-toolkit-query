import { Col, Row } from 'antd'

import { postApi } from '../services/PostService.ts'
import AppCard from './AppCard.tsx'

const Posts = () => {
  const { data: posts } = postApi.useFetchAllPostsQuery(12)

  console.log('posts', posts)

  return (
    <Row gutter={16}>
      {posts?.map((post) => (
        <Col key={post.id} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
          <AppCard post={post} />
        </Col>
      ))}
    </Row>
  )
}

export default Posts
