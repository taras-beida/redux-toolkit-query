import { useState } from 'react'

import { Col, Row, Tabs } from 'antd'

import Posts from './components/Posts.tsx'
import Favorites from './components/Favorites.tsx'
import CreatePostButton from './components/CreatePostButton.tsx'

function App() {
  const [activeTab, setActiveTab] = useState('1')

  const handleChangeTab = (newActiveTab: string) => {
    setActiveTab(newActiveTab)
  }

  return (
    <Row justify="center">
      <Col
        xs={{ span: 24 }}
        lg={{ span: 24 }}
        xl={{ span: 20 }}
        xxl={{ span: 16 }}
      >
        <Tabs
          tabBarExtraContent={activeTab === '1' ? <CreatePostButton /> : null}
          activeKey={activeTab}
          onChange={handleChangeTab}
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
