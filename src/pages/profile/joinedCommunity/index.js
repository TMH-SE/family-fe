import React from 'react'
import { Avatar, List } from 'antd'
import { useHistory } from 'react-router-dom'
import { GET_POST_BY_COMMUNITY, GET_MEMBERS_BY_COMMUNITY } from '@shared'
import { useQuery } from '@apollo/react-hooks'

function JoinedCommunity(props) {
  const { item } = props
  const history = useHistory()
  const { data } = useQuery(GET_POST_BY_COMMUNITY, {
    variables: { communityId: item?.community?._id }
  })
  const { data: dataMemberCount } = useQuery(GET_MEMBERS_BY_COMMUNITY, {
    variables: { communityId: item?.community?._id },
    fetchPolicy: 'no-cache'
  })
  return (
    // <List
    //   itemLayout="horizontal"
    //   dataSource={communities}
    //   renderItem={item => (
    <List.Item
      onClick={() => history.push(`/pagegroup/${item?.community?._id}`)}
      style={{ backgroundColor: '#fff', marginBottom: 10, padding: 10 }}
    >
      <List.Item.Meta
        style={{ display: 'flex' }}
        avatar={
          <Avatar size={64} shape="square" src={item?.community?.avatar} />
        }
        title={
          <a
            style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}
            onClick={() => history.push(`/pagegroup/${item?.community?._id}`)}
          >
            {item?.community?.name}
          </a>
        }
        description={
            `${dataMemberCount?.getMembersByCommunity} thành viên - ${data?.postsByCommunity?.length} bài viết`

        }
      />
    </List.Item>
    // )}
    // />
  )
}
export default JoinedCommunity
