import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_USER } from '@shared'
import { Skeleton } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
const ReactionInfo = ({ userId }) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { userId },
    fetchPolicy: 'no-cache'
  })
  return loading ? <LoadingOutlined/> : <p>{data?.getUser?.firstname}</p>
}
export default ReactionInfo
