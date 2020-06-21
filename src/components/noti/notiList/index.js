import React, { useState, useEffect, useContext } from 'react'

import firebase from 'firebase/app'
import {
  HeartTwoTone,
  MessageTwoTone,
  LikeTwoTone,
  FileTextTwoTone
} from '@ant-design/icons'
import { List, Avatar } from 'antd'
import '../index.scss'
import { IContext } from '@tools'

const arrType = [
  {
    type: 'cmt',
    icon: <MessageTwoTone />
  },
  {
    type: 'tag',
    icon: <MessageTwoTone />
  },
  {
    type: 'follow',
    icon: <HeartTwoTone />
  },
  {
    type: 'reaction',
    icon: <LikeTwoTone />
  },
  {
    type: 'post',
    icon: <FileTextTwoTone />
  }
]

const NotiList = props => {
  const { me } = useContext(IContext)
  const { noti, history } = props
  return (
    <List.Item
      className="noti-item"
      style={{
        backgroundColor: noti.seen ? 'initial' : 'rgba(214, 234, 248, 0.8)'
      }}
      onClick={() => {
        firebase
          .database()
          .ref('notifications/' + me?._id + '/' + noti.id)
          .update({
            seen: true
          })
        history.push(`${noti.link}`)
        // setVisible(false)
      }}
    >
      {/* <Skeleton avatar title={false} loading={item.loading} active> */}
      <List.Item.Meta
        avatar={
          <Avatar
            style={{ backgroundColor: 'initial' }}
            icon={arrType.filter(item => noti?.action === item.type)[0]?.icon}
          />
        }
        title={
          // <a
          // onClick={() => history.push(`${noti?.link}`)}
          // >
          noti.content.trim()
          // </a>
        }
        description={
          <p style={{ fontSize: 10 }}>
            {noti?.createdAt
              ? new Date(noti?.createdAt).toLocaleString()
              : new Date().toLocaleString()}
          </p>
        }
      />
      {/* <div>content</div> */}
      {/* </Skeleton> */}
    </List.Item>
  )
}
export default NotiList
