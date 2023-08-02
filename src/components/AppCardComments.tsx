import { FC } from 'react'
import { Avatar, List } from 'antd'

import { postApi } from '../services/PostService.ts'
import AppLoader from './AppLoader.tsx'

interface Props {
  postId: number
}

const AppCardComments: FC<Props> = ({ postId }) => {
  const { data: comments, isLoading } =
    postApi.useFetchPostCommentsQuery(postId)

  return (
    <div>
      <AppLoader isLoading={isLoading} />

      {!isLoading && (
        <List
          style={{
            maxHeight: '60vh',
            overflow: 'auto',
          }}
          itemLayout="horizontal"
          dataSource={comments || []}
          renderItem={(item, index) => (
            <List.Item className="app-card-comment">
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={`${item.name} (${item.email})`}
                description={item.body}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  )
}

export default AppCardComments
