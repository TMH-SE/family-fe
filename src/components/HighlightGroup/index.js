import React from 'react'
import { Avatar, List } from 'antd'
import { useHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import CommunityItem from '../community'

// const data = [
//   {
//     title: 'Ant Design Title 1'
//   },
//   {
//     title: 'Ant Design Title 2'
//   },
//   {
//     title: 'Ant Design Title 3'
//   },
//   {
//     title: 'Ant Design Title 4'
//   }
// ]

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
  const history = useHistory()
  const { data } = useQuery(GET_COMMUNITIES)
  return (
    <List
      itemLayout="horizontal"
      dataSource={data?.communities}
      renderItem={item => (
        <CommunityItem item={item} />
        // <List.Item
        //   onClick={() => history.push(`/pagegroup/${item?._id}`)}
        //   style={{ backgroundColor: '#fff', marginBottom: 10, padding: 10 }}
        // >
        //   <List.Item.Meta
        //     style={{ display: 'flex' }}
        //     avatar={
        //       <Avatar src={item?.avatar} />
        //     }
        //     title={
        //       <a
        //         style={{ color: 'black' }}
        //         onClick={() => history.push('/pagegroup/111')}
        //       >
        //         {item?.name}
        //       </a>
        //     }
        //     description="12k likes - 8k members"
        //   />
        // </List.Item>
      )}
    />
  )
}
export default HighlightGroup
