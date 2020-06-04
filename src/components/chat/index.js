/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import Modal from 'antd/lib/modal/Modal'
import firebase from 'firebase/app'
import { Button } from 'antd'
import { MessageTwoTone } from '@ant-design/icons'
import { CREATE_CHAT, GET_CHAT_BY_MEMBERS } from '@shared'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { IContext } from '@tools'

function Chat(props) {
  const { members, history, isBroken } = props
  const { chooseConversation, me } = useContext(IContext)
  const [createChat] = useMutation(CREATE_CHAT)
  const { data, loading } = useQuery(GET_CHAT_BY_MEMBERS, {
    variables: { members: props.members }
  })

  const openChat = async () => {
    if (!loading) {
      if (!data.getChatByMembers) {
        await createChat({ variables: { members: members } })
          .then(res => {
            const a = res.data.members.filter(item => item !== me?._id)

            isBroken
              ? history.push(`/${a[0]}/messenger/${res.data._id}`)
              : chooseConversation(res.data._id, a[0])
          })
          .catch(err => console.log(err))
      } else {
        const a = data.getChatByMembers.members.filter(item => item !== me?._id)
        isBroken
          ? history.push(`/${a[0]}/messenger/${data?.getChatByMembers._id}`)
          : chooseConversation(data?.getChatByMembers._id, a[0])
      }
    }
  }

  return isBroken ? (
    <MessageTwoTone
      style={{ fontSize: 20, marginLeft: 10 }}
      onClick={() => openChat()}
    />
  ) : (
    <Button type="ghost" icon={<MessageTwoTone />} onClick={() => openChat()}>
      Nhắn tin
    </Button>
  )
}
export default Chat
