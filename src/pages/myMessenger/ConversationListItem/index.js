/* eslint-disable react/prop-types */
import React, { useContext, useLayoutEffect, useEffect } from 'react'
import firebase from 'firebase/app'
import './ConversationListItem.css'
import { List, Skeleton, Badge, Avatar } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import { GET_USER } from '@shared'
import { IContext } from '@tools'
import { brokenContext } from '../../../layouts/MainLayout'

export default function ConversationListItem(props) {
  const { id, members, lastMess } = props.chat
  const { me, chooseConversation } = useContext(IContext)
  const isBroken = useContext(brokenContext)
  const { data } = useQuery(GET_USER, {
    variables: { userId: members.filter(item => item !== me?._id)[0] }
  })
  useEffect(() => {
    data && props.addSearch({ ...props.chat, name: data?.getUser?.firstname })
  }, [data])

  const selectHandler = () => {
    isBroken
      ? props.history.push(
          `/${members.filter(item => item !== me?._id)[0]}/messenger/${id}`
        )
      : chooseConversation(id, members.filter(item => item !== me?._id)[0])
    firebase
      .database()
      .ref(`messenger/${id}`)
      .child('lastMess')
      .update({ seen: true })
  }

  return lastMess ? (
    <List.Item onClick={() => selectHandler()}>
      <List.Item.Meta
        avatar={
          <Badge dot={lastMess.author !== me?._id && !lastMess.seen}>
            <Avatar size={42} src={data?.getUser?.avatar} />
          </Badge>
        }
        title={data?.getUser?.firstname}
        description={lastMess.content.message || lastMess}
      />
    </List.Item>
  ) : (
    // <div></div>
    <List.Item
      onClick={() => {
        isBroken
          ? props.history.push(
              `/${members.filter(item => item !== me?._id)[0]}/messenger/${id}`
            )
          : chooseConversation(id, members.filter(item => item !== me?._id)[0])
      }}
    >
      <List.Item.Meta
        avatar={<Avatar size={42} src={data?.getUser?.avatar} />}
        title={data?.getUser?.firstname}
        description="Bắt đầu cuộc trò chuyện"
      />
      {/* <ConversationListItem
      key={conversation.name}
        data={conversation} /> */}
    </List.Item>
  )
}
