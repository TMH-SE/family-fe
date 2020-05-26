/* eslint-disable no-undef */
import React, { useState } from 'react'
import { SdkUtils } from '@utils'
import { withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const IContext = React.createContext()

const GET_ME = gql`
  query me {
    me {
      email
      firstname
      lastname
      avatar
    }
  }
`

const ContextWrapper = ({ children, history }) => {
  const [isAuth, setIsAuth] = useState(
    !!window.localStorage.getItem('access-token')
  )
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
        me: data?.me
      }}
    >
      {children}
    </IContext.Provider>
  )
}

export default withRouter(ContextWrapper)
