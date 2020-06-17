import React, { useState, useLayoutEffect } from 'react'
import firebase from 'firebase/app'
import {
  Card,
  Avatar,
  Button,
  Dropdown,
  Menu,
  notification,
  Space
} from 'antd'
import { Reaction, SharePost, CommentPost, ModalReport } from '@components'
import {
  CommentOutlined,
  EllipsisOutlined,
  FlagOutlined,
  BookOutlined
} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

export const Post = props => {
  const [showText, setShowText] = useState(false)
  const [sum, setSum] = useState(0)
  const nameEl = showText ? 'expand' : 'collapse'
  const [visibleModalReport, setVisibleModalReport] = useState(false)
  const { item, idx } = props
  const history = useHistory()
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Space onClick={() => setVisibleModalReport(true)}>
          <FlagOutlined key="flag" />
          <span>Báo cáo bài viết</span>
        </Space>
      </Menu.Item>
      <Menu.Item key="1">
        <Space
          onClick={() => notification.success({ message: 'Lưu thành công' })}
        >
          <BookOutlined />
          <span>Lưu bài viết</span>
        </Space>
      </Menu.Item>
    </Menu>
  )
  useLayoutEffect(() => {
    getSum(item.postId)
  }, [item.postId])
  const getSum = idPost => {
    let sumTemp = 0
    firebase
      .database()
      .ref(`posts/${idPost}/comments`)
      .on('value', snapshot => {
        sumTemp = snapshot.val() ? Object.keys(snapshot.val()).length : 0
        setSum(sumTemp)
      })
  }
  const handleOk = () => {
    setVisibleModalReport(false)
  }
  const handleCancel = () => {
    setVisibleModalReport(false)
  }
  return (
    <>
      <Card
        key={item?._id}
        cover={<img alt={`thumbnail-${item?.title}`} src={item?.thumbnail} />}
        title={
          <div style={{ display: 'flex', justifyContent: 'start' }}>
            <Avatar
              onClick={() =>
                history.push(
                  item?.community
                    ? `/pagegroup/${item?.community?._id}`
                    : `/${item?.createdBy?._id}/info`
                )
              }
              size="large"
              src={item?.community?.avatar || item?.createdBy?.avatar}
            />
            <Space size={0} direction="vertical">
              <Button
                type="link"
                onClick={() => history.push(`/pagegroup/${item.groupId}`)}
                style={{ fontWeight: 'bolder', color: 'black' }}
              >
                {item?.community?.name ||
                  `${item?.createdBy?.firstname} ${item?.createdBy?.lastname}`}
              </Button>
              <Space style={{ color: '#9b9b9b', fontSize: 12 }}>
                {item?.community && (
                  <>
                    <span>Đăng bởi</span>
                    <span style={{ color: '#003b70' }}>
                      <a onClick={() => history.push('/tuinhune/info')}>
                        Tuinhune
                      </a>
                    </span>
                    <span>-</span>
                  </>
                )}
                <span>{new Date(item?.createdAt).toLocaleString()}</span>
              </Space>
            </Space>
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
          <Reaction id="like-post" key="like" idPost={item.postId} />,
          <Space
            key="comment"
            onClick={() =>
              document.getElementById(`input-custom-${item.postId}`).focus()
            }
          >
            <CommentOutlined
              onClick={() =>
                document.getElementById(`input-custom-${item.postId}`).focus()
              }
            />
            <span style={{ marginLeft: 5, fontWeight: 'bold' }}>{sum}</span>
          </Space>,
          <SharePost key="share" />,
          <Dropdown
            key="menu"
            overlay={menu}
            trigger={['click']}
            placement="bottomRight"
          >
            <EllipsisOutlined />
          </Dropdown>,
          <CommentPost idPost={item.postId} key="comment"></CommentPost>
        ]}
      >
        <Card.Meta
          title={
            <h1
              style={{ whiteSpace: 'normal', cursor: 'pointer' }}
              onClick={() => history.push(`/postdetail/${item.postId}`)}
            >
              {item?.title}
            </h1>
          }
          description={
            <div>
              <div
                className={`content ${nameEl}${idx}}`}
                dangerouslySetInnerHTML={{ __html: item?.content }}
              />
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

      <ModalReport
        visible={visibleModalReport}
        handleCancel={handleCancel}
        handleOk={handleOk}
      ></ModalReport>
    </>
  )
}
