/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
// import Toolbar from '../Toolbar'
// import ToolbarButton from '../ToolbarButton'
import Message from '../Message'
import moment from 'moment'

import './MessageList.scss'
import { CloseOutlined } from '@ant-design/icons'
import * as firebase from 'firebase'
import { Card } from 'antd'
import InputCustome from '../../../components/inputCustome'
import * as uuid from 'uuid'
const firebaseConfig = {
  apiKey: 'AIzaSyAzni8DvqLlDB_rnt1nxtCpIEeHocXHaZA',
  authDomain: 'graduation-project-2020.firebaseapp.com',
  databaseURL: 'https://graduation-project-2020.firebaseio.com',
  projectId: 'graduation-project-2020',
  storageBucket: 'graduation-project-2020.appspot.com',
  messagingSenderId: '950930789819',
  appId: '1:950930789819:web:b54a53c02ebdcf7e59609e',
  measurementId: 'G-MPT0K7B144'
}
firebase.initializeApp(firebaseConfig)
const db = firebase.database()
const MY_USER_ID = 'tuinhune'
export default function MessageList (props) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = () => {
    db.ref('chat1').on('value', (snapshot) => {
      // var mess = (snapshot.val() && snapshot.val().mess1) || 'Anonymous';
      setMessages(Object.keys(snapshot.val()).map(key => ({ ...snapshot.val()[key], id: key })))
    })
    // var tempMessages = [
    //   {
    //     id: 1,
    //     author: 'apple',
    //     message:
    //       'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 2,
    //     author: 'orange',
    //     message:
    //       'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 3,
    //     author: 'orange',
    //     message:
    //       'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 4,
    //     author: 'apple',
    //     message:
    //       'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 5,
    //     author: 'apple',
    //     message:
    //       'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 6,
    //     author: 'apple',
    //     message:
    //       'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 7,
    //     author: 'orange',
    //     message:
    //       'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 8,
    //     author: 'orange',
    //     message:
    //       'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 9,
    //     author: 'apple',
    //     message:
    //       'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 10,
    //     author: 'orange',
    //     message:
    //       'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
    //     timestamp: new Date().getTime()
    //   }
    // ]
    // setMessages([...messages, ...tempMessages])
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
      console.log(current, 'ưèwè')
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
    console.log(imgList, 'list')
    const chatId = 'chat1' + '/'
    const message = 'mess6'
    try {
      await db.ref(chatId + message).set({
        id: uuid.v4(),
        content: { message: value, img: imgList },
        timestamp: Date.now(),
        author: 'tuihieune',
        seen: false,
        hideWith: []
      })
    } catch (error) {
      console.log(error)
    }
    const ele = document.getElementsByClassName('message-list-container')[0]
    ele.scrollTop = ele.scrollHeight
  }
  return (
    <div className='message-list'>

      <Card title="Tuinhune"
        className='ant-mess'
        extra={!props.isBroken && <div className='delete-messbox'><CloseOutlined style={{ color: '#ccc' }}/></div>}
        // style={{ 10 }}
        actions={[
          <InputCustome onSubmit={handleSubmit} placeholder='Nhạp tin nhắn' key='input'></InputCustome>
        ]}>
        <div className='message-list-container'>{renderMessages()}</div>
      </Card>

    </div>
  )
}
