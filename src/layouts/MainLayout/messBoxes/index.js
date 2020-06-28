/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect
} from 'react'
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
  useEffect(() => {}, [currentId, messbox])
  const chooseConversation = (idChat, userId) => {
    setCurrentIdChat(idChat)
    if (messbox.findIndex(mess => mess.idChat === idChat) === -1) {
      const a = [...messbox]
      a.push({ idChat, userId })
      if (messbox?.length === 3) {
        a.shift()
      }
      setMessbox([...a])
    }
  }
  const onCancelMessbox = idChat => {
    var arr = [...messbox]
    setCurrentIdChat(null)
    setMessbox([...arr].filter(item => item.idChat !== idChat))
  }
  const history = useHistory()
  useImperativeHandle(ref, () => ({
    chooseConversation: (idChat, userId) => chooseConversation(idChat, userId)
  }))
  return (
    messbox &&
    messbox.map((mess, idx) => {
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
  )
})
export default Messboxes
