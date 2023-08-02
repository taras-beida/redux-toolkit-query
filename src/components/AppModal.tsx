import { FC, ReactNode } from 'react'
import { Modal } from 'antd'

interface Props {
  isOpen: boolean
  title: string
  handleCancel: () => void
  children: ReactNode
}

const AppModal: FC<Props> = ({ isOpen, title, handleCancel, children }) => {
  return (
    <Modal open={isOpen} title={title} onCancel={handleCancel} footer={<div />}>
      {children}
    </Modal>
  )
}

export default AppModal
