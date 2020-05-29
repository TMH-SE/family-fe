/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Comment, Avatar, List, Modal } from 'antd'
import moment from 'moment'
import firebase from 'firebase/app'
import * as uuid from 'uuid'
import './index.scss'
import { InputCustome } from '@components'
import { useHistory } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'
import reactStringReplace from 'react-string-replace'
const MY_USER_ID = 'tuinhune'
const CommentList = ({ comments, showMore, idPost }) => {
  const history = useHistory()
  const [previewImg, setPreviewImg] = useState({
    isShow: false,
    imgSrc: ''
  })
  const [rep, setRep] = useState({})
  const [showMoreRep, setShowMoreRep] = useState(0)
  let lessComment = []
  lessComment = comments.slice(comments.length - showMore, comments.length - 1)

  // const sendNotiComment = async (userId, postId) => {
  //   const notificationId = uuid.v4()
  //   try {
  //     await firebase.database().ref('notifications/' + userId + '/' + notificationId).set({
  //       action: 'comment',
  //       reciever: userId,
  //       link: `/postdetail/${postId}`,
  //       content: `@${MY_USER_ID} đã bình luận về bài viết của bạn`,
  //       seen: false
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  const sendNotiTagReply = async (userId, postId) => {
    const notificationId = uuid.v4()
    try {
      await firebase.database().ref('notifications/' + userId + '/' + notificationId).set({
        action: 'tag',
        reciever: userId,
        link: `/postdetail/${postId}`,
        content: `@${MY_USER_ID} đã nhắc đến bạn trong bình luận`,
        seen: false
      })
    } catch (err) {
      console.log(err)
    }
  }
  const reply = async (value, imgList) => {
    const cmt = await comments.filter(item => item.id === rep.commentId)[0].replies ? comments.filter(item => item.id === rep.commentId)[0].replies : []

    // lessCommentRep = cmt.slice(cmt.length - showMoreRep, cmt.length - 1)
    const repValue = [...cmt, {
      content: { message: value, img: imgList && imgList },
      timestamp: new Date().getTime(),
      author: 'tuinhune',
      photo: 'https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/85218763_1404179459764724_2859912112728178688_n.jpg?_nc_cat=109&_nc_sid=13bebb&_nc_ohc=JT2ort9aLPUAX96-8vn&_nc_ht=scontent.fsgn2-4.fna&oh=c9ae01c3bafc22d519528aa0b796f03c&oe=5EED07CE'
    }]
    try {
      await firebase.database().ref(idPost + '/' + 'comments/' + rep.commentId).update({
        mention: ['tuikyne', 'tuinhune'],
        replies: repValue
      })
    } catch (error) {
      console.log(error)
    }
    console.log(value.trim().match(/@(\w+)/g)[0], 'ssfd')
    await sendNotiTagReply(value.trim().match(/@(\w+)/g)[0].substring(1), idPost)
    setRep({})
  }
  return (
    <> <List
      dataSource={comments.length < showMore ? comments : lessComment }
      // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout='horizontal'
      renderItem={(comment) => <>
        <Comment id={`parent-cmt-${comment.id}`} actions={[<span onClick={() => setRep({ commentId: comment.id, author: comment.author })} key='comment-basic-reply-to' on>Reply to</span>]}
          author={<a onClick={() => history.push('/comment.author/info')} style={{ color: 'black', fontSize: 14 }}>{comment.author}</a>}
          avatar={comment.photo}
          content={<>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
              {comment.content.img && comment.content.img.map((srcImg, idx) => {
                return <div className='img-cmt' key={idx} style={{ display: 'flex', margin: '5px 0 0 5px' }}>
                  <img
                    style={{ height: 160, width: 160, objectFit: 'cover' }}
                    src={srcImg}
                    onClick={() => {
                      setPreviewImg({
                        isShow: true,
                        imgSrc: srcImg
                      })
                    }}
                  />
                </div>
              })}
            </div>
            <p>{comment.content.message.trim()}</p>
          </>}
          datetime={moment(comment.timestamp).fromNow()}
        />
        {comment.replies && comment.replies.length > showMoreRep && <a style={{ textAlign: 'left', marginLeft: '10%' }} onClick={() => setShowMoreRep(showMoreRep + 2)}>Xem  thêm {comment.replies.length - showMoreRep} câu trả lời</a>}
        { rep.commentId === comment.id && <Comment
          className={`rep-input ${comment.id}`}
          avatar={
            <Avatar
              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              alt='Han Solo'
            />
          }
          content={
            <InputCustome
              replyAuthor={rep && rep.author}
              idElement={comment.id}
              onSubmit={reply}
              placeholder='Nhập bình luận'
              mentions={comment.mention}
              // value={value}
            />
          }
        />
        }
        { comment.replies && comment.replies.sort((a, b) => b.timestamp - a.timestamp).slice(0, showMoreRep).map((reply, idx) => <Comment key={idx} className={`reply ${comment.id}`}
          actions={[<span onClick={() => setRep({ commentId: comment.id, author: reply.author })} key='comment-basic-reply-to' on>Reply to</span>]}
          author={<a style={{ color: 'black', fontSize: 14 }} onClick={() => history.push('/reply.author/info')}>{reply.author}</a>}
          avatar={reply.photo}
          content={<>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
              {reply.content.img && reply.content.img.map((srcImg, idx) => {
                return <div className='img-cmt' key={idx} style={{ display: 'flex', margin: '5px 0 0 5px' }}>
                  <img
                    style={{ height: 160, width: 160, objectFit: 'cover' }}
                    src={srcImg}
                    onClick={() => {
                      setPreviewImg({
                        isShow: true,
                        imgSrc: srcImg
                      })
                    }}
                  />
                </div>
              })}
            </div>
            <p style={{ display: 'inline' }}>{reactStringReplace(reply.content.message.trim(), /\^@@@(\w+)/g, (match, i) => <a style={{ display: 'contents' }} key={match + i} onClick={() => history.push(`/${match}/info`)}>@{match}</a>
            )}</p>
          </>}
          datetime={moment(reply.timestamp).fromNow()}
        />)}
      </>}
    />
    <Modal
      visible={previewImg.isShow}
      footer={null}
      onCancel={() => setPreviewImg(false)}
    >
      <img alt="example" style={{ width: '100%', paddingTop: 20 }} src={previewImg.imgSrc} />
    </Modal></>
  )
}

