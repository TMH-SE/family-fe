import React from 'react'
import './ConversationSearch.css'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

export default function ConversationSearch () {
  return (
    <div className='conversation-search'>
      <Input
        className='search-flex'
        // style={{ height: 30, borderRadius: 40 }}
        prefix={<SearchOutlined />}
        placeholder='Tìm kiếm'
      ></Input>
      {/* <input
          type='search'
          className='conversation-search-input'
          placeholder='Search Messages'
        /> */}
    </div>
  )
}
