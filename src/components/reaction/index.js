/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Popover, Tooltip } from 'antd'
import { Emoji } from 'emoji-mart'
import { LikeOutlined } from '@ant-design/icons'
import firebase from 'firebase/app'
import './index.css'

const emojiData = [{
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
const MY_USER_ID = 'tuikyne'
function Reaction (props) {
  const [chosenmoji, setChosenEnmoji] = useState('')
  const [reactions, setReactions] = useState([])
  const [sumReactions, setSSumReactions] = useState(0)
  const { idPost } = props
  console.log(props, 'idssss')
  useEffect(() => {
    getReactionPost()
  }, [])
  const getReactionPost = async () => {
    await firebase.database().ref(idPost + '/reactions').on('value', (snapshot) => {
      // var mess = (snapshot.val() && snapshot.val().mess1) || 'Anonymous';
      const temp = Object.keys(snapshot.val()).map(key => ({ ...snapshot.val()[key], id: key })) || []
      // temp.sort((a, b) => b.timestamp - a.timestamp)
      setReactions(temp)
      let count = 0
      temp.map(item => {
        if (!item.users) return
        const idx = item.users.findIndex(user => user === MY_USER_ID)
        if (idx !== -1) { setChosenEnmoji(item.id) }
        count += item.count
      })
      setSSumReactions(count)
    })
  }
  return (
    <Popover
      className='reaction-popover'
      content={emojiData.map(e => <Tooltip key={e.emoji} title={e.text}>
        <Emoji emoji={e.emoji} size={24} onClick={async (e) => {
          if (chosenmoji !== '') {
            const idx = reactions.findIndex(reaction => reaction.id === chosenmoji)
            const arr = reactions[idx].users
            arr.splice(reactions[idx].users.findIndex(user => user === MY_USER_ID), 1)
            console.log(arr, 'arr')
            try {
              await firebase.database().ref(props.idPost + '/' + 'reactions/' + chosenmoji).update({
                count: reactions[idx].count - 1,
                users: arr
              })
            } catch (e) {
              console.log(e, 'emmm')
            }
          }
          setChosenEnmoji(e.id)
          console.log(reactions, 'reaction')
          // reactions.map(async reaction => {
          const vt = reactions.findIndex(reaction => reaction.id === e.id)
          reactions[vt]
            ? await firebase.database().ref(props.idPost + '/' + 'reactions/' + e.id).update({
              count: reactions[vt].count + 1,
              users: reactions[vt].users ? [...reactions[vt].users, MY_USER_ID] : [MY_USER_ID]
            })
            : await firebase.database().ref(props.idPost + '/' + 'reactions/' + e.id).set({
              count: 1,
              users: [MY_USER_ID]
            })
          // })
          document.getElementById('like-post').setAttribute('style', 'background-color: #f5f5f5')
        }
        }/>
      </Tooltip>)}
    >
      { chosenmoji
        ? <Emoji onClick={async () => {
          const idx = reactions.findIndex(reaction => reaction.id === chosenmoji)
          const arr = reactions[idx].users
          arr.splice(reactions[idx].users.findIndex(user => user === MY_USER_ID), 1)
          console.log(arr, 'arr')
          try {
            await firebase.database().ref(props.idPost + '/' + 'reactions/' + chosenmoji).update({
              count: reactions[idx].count - 1,
              users: arr
            })
          } catch (e) {
            console.log(e, 'emmm')
          }
          setChosenEnmoji('')
          document.getElementById('like-post').setAttribute('style', 'background-color: initial')
        }}
        emoji={chosenmoji} size={19} /> : <LikeOutlined /> }
      <span style={{ fontWeight: 'bold', color: chosenmoji && '#1890ff' }}>{sumReactions}</span>
    </Popover>
  )
}
export default Reaction
