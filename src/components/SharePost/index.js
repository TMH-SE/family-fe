/* eslint-disable no-undef */
/* eslint-disable one-var */
/* eslint-disable eol-last */
import React, { useState, useEffect } from 'react'
import { Menu, Dropdown, Tooltip } from 'antd'
import {
  ShareAltOutlined,
  FacebookFilled,
  LinkOutlined
} from '@ant-design/icons'
import { SdkUtils } from '@utils'
function SharePost(props) {
  const { idPost } = props
  const [title, setTitle] = useState('Nhấp để  copy link')
  const copyLink = () => {
    var copyinput = document.createElement('input')
    copyinput.value = `${window.location.origin}/postdetail/${idPost}`
    document.body.appendChild(copyinput)
    copyinput.select()
    copyinput.setSelectionRange(0, 99999)
    document.execCommand('Copy')
    setTitle('Đã copy link')
  }
  const menu = (
    <Menu>
      <Menu.Item class="btn btn-success clearfix" key="0" onClick={() => SdkUtils.shareFB()} >
        <FacebookFilled />
        Facebook
        {/* <div className="fb-share-button" data-href="http://localhost:8080/postdetail/74345540-a986-11ea-a4a1-214ed62739a0" id="fbshare" data-layout="button_count"></div> */}
      </Menu.Item>
      <Menu.Item key="1" onClick={() => copyLink()}>
        <Tooltip title={title}>
          <LinkOutlined />
          Copy link chia sẻ
        </Tooltip>
      </Menu.Item>
      {/* <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item> */}
    </Menu>
  )
  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      placement="bottomRight"
      onClick={() => setTitle('Nhấp để  copy link')}
    >
      <ShareAltOutlined key="share" />
    </Dropdown>
  )
}
export default SharePost
