import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_USER } from '@shared'
import { Skeleton } from 'antd'
const ReactionInfo = ({ userId }) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { userId },
    fetchPolicy: 'no-cache'
  })
  return loading ? <Skeleton active /> : <p>{data?.getUser?.firstname}</p>
}
export default ReactionInfo
