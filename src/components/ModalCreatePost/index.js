/* eslint-disable react/prop-types */
import React from 'react'
import { Modal, Button, AutoComplete, Input } from 'antd'
import 'antd/dist/antd.css'
import { Editor } from '../../components'
import './index.css'
import { SearchOutlined, EditTwoTone } from '@ant-design/icons'

function ModalCreatePost (props) {
  const { isBroken, visible, handleCancel, handleOk } = props
  const options = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' }
  ]
  return (
    <Modal
      width={isBroken ? '100vw' : '50%'}
      centered
      className='modal'
      visible={visible}
      title={<h1> Tạo Bài Viết </h1>}
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
      <div className='create-post' style={{ display: 'flex', flexDirection: 'column' }}>
        <AutoComplete
          options={options}
          //  placeholder="try to type `b`"
          filterOption={(inputValue, option) => {
            return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }}
        >
          <Input style={{ width: '100%' }} prefix={<SearchOutlined/>} size="large" placeholder="Chọn công đồng" />
        </AutoComplete>
        <br></br>
        <Input prefix={<EditTwoTone />} style={{ width: '100%' }} placeholder='Tiêu đề bài viết'></Input>
        <br></br>
        <Editor></Editor>
      </div>
    </Modal>
  )
}
export default ModalCreatePost
