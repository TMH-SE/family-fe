/* eslint-disable react/prop-types */
import React from 'react'
import { Dropdown } from 'antd'
import { LikeTwoTone, CommentOutlined, EllipsisOutlined } from '@ant-design/icons'
import SharePost from '../SharePost'
import CommentPost from '../Comment'

export const actionPost = props => {
  console.log(props, 'prsdsd')
  return [<div key='like'>
    <LikeTwoTone />
    <span style={{ fontWeight: 'bold' }}> 19 </span>
  </div>,
  <div key='comment'>
    <CommentOutlined />
    <span style={{ fontWeight: 'bold' }}> 8 </span>
  </div>,
  <SharePost key='share' />,
  <Dropdown
    key='menu'
    overlay={props.menu}
    trigger={['click']}
    placement='bottomRight'
  >
    <EllipsisOutlined />
  </Dropdown>,
  <CommentPost key='commet'></CommentPost>]
}