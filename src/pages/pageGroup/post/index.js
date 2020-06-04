import React, { useState, useLayoutEffect } from 'react'
import firebase from 'firebase/app'
import { Card, Avatar, Dropdown, Typography, Menu, notification } from 'antd'
import { Reaction, SharePost, CommentPost, ModalReport } from '@components'
import {
  CommentOutlined,
  EllipsisOutlined,
  FlagOutlined,
  BookOutlined
} from '@ant-design/icons'
import { Meta } from 'antd/lib/list/Item'
import { useHistory } from 'react-router-dom'
// import { brokenContext } from '../../../layouts/MainLayout'

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
        <div onClick={() => setVisibleModalReport(true)}>
          <FlagOutlined key="flag" /> Báo cáo bài viết
        </div>
      </Menu.Item>
      <Menu.Item key="1">
        <div
          onClick={() => notification.success({ message: 'Lưu thành công' })}
        >
          <BookOutlined />
          Lưu bài viết
        </div>
      </Menu.Item>
    </Menu>
  )
  useLayoutEffect(() => {
    getSum(item.postId)
  }, [idx])
  const getSum = idPost => {
    let sumTemp = 0
    firebase
      .database()
      .ref(`posts/${idPost}/comments`)
      .on('value', snapshot => {
        sumTemp = snapshot.val() && Object.keys(snapshot.val()).length
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
        // key={key}
        title={
          <div style={{ display: 'flex', justifyContent: 'start' }}>
            <Avatar
              onClick={() => history.push(`/pagegroup/${item.groupId}`)}
              size="large"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <div>
              <a
                // onClick={() => history.push('/tuinhune/info')}
                style={{ fontWeight: 'bolder', color: 'black' }}
              >
                Tuinhune
              </a>
              <p style={{ color: '#9b9b9b', fontSize: 12 }}>
                {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        }
        style={{ maxWidth: '100%', marginTop: 16 }}
        actions={[
          <div
            id="like-post"
            key="like"
            onDoubleClick={() => console.log('đâsđâsd')}
          >
            <Reaction idPost={item.postId} />
          </div>,
          <div key="comment">
            <CommentOutlined
              onClick={() =>
                document.getElementById(`input-custom-${item.postId}`).focus()
              }
            />
            <span style={{ fontWeight: 'bold' }}>{sum} </span>
          </div>,
          <SharePost key="share" />,
          <Dropdown
            key="menu"
            overlay={menu}
            trigger={['click']}
            placement="bottomRight"
          >
            <EllipsisOutlined />
          </Dropdown>,
          <CommentPost idPost={item.postId} key="commet"></CommentPost>
        ]}
      >
        <Meta
          title={
            <a onClick={() => history.push(`/postdetail/${item.postId}`)}>
              <Typography.Title level={2}>
                Giảm nóng cho bé mùa hè
              </Typography.Title>
            </a>
          }
          description={
            <div>
              <p
                // id={showText ? `expand${key}` : 'collapse'}
                className={`content ${nameEl}${idx}}`}
              >
                Một trong những ngộ nhận sai lầm về giữ ấm bé yêu là ủ ấm bé.
                Bằng cách mặc thật nhiều quần áo thật dày, thật kín. Đây là cách
                giữ ấm không đúng, không khoa học. Bé sẽ bị nóng, ra nhiều mồ
                hôi và nhiễm lạnh ngược lại, dễ dẫn đến viêm phổi nếu mẹ mặc quá
                nhiều áo quần. Nhiều khi mẹ ủ ấm quá mức sẽ khiến bé bị đột tử
                do bị bí hơi nữa đấy. Chọn quần áo khi ngủ cho con sao cho thoải
                mái nhất, an toàn nhất là đã giúp bé được ủ ấm thân nhiệt rồi.
                Nếu mẹ sợ bé lạnh, hãy đắp thêm một lớp chăn lưới mỏng, nhẹ,
                loại dùng cho trẻ sơ sinh là bé vừa ấm áp vừa thoáng khí, thoát
                mồ hôi. Mẹ nên tránh đồ ngủ có dây buộc, những họa tiết phụ kiện
                trang trí khác có thể quấn cổ bé, làm bé không thở được. Nguồn:
                internet
              </p>
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
                See more{' '}
              </a>
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
