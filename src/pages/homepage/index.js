/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import { Input, List, Skeleton } from 'antd'
import { withRouter } from 'react-router-dom'
import { brokenContext } from '../../layouts/MainLayout'
import { HighLightPost } from '@components'
import { IContext } from '@tools'
import { Post } from './post'
import CreatePostDrawer from './createPostDrawer'
import './index.scss'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const GET_POSTS = gql`
  query posts {
    posts {
      _id
      title
      content
      thumbnail
      community {
        _id
        name
        avatar
      }
      createdBy {
        _id
        firstname
        lastname
        avatar
      }
      createdAt
    }
  }
`

const HomePage = ({ history }) => {
  const isBroken = useContext(brokenContext)
  const [visibleModalCreate, setVisibleModalCreate] = useState(false)
  const { me } = useContext(IContext)

  const { loading, data } = useQuery(GET_POSTS)

  const handleCancel = () => {
    setVisibleModalCreate(false)
  }

  return (
    <div style={{ marginBottom: 25 }}>
      <h3>Tạo bài viết</h3>
      <Input.TextArea
        onClick={() =>
          isBroken
            ? history.push('/createpost')
            : setVisibleModalCreate(!visibleModalCreate)
        }
        style={{ margin: '0 auto', marginBottom: 10 }}
        placeholder={`${me?.firstname} ơi, hôm nay bạn cần chia sẻ gì ?`}
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <h3>Bài viết từ FAMILY</h3>
      <HighLightPost isBroken={isBroken}></HighLightPost>

      {loading ? (
        <List
          itemLayout="vertical"
          size="large"
          dataSource={[1, 2, 3]}
          renderItem={item => (
            <List.Item>
              <Skeleton
                loading={loading}
                active
                avatar
                paragraph={{ rows: 4 }}
              />
            </List.Item>
          )}
        />
      ) : (
        data?.posts?.map((item, idx) => {
          return <Post key={idx} item={item} idx={idx}></Post>
        })
      )}

      <CreatePostDrawer
        isBroken={isBroken}
        handleCancel={handleCancel}
        visible={visibleModalCreate}
      />
    </div>
  )
}

export default withRouter(HomePage)
