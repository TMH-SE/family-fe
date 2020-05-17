/* eslint-disable react/prop-types */
import React from 'react'
import { withRouter } from 'react-router-dom'
import Messenger from './Messenger'

const MyMessenger = (props) => {
  return (
    <>
      <Messenger></Messenger>
    </>
  )
}

export default withRouter(MyMessenger)
