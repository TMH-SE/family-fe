/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import { Input, Spin } from 'antd'

import { withRouter } from 'react-router-dom'
import { brokenContext } from '../../layouts/MainLayout'
import './index.scss'
import { HighLightPost, PostHaveGroup, PostNoGroup } from '@components'
import { IContext } from '@tools'
import CreatePostDrawer from './createPostDrawer'
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
  const { me, isAuth, dataPosts } = useContext(IContext)

  const handleCancel = () => {
    setVisibleModalCreate(false)
  }

  return (
    <>
      {isAuth && (
        <>
          <p style={{ fontSize: 16, color: 'rgba(0,0,0,0.6)', fontWeight: 'bold' }}>
            Tạo bài viết
          </p>
          <Input.TextArea
            onClick={() =>
              isBroken
                ? history.push('/createpost')
                : setVisibleModalCreate(!visibleModalCreate)
            }
            style={{ margin: '0 auto', marginBottom: 10, resize: 'none' }}
            placeholder={`${me?.firstname} ơi, hôm nay bạn cần chia sẻ gì ?`}
            // autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </>
      )}
      <p style={{ fontSize: 16, color: 'rgba(0,0,0,0.6)', fontWeight: 'bold' }}>Bài viết từ FAMILY</p>
      <HighLightPost isBroken={isBroken}></HighLightPost>

      {dataPosts?.posts.map((item, idx) => {
        return item?.community ? (
          <PostHaveGroup key={idx} item={item} idx={idx}></PostHaveGroup>
        ) : (
          <PostNoGroup key={idx} item={item} idx={idx}></PostNoGroup>
        )
      })}

      <CreatePostDrawer
        isBroken={isBroken}
        handleCancel={handleCancel}
        visible={visibleModalCreate}
      />
    </>
  )
}

export default withRouter(HomePage)
