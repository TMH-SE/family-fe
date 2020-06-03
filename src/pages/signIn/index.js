/* eslint-disable no-undef */
import React, { useContext } from 'react'
import { Row, Col, Form, Input, Button, Divider } from 'antd'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import {
  GoogleOutlined,
  FacebookFilled,
  MailOutlined,
  LockOutlined
} from '@ant-design/icons'
import { SdkUtils } from '@utils'
import { MinimalLayout } from '@layouts'
import { IContext } from '@tools'

const SIGN_IN = gql`
  mutation signIn($email: String, $password: String) {
    signIn(email: $email, password: $password) {
      accessToken
    }
  }
`

const SIGN_IN_FACEBOOK = gql`
  mutation signInWithFacebook($facebookAuthData: FacebookAuthData) {
    signInWithFacebook(facebookAuthData: $facebookAuthData) {
      accessToken
    }
  }
`

const SIGN_IN_GOOGLE = gql`
  mutation signInWithGoogle($token: String) {
    signInWithGoogle(token: $token) {
      accessToken
    }
  }
`

const SignIn = () => {
  const { authenticate, history } = useContext(IContext)
  const [signIn] = useMutation(SIGN_IN)
  const [signInWithFacebook] = useMutation(SIGN_IN_FACEBOOK)
  const [signInWithGoogle] = useMutation(SIGN_IN_GOOGLE)
  const login = async values => {
    signIn({
      variables: {
        ...values
      }
    }).then(
      ({
        data: {
          signIn: { accessToken }
        }
      }) => {
        authenticate(accessToken)
      }
    )
  }
  const loginFB = async () => {
    const { accessToken, userID } = await SdkUtils.loginFB()
    signInWithFacebook({
      variables: {
        facebookAuthData: { accessToken, userID }
      }
    }).then(
      ({
        data: {
          signInWithFacebook: { accessToken }
        }
      }) => {
        authenticate(accessToken)
      }
    )
  }
  const loginGG = async () => {
    const idToken = await SdkUtils.loginGoogle()
    signInWithGoogle({
      variables: {
        token: idToken
      }
    }).then(
      ({
        data: {
          signInWithGoogle: { accessToken }
        }
      }) => {
        authenticate(accessToken)
      }
    )
  }
  return (
    <MinimalLayout>
      <Form onFinish={login}>
        <Form.Item name="email">
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Row justify="space-between" gutter={8}>
          <Col span={12}>
            <Button
              htmlType="submit"
              style={{ marginBottom: 10 }}
              block
              type="primary"
            >
              Login
            </Button>
          </Col>
          <Col span={12}>
            <Button danger block onClick={() => history.push('/register')}>
              Sign up
            </Button>
          </Col>
        </Row>
      </Form>
      <Divider>or</Divider>
      <Row justify="space-between" gutter={8}>
        <Col xs={24} lg={12}>
          <Button
            style={{ marginBottom: 10 }}
            icon={<FacebookFilled />}
            block
            type="primary"
            onClick={loginFB}
          >
            Login with Facebook
          </Button>
        </Col>
        <Col xs={24} lg={12}>
          <Button
            icon={<GoogleOutlined />}
            block
            type="danger"
            onClick={loginGG}
          >
            Login with Google
          </Button>
        </Col>
      </Row>
    </MinimalLayout>
  )
}

export default SignIn
