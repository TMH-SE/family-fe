import React from 'react'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Result, Button, Typography } from 'antd'
import { LoadingOutlined, CloseCircleOutlined } from '@ant-design/icons'

const { Paragraph, Text } = Typography

const VERIFY_ACCOUNT = gql`
  query verifyAccount($verifyToken: String) {
    verifyAccount(verifyToken: $verifyToken) {
      accessToken
    }
  }
`

const index = ({ history, match }) => {
  const {
    params: { verifyToken }
  } = match
  const { data, loading } = useQuery(VERIFY_ACCOUNT, {
    variables: {
      verifyToken
    }
  })
  console.log(data)
  return loading ? (
    <Result
      icon={<LoadingOutlined />}
      title="Đang xác minh tài khoản - giadinh.tk"
      subTitle="Vui lòng chờ trong giây lát"
    />
  ) : data?.verifyAccount ? (
    <Result
      status="success"
      title="Xác minh tài khoản thành công!"
      extra={[
        <Button
          onClick={() => {
            localStorage.setItem(
              'access-token',
              data?.verifyAccount?.accessToken
            )
            history.push('/homepage')
          }}
          key="home"
        >
          Tiếp tục
        </Button>
      ]}
    />
  ) : (
    <Result
      status="error"
      title="Xác Minh Tài Khoản Thất Bại"
      extra={[
        <Button onClick={() => history.push('/login')} type="primary" key="console">
          Đăng nhập
        </Button>,
        <Button key="buy">Gửi lại mail xác minh</Button>
      ]}
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16
            }}
          >
            Xác minh tài khoản thất bại có thể vì những lý do sau:
          </Text>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined style={{ color: 'red' }} /> Tài khoản đã được xác
          minh
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined style={{ color: 'red' }} /> Email xác minh đã hết
          hạn
        </Paragraph>
      </div>
    </Result>
  )
}

export default withRouter(index)
