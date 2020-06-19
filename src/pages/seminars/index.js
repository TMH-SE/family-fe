import React, { useContext, useRef } from 'react'
import { Card, Button, Space, Menu, Dropdown } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined
} from '@ant-design/icons'
import './index.scss'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { IContext } from '@tools'
import ModalSeminar from './modalSeminar'

const GET_SEMINARS = gql`
  query seminars {
    seminars {
      _id
      title
      description
      startAt
      createdBy {
        _id
        firstname
        lastname
        expert {
          jobTitle
        }
      }
    }
  }
`

function index() {
  const { me } = useContext(IContext)
  const modalRef = useRef()
  const { data, refetch } = useQuery(GET_SEMINARS)
  console.log(data)
  return (
    <Card
      title="Hội thảo"
      extra={
        <Button
          icon={<PlusOutlined />}
          onClick={() => modalRef.current?.openModal()}
        >
          Tạo hội thảo
        </Button>
      }
    >
      <Card type="inner" title="Đang diễn ra">
        <Card
          type="inner"
          title="Hội thảo về trẻ vị thành niên"
          extra={
            me?._id === data?.seminars?.createdBy?._id ? (
              <Space>
                <Button key="start" type="primary">
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
              <Button key="start" type="primary">
                Tham dự
              </Button>
            )
          }
        >
          <Card.Meta description="Trình bày: BS. Ho Hon Ho"></Card.Meta>
        </Card>
      </Card>
      <Card style={{ marginTop: 16 }} type="inner" title="Sắp tới">
        Inner Card content
      </Card>
      <ModalSeminar ref={modalRef} refetchSeminars={refetch} />
    </Card>
  )
}

export default index
