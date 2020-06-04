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
      <div>
        <img
          className="cover-img"
          style={{ objectFit: 'cover', height: 250, width: '100%' }}
          alt="example"
          src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/92522573_1498212850342148_3908204202505011200_n.jpg?_nc_cat=100&_nc_sid=85a577&_nc_ohc=Hs7CLNZhiVYAX8UfzYa&_nc_ht=scontent.fsgn2-2.fna&oh=bd39d3ac8da082083ba12c10e4b8870a&oe=5EDC49A8"
        />
      </div>
      <div style={{ display: 'flex', marginTop: -60, backgroundColor: '#fff' }}>
        <Avatar
          style={{ border: '2px solid black', marginLeft: 10 }}
          shape="circle"
          size={120}
          src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/42509129_1029389683910372_8485576172426493952_n.jpg?_nc_cat=106&_nc_sid=dd9801&_nc_ohc=3By-MUAxPSkAX-vnCzn&_nc_ht=scontent.fsgn2-3.fna&oh=de4871077a93092c361bb222770ed707&oe=5EDD69A3"
        />
        <div style={{ marginLeft: 10 }}>
          <p style={{ fontWeight: 'bolder', fontSize: 20, color: '#fff' }}>
            Chăm sóc bé sinh non
          </p>
          <p
            style={{
              marginTop: -15,
              fontWeight: 'bolder',
              color: '#fff',
              fontSize: 12
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
        // const sumCmt = getSumComment(item.postId)
        return <Post key={idx} item={item} idx={idx}></Post>
      })}

      <ModalReport
        visible={visibleModalReport}
        handleCancel={handleCancel}
        handleOk={handleOk}
      ></ModalReport>
      {/* <ModalCreatePost
        handleCancel={handleCancel}
        handleOk={handleOk}
        visible={visibleModalCreate}
      ></ModalCreatePost> */}
    </>
  )
}

export default withRouter(PageGroup)
