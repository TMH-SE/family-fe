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
  const chooseConversation = (idChat, userId) => {
    if (messbox.findIndex(mess => mess.idChat === idChat) === -1) {
      const a = [...messbox]
      a.push({ idChat, userId })
      setMessbox(a)
    }
    document.getElementById(`input-custom-${idChat}`) &&
      document.getElementById(`input-custom-${idChat}`).focus()
  }
  const onCancelMessbox = idChat => {
    const idx = messbox.findIndex(mess => mess.idChat === idChat)
    var arr = [...messbox]
    arr.splice(idx, 1)
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
