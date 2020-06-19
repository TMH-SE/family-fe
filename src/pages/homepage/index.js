/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import { Input, Spin, Skeleton } from 'antd'

import { withRouter } from 'react-router-dom'
import { MainContext } from '../../layouts/MainLayout'
import './index.scss'
import {
  HighLightPost,
  PostHaveGroup,
  PostNoGroup,
  CreatePostDrawer
} from '@components'
import { IContext } from '@tools'
import { GET_POSTS, GET_COMMUNITIES_BY_USER } from '@shared'
import { useQuery } from '@apollo/react-hooks'

const HomePage = (props) => {
  const { history } = props
  const { isBroken } = useContext(MainContext)
  const [visibleModalCreate, setVisibleModalCreate] = useState(false)
  const { me, isAuth } = useContext(IContext)
  const handleCancel = () => {
    setVisibleModalCreate(false)
  }
  const { data: dataPosts, refetch: refetchPosts, loading } = useQuery(
    GET_POSTS,
    {
      fetchPolicy: 'no-cache'
    }
  )
  const { data: dataCom } = useQuery(GET_COMMUNITIES_BY_USER, {
    variables: { userId: me?._id },
    fetchPolicy: 'no-cache',
    skip: !me?._id
  })
  return (
    <>
      {isAuth && (
        <>
          <p
            style={{
              fontSize: 16,
              color: 'rgba(0,0,0,0.6)',
              fontWeight: 'bold'
            }}
          >
            Tạo bài viết
          </p>
          <Input.TextArea
            onClick={() =>
              isBroken
                ? history.push('/createpost')
                : setVisibleModalCreate(!visibleModalCreate)
            }
            style={{
              margin: '0 auto',
              marginBottom: 15,
              resize: 'none',
              // background: rgb(0, 152, 218)',
              boxShadow: '0px 0px 5px #1f7fc8'
            }}
            placeholder={`${me?.firstname} ơi, hôm nay bạn cần chia sẻ gì ?`}
            // autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </>
      )}
      <p style={{ fontSize: 16, color: 'rgba(0,0,0,0.6)', fontWeight: 'bold' }}>
        Bài viết từ FAMILY
      </p>
      <HighLightPost history={history} isBroken={isBroken}></HighLightPost>

      {loading ? (
        <Skeleton active />
      ) : (
        dataPosts?.posts.map((item, idx) => {
          return item?.community ? (
            <PostHaveGroup
              refetch={refetchPosts}
              key={idx}
              item={item}
              idx={idx}
            ></PostHaveGroup>
          ) : (
            <PostNoGroup
              refetch={refetchPosts}
              key={idx}
              item={item}
              idx={idx}
            ></PostNoGroup>
          )
        })
      )}

      <CreatePostDrawer
        data={dataCom?.getCommunitiesByUser}
        refetch={refetchPosts}
        isBroken={isBroken}
        handleCancel={handleCancel}
        visible={visibleModalCreate}
      />
    </>
  )
}

export default withRouter(HomePage)
