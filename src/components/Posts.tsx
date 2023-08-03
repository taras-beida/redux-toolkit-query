import { useState } from 'react'

import { Col, Empty, Input, Row } from 'antd'

import { postApi } from '../services/PostService.ts'
import PostCard from './PostCard.tsx'
import CreatePostButton from './CreatePostButton.tsx'

const Posts = () => {
  const [appliedSearch, setAppliedSearch] = useState('')

  const { data: posts, isLoading } = postApi.useFetchAllPostsQuery({
    limit: 24,
    search: appliedSearch,
  })

  const handleSearch = (value: string) => {
    setAppliedSearch(value)
  }

  return (
    <div>
      <Input.Search
        style={{ margin: '0 0 8px' }}
        placeholder="Search..."
        allowClear
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
      />

      {!isLoading && !posts?.length && (
        <Empty>
          <CreatePostButton />
        </Empty>
      )}

      <Row gutter={16} justify="start">
        {posts?.map((post) => (
          <Col
            key={post.id}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 8 }}
          >
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Posts
