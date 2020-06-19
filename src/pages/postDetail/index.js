/* eslint-disable react/prop-types */
import React from 'react'
import { withRouter } from 'react-router-dom'
import { PostHaveGroup, PostNoGroup } from '@components'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { LeftSquareOutlined } from '@ant-design/icons'
import { Tooltip, Empty, Skeleton } from 'antd'

export const GET_POST_BY_ID = gql`
  query postById($id: String) {
    postById(id: $id) {
      _id
      title
      content
      thumbnail
      createdBy {
        _id
        firstname
        lastname
        avatar
      }
      createdAt
      community {
        _id
        name
        avatar
      }
    }
  }
`

function PostDetail(props) {
  const { postId } = props.match.params
  const { data, refetch, loading } = useQuery(GET_POST_BY_ID, {
    variables: { id: postId },
    fetchPolicy: 'no-cache',
    skip: !postId
  })
  return loading ? (
    <Skeleton active avatar />
  ) : (
    <>
      <Tooltip title="Quay lại">
        <LeftSquareOutlined
          style={{ fontSize: 20 }}
          onClick={() => props.history.goBack()}
        />
      </Tooltip>
      {data?.postById ? (
        data?.postById?.community ? (
          <PostHaveGroup
            refetch={refetch}
            key={0}
            item={data?.postById}
            idx={0}
          ></PostHaveGroup>
        ) : (
          <PostNoGroup
            refetch={refetch}
            key={0}
            item={data?.postById}
            idx={0}
          ></PostNoGroup>
        )
      ) : (
        <div>
          <Empty description={'Bài đăng không còn khả dụng'} />
        </div>
      )}
    </>
  )
}

export default withRouter(PostDetail)
