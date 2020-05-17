import React from 'react'
import InputCustome from '../../../components/inputCustome'

export default function Compose (props) {
  return (
    <div className="compose">
      <InputCustome placeholder='Nhap tin nhắn' style={{ width: '60%' }}></InputCustome>
      {/* <input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
        />

        {
          props.rightItems
        } */}
    </div>
  )
}
