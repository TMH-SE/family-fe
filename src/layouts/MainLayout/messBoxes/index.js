/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useContext
} from 'react'
import {
  Layout
  // Switch
} from 'antd'
import { useHistory } from 'react-router-dom'

import { IContext } from '@tools'
import ConversationList from '@pages/myMessenger/ConversationList'
import MessageList from '@pages/messageDetail/MessageList'
import reactStringReplace from 'react-string-replace'
import { useQuery } from '@apollo/react-hooks'
import { GET_CHAT_BY_USER } from '@shared'
import SignIn from '@pages/signIn'
import firebase from 'firebase/app'
const { Header, Content, Sider } = Layout

// const MY_USER_ID =
const Messboxes = forwardRef((props, ref) => {
  const [messbox, setMessbox] = useState([])
  // const [messboxes, setMessboxes] = useState([])
  const [currentId, setCurrentIdChat] = useState([])
  const [showMore, setShowMore] = useState(15)
  const [loading, setLoading] = useState(false)
  const { me } = useContext(IContext)
  useEffect(() => {
    firebase.database().ref(`messboxes/${me?._id}`).remove()
  }, [])
  useEffect(() => {}, [showMore])
  useEffect(() => {
    firebase
      .database()
      .ref(`messboxes/${me?._id}`)
      .orderByKey()
      .limitToLast(showMore)
      .on('value', snapshot => {
        // var mess = (snapshot.val() && snapshot.val().mess1) || 'Anonymous';
        const temp = snapshot.val()
          ? Object.keys(snapshot.val()).map(key => ({
              ...snapshot.val()[key],
              idChat: key
            }))
          : []
        setMessbox(temp)
      })
  }, [])
  const showMess = idChat => {
    firebase
      .database()
      .ref(`messenger/${idChat}/listmessages`)
      .orderByKey()
      .limitToLast(showMore)
      .on('value', snapshot => {
        // var mess = (snapshot.val() && snapshot.val().mess1) || 'Anonymous';
        const temp = snapshot.val()
          ? Object.keys(snapshot.val()).map(key => ({
              ...snapshot.val()[key],
              id: key
            }))
          : []
        firebase
          .database()
          .ref(`messboxes/${me?._id}/${idChat}/messages`)
          .update(temp)
        if (showMore > temp.length) {
          setLoading(false)
        }
      })
  }
  const chooseConversation = (idChat, userId) => {
    messbox.map(mess => {
      if (mess?.messages?.length !== 15 && mess?.idChat !== idChat) {
        setShowMore(15)
      }
    })
    if (messbox.findIndex(item => item?.idChat === idChat) === -1) {
      if (messbox?.length === 3) {
        const a = [...messbox].sort((a, b) => a.createdAt - b.createdAt)
        firebase.database().ref(`messboxes/${me?._id}/${a[0]?.idChat}`).remove()
      }
      firebase
        .database()
        .ref(`messenger/${idChat}/listmessages`)
        .orderByKey()
        .limitToLast(showMore)
        .once('value', snapshot => {
          // var mess = (snapshot.val() && snapshot.val().mess1) || 'Anonymous';
          const temp = snapshot.val()
            ? Object.keys(snapshot.val()).map(key => ({
                ...snapshot.val()[key],
                id: key
              }))
            : []
          // if (temp !== []) {
            firebase
              .database()
              .ref(`messboxes/${me?._id}/${idChat}`)
              .set({
                messages: temp,
                userId: userId,
                createdAt: +new Date()
              })
        })
    }

    setCurrentIdChat(idChat)
  }
  const onCancelMessbox = idChat => {
    firebase.database().ref(`messboxes/${me?._id}/${idChat}`).remove()
  }
  const history = useHistory()
  useImperativeHandle(ref, () => ({
    chooseConversation: (idChat, userId) => chooseConversation(idChat, userId)
  }))
  return (
    messbox &&
    messbox
      .sort((a, b) => b.createdAt - a.createdAt)
      // .sort((a, b) => b.createdAt - a.createdAt)
      // .slice(0, 3)
      .map((mess, idx) => {
        return (
          <div
            key={idx}
            className={`contentMess-box ${mess.idChat}`}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <MessageList
              showMess={showMess}
              chooseConversation={chooseConversation}
              showMore={showMore}
              setShowMore={setShowMore}
              currentId={currentId}
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
