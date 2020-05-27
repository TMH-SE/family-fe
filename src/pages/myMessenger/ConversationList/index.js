/* eslint-disable object-curly-spacing */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react'
import ConversationSearch from '../ConversationSearch'
import Toolbar from '../../messageDetail/Toolbar'
import ToolbarButton from '../../messageDetail/ToolbarButton'
import firebase from 'firebase/app'
import './index.scss'
import { Skeleton, Avatar, List, Badge } from 'antd'
import { useHistory } from 'react-router-dom'
import { brokenContext } from '../../../layouts/MainLayout'
const MY_USER_ID = 'tuinhune'

export default function ConversationList (props) {
  const [conversations, setConversations] = useState([])
  const history = useHistory()
  const isBroken = useContext(brokenContext)
  useEffect(() => {
    getConversations()
  }, [])

  // const getLastMessages = (convers) => {
  //   setConversations(...convers)

  //   setConversations(convers)
  //   console.log(conversations, 'jjjj', convers)
  //   // setConversations(convers)
  //   // console.log(convers, conversations)
  //   return conversations
  // }

  const getConversations = () => {
    const newConversations = [
      {
        idChat: 'chat1',
        photo: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t1.0-9/s960x960/69272993_1239809152868423_6499525428661714944_o.jpg?_nc_cat=109&_nc_sid=85a577&_nc_ohc=EjOMARIw2YsAX-GtsO1&_nc_ht=scontent-hkg4-1.xx&_nc_tp=7&oh=e2211383674fc732817aea26a9f872b2&oe=5EE91203',
        name: 'tuihieune'
        // lastMess: null
        // chatNoti: getLastMessages('chat1')
      },
      {
        idChat: 'chat2',
        photo: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t1.0-9/51513455_1368942463269403_2374620841670344704_n.jpg?_nc_cat=107&_nc_sid=85a577&_nc_ohc=6lWHYOfeVH8AX8u5Ct1&_nc_ht=scontent-hkg4-1.xx&oh=5131de2270df5deadcac47b1ee5b9206&oe=5EEB167C',
        name: 'tuikyne'
        // lastMess: null
        // text:
        //       'Hello world! This is a long message that needs to be truncated.',
        // chatNoti: getLastMessages('chat1')
      }
    ]
    const newArr = []
    newConversations.map((item, idx) => {
      firebase.database().ref(`messenger/${item.idChat}`).on('value', (snapshot) => {
        // var mess = (snapshot.val() && snapshot.val().mess1) || 'Anonymous';
        const temp = Object.keys(snapshot.val()).map(key => ({ ...snapshot.val()[key], id: key }))
        temp.sort((a, b) => a.timestamp - b.timestamp)

        newArr[idx] = {
          ...newConversations[idx],
          lastMess: temp[temp.length - 1]
        }
        console.log('dsdsdsd: ', newArr)
        setConversations([...newArr])
      })
    })
    // conversations.sort((a, b) => b.lastMess.timestamp - a.lastMess.timestamp)
    // setConversations([...newArr])
  }
  const selectHandler = (conversation) => {
    isBroken
      ? history.push(`messenger/${conversation.idChat}`)
      : props.chooseConvention(conversation)
    firebase.database().ref('messenger/' + conversation.idChat).child(conversation.lastMess.id).update({ seen: true})
    getConversations()
  }
  return (
    <div className='conversation-list'>
      <Toolbar
        title='Messenger'
        leftItems={[<ToolbarButton key='cog' icon='ion-ios-cog' />]}
        rightItems={[
          <ToolbarButton key='add' icon='ion-ios-add-circle-outline' />
        ]}
      />
      <ConversationSearch />
      <List
        // className="demo-loadmore-list"
        // loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={conversations.sort((a, b) => b.lastMess.timestamp - a.lastMess.timestamp)}
        renderItem={(conversation) => {
          const { author, seen, content } = conversation.lastMess
          return (
            <List.Item onClick={() => selectHandler(conversation) }>
              <Skeleton avatar title={false} loading={conversation.loading} active>
                <List.Item.Meta
                  avatar={
                    <Badge dot={author !== MY_USER_ID && !seen}>
                      <Avatar size={42} src={conversation.photo} />
                    </Badge>
                  }
                  title={conversation.name}
                  description={content.message.trim()
                    ? content.message
                    : author === MY_USER_ID
                      ? ' Bạn đã gửi 1 hình'
                      : author + ' đã gửi cho bạn 1 hình ' }
                />
              </Skeleton>
              {/* <ConversationListItem
                key={conversation.name}
                  data={conversation} /> */}
            </List.Item>
          )
        }}
      />
      {/* {conversations.map((conversation) => (
        <ConversationListItem
          key={conversation.name}
          data={conversation} />
      ))} */}
    </div>
  )
}
