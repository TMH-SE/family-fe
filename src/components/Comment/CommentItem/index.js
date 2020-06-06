import React, { useState } from 'react'
import { Comment, Avatar } from 'antd'
import { InputCustome, ModalPreviewImg } from '@components'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import { GET_USER } from '@shared'
import moment from 'moment'
import { UserOutlined } from '@ant-design/icons'
import noAvatar from '@assets/images/noavata.jpg'
const CommentItem = props => {
  const { author } = props.comment
  const { comment, replyTo, type, idParent, history } = props
  const { loading, data } = useQuery(GET_USER, {
    variables: { userId: author }
  })
  const [previewImg, setPreviewImg] = useState({
    isShow: false,
    imgSrc: ''
  })
  return (
    <>
      <Comment
        key={comment.id}
        id={type === 'parent' ? `parent-cmt-${comment.id}` : ''}
        className={type === 'reply' ? `reply ${comment.id}` : ''}
        actions={[
          <span
            onClick={() => {
              // setArrTag([{id: comment.author.id, display: comment.author.name }])
              replyTo({
                commentId: idParent,
                author: { id: comment.author, name: data?.getUser.firstname }
              })
            }}
            key="comment-basic-reply-to"
          >
            Reply to
          </span>
        ]}
        author={
          <a
            onClick={() => history.push(`/${comment.author}/info`)}
            style={{ color: 'black', fontSize: 14 }}
          >
            {data?.getUser?.firstname}
          </a>
        }
      avatar={data?.getUser?.avatar || noAvatar}
        content={
          <>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
              {comment.content.img && (
                <div className="img-cmt" style={{ display: 'flex' }}>
                  <img
                    style={{
                      height: 160,
                      width: 160,
                      objectFit: 'cover',
                      borderRadius: 15
                    }}
                    src={comment.content.img}
                    onClick={() => {
                      setPreviewImg({
                        isShow: true,
                        imgSrc: comment.content.img
                      })
                    }}
                  />
                </div>
              )}
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: comment.content.message.trim()
              }}
              style={{ display: 'inline' }}
              className="rep-content"
            />
            {/* <p>{comment.content.message.trim()}</p> */}
          </>
        }
        datetime={moment(comment.timestamp).fromNow()}
      />
      <ModalPreviewImg
        previewImg={previewImg}
        onCancel={() => setPreviewImg({ ...previewImg, isShow: false })}
      />
    </>
  )
}
export default CommentItem
