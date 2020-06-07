/* eslint-disable no-undef */
import React, { useState, useLayoutEffect } from 'react'
import { SdkUtils } from '@utils'
import { withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
export const IContext = React.createContext()

const GET_ME = gql`
  query me {
    me {
      _id
      firstname
      lastname
      avatar
      coverPhoto
      email
      gender
      phoneNumber
      birthday
      expert {
        areasOfExpertise
        jobTitle
        yearsExperience
        isVerify
      }
    }
  }
`
const ContextWrapper = ({ children, history }) => {
  const [messbox, setMessbox] = useState([])
  const [isAuth, setIsAuth] = useState(
    !!window.localStorage.getItem('access-token')
  )
  const [dataChat, setDataChat] = useState([])
  const [checkChat, setCheckChat] = useState(false)
  const chooseConversation = (idChat, userId) => {
    console.log('messbox')
    if (messbox.findIndex(mess => mess.idChat === idChat) === -1) {
      const a = [...messbox]
      a.push({ idChat, userId })
      setMessbox(a)
    }
    document.getElementById(`input-custom-${idChat}`) &&
      document.getElementById(`input-custom-${idChat}`).focus()
  }
  const onCancelMessbox = idChat => {
    const idx = messbox.findIndex(mess => mess.idChat === idChat)
    console.log(idx, 'aaa')
    var arr = [...messbox]
    arr.splice(idx, 1)
    setMessbox([...arr])
  }
  const { data, refetch } = useQuery(GET_ME, {
    skip: !isAuth,
    fetchPolicy: 'no-cache'
  })
  const authenticate = token => {
    window.localStorage.setItem('access-token', token)
    setIsAuth(true)
    history.push('/')
    refetch()
  }
  const logout = () => {
    window.localStorage.clear()
    SdkUtils.logoutFB()
    SdkUtils.loginGoogle()
    setIsAuth(false)
    refetch()
  }
  // const { data: dataChat, refetch: refetchDataChat } = useQuery(GET_CHAT_BY_USER, {
  //   variables: { userId: data?.me?._id },
  //   // fetchPolicy: "no-cache",
  // })
  return (
    <IContext.Provider
      value={{
        isAuth,
        authenticate,
        logout,
        me: data?.me,
        refetchMe: refetch,
        messbox: messbox,
        chooseConversation: chooseConversation,
        onCancelMessbox: onCancelMessbox,
        dataChat: dataChat
      }}
    >
      {children}
    </IContext.Provider>
  )
}

export default withRouter(ContextWrapper)
