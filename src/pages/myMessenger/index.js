/* eslint-disable react/prop-types */
import React from 'react'
import { withRouter } from 'react-router-dom'
// import Messenger from './Messenger'
import ConversationList from './ConversationList'

const MyMessenger = (props) => {
  return (
    <>
      <ConversationList></ConversationList>
      {/* <Messenger></Messenger> */}
    </>
  )
}

export default withRouter(MyMessenger)
