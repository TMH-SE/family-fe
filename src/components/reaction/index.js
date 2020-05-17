/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Popover, Tooltip } from 'antd'
import { Emoji } from 'emoji-mart'
import { LikeOutlined } from '@ant-design/icons'
// import 'antd/dist/antd.css'
// import Editor from '../editor'
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
function Reaction (props) {
  const [chosenmoji, setChosenEnmoji] = useState('')
  const count = 12
  return (
    <Popover
      content={emojiData.map(e => <Tooltip key={e.emoji} title={e.text}>
        <Emoji emoji={e.emoji} size={24} onClick={(e) => {
          setChosenEnmoji(e.id)
          document.getElementById('like-post').setAttribute('style', 'background-color: #f5f5f5')
        }
        }/>
      </Tooltip>)}
    >
      { chosenmoji
        ? <Emoji onClick={() => {
          setChosenEnmoji('')
          document.getElementById('like-post').setAttribute('style', 'background-color: initial')
        }}
        emoji={chosenmoji} size={19} /> : <LikeOutlined /> }
      <span style={{ fontWeight: 'bold', color: chosenmoji && '#1890ff' }}>{chosenmoji ? count + 1 : count }</span>
    </Popover>
  )
}
export default Reaction
