import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter } from 'react-router-dom'
import { SdkUtils } from '@utils'
import { Client, ContextWrapper } from '@tools'
import Routers from '@routers'
import './app.scss'

const App = () => {
  SdkUtils.initFacebookSdk()
  SdkUtils.initGooglePlatform()
  return (
    <ApolloProvider client={Client}>
      <BrowserRouter>
        <ContextWrapper>
          <Routers />
        </ContextWrapper>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
