import React, { useState, useRef } from 'react'
import { Drawer, Space, Button } from 'antd'
import { CreatePostForm } from '@components'

function CreatePostDrawer(props) {
  const formRef = useRef()
  const { visible, handleCancel } = props
  const [confirmLoading, setConfirmLoading] = useState(false)

  return (
    <Drawer
      confirmLoading={confirmLoading}
      afterVisibleChange={visible => !visible && formRef?.current?.handleAfterClose()}
      width='100%'
      closable={false}
      visible={visible}
      title="Bài viết mới"
      footer={
        <Space style={{ float: 'right' }}>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button onClick={() => formRef?.current?.handleOk()} type="primary">
            Đăng bài
          </Button>
        </Space>
      }
    >
      <div style={{ width: '80%', margin: '0 auto' }}>
        <CreatePostForm
          ref={formRef}
          setConfirmLoading={setConfirmLoading}
          handleCancel={handleCancel}
        />
      </div>
    </Drawer>
  )
}
export default CreatePostDrawer
