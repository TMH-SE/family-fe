/* eslint-disable react/prop-types */
import React, { useContext } from 'react'

import { withRouter } from 'react-router-dom'
// import Reaction from '../../../components/reaction'
import { useQuery } from '@apollo/react-hooks'
import { GET_SAVEDPOST_BY_USER } from '@shared'
import { IContext } from '@tools'
import { Post } from '@pages/homepage/post'

function SavedPosts(props) {
  const { me } = useContext(IContext)

  const { data } = useQuery(GET_SAVEDPOST_BY_USER, {
    variables: { userId: me?._id }, fetchPolicy: 'no-cache'
  })
  return (
    <>
    {data?.getSavedPostByUser?.map((item, idx) => {
        return (
          <Post key={idx} item={item.post} idx={idx} ></Post>
        )
      })}

    </>
  )
}

export default withRouter(SavedPosts)
