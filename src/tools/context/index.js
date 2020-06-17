/* eslint-disable no-undef */
import React, { useState, useLayoutEffect } from 'react'
import { SdkUtils } from '@utils'
import { withRouter } from 'react-router-dom'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
  GET_SAVEDPOST_BY_USER,
  GET_POSTS,
  GET_POSTS_BY_USER,
  GET_MEMBERS_BY_COMMUNITY
} from '@shared'
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
  const { data: dataSavedPost, refetch: refetchSavedPost } = useQuery(
    GET_SAVEDPOST_BY_USER,
    {
      variables: { userId: data?.me?._id },
      fetchPolicy: 'no-cache'
    }
  )
  const { data: dataPosts, refetch: refetchPosts } = useQuery(GET_POSTS)
  const { data: dataMyPosts, refetch: refetchMyPosts } = useQuery(
    GET_POSTS_BY_USER,
    {
      variables: { userId: data?.me?._id },
      fetchPolicy: 'no-cache'
    }
  )
  const [refetchCount, setRefetchCount] = useState('')
  const [refetchSumPosts, setRefetchSumPosts] = useState('')
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
        refetchSavedPost: refetchSavedPost,
        dataPosts: dataPosts,
        refetchPosts: refetchPosts,
        dataMyPosts: dataMyPosts,
        refetchMyPosts: refetchMyPosts,
        refetchCount: refetchCount,
        setRefetchCount: setRefetchCount,
        refetchSumPosts: refetchSumPosts,
        setRefetchSumPosts: setRefetchSumPosts
      }}
    >
      {children}
    </IContext.Provider>
  )
}

export default withRouter(ContextWrapper)
