/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
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
  Popover
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
import { Logo, HighLightGroup } from '../../components'
import './index.scss'
import MessageList from '../../pages/messageDetail/MessageList'
// import InputCustome from '../../components/inputCustome'
import ConversationList from '../../pages/myMessenger/ConversationList'
const { Header, Content, Sider } = Layout
// const { SubMenu } = Menu

export const brokenContext = React.createContext(null)
const MY_USER_ID = 'tuikyne'
const reactStringReplace = require('react-string-replace')
const index = ({ children }) => {
  // const myTheme = useContext(ThemeContext)
  // console.log(myTheme, 'dấdsadsad:')
  const [isBroken, setIsBroken] = useState(false)
  const [visible, setVisible] = useState(false)
  const [messbox, setMessbox] = useState([])
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    getNotification()
  }, [])
  const getNotification = () => {
    let temp
    firebase.database().ref('notifications/' + MY_USER_ID).on('value', (snapshot) => {
      // var mess = (snapshot.val() && snapshot.val().mess1) || 'Anonymous';
      temp = Object.keys(snapshot.val()).map(key => ({ ...snapshot.val()[key], id: key }))
      setNotifications(temp)
      console.log('notifications', temp)
    })
  }
  const chooseConvention = (convention) => {
    if (messbox.findIndex(mess => mess.idChat === convention.idChat) === -1) {
      const a = [...messbox]
      a.push(convention)
      setMessbox(a)
    }
    document.getElementById(`input-custom-${convention.idChat}`).focus()
  }
  const history = useHistory()
  const menu = (
    <Menu>
      <Menu.Item key='0'onClick={() => history.push('/tuinhune/info')}>
        <InfoCircleTwoTone /> Thông tin cá nhân{' '}
      </Menu.Item>
      { isBroken && <Menu.Item key='1' onClick={() => history.push('/tuinhune/messenger')}>
        <MessageTwoTone /> Tin nhắn{' '}
      </Menu.Item>}
      <Menu.Item key='2' onClick={() => history.push('/tuinhune/myposts')} >
        <FileTextTwoTone /> Bài viết của tôi{' '}
      </Menu.Item>
      <Menu.Item key='3' onClick={() => history.push('/tuinhune/savedposts')}>
        <BookTwoTone /> Bài viết đã lưu{' '}
      </Menu.Item>
      <Menu.Item key='4' onClick={() => history.push('/tuinhune/joinedGroup')}>
        <HeartTwoTone /> Cộng đồng đã tham gia{' '}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='5'>
        <LogoutOutlined /> Đăng xuất
      </Menu.Item>
    </Menu>
  )
  const onCancelMessbox = (idChat) => {
    const idx = messbox.findIndex(mess => mess.idChat === idChat)
    var arr = [...messbox]
    arr.splice(idx, 1)
    setMessbox([...arr])
  }

  return (
    <Layout >
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
            id='header-left'
            style={{
              width: isBroken ? '70%' : '62%',
              display: 'flex',
              justifyContent: 'flex-start'
            }}
          >
            <Logo isBroken={isBroken} size='medium' onClick={() => history.push('/')}/>
            {
              !isBroken ? (
                <Input
                  className='search-flex'
                  style={{ height: 30, top: '1em', borderRadius: 40 }}
                  prefix={<SearchOutlined />}
                  placeholder='Tìm kiếm'
                ></Input>
              ) : (
                // <Tooltip title='search'>
                <Input
                  className='search-broken'
                  style={{ height: 30, top: '1em', borderRadius: 40 }}
                  prefix={
                    <SearchOutlined/>
                  }
                  placeholder='Tìm kiếm'
                ></Input>
              )

              /* </Tooltip> */
            }
          </div>
          <div
            id='header-right'
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
            <Menu
              style={{
                backgroundColor: 'initial',
                width: isBroken ? 50 : 120
              }}
              overflowedIndicator={<UnorderedListOutlined />}
              mode='horizontal'
            >
              <Menu.Item onClick={() => history.push('/createpost')}>
                {isBroken ? (
                  <>
                    <FormOutlined style={{ color: 'rgb(0, 152, 218)' }} />
                    <span>Thêm bài viết</span>
                  </>
                ) : (
                  <Tooltip title='Thêm bài viết' placement='bottomRight'><Button
                    className='btn-round'
                    shape='circle'
                    icon={
                      <FormOutlined style={{ color: 'rgb(0, 152, 218)' }} />
                    }
                    // onClick={() => history.push('/createpost')}
                  />
                  </Tooltip>
                )}
              </Menu.Item>
              <Menu.Item>
                {isBroken ? (
                  <>
                    <BellOutlined />
                    <span>Thông báo</span>
                  </>
                ) : (
                  <Tooltip title='Thông báo' placement='bottomRight'>
                    <Popover className='noti-popover' content={notifications.map((noti, idx) =>
                      <div className='noti-item' style={{ backgroundColor: noti.seen ? 'initial' : 'rgba(214, 234, 248, 0.5)' }}
                        key={idx} onClick={() => {
                          firebase.database().ref('notifications/' + MY_USER_ID + '/' + noti.id).update({
                            seen: true
                          })
                          history.push(noti.link)
                        }}>
                        <p style={{ display: 'inline' }}>
                          {reactStringReplace(noti.content.trim(), /@(\w+)/g, (match, i) =>
                            <a style={{ display: 'contents' }} key={match + i} onClick={() => history.push(`/${match}/info`)}>{match}</a>)}
                        </p>
                      </div>)} title="Thông Báo" trigger="click">
                      <Button
                        className='btn-round'
                        shape='circle'
                        icon={<Badge size={1} overflowCount={9} count={notifications.filter(item => item.seen === false).length}><BellOutlined /></Badge>}
                      />
                    </Popover>
                  </Tooltip>
                )}
              </Menu.Item>
            </Menu>
            <div >
              {isBroken ? (
                <Dropdown overlay={menu} trigger={['click']}>
                  <a
                    className='ant-dropdown-link'
                    style={{ paddingLeft: 5 }}
                    onClick={(e) => e.preventDefault()}
                  >
                    <Avatar
                      style={{
                        top: '0.5em',
                        color: 'white',
                        backgroundColor: 'rgb(0, 152, 218)',
                        fontSize: '14px',
                        verticalAlign: 'sub'
                      }}
                      size={30}
                    >
                      N
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
                  >
                    N
                  </Avatar>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <a
                      className='ant-dropdown-link'
                      style={{ paddingLeft: 5 }}
                      onClick={(e) => e.preventDefault()}
                    >
                      Tuinhune <CaretDownOutlined />
                    </a>
                  </Dropdown>
                </>
              )}
              {/* <Switch onChange={ () => myTheme.toggleTheme()} /> */}
            </div>
            {/* </Col>
        </Row> */}
          </div>
        </div>
      </Header>

      <Layout
        style={{
          paddingTop: isBroken ? 65 : 100,
          width: '100%',
          paddingLeft: isBroken ? 0 : 100,
          margin: '0 auto'
          // backgroundColor: 'aliceblue'
        }}
      >
        <Sider
          breakpoint='lg'
          collapsedWidth={0}
          width={isBroken ? 0 : '18%'}
          onBreakpoint={(broken) => setIsBroken(broken)}
          onCollapse={(collapsed) => {
            setVisible(!collapsed)
          }}
          trigger={null}
        >
          {/* { !isBroken && <div style={{ position: 'fixed' }}> */}
          {isBroken ? null : <div className='highlight-group'><Typography.Title level={4}>CỘNG ĐỒNG NỔI BẬT</Typography.Title>
            <HighLightGroup></HighLightGroup></div>}
          {/* </div>} */}
        </Sider>
        <Content
          style={{
            // backgroundColor: 'aliceblue',
            padding: isBroken ? 0 : '0 24px',
            paddingRight: !isBroken && 76,
            marginTop: 0,
            width: '90%'
          }}
        >
          <brokenContext.Provider value={isBroken}>
            {children}
          </brokenContext.Provider>
        </Content>
        { !isBroken && <Sider width='18%' >
          <div className='sidebarMess-mainLayout'>
            <ConversationList chooseConvention={chooseConvention}/>
          </div>
        </Sider> }
        { !isBroken && <div className='messenger-main'>
          <div className='contentMess-mainLayout' >
            {messbox.map((convention, idx) => {
              return (
                <div key={idx}
                  className={`contentMess-box ${convention.idChat}`}
                  style={{ display: 'flex', flexDirection: 'column' }}>
                  <MessageList idx={idx} onCancelMessbox={() => onCancelMessbox(convention.idChat)} convention={convention} />
                </div>)
            }
            )}
            {/* <div className='contentMess-box' style={{ display: 'flex', flexDirection: 'column' }}>
              <MessageList />
            </div> */}
          </div>
        </div>}
        {/* {isBroken && (
          <Drawer
            drawerStyle={{ transition: 'all 0.2s' }}
            width='80%'
            placement='left'
            closable={false}
            bodyStyle={{ padding: 0 }}
            visible={visible}
            getContainer={false}
          >
            <HighLightGroup></HighLightGroup>
          </Drawer>
        )} */}
      </Layout>
    </Layout>
  )
}
export default index
