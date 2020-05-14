/* eslint-disable react/prop-types */
import React from 'react'
import { Modal, Button } from 'antd'
import 'antd/dist/antd.css'
import { Editor } from '../../components'
import './index.css'

function ModalCreatePost (props) {
  const { isBroken, visible, handleCancel, handleOk } = props
  return (
    <Modal
      width={isBroken ? '100vw' : '50%'}
      centered
      className='modal'
      visible={visible}
      title='Tạo bài viết'
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key='back' onClick={handleCancel}>
          Return
        </Button>,
        <Button key='submit' type='primary' onClick={handleOk}>
          Submit
        </Button>
      ]}
    >
      <Editor></Editor>
    </Modal>
  )
}
export default ModalCreatePost
