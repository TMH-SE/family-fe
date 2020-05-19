import React, { useContext } from 'react'
// import ConversationList from '../ConversationList'
import MessageList from './MessageList'
// import InputCustome from '../../components/inputCustome'
import { brokenContext } from '../../layouts/MainLayout'
// import './Messenger.css'
// import Compose from './Compose'
export default function MessageDetail (props) {
  const isBroken = useContext(brokenContext)
  return (
    // <div className='messenger' >
    //   <div className='messenger'>
    //     <ConversationList />
    //   </div>
    <div className='contentMess' style={{ width: '100%' }}>
      {/* <p>fsegggggggggggggggggg</p> */}
      <MessageList isBroken={isBroken}/>
      {/* <InputCustome></InputCustome> */}
    </div>
    // </div>
  )
}
