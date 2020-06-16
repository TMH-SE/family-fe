/* eslint-disable react/prop-types */
import React from 'react'
import { withRouter } from 'react-router-dom'
import ConversationList from './ConversationList'
// import Messenger from './Messenger'

const MyMessenger = props => {
  return (
    <div>
      <ConversationList history={props.history} name='conversation-list-phone'></ConversationList>
      {/* <Messenger></Messenger> */}
    </div>
  )
}

export default withRouter(MyMessenger)
