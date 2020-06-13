/* eslint-disable react/prop-types */
import React, { useContext } from 'react'

import { withRouter } from 'react-router-dom'
// import Reaction from '../../../components/reaction'
import { useQuery } from '@apollo/react-hooks'
import { GET_SAVEDPOST_BY_USER } from '@shared'
import { IContext } from '@tools'
import { PostHaveGroup, PostNoGroup } from '@components'

function SavedPosts(props) {
  const { me, dataSavedPost } = useContext(IContext)

  // const { data } = useQuery(GET_SAVEDPOST_BY_USER, {
  //   variables: { userId: me?._id },
  //   fetchPolicy: 'no-cache'
  // })
  return (
    <>
      {dataSavedPost?.getSavedPostByUser?.map((item, idx) => {
        return item?.post?.community ? (
          <PostHaveGroup key={idx} item={item.post} idx={idx}></PostHaveGroup>
        ) : (
          <PostNoGroup key={idx} item={item.post} idx={idx}></PostNoGroup>
        )
      })}
    </>
  )
}

export default withRouter(SavedPosts)
