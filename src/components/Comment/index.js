/* eslint-disable react/prop-types */
import React, { createElement, useState } from 'react'
import { Comment, Avatar, Form, List, Tooltip, Modal } from 'antd'
import moment from 'moment'
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled
} from '@ant-design/icons'
import './index.css'
import InputCustome from '../inputCustome'

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

const Editor = ({ onChange, onSubmit, idElement, value }) => (
  <div>
    <Form.Item>
      {/* <TextArea
        placeholder='Nhap binh luan'
        autoSize={{ minRows: 1, maxRows: 3 }}
        onChange={onChange}
        value={value}
        onKeyUp={(event) => onSubmit(event)}
      /> */}
      <InputCustome
        idElement={idElement}
        placeholder='Nhap binh luan'
        onChange={onChange}
        onSubmit={onSubmit}
      >
      </InputCustome>
    </Form.Item>
  </div>
)

function CommentPost (props) {
  const [comments, setComments] = useState([])
  // const [value, setValue] = useState('')
  const [previewImg, setPreviewImg] = useState(false)
  const handleSubmit = (value, imgList) => {
    setComments(
      comments.concat([
        {
          author: 'Han Solo',
          avatar:
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: <>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
              {imgList.map((srcImg, idx) => {
                return <div className='img-cmt' key={idx} style={{ display: 'flex', height: 65, width: 65, margin: '5px 0 0 5px' }}>
                  <img
                    style={{ height: 60, width: 60, objectFit: 'cover' }}
                    src={srcImg}
                    onClick={() => setPreviewImg(true)}
                  />
                  <Modal
                    visible={previewImg}
                    footer={null}
                    onCancel={() => setPreviewImg(false)}
                  >
                    <img alt="example" style={{ width: '100%' }} src={srcImg} />
                  </Modal>
                </div>
              })}
            </div>
            <p>{value.trim()}</p>
          </>,
          datetime: moment().fromNow()
        }
      ])
    )
  }

  // const handleChange = (text) => {
  //   console.log(text, 'custom')
  //   // setValue(text.target)
  // }
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
            idElement={props.idPost}
            onSubmit={handleSubmit}
            //   submitting={submitting}
            // value={value}
          />
        }
      />
    </div>
  )
}
export default CommentPost
