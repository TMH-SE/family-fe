/* eslint-disable react/prop-types */
import React, { useContext } from 'react'

import { withRouter } from 'react-router-dom'
// import Reaction from '../../../components/reaction'
import { IContext } from '@tools'
import { PostHaveGroup, PostNoGroup } from '@components'

function SavedPosts(props) {
  const { dataSavedPost } = useContext(IContext)
  return (
    <>
      {dataSavedPost?.getSavedPostByUser?.reverse().map((item, idx) => {
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
