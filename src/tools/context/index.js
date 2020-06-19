/* eslint-disable no-undef */
import React, { useState } from 'react'
import { SdkUtils } from '@utils'
import { withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
  GET_SAVEDPOST_BY_USER,
  GET_POSTS,
  GET_POSTS_BY_USER
} from '@shared'
import MyPosts from '@pages/profile/myPosts'
import { notification } from 'antd'
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
console.log('context')
const ContextWrapper = ({ children, history }) => {
  const [messbox, setMessbox] = useState([])
  const [isAuth, setIsAuth] = useState(
    !!window.localStorage.getItem('access-token')
  )
  const [showLogin, setShowLogin] = useState(false)
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
        showLogin: showLogin,
        openLoginModal: openLoginModal,
        closeLoginModal: closeLoginModal,
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
