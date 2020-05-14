import React from 'react'
import { Row, Col, Input } from 'antd'
import Form from 'antd/lib/form/Form'

function index () {
  return (
    <Row>
      <Col
        md={12}
        style={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></Col>
      <Col xs={24} md={12}>
        <Form>
          <Form.Item>
            <Input />
          </Form.Item>
          <Form.Item>
            <Input.Password />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default index
