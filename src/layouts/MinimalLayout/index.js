import React from 'react'
import { Row, Col } from 'antd'
import { Logo } from '../../components'

const MinimalLayout = ({ children }) => {
  return (
    <Row style={{ height: '100vh' }}>
      <Col
        md={12}
        style={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></Col>
      <Col xs={24} md={12} flex="auto">
        <Row
          style={{ height: '100vh', background: '#fff' }}
          justify="center"
          align="middle"
        >
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
