/* eslint-disable no-undef */
import React, { useState, useLayoutEffect } from 'react'
import { SdkUtils } from '@utils'
import { withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_USER } from '@shared'
import firebase from 'firebase/app'
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
  const chooseConversation = (idChat, userId) => {
    if (messbox.findIndex(mess => mess.idChat === idChat) === -1) {
      const a = [...messbox]
      a.push({ idChat, userId })
      setMessbox(a)
    }
    document.getElementById(`input-custom-${idChat}`) &&
      document.getElementById(`input-custom-${idChat}`).focus()
  }
  const onCancelMessbox = idChat => {
    const idx = messbox.findIndex(mess => mess === idChat)
    var arr = [...messbox]
    arr.splice(idx, 1)
    setMessbox([...arr])
  }

  // const getSumComment =idPost => {
  //   let temp
  //   let sum = 0
  //   console.log('aaaaaaaaaa')
  //   firebase
  //     .database()
  //     .ref(`posts/${idPost}/comments`)
  //     .on('value', snapshot => {
  //       sum = Object.keys(snapshot.val()).length
  //       console.log(sum, 'sum1111111', idPost)
  //       setSumComment(sum)
  //     })
  //     // console.log(sum, 'sum', idPost)
  //   // setSumComment(sum)
  //   // return sum
  // }
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
        onCancelMessbox: onCancelMessbox
      }}
    >
      {children}
    </IContext.Provider>
  )
}

export default withRouter(ContextWrapper)
