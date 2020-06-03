/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from 'react'
import firebase from 'firebase/app'
import moment from 'moment'
import './MessageList.scss'
import { CloseCircleFilled } from '@ant-design/icons'
import { Card, Avatar } from 'antd'
import * as uuid from 'uuid'

import { InputCustome } from '@components'
import Message from '../Message'
import { IContext } from '@tools'
import { useQuery } from '@apollo/react-hooks'
import { GET_USER } from '@shared'
moment().format()

export default function MessageList(props) {
  const [messages, setMessages] = useState([])
  const { chatBox } = props
  const { idChat, userId } = chatBox
  const { me, onCancelMessbox } = useContext(IContext)
  const { showMoreMess, setShowMoreMess } = useState(10)
  useEffect(() => {
    getMessages()
    document.getElementById(`input-custom-${idChat}`).focus()
  }, [idChat])
  const { data } = useQuery(GET_USER, { variables: { userId } })
  const [showMore, setShowMore] = useState(10)
  const getMessages = () => {
    firebase
      .database()
      .ref(`messenger/${idChat}`)
      .orderByKey()
      // .limitToLast(100)
      .on('value', snapshot => {
        // var mess = (snapshot.val() && snapshot.val().mess1) || 'Anonymous';
        const temp = snapshot.val()
          ? Object.keys(snapshot.val()).map(key => ({
              ...snapshot.val()[key],
              id: key
            }))
          : []
        // temp.sort((a, b) => a.timestamp - b.timestamp)
        setMessages(temp)
        const ele = document.getElementsByClassName(
          `message-list-container ${idChat}`
        )[0]
        ele.scrollTop = ele.scrollHeight
      })
  }

  const renderMessages = () => {
    let i = 0
    const messageCount = messages.length
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
    const chatId = `${idChat}` + '/'
    const message = uuid.v1()
    try {
      await firebase
        .database()
        .ref('messenger/' + chatId + message)
        .set({
          content: { message: value, img: imgList },
          timestamp: +new Date(),
          author: me?._id,
          seen: false,
          hideWith: []
        })
    } catch (error) {
      console.log(error)
    }
    const ele = document.getElementsByClassName(
      `message-list-container ${idChat}`
    )[0]
    // console.log(ele, 'elemu')
    ele.scrollTop = ele.scrollHeight
  }

  const { isBroken } = props

  return (
    <div className="message-list">
      <Card
        title={
          <>
            <Avatar src={data?.getUser?.avatar}></Avatar>
            <span style={{ marginLeft: 5 }}>{data?.getUser?.firstname}</span>
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
        // </div>}
        // style={{ 10 }}
        actions={[
          <InputCustome
            idElement={idChat}
            onSubmit={handleSubmit}
            placeholder="Nhạp tin nhắn"
            key="input"
          ></InputCustome>
        ]}
      >
        <div className={`message-list-container ${idChat}`}>
          {renderMessages()}
        </div>
      </Card>
    </div>
  )
}
