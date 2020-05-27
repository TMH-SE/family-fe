/* eslint-disable react/prop-types */
import React from 'react'
import { withRouter } from 'react-router-dom'
import ConversationList from './ConversationList'
// import Messenger from './Messenger'

const MyMessenger = (props) => {
  return (
    <>
      <ConversationList></ConversationList>
      {/* <Messenger></Messenger> */}
    </>
  )
}

export default withRouter(MyMessenger)
