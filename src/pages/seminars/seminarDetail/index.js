import React from 'react'
import { Card, Space, Button, Dropdown, Menu, Avatar } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  UserOutlined
} from '@ant-design/icons'

function SeminarDetail({ me, seminarData }) {
  return (
    <Card
      style={{ marginBottom: 10 }}
      type="inner"
      title={
        <div
          style={{
            wordWrap: 'break-word',
            whiteSpace: 'break-spaces',
            width: '100%'
          }}
        >
          {seminarData.title}
        </div>
      }
      extra={
        me?._id === seminarData?.createdBy?._id ? (
          <Space>
            <Button
              onClick={() =>
                window.open(`${window.origin}/seminar/${seminarData._id}`)
              }
              key="start"
              type="primary"
            >
              Bắt đầu
            </Button>
            <Dropdown
              placement="bottomCenter"
              overlay={
                <Menu>
                  <Menu.Item key="0">
                    <EditOutlined />
                    <span>Sửa</span>
                  </Menu.Item>
                  <Menu.Item key="1">
                    <DeleteOutlined />
                    <span>Xóa</span>
                  </Menu.Item>
                </Menu>
              }
            >
              <Button icon={<MoreOutlined />} type="link" />
            </Dropdown>
          </Space>
        ) : (
          <Button
            onClick={() =>
              window.open(`${window.origin}/seminar/${seminarData._id}`)
            }
            key="start"
            type="primary"
          >
            Tham dự
          </Button>
        )
      }
    >
      <Card.Meta
        avatar={
          <Avatar
            src={seminarData?.createdBy?.avatar}
            icon={<UserOutlined />}
          />
        }
        title={`${seminarData?.createdBy?.expert?.jobTitle} ${seminarData?.createdBy?.firstname} ${seminarData?.createdBy?.lastname}`}
        description={
          <pre
            style={{
              wordWrap: 'break-word',
              whiteSpace: 'break-spaces',
              width: '100%'
            }}
          >
            {seminarData?.description}
          </pre>
        }
      ></Card.Meta>
    </Card>
  )
}

export default SeminarDetail
