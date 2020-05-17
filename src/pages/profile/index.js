/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react'
import { Avatar, Menu, Button, Upload, Input } from 'antd'
import { withRouter } from 'react-router-dom'
import { EllipsisOutlined, EditTwoTone, HeartTwoTone, MessageTwoTone } from '@ant-design/icons'
import { brokenContext } from '../../layouts/MainLayout'
import SavedPosts from './savedPosts'
import Info from './info'
import MyPosts from './myPosts'
import { HighLightGroup } from '../../components'
import MyMessenger from '../myMessenger'

function Profile (props) {
  const [editBio, setditBio] = useState({
    isEdit: false,
    valueTemp: 'tui nhu day ne mn',
    valueBio: 'tui nhu day ne mn'
  })

  const { history } = props
  const { type } = props.match.params
  //   const [keyMenu, setKeyMenu] = useState(type)
  console.log('type', type)
  const isBroken = useContext(brokenContext)
  return (
    <>
      { type !== 'messenger' && <><div >
        <img
          className='cover-img'
          style={{ objectFit: 'cover', height: 250, width: '100%' }}
          alt='example'
          src='https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/92522573_1498212850342148_3908204202505011200_n.jpg?_nc_cat=100&_nc_sid=85a577&_nc_ohc=Hs7CLNZhiVYAX8UfzYa&_nc_ht=scontent.fsgn2-2.fna&oh=bd39d3ac8da082083ba12c10e4b8870a&oe=5EDC49A8'
        />
      </div>
      <div
        style={{
          backgroundColor: '#fff',
          width: '100%',
          display: 'flex',
          marginTop: -95,
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', width: '100%' }}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            // beforeUpload={beforeUpload}
            // onChange={this.handleChange}
          >
            <Avatar
              style={{ border: '2px solid black', objectFit: 'cover' }}
              shape='circle'
              size={130}
              src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/42509129_1029389683910372_8485576172426493952_n.jpg?_nc_cat=106&_nc_sid=dd9801&_nc_ohc=3By-MUAxPSkAX-vnCzn&_nc_ht=scontent.fsgn2-3.fna&oh=de4871077a93092c361bb222770ed707&oe=5EDD69A3'
            />
          </Upload>
          <div style={{ marginTop: 100, marginBottom: 0, width: '90%' }}>
            <div style={{ display: 'flex', justifyContent: isBroken ? 'flex-start' : 'space-between' }}>
              <p
                style={{
                  fontWeight: 'bolder',
                  fontSize: 20,
                  color: 'black'
                }}
              >
                    Tuinhune
              </p>
              <div>
                { !isBroken ? (<>
                  <Button type='ghost' icon={<HeartTwoTone />}>Theo dõi</Button>
                  <Button type='ghost' icon={<MessageTwoTone />}>Nhắn tin</Button>
                </>)
                  : (<div style={{ marginTop: 5 }}>
                    <HeartTwoTone style={{ marginLeft: 10 }} />
                    <MessageTwoTone style={{ marginLeft: 10 }}/>
                  </div>)}
              </div>
            </div>
            <Menu
              selectedKeys={[type]}
              //   onSelect={(e) => {
              //     // setKeyMenu(e.key)
              //     // console.log(keyMenu)
              //   }
              //   }
              style={{
                marginTop: -30,
                // color: 'black',
                fontSize: 15,
                fontWeight: 550,
                width: isBroken ? '60vw' : '35vw',
                backgroundColor: 'initial'
              }}
              overflowedIndicator={<EllipsisOutlined color='black'/>}
              mode='horizontal'
            >
              <Menu.Item onClick={() => history.push('/tuinhune/info')} key='info'>Thông tin</Menu.Item>
              <Menu.Item onClick={() => history.push('/tuinhune/messenger')} key='mail'>Tin nhắn</Menu.Item>
              <Menu.Item onClick={() => history.push('/tuinhune/savedposts')} key='savedposts'>Bài viết đã lưu</Menu.Item>
              <Menu.Item onClick={() => history.push('/tuinhune/myposts')} key='myposts'>Bài viết của tôi</Menu.Item>
              <Menu.Item onClick={() => history.push('/tuinhune/joinedGroup')} key='joinedGroup'>Cộng đồng đã tham gia</Menu.Item>
            </Menu>
          </div>
        </div>
      </div>
      <br></br>
      <div style={{ backgroundColor: '#fff', padding: 16 }} >
        <center>
          { editBio.isEdit
            ? <Input value={editBio.valueTemp}
              onChange={(e) => setditBio({ ...editBio, valueTemp: e.target.value })} >
            </Input>
            : <p>{editBio.valueBio}</p>}
          { editBio.isEdit
            ? <Button type='primary' onClick={() => {
              setditBio({ ...editBio, valueBio: editBio.valueTemp, isEdit: false })
            }
            } >Lưu</Button>
            : <EditTwoTone onClick={() => setditBio({ ...editBio, isEdit: true })} />}
        </center>
      </div>
      <br /> </>}
      <div style={{ backgroundColor: '#fff', padding: 16 }}>
        {type === 'info' && <Info /> }
        {type === 'messenger' && <MyMessenger />}
        {type === 'myposts' && <MyPosts history={history}/> }
        {type === 'savedposts' && <SavedPosts history={history} />}
        {type === 'joinedGroup' && <HighLightGroup /> }
      </div>
    </>
  )
}

export default withRouter(Profile)
