import React, { useContext } from 'react'
import { Avatar, List, Skeleton } from 'antd'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import { ArrowRightOutlined } from '@ant-design/icons'
import { CommunityItem, HighLightPost } from '@components'
import { MainContext } from '../../layouts/MainLayout'

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
      countMember
      countPost
    }
  }
`
function AllCommunities(props) {
  const { data, loading } = useQuery(GET_COMMUNITIES)
  const { isBroken } = useContext(MainContext)
  return loading ? (
    <Skeleton active avatar />
  ) : (
    <>
    <HighLightPost history={props.history} isBroken={isBroken}></HighLightPost>
      <p>Tất cả cộng đồng </p>
      <List
        pagination={{
          pageSize: 4
        }}
        itemLayout="horizontal"
        dataSource={data?.communities}
        renderItem={item => <CommunityItem isActionJoin={true} item={item} />}
      />
    </>
  )
}
export default AllCommunities
