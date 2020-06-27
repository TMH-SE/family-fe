/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useImperativeHandle, forwardRef } from 'react'
import {
  Layout
  // Switch
} from 'antd'
import { useHistory } from 'react-router-dom'

import { IContext } from '@tools'
import ConversationList from '@pages/myMessenger/ConversationList'
import MessageList from '@pages/messageDetail/MessageList'
// import { ThemeContext } from '../../router'
// import HomePage from '../MainLayout/HomePage'
// import HighLightPost from '../MainLayout/HighlightPost'
// import ModalCreatePost from '../MainLayout/ModalCreatePost'
import reactStringReplace from 'react-string-replace'
import { useQuery } from '@apollo/react-hooks'
import { GET_CHAT_BY_USER } from '@shared'
import SignIn from '@pages/signIn'
const { Header, Content, Sider } = Layout

// const MY_USER_ID =
const Messboxes = forwardRef((props, ref) => {
  const [messbox, setMessbox] = useState([])
  const [currentId, setCurrentIdChat] = useState([])
  const chooseConversation = (idChat, userId) => {
    setCurrentIdChat(idChat)
    if (messbox.findIndex(mess => mess.idChat === idChat) === -1) {
      const a = [...messbox]
      if (messbox?.length === 3) {
        a.pop({ idChat, userId })
      }
      a.push({ idChat, userId })
      setMessbox(a)
    }
    document.getElementById(`input-custom-${currentId}`) &&
      document.getElementById(`input-custom-${currentId}`).focus()
  }
  const onCancelMessbox = idChat => {
    const idx = messbox.findIndex(mess => mess.idChat === idChat)
    var arr = [...messbox]
    arr.splice(idx, 1)
    setCurrentIdChat(arr.length === 0 ? null : arr[0].idChat)
    document.getElementById(`input-custom-${currentId}`) &&
    document.getElementById(`input-custom-${currentId}`).focus()
    setMessbox([...arr])
  }
  const history = useHistory()
  useImperativeHandle(ref, () => ({
    chooseConversation: (idChat, userId) => chooseConversation(idChat, userId)
  }))
  return messbox.map((mess, idx) => {
    return (
      <div
        key={idx}
        className={`contentMess-box ${mess.idChat}`}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <MessageList
          setCurrentIdChat={setCurrentIdChat}
          currentId={currentId}
          messbox={messbox}
          history={history}
          idx={idx}
          onCancelMessbox={() => onCancelMessbox(mess.idChat)}
          chatBox={mess}
        />
      </div>
    )
  })
})
export default Messboxes
