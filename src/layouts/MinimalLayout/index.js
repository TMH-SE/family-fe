import React, { useState, useLayoutEffect } from 'react'
import { Row, Col } from 'antd'
import { Logo } from '@components'

const MinimalLayout = ({ children }) => {
  const [isBreak, setIsBreak] = useState(window.screen.width < 768)
  useLayoutEffect(() => {
    window.addEventListener('resize', e =>
      setIsBreak(e.target.screen.width < 768)
    )
  }, [])
  return (
    <Row
      style={{
        height: '100vh',
        ...(isBreak
          ? { background: '#fff' }
          : {
              backgroundImage:
                `url(https://images.squarespace-cdn.com/content/v1/5a4ff2f6e9bfdffb6a72160a/1522688304439-WUBW9DOMWY37ERYL5S9S/ke17ZwdGBToddI8pDm48kG87Sfbgg29A4BYEDq3OXvgUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcf4OxbJOyh_wHUnyc4kQLQ6SBshRGOku7c30Y_IRDNPta8R2IY5BHMaEj1zOWoDTZ/silhouette-of-family-playing-in-field-min.jpg?format=1500w)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            })
      }}
    >
      <Col xs={24} md={{ span: 12, offset: 12 }} flex="auto">
        <Row style={{ height: '100vh' }} justify="center" align="middle">
          <Col xs={22} sm={16} md={16}>
            <div style={{ marginBottom: 30, textAlign: 'center' }}>
              <Logo size="large" />
            </div>
            {children}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default MinimalLayout
