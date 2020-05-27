/* eslint-disable react/prop-types */
import React from 'react'
import { AutoComplete, Input, Button } from 'antd'
import { EditTwoTone, SearchOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { Editor } from '@components'
// import { brokenContext } from '../../layouts/MainLayout'
// import ModalReport from '../../components/ModalReport'
// import HighLightPost from '../../components/HighlightPost'
// import ModalCreatePost from '../../components/ModalCreatePost'
// var moment = require('moment')
const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' }
]

const CreatePost = (props) => {
  return (
    <>
      <h1> Tạo Bài Viết </h1>
      <div className='create-post' style={{ display: 'flex', flexDirection: 'column' }}>
        <AutoComplete
          options={options}
          //  placeholder="try to type `b`"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        >
          <Input style={{ width: '100%' }} prefix={<SearchOutlined/>} size="large" placeholder="Chọn công đồng" />
        </AutoComplete>
        <br></br>
        <Input prefix={<EditTwoTone />} style={{ width: '100%' }} placeholder='Tiêu đề bài viết'></Input>
        <br></br>
        <Editor></Editor>
        <div style={{ marginTop: 15, display: 'flex', justifyContent: 'flex-end' }}>
          <Button style ={{ fontWeight: 'bolder', marginRight: 15, textAlign: 'center' }}>Hủy</Button>
          <Button style ={{ fontWeight: 'bolder' }} type='primary' >Đăng bài</Button>
        </div>
      </div>
    </>
  )
}

export default withRouter(CreatePost)
