/* eslint-disable react/prop-types */
import React from 'react'
import { Card, Carousel } from 'antd'

import 'antd/dist/antd.css'
import './index.scss'
import { useHistory } from 'react-router-dom'

const { Meta } = Card

// const srcImg ='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
const data = [
  {
    title: 'Ant 1'
  },
  {
    title: 'Ant 2'
  },
  {
    title: 'Ant 3'
  },
  {
    title: 'Ant 4'
  },
  {
    title: 'Ant 5'
  },
  {
    title: 'Ant 6'
  }
]
function HighlightPost(props) {
  const { isBroken } = props
  const history = useHistory()
  return (
    // <div className='site-card-wrapper'>
    <Carousel
      slidesToShow={isBroken ? 2 : 4}
      autoplay
      // focusOnSelect
      // dots={false}
    >
      {data.map((item, idx) => {
        return (
          <div key={idx}>
            <Card
              onClick={() => history.push('/postdetail/11')}
              style={{ margin: '10px 0 0 10px' }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              // actions={[
              //   <SettingOutlined key='setting' />,
              //   <EditOutlined key='edit' />,
              //   <EllipsisOutlined key='ellipsis' />,
              // ]}
            >
              <Meta
                //   avatar={<Avatar size={64} shape='square' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />}
                title={item.title}
                description="This is the description"
              />
            </Card>
          </div>
        )
      })}
    </Carousel>
    // </div>
  )
}
export default HighlightPost
