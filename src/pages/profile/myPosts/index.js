/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'

import {
  ModalReport,
  PostNoGroup,
  PostHaveGroup
  // ModalCreatePost
} from '../../../components'
import { IContext } from '@tools'

function MyPosts(props) {
  const [visibleModalReport, setVisibleModalReport] = useState(false)
  const { dataMyPosts } = useContext(IContext)
  // const { data } = useQuery(GET_POSTS_BY_USER, {
  //   variables: { userId: me?._id }
  // })
  console.log(dataMyPosts, 'post')
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
      {dataMyPosts && dataMyPosts?.postsByUser.map((item, idx) => (
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
