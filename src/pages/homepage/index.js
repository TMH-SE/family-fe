/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import firebase from 'firebase/app'
import {
  Card,
  Input,
  Avatar,
  Typography,
  Button,
  Menu,
  Dropdown,
  notification
} from 'antd'
import {
  CommentOutlined,
  FlagOutlined,
  BookOutlined,
  EllipsisOutlined
} from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import {
  SharePost,
  CommentPost,
  ModalReport,
  HighLightPost,
  ModalCreatePost
} from '../../components'
import { brokenContext } from '../../layouts/MainLayout'
// import { Emoji } from 'emoji-mart'
import Reaction from '../../components/reaction'
// import { ThemeContext } from '../../router'
// import ModalReport from '../../components/ModalReport'
// import HighLightPost from '../../components/HighlightPost'
// import ModalCreatePost from '../../components/ModalCreatePost'
const { Meta } = Card
// var moment = require('moment')
const data = [
  {
    title: 'Ant Design Title 1',
    groupId: '111',
    postId: 'post1'
  },
  {
    title: 'Ant Design Title 2',
    groupId: '222',
    postId: 'post2'
  },
  {
    title: 'Ant Design Title 3',
    groupId: '111',
    postId: 'post3'
  },
  {
    title: 'Ant Design Title 4',
    groupId: '222',
    postId: 'post4'
  }
]
const HomePage = (props) => {
  const isBroken = useContext(brokenContext)
  // const myTheme = useContext(ThemeContext)
  const [visibleModalCreate, setVisibleModalCreate] = useState(false)
  const [visibleModalReport, setVisibleModalReport] = useState(false)
  const [showText, setShowText] = useState(false)

  const nameEl = showText ? 'expand' : 'collapse'
  const handleOk = () => {
    setVisibleModalCreate(false)
    setVisibleModalReport(false)
  }
  const handleCancel = () => {
    setVisibleModalCreate(false)
    setVisibleModalReport(false)
  }
  const getSumComment = (idPost) => {
    let temp
    firebase.database().ref(idPost + '/comments').on('value', (snapshot) => {
      // var mess = (snapshot.val() && snapshot.val().mess1) || 'Anonymous';
      temp = Object.keys(snapshot.val()).map(key => ({ ...snapshot.val()[key], id: key }))
      // return temp.length
    })
    return temp ? temp.length : 0
  }
  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <div onClick={() => setVisibleModalReport(true)}>
          <FlagOutlined key='flag' /> Báo cáo bài viết
        </div>
      </Menu.Item>
      <Menu.Item key='1'>
        <div
          onClick={() => notification.success({ message: 'Lưu thành công' })}
        >
          <BookOutlined />
          Lưu bài viết
        </div>
      </Menu.Item>
    </Menu>
  )
  const { history } = props
  return (
    <>
      <h3>Tạo bài viết</h3>
      <Input.TextArea
        onClick={() => setVisibleModalCreate(!visibleModalCreate)}
        style={{ margin: '0 auto', marginBottom: 10 }}
        placeholder='Như ơi, Bạn đang nghĩ gì ?'
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <h3>Bài viết từ FAMILY</h3>
      <HighLightPost isBroken={isBroken}></HighLightPost>

      {data.map((item, idx) => {
        const sumComment = getSumComment(item.postId)
        return <Card
          key={idx}
          title={
            <div style={{ display: 'flex', justifyContent: 'start' }}>
              <Avatar
                onClick={() => history.push(`/pagegroup/${item.groupId}`)}
                size='large'
                src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              />
              <div>
                <a
                  onClick={() => history.push(`/pagegroup/${item.groupId}`)}
                  style={{ fontWeight: 'bolder', color: 'black' }}
                >
                  Chăm sóc bé từ 0-12 tháng tuổi
                </a>
                <p style={{ color: '#9b9b9b', fontSize: 12 }}>
                  Đăng bởi <span style={{ color: '#003b70' }}>
                    <a onClick={() => history.push('/tuinhune/info')}> Tuinhune</a> </span>{' '}
                  - {new Date().toLocaleString()}
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
            <div id='like-post' key='like'>
              <Reaction idPost={item.postId} /></div>,
            <div key='comment' onClick={() => document.getElementById(`input-custom-${item.postId}`).focus()}>
              <CommentOutlined onClick={() => document.getElementById(`input-custom-${item.postId}`).focus()}/>
              <span style={{ marginLeft: 5, fontWeight: 'bold' }}>{sumComment}</span>
            </div>,
            <SharePost key='share' />,
            <Dropdown
              key='menu'
              overlay={menu}
              trigger={['click']}
              placement='bottomRight'
            >
              <EllipsisOutlined />
            </Dropdown>,
            <CommentPost idPost={item.postId} key='commet' ></CommentPost>
          ]}
        >
          <Meta
            title={<a onClick={() => history.push(`/postdetail/${item.postId}`)}>
              <Typography.Title level={2}>
                Giảm nóng cho bé mùa hè
              </Typography.Title></a>
            }
            description={
              <div>
                <p
                  // id={showText ? `expand${idx}` : 'collapse'}
                  className={`content ${nameEl}${idx}`}
                >
                  Một trong những ngộ nhận sai lầm về giữ ấm bé yêu là ủ ấm bé.
                  Bằng cách mặc thật nhiều quần áo thật dày, thật kín. Đây là
                  cách giữ ấm không đúng, không khoa học. Bé sẽ bị nóng, ra
                  nhiều mồ hôi và nhiễm lạnh ngược lại, dễ dẫn đến viêm phổi nếu
                  mẹ mặc quá nhiều áo quần. Nhiều khi mẹ ủ ấm quá mức sẽ khiến
                  bé bị đột tử do bị bí hơi nữa đấy. Chọn quần áo khi ngủ cho
                  con sao cho thoải mái nhất, an toàn nhất là đã giúp bé được ủ
                  ấm thân nhiệt rồi. Nếu mẹ sợ bé lạnh, hãy đắp thêm một lớp
                  chăn lưới mỏng, nhẹ, loại dùng cho trẻ sơ sinh là bé vừa ấm áp
                  vừa thoáng khí, thoát mồ hôi. Mẹ nên tránh đồ ngủ có dây buộc,
                  những họa tiết phụ kiện trang trí khác có thể quấn cổ bé, làm
                  bé không thở được. Nguồn: internet
                </p>
                <a id={`${nameEl}${idx}`} onClick={async () => {
                  setShowText(!showText)
                  const content = await document.getElementsByClassName(`expand${idx}`)
                  const a = await document.getElementById(`expand${idx}`)
                  // console.log(a, content)
                  content[0].setAttribute('style', 'height: auto !important')
                  a.setAttribute('style', 'visibility: hidden')
                  await setShowText(false)
                }
                }>See more </a>
                <div></div>
              </div>
            }
          />
        </Card>
      }
      )}

      <ModalReport
        visible={visibleModalReport}
        handleCancel={handleCancel}
        handleOk={handleOk}
      ></ModalReport>
      <ModalCreatePost
        isBroken={isBroken}
        handleCancel={handleCancel}
        handleOk={handleOk}
        visible={visibleModalCreate}
      ></ModalCreatePost>
    </>
  )
}

export default withRouter(HomePage)
