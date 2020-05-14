/* eslint-disable react/prop-types */
import React, { createElement, useState } from 'react'
import { Comment, Avatar, Form, List, Input, Tooltip } from 'antd'
import moment from 'moment'
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled
} from '@ant-design/icons'
import './index.css'
const { TextArea } = Input

const CommentList = ({ comments }) => {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [action, setAction] = useState(null)

  const like = () => {
    setLikes(1)
    setDislikes(0)
    setAction('liked')
  }

  const dislike = () => {
    setLikes(0)
    setDislikes(1)
    setAction('disliked')
  }

  const actions = [
    <span key='comment-basic-like'>
      <Tooltip title='Like'>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
          onClick: like
        })}
      </Tooltip>
      <span className='comment-action'>{likes}</span>
    </span>,
    <span key='comment-basic-dislike'>
      <Tooltip title='Dislike'>
        {React.createElement(
          action === 'disliked' ? DislikeFilled : DislikeOutlined,
          {
            onClick: dislike
          }
        )}
      </Tooltip>
      <span className='comment-action'>{dislikes}</span>
    </span>,
    <span key='comment-basic-reply-to'>Reply to</span>
  ]
  return (
    <List
      dataSource={comments}
      // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout='horizontal'
      renderItem={(props) => <Comment actions={actions} {...props} />}
    />
  )
}

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea
        placeholder='Nhap binh luan'
        autoSize={{ minRows: 1, maxRows: 3 }}
        onChange={onChange}
        value={value}
        onKeyUp={(event) => onSubmit(event)}
      />
    </Form.Item>
  </div>
)

function CommentPost () {
  const [comments, setComments] = useState([])
  const [value, setValue] = useState('')

  const handleSubmit = (event) => {
    if (event.shiftKey && event.keyCode === 13) {
      event.stopPropagation()
    } else if (event.keyCode === 13) {
      if (!value.trim()) {
        setValue('')
        return
      }
      setValue('')
      setComments(
        comments.concat([
          {
            author: 'Han Solo',
            avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{value.trim()}</p>,
            datetime: moment().fromNow()
          }
        ])
      )
      // console.log(comments, 'cmt')
      //   }, 500)
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  // console.log(comments, 'comme')

  return (
    <div>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={
          <Avatar
            src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            alt='Han Solo'
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            //   submitting={submitting}
            value={value}
          />
        }
      />
    </div>
  )
}
export default CommentPost
