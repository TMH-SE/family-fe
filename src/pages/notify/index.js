import React, { useEffect, useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app'
import { IContext } from '@tools'
const Notify = props => {
  const [notifications, setNotifications] = useState([])
  // const [visible, setVisible] = useState(false)
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
        temp = snapshot.val()
          ? Object.keys(snapshot.val()).map(key => ({
              ...snapshot.val()[key],
              id: key
            }))
          : []

        setNotifications(temp)
      })
  }
  return notifications?.length === 0 ? (
    <p>Chưa có thông báo nào</p>
  ) : (
    notifications.map((noti, idx) => (
      <div
        className="noti-item"
        style={{
          backgroundColor: noti.seen ? 'initial' : 'rgba(214, 234, 248, 0.8)'
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
    ))
  )
}
export default withRouter(Notify)
