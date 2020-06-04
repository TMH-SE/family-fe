/* eslint-disable object-curly-spacing */
/* eslint-disable react/prop-types */
import React from 'react'
import ConversationSearch from '../ConversationSearch'
import Toolbar from '../../messageDetail/Toolbar'
import ToolbarButton from '../../messageDetail/ToolbarButton'

import './index.scss'
import { List} from 'antd'

import ConversationListItem from '../ConversationListItem'

export default function ConversationList(props) {
  const { dataChat } = props
  return (
    <div className="conversation-list">
      <Toolbar
        title="Messenger"
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
        ]}
      />
      <ConversationSearch />
      <List
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={dataChat}
        renderItem={(data, idx) => (
          <ConversationListItem key={idx} chat={data} history={props.history}></ConversationListItem>
        )}
      />
    </div>
  )
}
