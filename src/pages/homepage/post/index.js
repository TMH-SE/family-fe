import React, { useState, useLayoutEffect } from 'react'
import firebase from 'firebase/app'
import {
  Card,
  Avatar,
  Button,
  Typography,
} from 'antd'
import { Reaction, SharePost, CommentPost, SaveAndReport } from '@components'
import {
  CommentOutlined,
} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

export const Post = props => {
  const [showText, setShowText] = useState(false)
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
        className='post'
        title={
          <div style={{ display: 'flex', justifyContent: 'start' }}>
            <Avatar
              onClick={() => history.push(`/pagegroup/${item?.community?._id}`)}
              size="large"
              src={item?.community?.avatar}
            />
            <div>
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
                    {item?.createdBy?.firstname}
                  </a>
                </span>
                - {new Date(item?.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        }
        extra={
          <Button
            style={{ backgroundColor: 'rgb(0, 152, 218)', color: '#fff' }}
          >
            Tham gia
          </Button>
        }
        style={{ maxWidth: '100%', marginTop: 16 }}
        actions={[
          <div id="like-post" key="like">
            <Reaction idPost={item?._id} />
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
         <SaveAndReport key='saveandreport' postId={item?._id} postItem={item}/>,
          <CommentPost idPost={item?._id} key="commet"></CommentPost>
        ]}
      >
        <Card.Meta
          title={
            <a onClick={() => history.push(`/postdetail/${item?._id}`)}>
              <Typography.Title level={2}>{item?.title}</Typography.Title>
            </a>
          }
          description={
            <div>
              <img
                src={item?.thumbnail}
                style={{ width: '100%', objectFit: 'cover' }}
              ></img>
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
                See more
              </a>
              <div></div>
            </div>
          }
        />
      </Card>

      {/* <ModalReport
        visible={visibleModalReport}
        handleCancel={handleCancel}
        handleOk={handleOk}
        postId={item?._id}
      ></ModalReport> */}
    </>
  )
}
