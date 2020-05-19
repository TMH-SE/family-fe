import React, { useState, useEffect } from 'react'
import ConversationSearch from '../ConversationSearch'
import ConversationListItem from '../ConversationListItem'
import Toolbar from '../../messageDetail/Toolbar'
import ToolbarButton from '../../messageDetail/ToolbarButton'
import './index.scss'
import axios from 'axios'
import { Skeleton, Avatar, List } from 'antd'

export default function ConversationList (props) {
  const [conversations, setConversations] = useState([])
  useEffect(() => {
    getConversations()
  }, [])

  const getConversations = () => {
    axios.get('https://randomuser.me/api/?results=20').then((response) => {
      const newConversations = response.data.results.map((result) => {
        return {
          photo: result.picture.large,
          name: `${result.name.first} ${result.name.last}`,
          text:
            'Hello world! This is a long message that needs to be truncated.'
        }
      })
      setConversations([...conversations, ...newConversations])
    })
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
        className="demo-loadmore-list"
        // loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={conversations}
        renderItem={conversation => (
          <List.Item>
            <Skeleton avatar title={false} loading={conversation.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src={conversation.photo} />
                }
                title={<a href="https://ant.design">{conversation.name}</a>}
                description={conversation.text}
              />
            </Skeleton>
            {/* <ConversationListItem
              key={conversation.name}
              data={conversation} /> */}
          </List.Item>
        )}
      />
      {conversations.map((conversation) => (
        <ConversationListItem
          key={conversation.name}
          data={conversation} />
      ))}
    </div>
  )
}
