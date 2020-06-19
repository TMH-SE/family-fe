import React from 'react'
import { Avatar, List, Skeleton } from 'antd'
import { useHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import CommunityItem from '../community'
import { ArrowRightOutlined } from '@ant-design/icons'

const GET_COMMUNITIES = gql`
  query communities {
    communities {
      _id
      name
      avatar
      coverPhoto
      createdAt
      createdBy {
        firstname
        lastname
      }
    }
  }
`
function HighlightGroup(props) {
  const { data, loading } = useQuery(GET_COMMUNITIES)
  return loading ? (
    <Skeleton active avatar />
  ) : (
    <>
    <List
      itemLayout="horizontal"
      dataSource={data?.communities}
      renderItem={item => <CommunityItem item={item} />}
    />
    <a>Xem tất cả cộng đồng <ArrowRightOutlined /></a>
    </>
  )
}
export default HighlightGroup
