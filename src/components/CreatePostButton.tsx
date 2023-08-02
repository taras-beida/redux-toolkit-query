import { useEffect, useState } from 'react'
import { useFormik } from 'formik'

import { Button, Input, Space } from 'antd'

import { IPost } from '../models/IPost.ts'
import { postApi } from '../services/PostService.ts'
import AppModal from './AppModal.tsx'

const validate = (values: Partial<IPost>) => {
  const errors: Partial<IPost> = {}

  if (!values.title) {
    errors.title = 'Required'
  }

  if (!values.body) {
    errors.body = 'Required'
  }

  return errors
}

const CreatePostButton = () => {
  const [isCreateModal, setCreateModal] = useState(false)
  const [addPost, { data: createdPost }] = postApi.useAddPostMutation()

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
    },
    validate,
    onSubmit: (values) => {
      addPost(values)
    },
  })

  useEffect(() => {
    if (createdPost) setCreateModal(false)
  }, [createdPost])

  useEffect(() => {
    if (!isCreateModal) formik.resetForm()
  }, [formik, isCreateModal])

  return (
    <div>
      <Button onClick={() => setCreateModal(true)}>Create Post</Button>

      <AppModal
        isOpen={isCreateModal}
        title="Create post"
        handleCancel={() => setCreateModal(false)}
      >
        <form onSubmit={formik.handleSubmit}>
          <Space size={15} direction="vertical" style={{ width: '100%' }}>
            <Input
              name="title"
              placeholder="Title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              status={
                formik.touched.title && formik.errors.title ? 'error' : ''
              }
            />
            <Input
              name="body"
              placeholder="Body"
              onChange={formik.handleChange}
              value={formik.values.body}
              status={formik.touched.body && formik.errors.body ? 'error' : ''}
            />
          </Space>

          <Button htmlType="submit">Submit</Button>
        </form>
      </AppModal>
    </div>
  )
}

export default CreatePostButton
