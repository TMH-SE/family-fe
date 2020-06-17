import React, { useContext } from 'react'
import { Button } from 'antd'
import { MessageTwoTone } from '@ant-design/icons'
import { IContext } from '@tools'
import firebase from 'firebase/app'
function Chat(props) {
  const { members, history, isBroken } = props
  const { chooseConversation, me, isAuth, openLoginModal } = useContext(IContext)

  const openChat = async e => {
    const idChat = `${members[0]}${members[1]}`
    firebase
      .database()
      .ref(`messenger/`)
      .once('value', snapshot => {
        const temp = Object.keys(snapshot.val()).map(key => ({
          ...snapshot.val()[key],
          id: key
        }))
        const a =
          temp.id === `${members[0]}${members[1]}` ||
          temp.id === `${members[1]}${members[0]}`
        if (a) {
          chooseConversation(
            temp.id,
            temp.members.filter(mem => mem !== me?._id)[0]
          )
          return true
        }
      })
    firebase
      .database()
      .ref(`messenger/${idChat}`)
      .set({
        members: members,
        lastActivity: +new Date()
      })
    chooseConversation(idChat, members.filter(mem => mem !== me?._id)[0])
  }

  return isBroken ? (
    <MessageTwoTone
      style={{ fontSize: 20, marginLeft: 10 }}
      onClick={() => {
        history.push(
          `/${me?._id}/messenger/${members.filter(mem => mem !== me?._id)[0]}`
        )
      }}
    />
  ) : (
    <Button
      type="ghost"
      icon={<MessageTwoTone />}
      onClick={e => {
        isAuth ? openChat(e) : openLoginModal()
      }}
    >
      Nhắn tin
    </Button>
  )
}
export default Chat
