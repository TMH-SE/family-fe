import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import { Card, Avatar, Typography } from 'antd'
import { Reaction, SharePost, CommentPost, SaveAndReport } from '@components'
import { CommentOutlined } from '@ant-design/icons'
import { Meta } from 'antd/lib/list/Item'
import { useHistory } from 'react-router-dom'
function PostNoGroup(props) {
  const [showText, setShowText] = useState(false)
  // const { me } = useContext(IContext)
  const [sum, setSum] = useState(0)
  const nameEl = showText ? 'expand' : 'collapse'
  // const [visibleModalReport, setVisibleModalReport] = useState(false)
  const { item, idx } = props
  const history = useHistory()
  useEffect(() => {
    getSum(item?._id)
  }, [idx])
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
        // key={key}
        title={
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Avatar
              onClick={() => history.push(`/${item?.createdBy?._id}/info`)}
              size="large"
              src={item?.createdBy?.avatar || 'https://lh3.googleusercontent.com/proxy/6C5Z-8XG57kW_mwwDGrOz6PxPeVCy8D2cdZWKafAdYfyTxWRECggO74MhJSria5djCNtW-7r5bdxfSGoZhkqSyBN34OFbpfjwrc43LbI' }
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
        style={{ maxWidth: '100%' }}
        actions={[
          <div
            id="like-post"
            key="like"
            onDoubleClick={() => console.log('đâsđâsd')}
          >
            <Reaction idPost={item?._id} />
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
            key="saveandreport"
            postId={item?._id}
            postItem={item}
          />,
          <CommentPost idPost={item?._id} key="commet"></CommentPost>
        ]}
      >
        <Meta
          title={
            <a onClick={() => history.push(`/postdetail/${item?._id}`)}>
              <Typography.Title level={4}>
                {item?.title}
              </Typography.Title>
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
                Xem thêm{' '}
              </a>
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
