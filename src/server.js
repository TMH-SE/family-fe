import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './app'
import { ServerStyleSheet } from 'styled-components' // <-- importing ServerStyleSheet

const port = 3000
const server = express()

// Creating a single index route to server our React application from.
server.get('/', (req, res) => {
  const sheet = new ServerStyleSheet() // <-- creating out stylesheet

  const body = renderToString(sheet.collectStyles(<App />)) // <-- collecting styles
  const styles = sheet.getStyleTags() // <-- getting all the tags from the sheet
  const title = 'Server side Rendering with Styled Components'

  res.send(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        ${styles}
      </head>
      <body style="margin:0">
        <div id="app">${body}</div>
      </body>
    </html>`
  )
})

server.listen(port)
