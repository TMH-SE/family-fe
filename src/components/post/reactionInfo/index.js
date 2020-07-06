import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_USER } from '@shared'
import './index.scss'
import { LoadingOutlined } from '@ant-design/icons'
const ReactionInfo = ({ userId }) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { userId },
    fetchPolicy: 'no-cache'
  })
  return loading ? <LoadingOutlined/> : <div><a href={`${window.location.origin}/${userId}/info`} style={{ color: '#fff' }}>{data?.getUser?.firstname}</a></div>
}
export default ReactionInfo
