/* eslint-disable react/prop-types */
import React from 'react'
import { Card, Skeleton } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import { GET_POST_BY_ID } from '@pages/postDetail'
import { ArrowRightOutlined } from '@ant-design/icons'
const { Meta } = Card

// const srcImg ='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'

function HighlightItem(props) {
  const { item, history } = props
  const { data, loading } = useQuery(GET_POST_BY_ID, {
    variables: { id: item },
    fetchPolicy: 'no-cache',
    skip: !item
  })
  return loading ? (
    <Skeleton active avatar />
  ) : (
    <Card
      onClick={() => history.push(`/postdetail/${item}`)}
      style={{ margin: '10px 0 0 10px' }}
      cover={
        <img
          style={{ height: '25vh', objectFit: 'cover' }}
          alt="example"
          src={
            data?.postById?.thumbnail ||
            data?.postById?.community?.avatar ||
            data?.postById?.createdBy?.avatar
          }
        />
      }
      actions={[
        <a
          onClick={() => history.push(`/postdetail/${item}`)}
          key="detail"
          style={{ color: '#1890ff' }}
        >
          Xem chi tiết <ArrowRightOutlined />
        </a>
      ]}
    >
      <Meta
        //   avatar={<Avatar size={64} shape='square' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />}
        title={data?.postById?.title}
      />
    </Card>
  )
}
export default HighlightItem
