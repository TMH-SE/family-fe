/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Row, Col, Divider, Tooltip } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
import EditUser from './editUser'
import moment from 'moment'
const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
)
function Info(props) {
  const { userInfo, isMe } = props
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Row>
        <Col span={3}>
          <p
            className="site-description-item-profile-p"
            style={{ marginBottom: 24 }}
          >
            User Profile
          </p>
        </Col>
        {isMe && (
          <Col span={12}>
            <Tooltip title="Chỉnh sửa thông tin">
              <EditTwoTone onClick={() => setVisible(true)} />
            </Tooltip>
          </Col>
        )}
      </Row>

      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Họ tên"
            content={`${userInfo?.firstname} ${userInfo?.lastname}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Tài khoản" content={userInfo?.email} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Ngày sinh"
            content={
              userInfo?.birthday
                ? new Date(userInfo?.birthday).toLocaleDateString()
                : '-'
            }
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Giới tính"
            content={
              !userInfo?.gender
                ? '-'
                : userInfo?.gender === 'FEMALE'
                ? 'Nữ'
                : userInfo?.gender === 'MALE'
                ? 'Nam'
                : 'Khác'
            }
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Email" content={userInfo?.email} />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Số điện thoại"
            content={userInfo?.phoneNumber}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionItem
            title="Tham gia ngày"
            content={userInfo?.createdAt}
          />
        </Col>
      </Row>
      <EditUser
        visible={visible}
        onCancel={() => setVisible(!visible)}
      ></EditUser>
    </>
  )
}

export default Info
