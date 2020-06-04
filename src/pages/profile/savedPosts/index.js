/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  Card,
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
  // BookOutlined,
  EllipsisOutlined,
  // BookFilled,
  BookTwoTone
} from '@ant-design/icons'
import {
  SharePost,
  CommentPost,
  ModalReport
  // ModalCreatePost
} from '../../../components'
import { withRouter } from 'react-router-dom'
import Reaction from '../../../components/reaction'

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
function SavedPosts(props) {
  // const [visibleModalCreate, setVisibleModalCreate] = useState(false)
  const [visibleModalReport, setVisibleModalReport] = useState(false)
  const [showText, setShowText] = useState(false)
  const nameEl = showText ? 'expand' : 'collapse'
  const { history } = props
  const handleOk = () => {
    // setVisibleModalCreate(false)
    setVisibleModalReport(false)
  }
  const handleCancel = () => {
    // setVisibleModalCreate(false)
    setVisibleModalReport(false)
  }
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
          <BookTwoTone />
          Đã lưu bài viết
        </div>
      </Menu.Item>
    </Menu>
  )
  return (
    <>
      {/* <div>
        <img
          style={{ objectFit: 'cover', height: 250, width: '100%' }}
          alt='example'
          src='https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/92522573_1498212850342148_3908204202505011200_n.jpg?_nc_cat=100&_nc_sid=85a577&_nc_ohc=Hs7CLNZhiVYAX8UfzYa&_nc_ht=scontent.fsgn2-2.fna&oh=bd39d3ac8da082083ba12c10e4b8870a&oe=5EDC49A8'
        />
      </div>
      <div style={{ display: 'flex', marginTop: -60, backgroundColor: 'initial' }}>
        <Avatar
          style={{ border: '2px solid black', marginLeft: 10 }}
          shape='circle'
          size={120}
          src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/42509129_1029389683910372_8485576172426493952_n.jpg?_nc_cat=106&_nc_sid=dd9801&_nc_ohc=3By-MUAxPSkAX-vnCzn&_nc_ht=scontent.fsgn2-3.fna&oh=de4871077a93092c361bb222770ed707&oe=5EDD69A3'
        />
        <div style={{ marginLeft: 10 }}>
          <p style={{ fontWeight: 'bolder', fontSize: 20, color: '#fff' }}>
            Chăm sóc bé sinh non
          </p>
          <p
            style={{
              marginTop: -15,
              fontWeight: 'bolder',
              color: '#fff',
              fontSize: 12
            }}
          >
            {' '}
            12k thành viên - 300 bài viết
          </p>
          <Button
            style={{ backgroundColor: 'rgb(0, 152, 218)', color: '#fff' }}
          >
            Tham gia
          </Button>
        </div>
      </div>
      <br /> */}
      {data.map((item, idx) => (
        <Card
          key={idx}
          title={
            <div style={{ display: 'flex', justifyContent: 'start' }}>
              <Avatar
                onClick={() => history.push(`/pagegroup/${item.groupId}`)}
                size="large"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <div>
                <a
                  onClick={() => history.push(`/pagegroup/${item.groupId}`)}
                  style={{ fontWeight: 'bolder', color: 'black' }}
                >
                  Chăm sóc bé từ 0-12 tháng tuổi
                </a>
                <p style={{ color: '#9b9b9b', fontSize: 12 }}>
                  Đăng bởi{' '}
                  <span style={{ color: '#003b70' }}>
                    <a onClick={() => history.push('/tuinhune/info')}>
                      {' '}
                      Tuinhune
                    </a>{' '}
                  </span>{' '}
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
            <div
              id="like-post"
              key="like"
              onDoubleClick={() => console.log('đâsđâsd')}
            >
              <Reaction />
            </div>,
            <div key="comment">
              <CommentOutlined />
              <span style={{ fontWeight: 'bold' }}> 8 </span>
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
            <CommentPost key="commet"></CommentPost>
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
                  // id={showText ? `expand${idx}` : 'collapse'}
                  className={`content-post ${nameEl}${idx}`}
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
                <a
                  id={`${nameEl}${idx}`}
                  onClick={async () => {
                    setShowText(!showText)
                    const contentPost = await document.getElementsByClassName(
                      `expand${idx}`
                    )
                    const a = await document.getElementById(`expand${idx}`)
                    // console.log(a, content)
                    contentPost[0].setAttribute(
                      'style',
                      'height: auto !important'
                    )
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
      ))}

      <ModalReport
        visible={visibleModalReport}
        handleCancel={handleCancel}
        handleOk={handleOk}
      ></ModalReport>
      {/* <ModalCreatePost
        handleCancel={handleCancel}
        handleOk={handleOk}
        visible={visibleModalCreate}
      ></ModalCreatePost> */}
    </>
  )
}

export default withRouter(SavedPosts)
