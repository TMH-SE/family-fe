/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react'
import { Comment, Avatar, List, Modal } from 'antd'
import moment from 'moment'
import firebase from 'firebase/app'
import * as uuid from 'uuid'
import './index.scss'
import { InputCustome, ModalPreviewImg } from '@components'
import { useHistory } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'
import reactStringReplace from 'react-string-replace'
import { IContext } from '@tools'
import { GET_USER } from '@shared'
import CommentItem from './CommentItem'

const CommentList = ({ comments, showMore, idPost }) => {
  const history = useHistory()
  const { me } = useContext(IContext)
  const [rep, setRep] = useState({})

  const [showMoreRep, setShowMoreRep] = useState({ idParent: null, rows: 0 })
  const [arrTag, setArrTag] = useState([])
  let lessComment = []
  lessComment = comments.slice(comments.length - showMore, comments.length - 1)

  const onAdd = mentions => {
    setArrTag(mentions)
  }
  const replyTo = repTo => {
    setRep(repTo)
  }
  const sendNotiTagReply = async (userId, postId) => {
    const notificationId = uuid.v4()
    arrTag &&
      arrTag.map(async item => {
        try {
          await firebase
            .database()
            .ref('notifications/' + item.id + '/' + notificationId)
            .set({
              action: 'tag',
              reciever: item.id,
              link: `/postdetail/${postId}`,
              content: `${me?.firstname} đã nhắc đến bạn trong bình luận`,
              seen: false
            })
        } catch (err) {
          console.log(err)
        }
      })
  }
  const reply = async (value, img) => {
    const cmt = (await comments.filter(item => item.id === rep.commentId)[0]
      .replies)
      ? comments.filter(item => item.id === rep.commentId)[0].replies
      : []
    const cmtMention = (await comments.filter(
      item => item.id === rep.commentId
    )[0].mention)
      ? comments.filter(item => item.id === rep.commentId)[0].mention
      : []

    const mentions =
      cmtMention.findIndex(item => item.id === me?._id) === -1
        ? [
            ...cmtMention,
            {
              id: `${me?._id}`,
              name: `${me?.firstname}`
            }
          ]
        : [...cmtMention]
    // lessCommentRep = cmt.slice(cmt.length - showMoreRep, cmt.length - 1)
    const repValue = [
      ...cmt,
      {
        content: { message: value, img: img && img },
        timestamp: new Date().getTime(),
        author: me?._id
        // photo: me?.avatar
      }
    ]
    try {
      await firebase
        .database()
        .ref(`posts/${idPost}/comments/` + rep.commentId)
        .update({
          mention: mentions,
          replies: repValue
        })
    } catch (error) {
      console.log(error)
    }
    await sendNotiTagReply(value, idPost)
    setRep({})
  }
  return (
    <>
      {' '}
      <List
        dataSource={comments.length < showMore ? comments : lessComment}
        // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={comment => (
          <>
            <CommentItem
              comment={comment}
              idParent={comment.id}
              replyTo={replyTo}
              type="parent"
            ></CommentItem>
            {comment.replies && comment.replies.length - 1 > showMoreRep.rows && (
              <a
                style={{ textAlign: 'left', marginLeft: '10%' }}
                onClick={() =>
                  setShowMoreRep({
                    idParent: comment.id,
                    rows:
                      comment.id === showMoreRep.idParent
                        ? showMoreRep.rows + 2
                        : 2
                  })
                }
              >
                Xem thêm{' '}
                {comment.id === showMoreRep.idParent
                  ? comment.replies.length - showMoreRep.rows
                  : comment.replies.length - 1}{' '}
                câu trả lời
              </a>
            )}
            {rep.commentId === comment.id && (
              <Comment
                className={`rep-input ${comment.id}`}
                avatar={<Avatar src={me?.avatar} alt="Han Solo" />}
                content={
                  <InputCustome
                    replyAuthor={rep && rep.author}
                    idElement={comment.id}
                    onSubmit={reply}
                    placeholder="Nhập bình luận"
                    mentions={comment.mention}
                    onAdd={onAdd}
                    // value={value}
                  />
                }
              />
            )}
            {comment.replies &&
              comment.replies
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(
                  0,
                  comment.id === showMoreRep?.idParent ? showMoreRep.rows : 1
                )
                .map((reply, idx) => (
                  <CommentItem
                    comment={reply}
                    idParent={comment.id}
                    replyTo={replyTo}
                    type="reply"
                  />
                ))}
          </>
        )}
      />
    </>
  )
}

function CommentPost(props) {
  const [comments, setComments] = useState([])
  const [showMore, setShowMore] = useState(3)
  const [user, setUser] = useState(null)
  const { me } = useContext(IContext)
  const { idPost } = props
  useEffect(() => {
    getComment()
  }, [])
  // const [getUser, { loading, data }] = useLazyQuery(GET_USER);

  // if (loading) return <p>Loading ...</p>;

  // if (data && data.getUser) {
  //   console.log(data, 'data')
  //   // setUser(data.getUser);
  // }

  const getComment = () => {
    firebase
      .database()
      .ref(`posts/${idPost}/comments`)
      .limitToLast(showMore + 1)
      .on('value', snapshot => {
        // var mess = (snapshot.val() && snapshot.val().mess1) || 'Anonymous';
        const temp = Object.keys(snapshot.val()).map(key => ({
          ...snapshot.val()[key],
          id: key
        }))

        temp.sort((a, b) => b.timestamp - a.timestamp)
        setComments(temp)
      })
  }
  const handleSubmit = async (value, img) => {
    const postId = idPost
    const commentId = uuid.v4()
    const mentions = [
      {
        id: `${me?._id}`,
        name: `${me?.firstname}`
      }
    ]
    try {
      await firebase
        .database()
        .ref(`posts/${postId}/comments/` + commentId)
        .set({
          content: { message: value, img: img },
          timestamp: new Date().getTime(),
          author: me?._id,
          // photo: me?.avatar,
          mention: mentions,
          replies: []
        })
    } catch (error) {
      console.log(error)
    }
  }
  // const history = useHistory()
  return (
    <div>
      <Comment
        className={`cmt-input ${props.idPost}`}
        avatar={<Avatar src={me?.avatar} alt="Han Solo" />}
        content={
          <InputCustome
            idElement={props.idPost}
            onSubmit={handleSubmit}
            placeholder="Nhập bình luận"
            // value={value}
          />
        }
      />
      {comments.length > 0 && (
        <CommentList
          showMore={showMore}
          idPost={props.idPost}
          comments={comments}
        />
      )}
      {comments.length > showMore && (
        <a onClick={() => setShowMore(showMore + 3)}>Xem thêm </a>
      )}
    </div>
  )
}
export default CommentPost
