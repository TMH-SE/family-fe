import React from 'react'
import { PageHeader, Dropdown, Menu, Avatar, Divider, Layout } from 'antd'
import {
  UserOutlined,
  LogoutOutlined,
  LeftOutlined,
  GlobalOutlined,
  ReadOutlined,
  AreaChartOutlined
} from '@ant-design/icons'
import logoImgSrc from '@assets/images/logo.png'

const AdminLayout = ({ children }) => {
  const info = (
    <Menu>
      <Menu.Item disabled style={{}}>
        <Avatar src={logoImgSrc} />
        <span style={{ color: '#000', fontWeight: 'bold', marginLeft: '1em' }}>
          Admin
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <UserOutlined />
        <span>Thông tin cá nhân</span>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          history.push('/login')
        }}
      >
        <LogoutOutlined />
        <span>Đăng xuất</span>
      </Menu.Item>
    </Menu>
  )
  return (
    <>
      <PageHeader
        title="ADMIN AREA"
        onBack={() => history.goBack()}
        backIcon={<LeftOutlined />}
        extra={[
          <Dropdown
            key="0"
            overlay={info}
            trigger={['click']}
            placement="bottomRight"
          >
            <Avatar
              style={{ backgroundColor: 'rgba(0, 0, 0, .1)' }}
              src={logoImgSrc}
            />
          </Dropdown>
        ]}
        footer={<Divider style={{ margin: 0 }} />}
      />
      <Layout style={{ height: 'calc(100vh - 73px)' }}>
        <Layout.Sider>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <Menu.Item key="1" icon={<AreaChartOutlined />}>
              Tổng quát
            </Menu.Item>
            <Menu.Item key="2" icon={<ReadOutlined />}>
              Bài viết
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              Thành viên
            </Menu.Item>
            <Menu.Item key="4" icon={<GlobalOutlined />}>
              Cộng đồng
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout.Content style={{ overflow: 'auto' }}>{children}</Layout.Content>
      </Layout>
    </>
  )
}

export default AdminLayout