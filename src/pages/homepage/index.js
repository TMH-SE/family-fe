/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react'
import {
  Input,
} from 'antd'

import { withRouter } from 'react-router-dom'
import { brokenContext } from '../../layouts/MainLayout'
import './index.scss'
import {
  HighLightPost,
} from '@components'
import { IContext } from '@tools'
import { Post } from './post'
import ModalCreatePost from './modalCreatePost'
import { useQuery } from '@apollo/react-hooks'
import { GET_POSTS } from '@shared'
// import { SumComment } from '../../components/Comment'
// const { Meta } = Card
// var moment = require('moment')
// const data = [
//   {
//     title: 'Ant Design Title 1',
//     groupId: '111',
//     postId: 'post1'
//   },
//   {
//     title: 'Ant Design Title 2',
//     groupId: '222',
//     postId: 'post2'
//   },
//   {
//     title: 'Ant Design Title 3',
//     groupId: '111',
//     postId: 'post3'
//   },
//   {
//     title: 'Ant Design Title 4',
//     groupId: '222',
//     postId: 'post4'
//   }
// ]

const HomePage = ({ history }) => {
  const isBroken = useContext(brokenContext)
  const [visibleModalCreate, setVisibleModalCreate] = useState(false)
  const { me, isAuth } = useContext(IContext)
  const { data } = useQuery(GET_POSTS)
  const handleOk = () => {
    setVisibleModalCreate(false)
    // setVisibleModalReport(false)
  }
  const handleCancel = () => {
    setVisibleModalCreate(false)
    // setVisibleModalReport(false)
  }

  return (
    <>
      {isAuth && <><h3>Tạo bài viết</h3>
      <Input.TextArea
        onClick={() => isBroken ? history.push('/createpost') : setVisibleModalCreate(!visibleModalCreate)}
        style={{ margin: '0 auto', marginBottom: 10 }}
        placeholder={`${me?.firstname} ơi, hôm nay bạn cần chia sẻ gì ?`}
        autoSize={{ minRows: 3, maxRows: 5 }}
      /></>}
      <h3>Bài viết từ FAMILY</h3>
      <HighLightPost isBroken={isBroken}></HighLightPost>

      {data?.posts.map((item, idx) => {
        return (
          <Post key={idx} item={item} idx={idx} ></Post>
        )
      })}

      <ModalCreatePost
        isBroken={isBroken}
        handleCancel={handleCancel}
        visible={visibleModalCreate}
      />
    </>
  )
}

export default withRouter(HomePage)
