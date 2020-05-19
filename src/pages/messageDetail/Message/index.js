/* eslint-disable react/prop-types */
import React from 'react'
import moment from 'moment'
import './Message.css'

export default function Message (props) {
  const { data, isMine, startsSequence, endsSequence, showTimestamp } = props

  const friendlyTimestamp = moment(data).format('LLLL')
  return (
    <div
      className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}
    >
      {showTimestamp && <div className='timestamp'>{friendlyTimestamp}</div>}

      { data.content.img && <div className='bubble-container'>
        <div className='imgBubble'>
          <img width='30%' src={ data.content.img[0]} />
        </div> 
    </div> }
      <div className='bubble-container'>
        <div className='bubble' title={friendlyTimestamp}>
          {data.content.message}
        </div>
      </div>
    </div>
  )
}
