/* eslint-disable no-undef */
import React, { useState, useLayoutEffect } from 'react'
import { SdkUtils } from '@utils'
import { withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_SAVEDPOST_BY_USER } from '@shared'
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
  const [showLogin, setShowLogin] = useState(false)
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
    var arr = [...messbox]
    arr.splice(idx, 1)
    setMessbox([...arr])
  }
  const { data, refetch } = useQuery(GET_ME, {
    skip: !isAuth
  })
  const authenticate = token => {
    window.localStorage.setItem('access-token', token)
    setIsAuth(true)
    showLogin ? setShowLogin(false) : history.push('/')
    refetch().then(() => {
      notification.success({
        message: 'Đăng nhập thành công',
        placement: 'bottomRight'
      })
    })
  }
  const logout = () => {
    window.localStorage.clear()
    SdkUtils.logoutFB()
    SdkUtils.loginGoogle()
    setIsAuth(false)
  }
  const openLoginModal = () => {
    setShowLogin(true)
  }
  const closeLoginModal = () => {
    setShowLogin(false)
  }
  const { data: dataSavedPost, refetch: refetchSavedPost } = useQuery(GET_SAVEDPOST_BY_USER, {
    variables: { userId: data?.me?._id },
    fetchPolicy: 'no-cache'
  })
  return (
    <IContext.Provider
      value={{
        isAuth,
        authenticate,
        logout,
        me: data?.me,
        history,
        refetchMe: refetch,
        messbox: messbox,
        chooseConversation: chooseConversation,
        onCancelMessbox: onCancelMessbox,
        showLogin: showLogin,
        openLoginModal: openLoginModal,
        closeLoginModal: closeLoginModal,
        dataSavedPost: dataSavedPost,
        refetchSavedPost: refetchSavedPost
      }}
    >
      {children}
    </IContext.Provider>
  )
}

export default withRouter(ContextWrapper)
