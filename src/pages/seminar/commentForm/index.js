import React from 'react'
import { Comment, Row, Col, Avatar, Input, List } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import moment from 'moment'

const Comments = ({ breakPoint }) => {
  return (
    <div
      style={{
        height: breakPoint ? '50vh' : '100vh',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}
    >
      <div style={{ flex: '1 1 auto' }}>
        <div style={{ borderBottom: '1px solid #ccc', padding: 10 }}>
          <h1 style={{ fontSize: 18 }}>Hội thảo dinh dưỡng cho trẻ</h1>
          <div>Bs. Trần Minh H</div>
        </div>
        <div
          style={{
            borderBottom: '1px solid #ccc',
            padding: 10,
            fontWeight: 'bold'
          }}
        >
          Câu hỏi và bình luận:
        </div>
      </div>
      <div style={{ overflow: 'auto' }}>
        <List
          dataSource={[
            {
              author: 'Han Solo',
              avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: (
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources
                </p>
              ),
              datetime: moment().fromNow()
            },
            {
              author: 'Han Solo',
              avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: (
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources
                </p>
              ),
              datetime: moment().fromNow()
            },
            {
              author: 'Han Solo',
              avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: (
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources
                </p>
              ),
              datetime: moment().fromNow()
            },
            {
              author: 'Han Solo',
              avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: (
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources
                </p>
              ),
              datetime: moment().fromNow()
            },
            {
              author: 'Han Solo',
              avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: (
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources
                </p>
              ),
              datetime: moment().fromNow()
            },
            {
              author: 'Han Solo',
              avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: (
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources
                </p>
              ),
              datetime: moment().fromNow()
            },
            {
              author: 'Han Solo',
              avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: (
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources
                </p>
              ),
              datetime: moment().fromNow()
            },
            {
              author: 'Han Solo',
              avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: (
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources
                </p>
              ),
              datetime: moment().fromNow()
            },
            {
              author: 'Han Solo',
              avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: (
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources
                </p>
              ),
              datetime: moment().fromNow()
            },
            {
              author: 'Han Solo',
              avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: (
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources
                </p>
              ),
              datetime: moment().fromNow()
            },
            {
              author: 'Han Solo',
              avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: (
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources
                </p>
              ),
              datetime: moment().fromNow()
            },
            {
              author: 'Han Solo',
              avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: (
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources
                </p>
              ),
              datetime: moment().fromNow()
            },
            {
              author: 'Han Solo',
              avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: (
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources
                </p>
              ),
              datetime: moment().fromNow()
            }
          ]}
          itemLayout="horizontal"
          renderItem={props => <Comment style={{ margin: 10 }} {...props} />}
        />
      </div>
      <Row style={{ padding: 10, borderTop: '1px solid #ccc' }}>
        <Col xs={0} lg={4}>
          <Avatar icon={<UserOutlined />} />
        </Col>
        <Col xs={24} lg={20}>
          <Input.TextArea
            autoFocus
            onPressEnter={e => console.log(e.target.value)}
            style={{ width: '100%', resize: 'none' }}
            placeholder="Bạn muốn hỏi gì?"
            autoSize={{ maxRows: 4, minRows: 1 }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Comments
