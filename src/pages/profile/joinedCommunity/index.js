import React from 'react'
import { Avatar, List } from 'antd'
import { useHistory } from 'react-router-dom'

function JoinedCommunity(props) {
  const { communities } = props
  const history = useHistory()
  return (
    <List
      itemLayout="horizontal"
      dataSource={communities}
      renderItem={item => (
        <List.Item
          onClick={() => history.push(`/pagegroup/${item?.community?._id}`)}
          style={{ backgroundColor: '#fff', marginBottom: 10, padding: 10 }}
        >
          <List.Item.Meta
            style={{ display: 'flex' }}
            avatar={
              <Avatar size={64} shape='square' src={item?.community?.avatar} />
            }
            title={
              <a
                style={{ color: 'black' }}
                onClick={() => history.push(`/pagegroup/${item?.community?._id}`)}
              >
                {item?.community?.name}
              </a>
            }
            description="12k likes - 8k members"
          />
        </List.Item>
      )}
    />
  )
}
export default JoinedCommunity
