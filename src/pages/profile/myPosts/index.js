/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'

import {
  ModalReport,
  PostNoGroup,
  PostHaveGroup
  // ModalCreatePost
} from '../../../components'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { IContext } from '@tools'

export const GET_POSTS_BY_USER = gql`
  query postsByUser($userId: String) {
    postsByUser(userId: $userId) {
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
      community{
        _id
        name
        avatar
      }
    }
  }
`
function MyPosts(props) {
  const [visibleModalReport, setVisibleModalReport] = useState(false)
  const { me } = useContext(IContext)
  const { data } = useQuery(GET_POSTS_BY_USER, {
    variables: { userId: me?._id }
  })
  const handleOk = () => {
    // setVisibleModalCreate(false)
    setVisibleModalReport(false)
  }
  const handleCancel = () => {
    // setVisibleModalCreate(false)
    setVisibleModalReport(false)
  }

  return (
    <>
      {data && data?.postsByUser.map((item, idx) => (
        item?.community ? <PostHaveGroup key={idx} item={item} idx={idx}></PostHaveGroup> : <PostNoGroup key={idx} item={item} idx={idx}></PostNoGroup>
      ))}

      <ModalReport
        visible={visibleModalReport}
        handleCancel={handleCancel}
        handleOk={handleOk}
      ></ModalReport>
      {/* <ModalCreatePost
        handleCancel={handleCancel}
        handleOk={handleOk}
        visible={visibleModalCreate}
      ></ModalCreatePost> */}
    </>
  )
}

export default MyPosts
