/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Avatar, Button } from 'antd'

import { withRouter } from 'react-router-dom'
import { ModalReport } from '@components'

import { Post } from './post'
// var moment = require('moment')
const data = [
  {
    title: 'Ant Design Title 1',
    groupId: '111',
    postId: 'post1'
  },
  {
    title: 'Ant Design Title 2',
    groupId: '222',
    postId: 'post2'
  },
  {
    title: 'Ant Design Title 3',
    groupId: '111',
    postId: 'post3'
  },
  {
    title: 'Ant Design Title 4',
    groupId: '222',
    postId: 'post4'
  }
]
function PageGroup(props) {
  // const [visibleModalCreate, setVisibleModalCreate] = useState(false)
  const [visibleModalReport, setVisibleModalReport] = useState(false)
  const handleOk = () => {
    // setVisibleModalCreate(false)
    setVisibleModalReport(false)
  }
  const handleCancel = () => {
    // setVisibleModalCreate(false)
    setVisibleModalReport(false)
  }
  return (
    <>
      <div style={{ height: 250, width: '100%', backgroundColor: 'rgba(255,255,255,0.9)' }}>
        <img
          className="cover-img"
          style={{ objectFit: 'cover', height: 250, width: '100%' }}
          alt="example"
          src="https://lh3.googleusercontent.com/proxy/65vMMvMedyDZ0SjedcJjXsXwbrLCH5dQGkDneXyN3T8_-yE1D7BHJhMtKe7fMzD3wm_GQ69LAs7SZkJmo2o7b9a1UYqg--eghQDlhX3quyuKat7emMaPDGKJ"
        />
      </div>
      <div style={{ display: 'flex', marginTop: -60, backgroundColor: 'rgba(255,255,255,0.6)' }}>
        <Avatar
          style={{ border: '2px solid black', marginLeft: 10 }}
          shape="circle"
          size={120}
          src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/s960x960/69272993_1239809152868423_6499525428661714944_o.jpg?_nc_cat=109&_nc_sid=85a577&_nc_ohc=tSCx-LjvabMAX953Agg&_nc_ht=scontent.fsgn2-4.fna&_nc_tp=7&oh=e7472be498c88e4fe4340d6e2118a970&oe=5F04C183"
        />
        <div style={{ marginLeft: 10 }}>
          <p style={{ fontWeight: 'bolder', fontSize: 20, color: '#fff', textShadow: '0px 2px 2px rgba(0, 0, 0, 0.8)' }}>
            Chăm sóc bé sinh non
          </p>
          <p
            style={{
              marginTop: -15,
              fontWeight: 'bolder',
              color: '#fff',
              fontSize: 12,
              textShadow: '0px 2px 2px rgba(0, 0, 0, 0.8)'
            }}
          >
            {' '}
            12k thành viên - 300 bài viết
          </p>
          <Button
            style={{ backgroundColor: 'rgb(0, 152, 218)', color: '#fff' }}
          >
            Tham gia
          </Button>
        </div>
      </div>
      <br />
      {data.map((item, idx) => {
        return <Post key={idx} item={item} idx={idx}></Post>
      })}

      <ModalReport
        visible={visibleModalReport}
        handleCancel={handleCancel}
        handleOk={handleOk}
      ></ModalReport>
    </>
  )
}

export default withRouter(PageGroup)
