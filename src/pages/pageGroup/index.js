/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import { Avatar } from 'antd'

import { withRouter } from 'react-router-dom'
import { ModalReport, PostNoGroup, JoinBtn } from '@components'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { IContext } from '@tools'

export const GET_POST_BY_COMMUNITY = gql`
  query postsByCommunity($communityId: String) {
    postsByCommunity(communityId: $communityId) {
      _id
      title
      content
      thumbnail
      createdBy {
        _id
        firstname
        lastname
        avatar
      }
      createdAt
    }
  }
`
export const GET_COMMUNITY_BY_ID = gql`
  query communityById($id: String) {
    communityById(id: $id) {
      _id
      name
      avatar
      coverPhoto
    }
  }
`
export const GET_MEMBERS_BY_COMMUNITY = gql`
  query getMembersByCommunity($communityId: String) {
    getMembersByCommunity(communityId: $communityId)
  }
`
function PageGroup(props) {
  const [visibleModalReport, setVisibleModalReport] = useState(false)
  const { communityId } = props.match.params
  const { me } = useContext(IContext)
  const { data } = useQuery(GET_POST_BY_COMMUNITY, {
    variables: { communityId }
  })
  const { data: dataCommunity } = useQuery(GET_COMMUNITY_BY_ID, {
    variables: { id: communityId }
  })
  const { data: dataMemberCount, refetch: refetchMemberCount } = useQuery(GET_MEMBERS_BY_COMMUNITY, {
    variables: { communityId },
    fetchPolicy: 'no-cache'
  })
  console.log(dataMemberCount, 'count')
  const handleOk = () => {
    // setVisibleModalCreate(false)
    setVisibleModalReport(false)
  }
  const handleCancel = () => {
    setVisibleModalReport(false)
  }
  return (
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
          style={{ border: '2px solid black', marginLeft: 10 }}
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
            {dataMemberCount?.getMembersByCommunity} thành viên -{' '}
            {data?.postsByCommunity?.length} bài viết
          </p>
          <JoinBtn id={{ userId: me?._id, communityId: communityId }} refetchMemberCount={refetchMemberCount}></JoinBtn>
        </div>
      </div>
      <br />
      {data &&
        data?.postsByCommunity.map((item, idx) => {
          return <PostNoGroup key={idx} item={item} idx={idx}></PostNoGroup>
        })}

      <ModalReport
        visible={visibleModalReport}
        handleCancel={handleCancel}
        handleOk={handleOk}
      ></ModalReport>
    </>
  )
}

export default withRouter(PageGroup)
