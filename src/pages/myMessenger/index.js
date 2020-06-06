/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import ConversationList from './ConversationList'
import { IContext } from '@tools'
import { GET_CHAT_BY_USER } from '@shared'
import { useQuery } from '@apollo/react-hooks'
// import Messenger from './Messenger'

const MyMessenger = (props) => {
  const { me } = useContext(IContext)
  
  const { data } = useQuery(GET_CHAT_BY_USER, {
    variables: { userId: me?._id }
  })
  return (
    <>
      <ConversationList dataChat={data?.getChatByUser} history={props.history}></ConversationList>
      {/* <Messenger></Messenger> */}
    </>
  )
}

export default withRouter(MyMessenger)
