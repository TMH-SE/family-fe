import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { brokenContext } from '../../layouts/MainLayout'
import { IContext } from '@tools'
import firebase from 'firebase/app'
import { BellOutlined } from '@ant-design/icons'
import { Tooltip, Popover, Badge, Button } from 'antd'
import './index.scss'

const Noti = (props) => {
  const isBroken = useContext(brokenContext)
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
      .on('value', snapshot => {
        temp = Object.keys(snapshot.val()).map(key => ({
          ...snapshot.val()[key],
          id: key
        }))

        setNotifications(temp)
      })
  }

  return isBroken ? (
    <>
      <BellOutlined />
      <span>Thông báo</span>
    </>
  ) : (
    <Tooltip title="Thông báo" placement="bottomRight">
      <Popover
        placement="bottomLeft"
        className="noti-popover"
        visible={visible}
        content={notifications.map((noti, idx) => (
          <div
            className="noti-item"
            style={{
              backgroundColor: noti.seen
                ? 'initial'
                : 'rgba(214, 234, 248, 0.8)'
            }}
            key={idx}
            onClick={() => {
              firebase
                .database()
                .ref('notifications/' + me?._id + '/' + noti.id)
                .update({
                  seen: true
                })
              history.push(noti.link)
              setVisible(false)
            }}
          >
            <p style={{ display: 'inline' }}>{noti.content.trim()}</p>
          </div>
        ))}
        title="Thông Báo"
        trigger="click"
      >
        <Button
         onClick={() => setVisible(!visible)}
          className="btn-round"
          shape="circle"
          icon={
            <Badge
              size={1}
              overflowCount={9}
              count={notifications.filter(item => item.seen === false).length}
            >
              <BellOutlined />
            </Badge>
          }
        />
      </Popover>
    </Tooltip>
  )
}
export default Noti
