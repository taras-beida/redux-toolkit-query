import { Col, Row, Tabs } from 'antd'

import { useAppSelector } from './hooks/redux.ts'
import { postApi } from './services/PostService.ts'
import AppCard from './components/AppCard.tsx'

function App() {
  const { favoritePosts } = useAppSelector((state) => state.postReducer)
  const { data: posts } = postApi.useFetchAllPostsQuery(10)

  return (
    <Row justify="center">
      <Col span={18}>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: 'Posts',
              children: (
                <Row gutter={16}>
                  {posts?.map((post) => (
                    <Col key={post.id} span={8}>
                      <AppCard post={post} />
                    </Col>
                  ))}
                </Row>
              ),
            },
            {
              key: '2',
              label: 'Favorite',
              children: (
                <Row gutter={16}>
                  {favoritePosts.map((post) => (
                    <Col key={post.id} span={8}>
                      <AppCard post={post} />
                    </Col>
                  ))}
                </Row>
              ),
            },
          ]}
        />
      </Col>
    </Row>
  )
}

export default App
