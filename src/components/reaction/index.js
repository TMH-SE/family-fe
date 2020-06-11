/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { Popover, Tooltip } from 'antd'
import { Emoji } from 'emoji-mart'
import { LikeOutlined } from '@ant-design/icons'
import firebase from 'firebase/app'
import './index.css'
import { IContext } from '@tools'

const emojiData = [
  {
    emoji: 'heart_eyes',
    text: 'Yêu thích',
    count: 3
  },
  {
    emoji: '+1',
    text: 'Thích',
    count: 7
  },
  {
    emoji: 'open_mouth',
    text: 'wow',
    count: 9
  },
  {
    emoji: 'joy',
    text: 'he he',
    count: 43
  }
]
// const me._id = 'tuikyne'
function Reaction(props) {
  const [chosenmoji, setChosenEnmoji] = useState('')
  const [reactions, setReactions] = useState([])
  const [sumReactions, setSSumReactions] = useState(0)
  const { idPost } = props
  const { me, isAuth, openLoginModal } = useContext(IContext)

  useLayoutEffect(() => {
    getReactionPost()
  }, [idPost])
  const getReactionPost = () => {
    firebase
      .database()
      .ref(`posts/${idPost}/reactions`)
      .on('value', snapshot => {
        // var mess = (snapshot.val() && snapshot.val().mess1) || 'Anonymous';
        const temp =
          (snapshot.val() &&
            Object.keys(snapshot.val()).map(key => ({
              ...snapshot.val()[key],
              id: key.toString()
            }))) ||
          []
        // temp.sort((a, b) => b.timestamp - a.timestamp)
        setReactions(temp)
        let count = 0
        temp.map(item => {
          if (!item.users) return
          const idx = item.users.findIndex(user => user === me?._id)
          if (idx !== -1) {
            setChosenEnmoji(item.id)
          }
          count += item.count
        })
        setSSumReactions(count)
      })
  }
  const onClickEmoji = e => {
    if (chosenmoji !== '') {
      const idx = reactions.findIndex(reaction => reaction.id === chosenmoji)
      const arr = reactions[idx].users
      arr.splice(
        reactions[idx].users.findIndex(user => user === me._id),
        1
      )
      try {
        firebase
          .database()
          .ref(`posts/${props.idPost}/reactions/` + chosenmoji)
          .update({
            count: reactions[idx].count - 1,
            users: arr
          })
      } catch (e) {
        console.log(e)
      }
    }
    setChosenEnmoji(e.id)

    // reactions.map(async reaction => {
    const vt = reactions.findIndex(reaction => reaction.id === e.id)
    reactions[vt]
      ? firebase
          .database()
          .ref(`posts/${props.idPost}/reactions/` + e.id)
          .update({
            count: reactions[vt].count + 1,
            users: reactions[vt].users
              ? [...reactions[vt].users, me._id]
              : [me._id]
          })
      : firebase
          .database()
          .ref(`posts/${props.idPost}/reactions/` + e.id)
          .set({
            count: 1,
            users: [me._id]
          })
    // })
    document
      .getElementById('like-post')
      .setAttribute('style', 'background-color: #f5f5f5')
  }
  return (
    <Popover
      className="reaction-popover"
      content={emojiData.map(e => (
        <Tooltip key={e.emoji} title={e.text}>
          <Emoji
            emoji={e.emoji}
            size={24}
            onClick={e => (isAuth ? onClickEmoji(e) : openLoginModal())}
          />
        </Tooltip>
      ))}
    >
      {chosenmoji ? (
        <Emoji
          onClick={async () => {
            const idx = reactions.findIndex(
              reaction => reaction.id === chosenmoji
            )
            const arr = reactions[idx].users
            arr.splice(
              reactions[idx].users.findIndex(user => user === me._id),
              1
            )
            try {
              await firebase
                .database()
                .ref(`posts/${props.idPost}/reactions/` + chosenmoji)
                .update({
                  count: reactions[idx].count - 1,
                  users: arr
                })
            } catch (e) {
              console.log(e)
            }
            setChosenEnmoji('')
            document
              .getElementById('like-post')
              .setAttribute('style', 'background-color: initial')
          }}
          emoji={chosenmoji}
          size={19}
        />
      ) : (
        <LikeOutlined />
      )}
      <span style={{ fontWeight: 'bold', color: chosenmoji && '#1890ff' }}>
        {sumReactions}
      </span>
    </Popover>
  )
}
export default Reaction
