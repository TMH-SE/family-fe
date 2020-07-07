import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_USER } from '@shared'
import './index.scss'
import { LoadingOutlined } from '@ant-design/icons'
import { Avatar, List } from 'antd'
const ReactionInfo = ({ userId, type }) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { userId },
    fetchPolicy: 'no-cache'
  })

  return loading ? (
    <LoadingOutlined />
  ) : type ? (
    <div>
      <a href={`${window.location.origin}/${userId}/info`}>
        {data?.getUser?.firstname}
      </a>
    </div>
  ) : (
    // <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
    //   <Meta
    //     avatar={<Avatar src={data?.getUser?.avatar} />}
    //     title={
    //       <a href={`${window.location.origin}/${userId}/info`}>
    //         {data?.getUser?.firstname}
    //       </a>
    //     }
    //   />
    // </Card>
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={data?.getUser?.avatar} />}
        title={
          <a href={`${window.location.origin}/${userId}/info`}>
            {data?.getUser?.firstname}
          </a>
        }
      />
    </List.Item>
  )
}
export default ReactionInfo
