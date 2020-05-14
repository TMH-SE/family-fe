import React from 'react'
import { Avatar, List } from 'antd'
import { useHistory } from 'react-router-dom'

const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
]
function HighlightGroup (props) {
  const history = useHistory()
  return (
    <List
      itemLayout='horizontal'
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          onClick={() => history.push('/pagegroup/111')}
          style={{ backgroundColor: '#fff', marginBottom: 10, padding: 10 }}
        >
          <List.Item.Meta
            style={{ display: 'flex' }}
            avatar={
              <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
            }
            title={<a style={{ color: 'black' }} onClick={() => history.push('/pagegroup/111')}>{item.title}</a>}
            description='12k likes - 8k members'
          />
        </List.Item>
      )}
    />
  )
}
export default HighlightGroup
