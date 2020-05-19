/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  Layout,
  Menu,
  Input,
  Avatar,
  Dropdown,
  Typography,
  Button,
  Tooltip,
  Badge
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

import { Logo, HighLightGroup } from '../../components'
import './index.scss'
import MessageList from '../../pages/messageDetail/MessageList'
// import InputCustome from '../../components/inputCustome'
import ConversationList from '../../pages/myMessenger/ConversationList'
const { Header, Content, Sider } = Layout
// const { SubMenu } = Menu

export const brokenContext = React.createContext(null)

const index = ({ children }) => {
  // const myTheme = useContext(ThemeContext)
  // console.log(myTheme, 'dấdsadsad:')
  const [isBroken, setIsBroken] = useState(false)
  const [visible, setVisible] = useState(false)

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
            width: isBroken ? '100%' : '65%',
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
                    <SearchOutlined
                    //   onClick={() => {
                    //   if(document.getElementsByClassName('ant-input-affix-wrapper-focused')){
                    //     console.log(document.getElementsByClassName('ant-menu')[0].style, 'fwè')
                    //   // style={{backgroundColor: 'lightskyblue'}}
                    //   // document.getElementsByClassName('ant-menu')[0].setAttribute('style','width:30%  background-color: lightskyblue margin-top: 0.75em')
                    //     document.getElementById('header-left').setAttribute('style','width:65% display: flex')
                    //     // document.getElementById('header-right').setAttribute('style','width:35% display: flex justify-content: space-evenly')
                    // }

                    // }}
                    />
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
                    <Button
                      className='btn-round'
                      shape='circle'
                      icon={<Badge size={1} overflowCount={9} count={5}><BellOutlined /></Badge>}
                    />
                  </Tooltip>
                )}
              </Menu.Item>
              {/* <Menu.Item> */}
              {/* { isBroken ?
                <Dropdown overlay={menu} trigger={['click']}>
                <a className='ant-dropdown-link' style={{ paddingLeft: 5 }}  onClick={e => e.preventDefault()}>
                <Avatar style={{ color: 'white', backgroundColor: 'rgb(0, 152, 218)', fontSize: '14px', verticalAlign: 'sub'}} size={25}>N</Avatar><CaretDownOutlined />
                </a>
              </Dropdown>
                :
                <><Avatar style={{ color: 'white', backgroundColor: 'rgb(0, 152, 218)', fontSize: '14px', verticalAlign: 'sub'}} size={25}>N</Avatar>
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className='ant-dropdown-link' style={{ paddingLeft: 5 }}  onClick={e => e.preventDefault()}>
                    Tuinhune <CaretDownOutlined />
                  </a>
                </Dropdown></>
} */}
              {/* </Menu.Item> */}
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
        {/* {isBroken &&
            <Input className='search-line'
              style={{ width: '70%', marginLeft: '14%', height: 30,  borderRadius: 40 }}
              prefix={<SearchOutlined /> } placeholder='Tìm kiếm'>
            </Input>} */}
      </Header>

      <Layout
        style={{
          paddingTop: 100,
          width: isBroken ? '100%' : '100%',
          paddingLeft: 100,
          margin: '0 auto'
          // backgroundColor: 'aliceblue'
        }}
      >
        {/* {isBroken ? (
          <div
            id='btn-trigger'
            style={{
              left: visible ? '80%' : 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              // position: 'absolute',
              top: 70,
              height: 40,
              width: 40,
              padding: 5,
              background: 'initial',
              color: '#000',
              boxShadow: '2px 0 8px rgba(0,0,0,.2)',
              borderRadius: '0 4px 4px 0',
              zIndex: 1001,
              transition: 'all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1)',
              cursor: 'pointer',
              position: 'fixed'
            }}
            onClick={() => setVisible(!visible)}
          >
            {visible ? <CloseOutlined /> : <MenuOutlined />}
          </div>
        ) : null} */}
        <Sider
          // style={{ backgroundColor: myTheme.isDark ? '#51565A' : 'aliceblue' }}
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
          {isBroken ? null : <><Typography.Title level={4}>CỘNG ĐỒNG NỔI BẬT</Typography.Title>
             : <HighLightGroup></HighLightGroup></>}
          {/* </div>} */}
        </Sider>
        <Content
          style={{
            padding: isBroken ? '0 5px' : '0 24px',
            paddingRight: 76,
            marginTop: 0,
            width: '90%'
          }}
        >
          <brokenContext.Provider value={isBroken}>
            {children}
          </brokenContext.Provider>
        </Content>
        <Sider width='18%' >
          <div className='sidebarMess-mainLayout'>
            <ConversationList />
          </div>
        </Sider>
        { !isBroken && <div className='messenger-main'>
          <div className='contentMess-mainLayout'>
            <div className='contentMess-box' style={{ display: 'flex', flexDirection: 'column' }}>
              <MessageList />
              {/* <InputCustome></InputCustome> */}
            </div>
            <div className='contentMess-box' style={{ display: 'flex', flexDirection: 'column' }}>
              <MessageList />
              {/* <InputCustome></InputCustome> */}
            </div>
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