function CommentPost (props) {
  const [comments, setComments] = useState([])
  const [showMore, setShowMore] = useState(3)
  const { idPost } = props
  useEffect(() => {
    getComment()
  }, [])
  const getComment = () => {
    firebase.database().ref(idPost + '/comments').limitToLast(showMore + 1).on('value', (snapshot) => {
      // var mess = (snapshot.val() && snapshot.val().mess1) || 'Anonymous';
      const temp = Object.keys(snapshot.val()).map(key => ({ ...snapshot.val()[key], id: key }))
      // temp.sort((a, b) => b.timestamp - a.timestamp)
      setComments(temp)
    })
  }
  const handleSubmit = async (value, imgList) => {
    const postId = idPost
    const commentId = uuid.v4()
    try {
      await firebase.database().ref(postId + '/' + 'comments/' + commentId).set({
        content: { message: value, img: imgList },
        timestamp: new Date().getTime(),
        author: 'tuikyne',
        photo: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t1.0-9/s960x960/69272993_1239809152868423_6499525428661714944_o.jpg?_nc_cat=109&_nc_sid=85a577&_nc_ohc=EjOMARIw2YsAX-GtsO1&_nc_ht=scontent-hkg4-1.xx&_nc_tp=7&oh=e2211383674fc732817aea26a9f872b2&oe=5EE91203',
        mention: ['tuikyne'],
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
        avatar={
          <Avatar
            src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            alt='Han Solo'
          />
        }
        content={
          <InputCustome
            idElement={props.idPost}
            onSubmit={handleSubmit}
            placeholder='Nhập bình luận'
            // value={value}
          />
        }
      />
      {comments.length > 0 && <CommentList showMore={showMore} idPost={props.idPost} comments={comments} />}
      { comments.length > showMore &&
        <a onClick={() => setShowMore(showMore + 3)}>Xem thêm </a>}
    </div>
  )
}
export default CommentPost
