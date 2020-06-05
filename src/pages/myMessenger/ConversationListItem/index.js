/* eslint-disable react/prop-types */
import React, { useEffect, useContext, useState } from 'react'
import firebase from 'firebase/app'
import './ConversationListItem.css'
import { useHistory } from 'react-router-dom'
import { List, Skeleton, Badge, Avatar } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import { GET_USER } from '@shared'
import { IContext } from '@tools'
import { brokenContext } from '../../../layouts/MainLayout'

export default function ConversationListItem(props) {
  const { _id, members } = props.chat
  const { me, chooseConversation } = useContext(IContext)
  const isBroken = useContext(brokenContext)
  const [conversation, setConversation] = useState(null)
  const { data } = useQuery(GET_USER, {
    variables: { userId: members.filter(item => item !== me?._id)[0] }
  })
  useEffect(() => {
    getConversation()
  }, [_id])

  const selectHandler = () => {
    isBroken
      ? props.history.push(`/${members.filter(item => item !== me?._id)[0]}/messenger/${_id}`)
      : chooseConversation(_id, members.filter(item => item !== me?._id)[0])
    firebase
      .database()
      .ref('messenger/' + _id)
      .child(conversation.lastMess.id)
      .update({ seen: true })
    getConversation()
  }
  const getConversation = () => {
    firebase
      .database()
      .ref(`messenger/${_id}`)
      .orderByKey()
      .limitToLast(1)
      .on('value', snapshot => {
        // var mess = (snapshot.val() && snapshot.val().mess1) || 'Anonymous';
        const temp = snapshot.val()
          ? Object.keys(snapshot.val()).map(key => ({
              ...snapshot.val()[key],
              id: key
            }))
          : []
        // temp.sort((a, b) => a.timestamp - b.timestamp)
        setConversation({
          user: data?.getUser,
          lastMess: temp[0]
        })
      })
  }
  //   const { author, content, seen } = conversation && conversation.lastMess
  //   const seen = conversation.lastMess && conversation.lastMess.seen ?  conversation.lastMess.seen : conversation.lastMess.author === me?._id
  return (
    conversation && (
      <List.Item onClick={() => selectHandler()}>
        <Skeleton avatar title={false} loading={conversation.loading} active>
          <List.Item.Meta
            avatar={
              <Badge
                dot={
                  conversation.lastMess.author !== me?._id &&
                  !conversation.lastMess.seen
                }
              >
                <Avatar size={42} src={data?.getUser?.avatar} />
              </Badge>
            }
            title={data?.getUser?.firstname}
            description={
              conversation.lastMess.content?.message.trim()
                ? conversation.lastMess.content?.message
                : conversation.lastMess.author === me?._id
                ? ' Bạn đã gửi 1 hình'
                : data?.getUser.firstname + ' đã gửi cho bạn 1 hình '
            }
          />
        </Skeleton>
        {/* <ConversationListItem
      key={conversation.name}
        data={conversation} /> */}
      </List.Item>
    )
  )
}
