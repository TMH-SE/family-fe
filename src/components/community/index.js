import React, { useContext, useEffect } from 'react'
import { Avatar, List, Skeleton, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { GET_POST_BY_COMMUNITY, GET_MEMBERS_BY_COMMUNITY } from '@shared'
import { useQuery } from '@apollo/react-hooks'
import { IContext } from '@tools'
import JoinBtn from '../joinBtn'

function CommunityItem(props) {
  const { item } = props
  const {
    refetchCount,
    setRefetchCount,
    refetchSumPosts,
    setRefetchSumPosts,
    me
  } = useContext(IContext)
  const history = useHistory()
  // const [ dataMems, setDataMems ] = useState(null)
  const { data, refetch, loading } = useQuery(GET_POST_BY_COMMUNITY, {
    variables: { communityId: item?._id },
    fetchPolicy: 'no-cache',
    skip: !item?._id
  })
  const {
    data: dataMemberCount,
    refetch: refetchDataMemberCount,
    loading: loadingSumMem
  } = useQuery(GET_MEMBERS_BY_COMMUNITY, {
    variables: { communityId: item?._id },
    fetchPolicy: 'no-cache',
    skip: !item?._id
  })
  useEffect(() => {
    refetchCount !== '' && refetchDataMemberCount({ variables: refetchCount })
    refetchSumPosts !== '' && refetch({ variables: refetchSumPosts })
    setRefetchCount('')
    setRefetchSumPosts('')
  }, [refetchCount, refetchSumPosts])
  return loading || loadingSumMem ? (
    <Skeleton active></Skeleton>
  ) : (
    <List.Item
      onClick={() => {
        props?.setShowCommunities && props.setShowCommunities(false)
        history.push(`/pagegroup/${item?._id}`)
      }}
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
      {props.isActionJoin && (
        <JoinBtn id={{ userId: me?._id, communityId: item?._id }} />
      )}
    </List.Item>
  )
  // )}
  // />
}
export default CommunityItem
