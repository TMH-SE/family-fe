/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import {
  Card,
  Avatar,
  Typography,
  Button,
  Menu,
  Dropdown,
  notification,
  Tooltip
} from 'antd'
import {
  CommentOutlined,
  FlagOutlined,
  BookOutlined,
  EllipsisOutlined,
  LeftOutlined
} from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app'
import {
  Reaction,
  SharePost,
  CommentPost,
  ModalCreatePost,
  ModalReport
} from '@components'
import { brokenContext } from '../../layouts/MainLayout'

const { Meta } = Card
// var moment = require('moment')

function PostDetail(props) {
  const isBroken = useContext(brokenContext)
  const [visibleModalCreate, setVisibleModalCreate] = useState(false)
  const [visibleModalReport, setVisibleModalReport] = useState(false)
  const handleOk = () => {
    setVisibleModalCreate(false)
    setVisibleModalReport(false)
  }
  const handleCancel = () => {
    setVisibleModalCreate(false)
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
          <BookOutlined />
          Lưu bài viết
        </div>
      </Menu.Item>
    </Menu>
  )
  const { history } = props
  const { postId } = props.match.params
  const getSumComment = () => {
    let temp
    firebase
      .database()
      .ref(`posts/${postId}/comments`)
      .on('value', snapshot => {
        // var mess = (snapshot.val() && snapshot.val().mess1) || 'Anonymous';
        temp = Object.keys(snapshot.val()).map(key => ({
          ...snapshot.val()[key],
          id: key
        }))
        // return temp.length
      })
    return temp ? temp.length : 0
  }
  return (
    <>
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Tooltip title="Quay lại">
              <Button
                onClick={() => history.goBack()}
                size="middle"
                icon={<LeftOutlined />}
              />
            </Tooltip>
            <a
              title=""
              onClick={() => history.push('/pagegroup/111')}
              style={{ fontWeight: 'bolder', color: 'black', padding: 5 }}
            >
              Chăm sóc bé 0 -12 tháng tuổi
            </a>
            {/* </div> */}
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
            <Reaction idPost={postId} />
          </div>,
          <div key="comment">
            <CommentOutlined />
            <span style={{ fontWeight: 'bold' }}> {getSumComment()} </span>
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
          <CommentPost
            idPost={props.match.params.postId}
            key="commet"
          ></CommentPost>
        ]}
      >
        <Meta
          title={
            <>
              <div style={{ display: 'flex', justifyContent: 'start' }}>
                <Avatar
                  onClick={() => history.push('/pagegroup/111')}
                  size="large"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
                <div>
                  <a
                    onClick={() => history.push('/tuinhune/info')}
                    style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}
                  >
                    Tuinhune{' '}
                  </a>
                  <br></br>
                  <p style={{ color: '#9b9b9b', fontSize: 12 }}>
                    {' '}
                    {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
              <a onClick={() => history.push('/postdetail/111')}>
                <Typography.Title level={2}>
                  Giảm nóng cho bé mùa hè
                </Typography.Title>
              </a>
            </>
          }
          description={
            <div>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  fontFamily: 'Times New Roman'
                }}
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
                internet Một trong những ngộ nhận sai lầm về giữ ấm bé yêu là ủ
                ấm bé. Bằng cách mặc thật nhiều quần áo thật dày, thật kín. Đây
                là cách giữ ấm không đúng, không khoa học. Bé sẽ bị nóng, ra
                nhiều mồ hôi và nhiễm lạnh ngược lại, dễ dẫn đến viêm phổi nếu
                mẹ mặc quá nhiều áo quần. Nhiều khi mẹ ủ ấm quá mức sẽ khiến bé
                bị đột tử do bị bí hơi nữa đấy. Chọn quần áo khi ngủ cho con sao
                cho thoải mái nhất, an toàn nhất là đã giúp bé được ủ ấm thân
                nhiệt rồi. Nếu mẹ sợ bé lạnh, hãy đắp thêm một lớp chăn lưới
                mỏng, nhẹ, loại dùng cho trẻ sơ sinh là bé vừa ấm áp vừa thoáng
                khí, thoát mồ hôi. Mẹ nên tránh đồ ngủ có dây buộc, những họa
                tiết phụ kiện trang trí khác có thể quấn cổ bé, làm bé không thở
                được. Nguồn: internet Một trong những ngộ nhận sai lầm về giữ ấm
                bé yêu là ủ ấm bé. Bằng cách mặc thật nhiều quần áo thật dày,
                thật kín. Đây là cách giữ ấm không đúng, không khoa học. Bé sẽ
                bị nóng, ra nhiều mồ hôi và nhiễm lạnh ngược lại, dễ dẫn đến
                viêm phổi nếu mẹ mặc quá nhiều áo quần. Nhiều khi mẹ ủ ấm quá
                mức sẽ khiến bé bị đột tử do bị bí hơi nữa đấy. Chọn quần áo khi
                ngủ cho con sao cho thoải mái nhất, an toàn nhất là đã giúp bé
                được ủ ấm thân nhiệt rồi. Nếu mẹ sợ bé lạnh, hãy đắp thêm một
                lớp chăn lưới mỏng, nhẹ, loại dùng cho trẻ sơ sinh là bé vừa ấm
                áp vừa thoáng khí, thoát mồ hôi. Mẹ nên tránh đồ ngủ có dây
                buộc, những họa tiết phụ kiện trang trí khác có thể quấn cổ bé,
                làm bé không thở được. Nguồn: internet
              </p>
            </div>
          }
        />
      </Card>
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

export default withRouter(PostDetail)
