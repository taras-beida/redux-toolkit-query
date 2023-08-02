import { Col, Row, Tabs } from 'antd'

import Posts from './components/Posts.tsx'
import Favorites from './components/Favorites.tsx'

function App() {
  return (
    <Row justify="center">
      <Col xs={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 20 }}>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: 'Posts',
              children: <Posts />,
            },
            {
              key: '2',
              label: 'Favorites',
              children: <Favorites />,
            },
          ]}
        />
      </Col>
    </Row>
  )
}

export default App
