/* eslint-disable react/prop-types */
import React from 'react'
import { withRouter } from 'react-router-dom'
import {
  PostHaveGroup,
  PostNoGroup
} from '@components'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

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
  const { data } = useQuery(GET_POST_BY_ID, { variables: { id: postId } })
  return (
    data ?
    (data?.postById?.community ? (
      <PostHaveGroup key={0} item={data?.postById} idx={0}></PostHaveGroup>
    ) : (
      <PostNoGroup key={0} item={data?.postById} idx={0}></PostNoGroup>
    ))
    :
  <></>
  )
}

export default withRouter(PostDetail)
