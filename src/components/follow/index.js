/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import Modal from 'antd/lib/modal/Modal'
import firebase from 'firebase/app'
import { Button } from 'antd'
import { MessageTwoTone, HeartTwoTone, HeartFilled } from '@ant-design/icons'
import {
  CREATE_CHAT,
  GET_CHAT_BY_MEMBERS,
  CREATE_FOLLOWER,
  DELETE_FOLLOWER,
  CHECK_FOLLOW
} from '@shared'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { IContext } from '@tools'
import * as uuid from 'uuid'
function Follow(props) {

  const { me } = useContext(IContext)
  const [createFollower] = useMutation(CREATE_FOLLOWER)
  const [deleteFollower] = useMutation(DELETE_FOLLOWER)
    const { userId, followerId } = props.follower
  const { data, loading, refetch } = useQuery(CHECK_FOLLOW, {
    variables: { id: props.follower },
    // fetchPolicy: 'no-cache'
  })
  const sendNotifollow = async type => {
    const notificationId = uuid.v1()
    type === 'follow'
      ? createFollower({ variables: { id: props.follower } }).then(async () => {
          try {
            await firebase
              .database()
              .ref('notifications/' + userId + '/' + notificationId)
              .set({
                action: 'follow',
                reciever: userId,
                link: `/${me?._id}/info`,
                content: `${me?.firstname} đã bắt đầu theo dõi bạn`,
                seen: false
              })
          } catch (err) {
            console.log(err)
          }
          refetch()
        })
      : deleteFollower({ variables: { id: props.follower } }).then(() =>
          refetch()
        )
  }
  return data?.checkFollow ? (
    props.isBroken 
    ? 
      <HeartFilled style={{ marginLeft: 10, color: 'red', fontSize: 20 }} onClick={() => sendNotifollow('unfollow')}/>
    : 
      <Button
        type="ghost"
        icon={<HeartFilled style={{ color: 'red'}} />}
        onClick={() => sendNotifollow('unfollow')}
      >
        Đã theo dõi
      </Button>
    )
    : ( props.isBroken ? 
    <HeartTwoTone style={{ marginLeft: 10 }} onClick={() => sendNotifollow('follow')} />
         : 
    <Button
      type="ghost"
      icon={<HeartTwoTone />}
      onClick={() => sendNotifollow('follow')}
    >
      Theo dõi
    </Button>
  )
}
export default Follow
