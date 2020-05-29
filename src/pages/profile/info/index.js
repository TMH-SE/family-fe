/* eslint-disable react/prop-types */
import React from 'react'
import { Row, Col, Divider } from 'antd'

const DescriptionItem = ({ title, content }) => (
  <div className='site-description-item-profile-wrapper'>
    <p className='site-description-item-profile-p-label'>{title}:</p>
    {content}
  </div>
)
function Info (props) {
  const { userInfo } = props
  console.log(userInfo, 'userÌno')
  return (
    <>
      <p
        className='site-description-item-profile-p'
        style={{ marginBottom: 24 }}
      >
        User Profile
      </p>
      <p className='site-description-item-profile-p'>Personal</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title='Full Name' content={`${userInfo?.firstname} ${userInfo?.lastname}`} />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Account' content={userInfo?.email} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title='Birthday' content={userInfo?.birthday} />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Website' content='-' />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionItem
            title='Message'
            content='Make things as simple as possible but no simpler.'
          />
        </Col>
      </Row>
      <Divider />
      <p className='site-description-item-profile-p'>Contacts</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title='Email' content={userInfo?.email} />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Phone Number' content={userInfo?.phoneNumber} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionItem
            title='Github'
            content={
              <a href='http://github.com/ant-design/ant-design/'>
                github.com/ant-design/ant-design/
              </a>
            }
          />
        </Col>
      </Row>
    </>
  )
}

export default Info
