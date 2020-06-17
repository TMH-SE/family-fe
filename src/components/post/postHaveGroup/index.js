import React, { useState, useLayoutEffect, useContext } from 'react'
import firebase from 'firebase/app'
import { Card, Avatar, Typography } from 'antd'
import {
  Reaction,
  SharePost,
  CommentPost,
  SaveAndReport,
  JoinBtn
} from '@components'
import { CommentOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { IContext } from '@tools'

function PostHaveGroup(props) {
  const [showText, setShowText] = useState(false)
  const { me } = useContext(IContext)
  const [sum, setSum] = useState(0)
  const nameEl = showText ? 'expand' : 'collapse'
  const { item, idx } = props
  const history = useHistory()
  useLayoutEffect(() => {
    getSum(item?._id)
  }, [item?._id])
  const getSum = idPost => {
    let sumTemp = 0
    firebase
      .database()
      .ref(`posts/${idPost}/comments`)
      .on('value', snapshot => {
        sumTemp = snapshot.val() ? Object.keys(snapshot.val())?.length : 0
        setSum(sumTemp)
      })
  }

  return (
    <>
      <Card
        className="post"
        title={
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Avatar
              shape="square"
              onClick={() => history.push(`/pagegroup/${item?.community?._id}`)}
              size={64}
              src={item?.community?.avatar}
            />
            <div style={{ marginLeft: 10, marginTop: 10 }}>
              <a
                onClick={() =>
                  history.push(`/pagegroup/${item?.community?._id}`)
                }
                style={{ fontWeight: 'bolder', color: 'black' }}
              >
                {item?.community?.name}
              </a>
              <p style={{ color: '#9b9b9b', fontSize: 12 }}>
                Đăng bởi
                <span style={{ color: '#003b70' }}>
                  <a
                    onClick={() =>
                      history.push(`/${item?.createdBy?._id}/info`)
                    }
                  >
                    {' '}
                    {item?.createdBy?.firstname + ' '}
                  </a>
                </span>
                - {new Date(item?.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        }
        extra={
          process.env.ADMIN_SERVER === 'false' && (
            <JoinBtn
              id={{ userId: me?._id, communityId: item?.community?._id }}
            ></JoinBtn>
          )
        }
        style={{ maxWidth: '100%', marginBottom: 10 }}
        actions={process.env.ADMIN_SERVER === 'false' && [
          <div id="like-post" key="like">
            <Reaction idPost={item?._id} postItem={item} />
          </div>,
          // <Sum idPost ={item.postId} ></Sum>,
          <div
            key="comment"
            onClick={() =>
              document.getElementById(`input-custom-${item?._id}`).focus()
            }
          >
            <CommentOutlined
              onClick={() =>
                document.getElementById(`input-custom-${item?._id}`).focus()
              }
            />
            <span style={{ marginLeft: 5, fontWeight: 'bold' }}>{sum}</span>
          </div>,
          <SharePost key="share" idPost={item?._id} />,
          <SaveAndReport
            key="saveandreport"
            postId={item?._id}
            postItem={item}
          />,
          <CommentPost idPost={item?._id} postItem={item} key="commet"></CommentPost>
        ]}
      >
        <Card.Meta
          title={
            <a onClick={() => history.push(`/postdetail/${item?._id}`)}>
              <Typography.Title level={4}>{item?.title}</Typography.Title>
            </a>
          }
          description={
            <div>
              <p
                dangerouslySetInnerHTML={{
                  __html: item?.content
                }}
                className={`content ${nameEl}${idx}}`}
              ></p>
              <a
                id={`${nameEl}${idx}}`}
                onClick={async () => {
                  setShowText(!showText)
                  const content = await document.getElementsByClassName(
                    `expand${idx}}`
                  )
                  const a = await document.getElementById(`expand${idx}}`)
                  // console.log(a, content)
                  content[0].setAttribute('style', 'height: auto !important')
                  a.setAttribute('style', 'visibility: hidden')
                  await setShowText(false)
                }}
              >
                Xem thêm
              </a>
              <img
                src={item?.thumbnail}
                style={{ width: '100%', objectFit: 'cover' }}
              ></img>
            </div>
          }
        />
      </Card>
    </>
  )
}
export default PostHaveGroup
