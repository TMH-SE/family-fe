/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import moment from 'moment'
import './Message.css'
import { ModalPreviewImg } from '@components'


export default function Message(props) {
  const { data, isMine, startsSequence, endsSequence, showTimestamp } = props
  // console.log(data, 'data')
  const friendlyTimestamp = moment(data?.timestamp).locale('vi').format('llll')
  const [previewImg, setPreviewImg] = useState({
    isShow: false,
    imgSrc: ''
  })
  return (
    <div
      className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}
    >
      {showTimestamp && <div className="timestamp">{friendlyTimestamp}</div>}

      {data.content.img && (
        <div className="bubble-container">
          <div className="imgBubble">
            <img
              width="30%"
              src={data.content.img}
              onClick={() => {
                setPreviewImg({
                  isShow: true,
                  imgSrc: data.content.img
                })
              }}
            />
          </div>
        </div>
      )}
      {data.content.message.trim() && (
        <div className="bubble-container">
          <div className="bubble" title={friendlyTimestamp}>
            {data.content.message}
          </div>
        </div>
      )}
      <ModalPreviewImg
        previewImg={previewImg}
        onCancel={() => setPreviewImg({ ...previewImg, isShow: false })}
      />
    </div>
  )
}
