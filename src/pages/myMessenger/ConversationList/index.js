/* eslint-disable object-curly-spacing */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useLayoutEffect } from 'react'
import ConversationSearch from '../ConversationSearch'
import Toolbar from '../../messageDetail/Toolbar'
import ToolbarButton from '../../messageDetail/ToolbarButton'

import './index.scss'
import { List} from 'antd'

import ConversationListItem from '../ConversationListItem'
import { IContext } from '@tools'

export default function ConversationList(props) {
  const { me } = useContext(IContext)
  const { dataChat } = props
  const [searchData, setSearchData] = useState(null)
  const [dataConver, setDataConver] = useState([])
  useLayoutEffect(() => {
    dataChat && setDataConver(dataChat)
  }, [dataChat])

 const onSearch = (data) => {
    const arrResult = [...dataConver]
    const res = arrResult.filter(item => {
      console.log(item.name.includes(data))
      return item.name.includes(data) === true
    })
     data.trim() === '' ? setSearchData(null) : setSearchData(res)
  }
  const addSearch = (data) => {
    const a = [...dataConver]
    const idx = dataConver.findIndex(item => item?._id === data?._id)
    a.length < dataChat.length && a.push(data)
    dataConver[idx].name = data.name
  }
  return (
    <div className="conversation-list">
      <Toolbar
        title="Messenger"
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
        ]}
      />
      <ConversationSearch search={onSearch} searchValue={searchData}/>
      <List
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={searchData || dataConver}
        renderItem={(data, idx) => (
          <ConversationListItem addSearch={addSearch} key={idx} chat={data} history={props.history}></ConversationListItem>
        )}
      />
    </div>
  )
}
