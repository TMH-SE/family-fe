import React, { useContext } from 'react'
import { Avatar, List, Skeleton } from 'antd'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { IContext } from '@tools'
import JoinBtn from '../joinBtn'
import { GET_COMMUNITY_BY_ID } from '@pages/pageGroup'
function CommunityItem(props) {
  const { item } = props
  const { me } = useContext(IContext)
  const history = useHistory()
  const { data, loading } = useQuery(GET_COMMUNITY_BY_ID, {
    variables: { id: item?.id },
    fetchPolicy: 'no-cache',
    skip: !item?.id
  })
  return loading ? (
    <Skeleton active></Skeleton>
  ) : (
    <List.Item
      onClick={() => {
        props?.setShowCommunities && props.setShowCommunities(false)
        // history.push(`/page-group/${item?._id}`)
      }}
      style={{ backgroundColor: '#fff', marginBottom: 10, padding: 10 }}
    >
      <List.Item.Meta
        style={{ display: 'flex' }}
        avatar={
          <Avatar size={64} shape="square" src={data?.communityById?.avatar} />
        }
        title={
          <a
            style={{ color: 'black', fontWeight: 'bold' }}
            onClick={() => history.push(`/page-group/${item?.id}`)}
          >
            {data?.communityById?.name}
          </a>
        }
        description={`${item?.membersCount} thành viên - ${item?.postsCount} bài viết`}
      />
      {props.isActionJoin && (
        <JoinBtn
          id={{ userId: me?._id, communityId: item?.id }}
          history={history}
          // refetchDataMemberCount={refetchDataMemberCount}
        />
      )}
    </List.Item>
  )
  // )}
  // />
}
export default CommunityItem
