import { Col, Empty, Row } from 'antd'

import { useAppSelector } from '../hooks/redux.ts'
import PostCard from './PostCard.tsx'

const Favorites = () => {
  const { favoritePosts } = useAppSelector((state) => state.postReducer)

  if (!favoritePosts.length) return <Empty />

  return (
    <Row gutter={16} justify="start">
      {favoritePosts.map((post) => (
        <Col key={post.id} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
          <PostCard post={post} />
        </Col>
      ))}
    </Row>
  )
}

export default Favorites
