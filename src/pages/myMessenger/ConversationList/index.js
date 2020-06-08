/* eslint-disable object-curly-spacing */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useLayoutEffect } from 'react'
import ConversationSearch from '../ConversationSearch'
import Toolbar from '../../messageDetail/Toolbar'
import ToolbarButton from '../../messageDetail/ToolbarButton'
import firebase from 'firebase/app'
import './index.scss'
import { List } from 'antd'

import ConversationListItem from '../ConversationListItem'
import { IContext } from '@tools'

export default function ConversationList(props) {
  const { me } = useContext(IContext)
  const [dataChat, setDataChat] = useState([])
  const [searchdataChat, setSearchdataChat] = useState(null)
  const [dataChatConver, setdataChatConver] = useState([])

  useLayoutEffect(() => {
    console.log(me, 'me')
    firebase
      .database()
      .ref(`messenger/`)
      .on('value', snapshot => {
        const temp = snapshot.val()
          ? Object.keys(snapshot.val()).map(key => ({
              ...snapshot.val()[key],
              id: key
            }))
          : []
        const arr = temp.filter(
          item => item.members.findIndex(mem => mem === me?._id) !== -1
        )

        setDataChat(arr)
        setdataChatConver(arr)
      })
  }, [me])

  const onSearch = data => {
    const arrResult = [...dataChatConver]
    const res = arrResult.filter(item => {
      return item.name.toLowerCase().includes(data.toLowerCase()) === true
    })
    data.trim() === '' ? setSearchdataChat(null) : setSearchdataChat(res)
  }
  const addSearch = dataChat => {
    const a = [...dataChatConver] || []
    const idx = dataChatConver.findIndex(item => item?._id === dataChat?._id)
    a.length < dataChat?.length && a.push(dataChat)
    dataChatConver[idx] = { ...dataChatConver[idx], name: dataChat.name }
    console.log(dataChatConver, dataChat, 'chat')
  }
  return (
    <div className={props.name || 'conversation-list'}>
      <Toolbar
        title="Messenger"
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
        ]}
      />
      <ConversationSearch search={onSearch} />
      {/* <ConversationSearch /> */}
      <List
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={searchdataChat || dataChat}
        renderItem={(dataChat, idx) => (
          <ConversationListItem
            addSearch={addSearch}
            key={idx}
            chat={dataChat}
            history={props.history}
          ></ConversationListItem>
          // <ConversationListItem key={idx} chat={dataChat} history={props.history}></ConversationListItem>
        )}
      />
    </div>
  )
}
