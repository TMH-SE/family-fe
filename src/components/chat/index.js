/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import Modal from 'antd/lib/modal/Modal'
import firebase from 'firebase/app'
import { Button } from 'antd'
import { MessageTwoTone } from '@ant-design/icons'
import { IContext } from '@tools'

function Chat(props) {
  const { members, history, isBroken } = props
  const { chooseConversation, me } = useContext(IContext)

  const openChat = async e => {
    const idChat = `${members[0]}${members[1]}`
    firebase.database().ref(`messenger/`).on('value', snapshot => {
      const temp = Object.keys(snapshot.val()).map(key => ({
        ...snapshot.val()[key],
        id: key
      }))
     const a = temp.id === `${members[0]}${members[1]}` || temp.id === `${members[1]}${members[0]}`
      if(a){
        chooseConversation(temp.id, temp.members.filter(mem => mem !== me?._id)[0])
        return
      }
    })
    firebase.database().ref(`messenger/${idChat}`).set({
      members: members,
      lastActivity: +new Date()
    })
    chooseConversation(idChat, members.filter(mem => mem !== me?._id)[0])
  }

  return isBroken ? (
    <MessageTwoTone
      style={{ fontSize: 20, marginLeft: 10 }}
      // onClick={() => openChat()}
    />
  ) : (
    <Button type="ghost" icon={<MessageTwoTone />} onClick={e => openChat(e)}>
      Nhắn tin
    </Button>
  )
}
export default Chat
