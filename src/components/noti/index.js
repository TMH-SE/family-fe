import React, { useState, useEffect, useContext } from 'react'
// import { brokenContext } from '../../layouts/MainLayout'
import { IContext } from '@tools'
import firebase from 'firebase/app'
import { BellOutlined, HeartTwoTone } from '@ant-design/icons'
import { Tooltip, Popover, Badge, Button, List, Avatar } from 'antd'
import './index.scss'
import NotiList from './notiList'

const Noti = props => {
  // const isBroken = useContext(brokenContext)
  const [notifications, setNotifications] = useState([])
  const [visible, setVisible] = useState(false)
  const { me } = useContext(IContext)
  const { history } = props
  useEffect(() => {
    getNotification()
  }, [me])
  const getNotification = () => {
    let temp
    firebase
      .database()
      .ref('notifications/' + me?._id)
      .orderByKey()
      .on('value', snapshot => {
        temp = snapshot.val()
          ? Object.keys(snapshot.val()).map(key => ({
              ...snapshot.val()[key],
              id: key
            }))
          : []

        setNotifications(temp.reverse())
      })
  }

  return (
    !props.isBroken && (
      //   <Button
      //     onClick={() => history.push('/notify')}
      //     className="btn-round"
      //     shape="circle"
      //     icon={
      //       <Badge
      //         size={1}
      //         overflowCount={9}
      //         count={notifications.filter(item => item.seen === false)?.length}
      //       >
      //         <BellOutlined />
      //       </Badge>
      //     }
      //   />
      // ) : (
      <Popover
      destroyTooltipOnHide
      popupVisible
      onVisibleChange={() => setVisible(!visible)}
        placement="bottomLeft"
        id="noti-popover"
        overlayStyle={{ position: 'fixed' }}
        content={
          notifications?.length === 0 ? (
            <p>Chưa có thông báo nào</p>
          ) : (
            <List
              className="demo-loadmore-list"
              // loading={initLoading}
              itemLayout="horizontal"
              dataSource={notifications}
              renderItem={noti => (
                <NotiList
                  setVisible={setVisible}
                  noti={noti}
                  history={history}
                ></NotiList>
              )}
            />
          )
        }
        visible={visible}
        title="Thông Báo"
        trigger="click"
      >
        <Tooltip title="Thông báo" placement="bottomRight">
          <Button
            onClick={() => setVisible(!visible)}
            className="btn-round"
            shape="circle"
            icon={
              <Badge
                size={1}
                overflowCount={9}
                count={
                  notifications.filter(item => item.seen === false)?.length
                }
              >
                <BellOutlined />
              </Badge>
            }
          />
        </Tooltip>
      </Popover>
    )
  )
}
export default Noti
