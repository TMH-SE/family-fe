/* eslint-disable no-undef */
import React from 'react'
import { Row, Col, Form, Input, Button, Divider } from 'antd'
import {
  GoogleOutlined,
  FacebookFilled,
  MailOutlined,
  LockOutlined
} from '@ant-design/icons'

function SignIn () {
  const loginFB = () => {
    FB.init({
      appId: '2569214810002562',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v6.0'
    })
    FB.login(res => console.log(res))
  }
  return (
    <>
      <Form>
        <Form.Item>
          <Input prefix={<MailOutlined />} placeholder='Email' />
        </Form.Item>
        <Form.Item>
          <Input.Password prefix={<LockOutlined />} placeholder='Password' />
        </Form.Item>
        <Row justify='space-between' gutter={8}>
          <Col span={12}>
            <Button style={{ marginBottom: 10 }} block type='primary'>
              Login
            </Button>
          </Col>
          <Col span={12}>
            <Button block>Sign up</Button>
          </Col>
        </Row>
      </Form>
      <Divider>or</Divider>
      <Row justify='space-between' gutter={8}>
        <Col xs={24} lg={12}>
          <Button
            style={{ marginBottom: 10 }}
            icon={<FacebookFilled />}
            block
            type='primary'
            onClick={loginFB}>
            Login with Facebook
          </Button>
        </Col>
        <Col xs={24} lg={12}>
          <Button icon={<GoogleOutlined />} block type='danger'>
            Login with Google
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default SignIn
