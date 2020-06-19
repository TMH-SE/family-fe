/* eslint-disable react/prop-types */
import React, { useState, useContext, useLayoutEffect } from 'react'
import { Comment, Avatar, List } from 'antd'
import firebase from 'firebase/app'
import * as uuid from 'uuid'
import './index.scss'
import { InputCustomize } from '@components'
import { useHistory } from 'react-router-dom'
import { IContext } from '@tools'
import CommentItem from './CommentItem'

const CommentList = ({ comments, showMore, idPost }) => {
  const history = useHistory()
  const { me, isAuth, openLoginModal } = useContext(IContext)
  const [rep, setRep] = useState({})

  const [showMoreRep, setShowMoreRep] = useState({ idParent: null, rows: 0 })
  const [arrTag, setArrTag] = useState([])
  let lessComment = []
  // lessComment = comments.slice(comments?.length - showMore, comments?.length)
  lessComment =
    showMore < comments.length ? comments.slice(0, showMore) : comments

  const onAdd = mentions => {
    setArrTag(mentions)
  }
  const replyTo = repTo => {
    setRep(repTo)
  }
  const sendNotiTagReply = async (userId, postId) => {
    const notificationId = +new Date()
    arrTag &&
      arrTag.map(async item => {
        try {
          item?.id !== me?._id && await firebase
            .database()
            .ref('notifications/' + item?.id + '/' + notificationId)
            .set({
              action: 'tag',
              reciever: item?.id,
              link: `/postdetail/${postId}`,
              content: `${me?.firstname} đã nhắc đến bạn trong bình luận`,
              seen: false,
              createdAt: +new Date()
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
    // lessCommentRep = cmt.slice(cmt?.length - showMoreRep, cmt?.length - 1)
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
      <List
        dataSource={comments?.length <= showMore ? comments : lessComment}
        // header={`${comments?.length} ${comments?.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={comment => {
          return (
            <>
              <CommentItem
                key={comment.id}
                comment={comment}
                idParent={comment.id}
                replyTo={isAuth ? replyTo : () => openLoginModal()}
                type="parent"
                history={history}
              ></CommentItem>
              {rep.commentId === comment.id && (
                <Comment
                  className={`rep-input ${comment.id}`}
                  avatar={<Avatar src={me?.avatar} alt="Han Solo" />}
                  content={
                    <InputCustomize
                      replyAuthor={rep && rep.author}
                      idElement={comment.id}
                      onSubmit={isAuth ? reply : () => openLoginModal()}
                      placeholder="Nhập bình luận"
                      mentions={comment.mention}
                      onAdd={onAdd}
                    />
                  }
                />
              )}
              {comment.replies &&
                comment.replies?.length - 1 > showMoreRep.rows && (
                  <a
                    style={{ textAlign: 'left', marginLeft: '10%' }}
                    onClick={() =>
                      setShowMoreRep({
                        idParent: comment.id,
                        rows:
                          comment.id === showMoreRep.idParent
                            ? showMoreRep.rows + 1
                            : 1
                      })
                    }
                  >
                    Xem thêm{' '}
                    {comment.id === showMoreRep.idParent
                      ? comment.replies?.length - showMoreRep.rows - 1
                      : comment.replies?.length - 1}{' '}
                    câu trả lời
                  </a>
                )}
              {comment.replies &&
                comment.replies
                  .sort((a, b) => a.timestamp - b.timestamp)
                  .slice(
                    comment.id === showMoreRep?.idParent
                      ? comment.replies.length - showMoreRep.rows - 1
                      : comment.replies.length - 1,
                    comment.replies.length
                  )
                  .map((reply, idx) => (
                    <CommentItem
                      key={idx}
                      comment={reply}
                      idParent={comment.id}
                      replyTo={replyTo}
                      type="reply"
                      history={history}
                    />
                  ))}
            </>
          )
        }}
      />
    </>
  )
}

function CommentPost(props) {
  const [comments, setComments] = useState([])
  const [showMore, setShowMore] = useState(1)

  const { me, isAuth, openLoginModal } = useContext(IContext)
  const { idPost, postItem } = props
  useLayoutEffect(() => {
    idPost && getComment()
  }, [idPost])
  const getComment = () => {
    firebase
      .database()
      .ref(`posts/${idPost}/comments`)
      .orderByKey()
      .on('value', snapshot => {
        const temp = snapshot.val()
          ? Object.keys(snapshot.val()).map(key => ({
              ...snapshot.val()[key],
              id: key
            }))
          : []
        setComments(temp.reverse())
      })
  }
  const handleSubmit = async (value, img) => {
    const postId = idPost
    const commentId = +new Date()
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
        postItem?.createdBy?._id !== me?._id && await firebase
        .database()
        .ref(`notifications/${postItem?.createdBy?._id}/${+new Date()}`)
        .set({
          action: 'cmt',
          reciever: postItem?.createdBy?._id,
          link: `/postdetail/${postId}`,
          content: `${me?.firstname} đã bình luận bài viết của bạn`,
          seen: false,
          createdAt: +new Date()
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
          <InputCustomize
            idElement={props.idPost}
            onSubmit={isAuth ? handleSubmit : () => openLoginModal()}
            placeholder="Nhập bình luận"
            // value={value}
          />
        }
      />
      {comments?.length > 0 && (
        <CommentList
          showMore={showMore}
          idPost={props.idPost}
          comments={comments}
        />
      )}
      {comments?.length > showMore && (
        <a onClick={() => setShowMore(showMore + 2)}>Xem thêm </a>
      )}
    </div>
  )
}
export default CommentPost
