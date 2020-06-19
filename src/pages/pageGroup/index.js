/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react'
import { Avatar, Input, Skeleton } from 'antd'

import { withRouter } from 'react-router-dom'
import {
  ModalReport,
  PostNoGroup,
  JoinBtn,
  CreatePostDrawer
} from '@components'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { IContext } from '@tools'
import {
  GET_MEMBERS_BY_COMMUNITY,
  GET_POST_BY_COMMUNITY,
  CHECK_IS_MEMBER
} from '@shared'
import { MainContext } from '../../layouts/MainLayout'

export const GET_COMMUNITY_BY_ID = gql`
  query communityById($id: String) {
    communityById(id: $id) {
      _id
      name
      avatar
      coverPhoto
      countMember
      countPost
    }
  }
`

function PageGroup(props) {
  const [visibleModalReport, setVisibleModalReport] = useState(false)
  const { communityId } = props.match.params
  const { me, refetchCount, setRefetchCount, setRefetchSumPosts } = useContext(
    IContext
  )
  const { isBroken } = useContext(MainContext)
  const [visibleModalCreate, setVisibleModalCreate] = useState(false)
  const { data, refetch: refetchPostsByCom, loading: loađingPost } = useQuery(
    GET_POST_BY_COMMUNITY,
    {
      variables: { communityId },
      fetchPolicy: 'no-cache',
      skip: !communityId
    }
  )
  const { data: dataCommunity, refetch, loading } = useQuery(
    GET_COMMUNITY_BY_ID,
    {
      variables: { id: communityId },
      // fetchPolicy: 'no-cache',
      skip: !communityId
    }
  )
  const { data: dataIsMember } = useQuery(CHECK_IS_MEMBER, {
    variables: { id: { userId: me?._id, communityId: communityId } }
  })
  const handleOk = () => {
    // setVisibleModalCreate(false)
    setVisibleModalReport(false)
  }
  const handleCancel = () => {
    setVisibleModalCreate(false)
    setVisibleModalReport(false)
  }
  useEffect(() => {
    refetch()
    setRefetchCount('')
    setRefetchSumPosts('')
  }, [refetchCount, setRefetchSumPosts])
  return loading ? (
    <Skeleton active />
  ) : (
    <>
      <div
        style={{
          height: 250,
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.9)'
        }}
      >
        <img
          className="cover-img"
          style={{ objectFit: 'cover', height: 250, width: '100%' }}
          alt="example"
          src={dataCommunity?.communityById?.coverPhoto}
        />
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: -60,
          backgroundColor: 'rgba(255,255,255,0.6)'
        }}
      >
        <Avatar
          style={{ border: '2px solid rgba(0,0,0,0.5)', marginLeft: 10 }}
          shape="square"
          size={120}
          src={dataCommunity?.communityById?.avatar}
        />
        <div style={{ marginLeft: 10 }}>
          <p
            style={{
              fontWeight: 'bolder',
              fontSize: 20,
              color: '#fff',
              textShadow: '0px 2px 2px rgba(0, 0, 0, 0.8)'
            }}
          >
            {dataCommunity?.communityById?.name}
          </p>
          <p
            style={{
              marginTop: -15,
              fontWeight: 'bolder',
              color: '#fff',
              fontSize: 12,
              textShadow: '0px 2px 2px rgba(0, 0, 0, 0.8)'
            }}
          >
            {' '}
            {/* {dataMemberCount?.getMembersByCommunity} thành viên -{' '}
            {data?.postsByCommunity?.length} bài viết */}
            {dataCommunity?.communityById?.countMember} thành viên -{' '}
            {dataCommunity?.communityById?.countPost} bài viết
          </p>
          <JoinBtn id={{ userId: me?._id, communityId: communityId }}></JoinBtn>
        </div>
      </div>
      <br />
      {dataIsMember?.checkIsMember && (
        <Input.TextArea
          onClick={() =>
            isBroken
              ? props.history.push('/createpost')
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
        // </>
      )}
      {loađingPost ? (
        <Skeleton active avatar />
      ) : (
        data &&
        data?.postsByCommunity.map((item, idx) => {
          return <PostNoGroup key={idx} item={item} idx={idx}></PostNoGroup>
        })
      )}

      <ModalReport
        visible={visibleModalReport}
        handleCancel={handleCancel}
        handleOk={handleOk}
      ></ModalReport>
      <CreatePostDrawer
        refetch={refetchPostsByCom}
        data={dataCommunity?.communityById}
        isBroken={isBroken}
        handleCancel={handleCancel}
        visible={visibleModalCreate}
      />
    </>
  )
}

export default withRouter(PageGroup)
