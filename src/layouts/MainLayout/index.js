/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react'
import {
  Layout,
  Menu,
  Input,
  Avatar,
  Dropdown,
  Typography,
  Button,
  Tooltip,
  Badge,
  Popover,
  Modal
  // Switch
} from 'antd'
import {
  UnorderedListOutlined,
  FormOutlined,
  BellOutlined,
  CaretDownOutlined,
  SearchOutlined,
  MessageTwoTone,
  InfoCircleTwoTone,
  FileTextTwoTone,
  LogoutOutlined,
  BookTwoTone,
  HeartTwoTone
} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/app'
import { Logo, HighLightGroup, Noti, Login } from '@components'
import './mainlayout.scss'
// import InputCustome from '../../components/inputCustome'

import { IContext } from '@tools'
import ConversationList from '@pages/myMessenger/ConversationList'
import MessageList from '@pages/messageDetail/MessageList'
// import { ThemeContext } from '../../router'
// import HomePage from '../MainLayout/HomePage'
// import HighLightPost from '../MainLayout/HighlightPost'
// import ModalCreatePost from '../MainLayout/ModalCreatePost'
import reactStringReplace from 'react-string-replace'
import { useQuery } from '@apollo/react-hooks'
import { GET_CHAT_BY_USER } from '@shared'
import SignIn from '@pages/signIn'
const { Header, Content, Sider } = Layout

