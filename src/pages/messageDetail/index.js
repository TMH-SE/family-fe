/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import Message from './Message'
import moment from 'moment'
import './index.scss'
import { CaretLeftOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import * as uuid from 'uuid'
import InputCustome from 'src/components/inputCustome'
moment().format()
const MY_USER_ID = 'tuinhune'
export default function MessageDetail (props) {
  const [messages, setMessages] = useState([])
  const { idChat } = props.match.params
  useEffect(() => {
    getMessages()
    document.getElementById(`input-custom-${idChat}`).focus()
  }, [])
  const getMessages = async () => {
    firebase.database().ref(`messenger/${idChat}`).on('value', (snapshot) => {
      // var mess = (snapshot.val() && snapshot.val().mess1) || 'Anonymous';
      const temp = Object.keys(snapshot.val()).map(key => ({ ...snapshot.val()[key], id: key }))
      if (window.UndefinedVariable) {
        Object.assign(window.UndefinedVariable, {})
      }
      temp.sort((a, b) => a.timestamp - b.timestamp)
      setMessages(temp)
    })
    const ele = await document.getElementsByClassName(`message-list-container ${idChat}`)[0]
    ele.scrollTop = ele.scrollHeight
  }

  const renderMessages = () => {
    let i = 0
    const messageCount = messages.length
    const tempMessages = []

    while (i < messageCount) {
      const previous = messages[i - 1]
      const current = messages[i]
      const next = messages[i + 1]
      const isMine = current.author === MY_USER_ID
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
    const message = uuid.v4()
    try {
      await firebase.database().ref('messenger/' + chatId + message).set({
        id: uuid.v4(),
        content: { message: value, img: imgList },
        timestamp: new Date().getTime(),
        author: 'tuikyne',
        seen: false,
        hideWith: []
      })
    } catch (error) {
      console.log(error)
    }
    const ele = document.getElementsByClassName(`message-list-container ${idChat}`)[0]
    // console.log(ele, 'elemu')
    ele.scrollTop = ele.scrollHeight
  }

  return (
    <div className='message-list'>

      <Card title={<>
        <span style={{ marginLeft: 5 }}>tuinhune</span></>}
      className='ant-mess'
      extra={!props.isBroken &&
      // <div className='delete-messbox'>
        <CaretLeftOutlined className='delete-messbox' onClick={() => props.history.goBack()} />}
      // </div>}
      // style={{ 10 }}
      actions={[
        <InputCustome idElement={idChat} onSubmit={handleSubmit} placeholder='Nhạp tin nhắn' key='input'></InputCustome>
      ]}>
        <div className={`message-list-container ${idChat}`} >{renderMessages()}</div>
      </Card>

    </div>
  )
}
