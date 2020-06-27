import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import { Card, Avatar, Typography } from 'antd'
import { Reaction, SharePost, CommentPost, SaveAndReport } from '@components'
import { CommentOutlined } from '@ant-design/icons'
import { Meta } from 'antd/lib/list/Item'
import { useHistory } from 'react-router-dom'
function PostNoGroup(props) {
  const [showText, setShowText] = useState(props.showText || false)
  const [sum, setSum] = useState(0)
  const nameEl = showText ? 'expand' : 'collapse'
  const { item, refetch } = props
  const history = useHistory()
  useEffect(() => {
    getSum(item?._id)
  }, [item])
  const getSum = idPost => {
    let sumTemp = 0
    firebase
      .database()
      .ref(`posts/${idPost}/comments`)
      .once('value', snapshot => {
        sumTemp = snapshot.val() ? Object.keys(snapshot.val())?.length : 0
        setSum(sumTemp)
      })
  }
  return (
    <>
      <Card
        // key={key}
        title={
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Avatar
              onClick={() => history.push(`/${item?.createdBy?._id}/info`)}
              size="large"
              src={
                item?.createdBy?.avatar ||
                'https://lh3.googleusercontent.com/proxy/6C5Z-8XG57kW_mwwDGrOz6PxPeVCy8D2cdZWKafAdYfyTxWRECggO74MhJSria5djCNtW-7r5bdxfSGoZhkqSyBN34OFbpfjwrc43LbI'
              }
            />
            <div style={{ marginLeft: 10 }}>
              <a
                onClick={() => history.push(`/${item?.createdBy?._id}/info`)}
                style={{ fontWeight: 'bolder', color: 'black' }}
              >
                {item?.createdBy?.firstname}
              </a>
              <p style={{ color: '#9b9b9b', fontSize: 12 }}>
                {new Date(item?.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        }
        style={{ maxWidth: '100%', marginBottom: 10 }}
        actions={
          process.env.ADMIN_SERVER === 'false' && [
            <div
              id="like-post"
              key="like"
              onDoubleClick={() => console.log('đâsđâsd')}
            >
              <Reaction idPost={item?._id} postItem={item} />
            </div>,
            <div key="comment">
              <CommentOutlined
                onClick={() =>
                  document.getElementById(`input-custom-${item?._id}`).focus()
                }
              />
              <span style={{ marginLeft: 5, fontWeight: 'bold' }}>{sum}</span>
            </div>,
            <SharePost key="share" />,
            <SaveAndReport
              refetch={refetch}
              key="saveandreport"
              postId={item?._id}
              postItem={item}
            />,
            <CommentPost
            hashNoti={props.hashNoti}
              idPost={item?._id}
              postItem={item}
              key="commet"
            ></CommentPost>
          ]
        }
      >
        <Meta
          className="post-meta"
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
                className={`content ${nameEl}${item?._id}`}
                style={{
                  height: showText ? 'auto' : '3em',
                  overflow: 'hidden'
                }}
              ></p>
              {/* {document.getElementsByClassName(`collapse${item?._id}`)[0] &&
                            document.getElementsByClassName(`collapse${item?._id}`)[0]
                              .lastElementChild.clientHeight > 30 && ( */}
              {!showText && (
                <a
                  id={`${nameEl}${item?._id}`}
                  onClick={async () => {
                    // if (
                    //   document.getElementsByClassName(
                    //     `collapse${item?._id}`
                    //   )[0] &&
                    //   document.getElementsByClassName(`collapse${item?._id}`)[0]
                    //     .lastElementChild.clientHeight > 300
                    // ) {
                    //   history.push(`./postdetail/${item?._id}`)
                    // } else {
                    setShowText(!showText)
                  }}
                >
                  Xem thêm
                </a>
              )}
              {/* )} */}
              <img
                src={item?.thumbnail}
                style={{ width: '100%', objectFit: 'cover' }}
              ></img>
            </div>
          }
        />
      </Card>

      {/* <ModalReport
        visible={visibleModalReport}
        handleCancel={handleCancel}
        handleOk={handleOk}
    ?_id={item?._id}
      ></ModalReport> */}
    </>
  )
}
export default PostNoGroup
