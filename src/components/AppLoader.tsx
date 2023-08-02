import { FC } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

interface Props {
  isLoading: boolean
}

const AppLoader: FC<Props> = ({ isLoading }) => {
  if (!isLoading) return null

  return (
    <div style={{ textAlign: 'center' }}>
      <LoadingOutlined style={{ fontSize: '40px', margin: '20px 0' }} />
    </div>
  )
}

export default AppLoader
