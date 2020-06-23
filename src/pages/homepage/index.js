/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react'
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

const HomePage = props => {
  const { history } = props
  const { isBroken } = useContext(MainContext)
  const [visibleModalCreate, setVisibleModalCreate] = useState(false)
  const { me, isAuth } = useContext(IContext)
  const [quantityPosts, setQuantityPosts] = useState(0)
  const handleCancel = () => {
    setVisibleModalCreate(false)
  }
  const {
    data: dataPosts,
    refetch: refetchPosts,
    loading,
    fetchMore
  } = useQuery(GET_POSTS, {
    variables: { quantity: 5 },
    fetchPolicy: 'no-cache'
  })
  const { data: dataCom } = useQuery(GET_COMMUNITIES_BY_USER, {
    variables: { userId: me?._id },
    fetchPolicy: 'no-cache',
    skip: !me?._id
  })
  const [loadMore, setLoadMore] = useState(false)
  const [isEnd, setIsEnd] = useState(false)
  const [dataPostLoad, setDataPostLoad] = useState(dataPosts)
  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.scrollingElement.scrollHeight
    ) {
      setLoadMore(true)

      document.documentElement.scrollTop = loadMore
        ? document.scrollingElement.scrollHeight
        : document.documentElement.scrollTop
    }
  }
  useEffect(() => {
    setDataPostLoad(dataPosts)
  }, [dataPosts])
  useEffect(() => {
    setQuantityPosts(quantityPosts + 5)
    fetchMoreListItems()
  }, [loadMore])
  function fetchMoreListItems() {
    setTimeout(async () => {
      const a = await fetchMore({
        query: GET_POSTS,
        variables: {
          quantity: quantityPosts
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          return Object.assign({}, prev, {
            posts: [...prev.posts, ...fetchMoreResult.posts]
          })
        }
      })
      if (a?.data?.posts?.length + 5 < quantityPosts) {
        setIsEnd(true)
      } else {
        setDataPostLoad(a?.data)
        setLoadMore(false)
        setIsEnd(false)
      }
    }, 300)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div id="list-posts" onScroll={() => console.log('aaaaaaaâ')}>
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
        dataPostLoad?.posts.map((item, idx) => {
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
      {!isEnd && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spin spinning />
        </div>
      )}
      <CreatePostDrawer
        data={dataCom?.getCommunitiesByUser}
        refetch={refetchPosts}
        isBroken={isBroken}
        handleCancel={handleCancel}
        visible={visibleModalCreate}
      />
    </div>
  )
}

export default withRouter(HomePage)
