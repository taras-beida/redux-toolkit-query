import { Col, Row } from 'antd'

import { useAppSelector } from '../hooks/redux.ts'
import AppCard from './AppCard.tsx'

const Favorites = () => {
  const { favoritePosts } = useAppSelector((state) => state.postReducer)

  return (
    <Row gutter={16}>
      {favoritePosts.map((post) => (
        <Col key={post.id} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
          <AppCard post={post} />
        </Col>
      ))}
    </Row>
  )
}

export default Favorites
