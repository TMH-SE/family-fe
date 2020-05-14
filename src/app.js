import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routers from './router'
import './app.scss'

const App = () => {
  return (
    <BrowserRouter>
      <Routers></Routers>
    </BrowserRouter>
  )
}

export default App
