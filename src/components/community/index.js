import React, { useContext, useEffect, useState, useLayoutEffect } from 'react'
import { Avatar, List } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import { GET_POST_BY_COMMUNITY, GET_MEMBERS_BY_COMMUNITY } from '@shared'
import { useQuery } from '@apollo/react-hooks'
import { IContext } from '@tools'

function CommunityItem(props) {
  const { item } = props
  const { refetchCount, setRefetchCount, refetchSumPosts, setRefetchSumPosts } = useContext(IContext)
  const history = useHistory()
  // const [ dataMems, setDataMems ] = useState(null)
  const { data, refetch } = useQuery(GET_POST_BY_COMMUNITY, {
    variables: { communityId: item?._id },
    fetchPolicy: 'no-cache'
  })
  const { data: dataMemberCount, refetch: refetchDataMemberCount } = useQuery(GET_MEMBERS_BY_COMMUNITY, {
    variables: { communityId: item?._id },
    fetchPolicy: 'no-cache'
  })
  useEffect(() => {
    refetchCount !== '' && refetchDataMemberCount({ variables: refetchCount })
    refetchSumPosts !== '' && refetch({ variables: refetchSumPosts })
    setRefetchCount('')
    setRefetchSumPosts('')
  }, [refetchCount, refetchSumPosts])
  return (
    <List.Item
      onClick={() => history.push(`/pagegroup/${item?._id}`)}
      style={{ backgroundColor: '#fff', marginBottom: 10, padding: 10 }}
    >
      <List.Item.Meta
        style={{ display: 'flex' }}
        avatar={<Avatar size={64} shape="square" src={item?.avatar} />}
        title={
          <a
            style={{ color: 'black', fontWeight: 'bold' }}
            onClick={() => history.push(`/pagegroup/${item?._id}`)}
          >
            {item?.name}
          </a>
        }
        description={`${dataMemberCount?.getMembersByCommunity} thành viên - ${data?.postsByCommunity?.length} bài viết`}
      />
    </List.Item>
    // )}
    // />
  )
}
export default CommunityItem
