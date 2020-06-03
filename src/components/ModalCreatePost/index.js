/* eslint-disable react/prop-types */
import React from 'react'
import { Modal, Button, Select, Form } from 'antd'
import 'antd/dist/antd.css'
import { Editor } from '../../components'
import './index.css'

function ModalCreatePost(props) {
  const { isBroken, visible, handleCancel, handleOk } = props
  const options = [
    { label: 'Community 1', value: 1 },
    { label: 'Community 2', value: 2 },
    { label: 'Community 3', value: 3 }
  ]
  return (
    <Modal
      width={isBroken ? '100vw' : '50%'}
      centered
      className="modal"
      visible={visible}
      title="Tạo bài viết"
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Đăng bài'
      cancelText='Đóng'
    >
      <Form layout='vertical'>
        <Form.Item name='communityId' label='Cộng đồng'>
          <Select
            placeholder='Chọn cộng đồng'
            showArrow={false}
            options={options}
            showSearch
            filterOption={(inputValue, option) => option.label.toLocaleLowerCase().indexOf(inputValue.toLowerCase()) !== -1}
          />
        </Form.Item>
        <Form.Item label='Nội dung'>
          <div style={{ width: '100%' }}>
            <Editor />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default ModalCreatePost