export const brokenContext = React.createContext(null)
// const MY_USER_ID =
const index = ({ children }) => {
  const { logout, me, isAuth, messbox, onCancelMessbox, showLogin, closeLoginModal } = useContext(IContext)

  const [isBroken, setIsBroken] = useState(false)
  const [visible, setVisible] = useState(false)
  // const [messbox, setMessbox] = useState([])
  // const { data, refetch } = useQuery(GET_CHAT_BY_USER, {
  //   variables: { userId: me?._id },
  //   fetchPolicy: "no-cache"
  // })
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    getNotification()
  }, [me])
  const getNotification = () => {
    let temp
    firebase
      .database()
      .ref('notifications/' + me?._id)
      .orderByKey()
      .limitToLast(10)
      .on('value', snapshot => {
        temp =
          snapshot.val() &&
          Object.keys(snapshot.val()).map(key => ({
            ...snapshot.val()[key],
            id: key
          }))

        setNotifications(temp)
      })
  }
  const history = useHistory()
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => history.push(`/${me?._id}/info`)}>
        <InfoCircleTwoTone /> Thông tin cá nhân{' '}
      </Menu.Item>
      {isBroken && (
        <Menu.Item
          key="1"
          onClick={() => history.push(`/${me?._id}/messenger`)}
        >
          <MessageTwoTone /> Tin nhắn{' '}
        </Menu.Item>
      )}
      <Menu.Item key="2" onClick={() => history.push(`/${me?._id}/myposts`)}>
        <FileTextTwoTone /> Bài viết của tôi{' '}
      </Menu.Item>
      <Menu.Item key="3" onClick={() => history.push(`/${me?._id}/savedposts`)}>
        <BookTwoTone /> Bài viết đã lưu{' '}
      </Menu.Item>
      <Menu.Item
        key="4"
        onClick={() => history.push(`/${me?._id}/joinedGroup`)}
      >
        <HeartTwoTone /> Cộng đồng đã tham gia{' '}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5" onClick={logout}>
        <LogoutOutlined /> Đăng xuất
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout>
      <Header
        style={{
          boxShadow: '0 1px 8px #f0f1f2',
          backgroundColor: 'lightskyblue',
          position: 'fixed',
          width: '100%',
          zIndex: 10
        }}
      >
        <div
          style={{
            width: isBroken ? '100%' : '60%',
            display: 'flex',
            margin: '0 auto',
            justifyContent: 'space-between'
          }}
        >
          <div
            id="header-left"
            style={{
              width: isBroken ? '70%' : '62%',
              display: 'flex',
              justifyContent: 'flex-start'
            }}
          >
            <Logo
              isBroken={isBroken}
              size="medium"
              onClick={() => history.push('/')}
            />
            {
              !isBroken ? (
                <Input
                  className="search-flex"
                  style={{ height: 30, top: '1em', borderRadius: 40 }}
                  prefix={<SearchOutlined />}
                  placeholder="Tìm kiếm"
                ></Input>
              ) : (
                // <Tooltip title='search'>
                <Input
                  className="search-broken"
                  style={{ height: 30, top: '1em', borderRadius: 40 }}
                  prefix={<SearchOutlined />}
                  placeholder="Tìm kiếm"
                ></Input>
              )

              /* </Tooltip> */
            }
          </div>
          <div
            id="header-right"
            style={{
              width: isBroken ? '30%' : '38%',
              borderBottom: 'none',
              height: '64px',
              lineHeight: '60px',
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: 10
            }}
          >
            { isAuth && <Menu
              style={{
                backgroundColor: 'initial',
                width: isBroken ? 50 : 120
              }}
              overflowedIndicator={
                <UnorderedListOutlined style={{ fontSize: 23 }} />
              }
              mode="horizontal"
            >
              <Menu.Item onClick={() => history.push('/createpost')}>
                {isBroken ? (
                  <>
                    <FormOutlined style={{ color: 'rgb(0, 152, 218)' }} />
                    <span>Thêm bài viết</span>
                  </>
                ) : (
                  <Tooltip title="Thêm bài viết" placement="bottomRight">
                    <Button
                      className="btn-round"
                      shape="circle"
                      icon={
                        <FormOutlined style={{ color: 'rgb(0, 152, 218)' }} />
                      }
                      // onClick={() => history.push('/createpost')}
                    />
                  </Tooltip>
                )}
              </Menu.Item>
              <Menu.Item>
                <Noti history={history} isBroken={isBroken} />
              </Menu.Item>
            </Menu>}
            <div>
              {isAuth ? (
                isBroken ? (
                  <Dropdown overlay={menu} trigger={['click']}>
                    <a
                      className="ant-dropdown-link"
                      style={{ paddingLeft: 5 }}
                      onClick={e => e.preventDefault()}
                    >
                      <Avatar
                        style={{
                          top: '0.75em',
                          color: 'white',
                          backgroundColor: 'rgb(0, 152, 218)',
                          fontSize: '15px',
                          verticalAlign: 'sub'
                        }}
                        size={30}
                        src={me?.avatar}
                      >
                        {/* N */}
                      </Avatar>
                      <CaretDownOutlined />
                    </a>
                  </Dropdown>
                ) : (
                  <>
                    <Avatar
                      style={{
                        top: '0.5em',
                        color: 'white',
                        backgroundColor: 'rgb(0, 152, 218)',
                        fontSize: '14px',
                        verticalAlign: 'sub'
                      }}
                      size={30}
                      src={me?.avatar}
                    >
                      {/* N */}
                    </Avatar>
                    <Dropdown overlay={menu} trigger={['click']}>
                      <a
                        className="ant-dropdown-link"
                        style={{ paddingLeft: 5, fontWeight: 'bold' }}
                        onClick={e => e.preventDefault()}
                      >
                        {me?.firstname} <CaretDownOutlined />
                      </a>
                    </Dropdown>
                  </>
                )
              ) : (
                <Button type="primary" onClick={() => history.push('/login')}>
                  Đăng nhập
                </Button>
              )}
              {/* <Switch onChange={ () => myTheme?.toggleTheme()} /> */}
            </div>
            {/* </Col>
        </Row> */}
          </div>
        </div>
      </Header>

      <Layout
        className="home"
        style={{
          paddingTop: isBroken ? 65 : 100,
          width: '100%',
          paddingLeft: isBroken ? 0 : 100,
          margin: '0 auto',
          backgroundColor: 'aliceblue'
        }}
      >
        <Sider
          breakpoint="lg"
          collapsedWidth={0}
          width={isBroken ? 0 : '18%'}
          onBreakpoint={broken => setIsBroken(broken)}
          onCollapse={collapsed => {
            setVisible(!collapsed)
          }}
          trigger={null}
        >
          {/* { !isBroken && <div style={{ position: 'fixed' }}> */}
          {isBroken ? null : (
            <div className="highlight-group">
              <Typography.Title level={4}>CỘNG ĐỒNG NỔI BẬT</Typography.Title>
              <HighLightGroup></HighLightGroup>
            </div>
          )}
          {/* </div>} */}
        </Sider>
        <Content
          style={{
            // backgroundColor: 'aliceblue',
            padding: isBroken ? 0 : '0 24px',
            paddingRight: !isBroken && 76,
            marginTop: 0
            // width: '90%'
            // width: isAuth ? '90%' : '10%'
          }}
        >
          <brokenContext.Provider value={isBroken}>
            {children}
          </brokenContext.Provider>
        </Content>
        {!isBroken && isAuth ? (
          <Sider width="18%">
            <div className="sidebarMess-mainLayout">
              <ConversationList />
            </div>
          </Sider>
        ) : (
          !isBroken && <Sider width="17%"></Sider>
        )}
        {!isBroken && (
          <div className="messenger-main">
            <div className="contentMess-mainLayout">
              {messbox.map((mess, idx) => {
                return (
                  <div
                    key={idx}
                    className={`contentMess-box ${mess.idChat}`}
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <MessageList
                      // refetch={refetch}
                      idx={idx}
                      onCancelMessbox={() => onCancelMessbox(mess.idChat)}
                      chatBox={mess}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </Layout>
      <Modal visible={showLogin} title="Đăng nhập" footer={null} centered onCancel={closeLoginModal}>
        <Login></Login>
      </Modal>
    </Layout>
  )
}
export default index
