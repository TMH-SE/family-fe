/* eslint-disable eol-last */
import React from 'react'
import { Menu, Dropdown } from 'antd'
import { ShareAltOutlined, FacebookFilled, LinkOutlined } from '@ant-design/icons'

const menu = (
  <Menu>
    <Menu.Item key="0">
      <FacebookFilled />Facebook
    </Menu.Item>
    <Menu.Item key="1">
      <LinkOutlined />Copy link chia sẻ
    </Menu.Item>
    {/* <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item> */}
  </Menu>
)

function SharePost () {
  return (<Dropdown overlay={menu} trigger={['click']} placement='bottomRight'>
    {/* <a className="ant-dropdown-link" onClick={e => e.preventDefault()}> */}
    <ShareAltOutlined key='share'/>
    {/* </a> */}
  </Dropdown>)
}
export default SharePost