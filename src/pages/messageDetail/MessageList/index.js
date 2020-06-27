/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react'
import firebase from 'firebase/app'
import moment from 'moment'
import './MessageList.scss'
import { CloseCircleFilled } from '@ant-design/icons'
import { Card, Avatar, Spin } from 'antd'

import { InputCustomize } from '@components'
import Message from '../Message'
import { IContext } from '@tools'
import { useQuery } from '@apollo/react-hooks'
import { GET_USER } from '@shared'
moment().format()

export default function MessageList(props) {
  const [messages, setMessages] = useState([])
  const { chatBox, onCancelMessbox, currentId } = props
  const { idChat, userId } = chatBox
  const { me } = useContext(IContext)
  const [showMore, setShowMore] = useState(10)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    loading && getMessages()
  }, [showMore])
  const { data } = useQuery(GET_USER, { variables: { userId } })
  useEffect(() => {
    getMessages()
    document.getElementById(`input-custom-${currentId}`) && document.getElementById(`input-custom-${currentId}`).focus()
  }, [currentId])
  const getMessages = () => {
    setLoading(true)
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
        if (showMore > temp.length) {
          setLoading(false)
        }
        console.log(temp, idChat)
        setMessages(temp)
      })
  }

  const renderMessages = () => {
    let i = 0
    const messageCount = messages?.length
    const tempMessages = []

    while (i < messageCount) {
      const previous = messages[i - 1]
      const current = messages[i]
      const next = messages[i + 1]
      const isMine = current.author === me?._id
      const currentMoment = moment(current.timestamp)
      let prevBySameAuthor = false
      let nextBySameAuthor = false
      let startsSequence = true
      let endsSequence = true
      let showTimestamp = true

      if (previous) {
        const previousMoment = moment(previous.timestamp)
        const previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        )
        prevBySameAuthor = previous.author === current.author

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false
        }
      }

      if (next) {
        const nextMoment = moment(next.timestamp)
        const nextDuration = moment.duration(nextMoment.diff(currentMoment))
        nextBySameAuthor = next.author === current.author

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false
        }
      }

      tempMessages.push(
        <Message
          idChat={idChat}
          isLast={messageCount - 1 === i}
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      )

      // Proceed to the next message.
      i += 1
    }
    return tempMessages
  }
  const handleSubmit = async (value, imgList) => {
    // const chatId = `${idChat}` + '/'
    const message = +new Date()
    try {
      await firebase
        .database()
        .ref(`messenger/${idChat}/listmessages/` + message)
        .set({
          content: { message: value, img: imgList },
          timestamp: +new Date(),
          author: me?._id,
          seen: false,
          hideWith: []
        })
      await firebase
        .database()
        .ref(`messenger/${idChat}`)
        .update({
          lastMess: {
            content: { message: value, img: imgList },
            timestamp: +new Date(),
            author: me?._id,
            seen: false,
            hideWith: []
          },
          lastActivity: +new Date()
        })
    } catch (error) {
      console.log(error)
    }
    const ele = document.getElementsByClassName(
      `message-list-container ${idChat}`
    )[0]
    ele.scrollTop = ele.scrollHeight
  }

  const { isBroken, history } = props

  return (
    <div className={`message-list ${idChat}`}>
      <Card
        title={
          <>
            <Avatar
              src={data?.getUser?.avatar}
              onClick={() => history.push(`/${data?.getUser?._id}/info`)}
            ></Avatar>
            <a
              style={{ marginLeft: 5 }}
              onClick={() => history.push(`/${data?.getUser?._id}/info`)}
            >
              {data?.getUser?.firstname}
            </a>
          </>
        }
        className="ant-mess"
        extra={
          !isBroken && (
            // <div className='delete-messbox'>
            <CloseCircleFilled
              className="delete-messbox"
              onClick={() => onCancelMessbox(idChat)}
              style={{ color: '#ccc' }}
            />
          )
        }
        actions={[
          <InputCustomize
            minRows={1}
            maxRows={4}
            idElement={idChat}
            type="chat"
            onSubmit={handleSubmit}
            placeholder="Nhập tin nhắn"
            key="input"
          />
        ]}
      >
        <div
          className={`message-list-container ${idChat}`}
          onScroll={() => {
            const ele = document.getElementsByClassName(
              `message-list-container ${idChat}`
            )[0]
            if (showMore <= messages.length && ele.scrollTop === 0) {
              setShowMore(showMore + 3)
              ele.scrollTop = 30
            }
            if (showMore > messages.length) {
              setLoading(false)
            }
          }}
        >
          <div className="spin-chat">
            <Spin spinning={loading} />
          </div>
          {renderMessages()}
        </div>
      </Card>
    </div>
  )
}
