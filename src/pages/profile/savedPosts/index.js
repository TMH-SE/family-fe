/* eslint-disable react/prop-types */
import React, { useContext } from 'react'

import { withRouter } from 'react-router-dom'
// import Reaction from '../../../components/reaction'
import { IContext } from '@tools'
import { PostHaveGroup, PostNoGroup } from '@components'
import { GET_SAVEDPOST_BY_USER } from '@shared'
import { useQuery } from '@apollo/react-hooks'

function SavedPosts(props) {
  const { me } = useContext(IContext)
  const { data: dataSavedPost, refetch: refetchSavedPost } = useQuery(
    GET_SAVEDPOST_BY_USER,
    {
      variables: { userId: me?._id },
      fetchPolicy: 'no-cache'
    }
  )
  return (
    <>
      {dataSavedPost?.getSavedPostByUser?.reverse().map((item, idx) => {
        return item?.post?.community ? (
          <PostHaveGroup
            refetch={refetchSavedPost}
            key={idx}
            item={item.post}
            idx={idx}
          ></PostHaveGroup>
        ) : (
          <PostNoGroup
            refetch={refetchSavedPost}
            key={idx}
            item={item.post}
            idx={idx}
          ></PostNoGroup>
        )
      })}
    </>
  )
}

export default withRouter(SavedPosts)
