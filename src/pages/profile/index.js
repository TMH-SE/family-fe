/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Avatar, Menu, Button } from 'antd'

import { withRouter } from 'react-router-dom'
import { EllipsisOutlined } from '@ant-design/icons'
import { brokenContext } from '../../layouts/MainLayout'
import SavedPosts from './savedPosts'
import Info from './info'
import MyPosts from './myPosts'
import { HighLightGroup } from '../../components'
function Profile (props) {
  //   const [visibleModalCreate, setVisibleModalCreate] = useState(false)
  //   const [visibleModalReport, setVisibleModalReport] = useState(false)
  //   const nameEl = showText ? 'expand' : 'collapse'
  const { history } = props
  const { type } = props.match.params
  //   const [keyMenu, setKeyMenu] = useState(type)
  console.log('type', type)
  const isBroken = useContext(brokenContext)
  return (
    <>
      <div>
        <img
          className='cover-img'
          style={{ objectFit: 'cover', height: 250, width: '100%' }}
          alt='example'
          src='https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/92522573_1498212850342148_3908204202505011200_n.jpg?_nc_cat=100&_nc_sid=85a577&_nc_ohc=Hs7CLNZhiVYAX8UfzYa&_nc_ht=scontent.fsgn2-2.fna&oh=bd39d3ac8da082083ba12c10e4b8870a&oe=5EDC49A8'
        />
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          marginTop: -90,
          backgroundColor: '#fff'
        }}
      >
        <Avatar
          style={{ border: '2px solid black', marginLeft: 10 }}
          shape='circle'
          size={120}
          src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/42509129_1029389683910372_8485576172426493952_n.jpg?_nc_cat=106&_nc_sid=dd9801&_nc_ohc=3By-MUAxPSkAX-vnCzn&_nc_ht=scontent.fsgn2-3.fna&oh=de4871077a93092c361bb222770ed707&oe=5EDD69A3'
        />
        <div style={{ marginLeft: 10, width: '70%' }}>
          <p
            style={{
              marginTop: 20,
              marginBottom: 0,
              fontWeight: 'bolder',
              fontSize: 20,
              color: '#fff'
            }}
          >
            Tuinhune
          </p>
          <Button type='primary'>Nhắn tin</Button>
          <div style={{ width: '100%' }}>
            <Menu
              selectedKeys={[type]}
              //   onSelect={(e) => {
              //     // setKeyMenu(e.key)
              //     // console.log(keyMenu)
              //   }
              //   }
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: 550,
                width: isBroken ? '60vw' : '35vw',
                backgroundColor: 'initial'
              }}
              overflowedIndicator={<EllipsisOutlined color='black'/>}
              mode='horizontal'
            >
              <Menu.Item onClick={() => history.push('/tuinhune/info')} key='info'>Thông tin</Menu.Item>
              <Menu.Item onClick={() => history.push('/tuinhune/messages')} key='mail'>Tin nhắn</Menu.Item>
              <Menu.Item onClick={() => history.push('/tuinhune/savedposts')} key='savedposts'>Bài viết đã lưu</Menu.Item>
              <Menu.Item onClick={() => history.push('/tuinhune/myposts')} key='myposts'>Bài viết của tôi</Menu.Item>
              <Menu.Item onClick={() => history.push('/tuinhune/joinedGroup')} key='joinedGroup'>Cộng đồng đã tham gia</Menu.Item>
            </Menu>
          </div>
        </div>
      </div>
      <br />
      <div style={{ backgroundColor: '#fff', padding: 16 }}>
        {type === 'info' && <Info /> }
        {type === 'myposts' && <MyPosts history={history}/> }
        {type === 'savedposts' && <SavedPosts history={history} />}
        {type === 'joinedGroup' && <HighLightGroup /> }
      </div>
    </>
  )
}

export default withRouter(Profile)
