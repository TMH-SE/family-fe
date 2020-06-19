/* eslint-disable no-prototype-builtins */
import React, { useEffect, useContext, useState } from 'react'
import { Button, Tooltip } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import firebase from 'firebase/app'
import { configRTCPeerConnection } from '@constants'
import Video from '../video'
import { IContext } from '@tools'

const JoinSenimar = () => {
  const { me, history } = useContext(IContext)
  const [remoteStream, setRemoteStream] = useState(null)
  const idSeminar = '1'
  const idUser = me?._id
  console.log(me)

  useEffect(() => {
    console.log(1)
    const pc = new RTCPeerConnection(configRTCPeerConnection)

    pc.ontrack = e => {
      setRemoteStream(e.streams[0])
      console.log('pc2 received remote stream')
    }

    firebase
      .database()
      .ref(`seminars/${idSeminar}/participants/${idUser}/candidate`)
      .on('value', snap => {
        const candidate = JSON.parse(snap.val())
        if (candidate) {
          pc.addIceCandidate(new RTCIceCandidate(candidate))
        }
      })

    firebase
      .database()
      .ref(`seminars/${idSeminar}/isStart`)
      .on('value', snapshot => {
        console.log(snapshot.val())
        if (!snapshot.val()) {
          firebase.database().ref(`seminars/${idSeminar}/isStart`).off()
          firebase
            .database()
            .ref(`seminars/${idSeminar}/participants/${idUser}`)
            .remove()
          pc.close()
          history.push('/waitroom')
        } else {
          console.log(123456)
          console.log(idUser)
          if (idUser) {
            pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true
            })
              .then(sdp => {
                console.log('index -> sdp', sdp)
                pc.setLocalDescription(sdp)
                firebase
                  .database()
                  .ref(`seminars/${idSeminar}/participants/${idUser}`)
                  .set({
                    _id: me?._id,
                    fullName: `${me?.firstname} ${me?.lastname}`,
                    offer: JSON.stringify(sdp)
                  })
              })
              .catch(err => console.log(err))
            firebase
              .database()
              .ref(`seminars/${idSeminar}/participants/${idUser}/answer`)
              .on('value', snapshot => {
                const answerSdp = JSON.parse(snapshot.val())
                console.log('index -> answerSdp', answerSdp)
                if (answerSdp) {
                  pc.setRemoteDescription(new RTCSessionDescription(answerSdp))
                }
              })
          }
        }
      })
    firebase
      .database()
      .ref(`seminars/${idSeminar}/participants/${idUser}`)
      .onDisconnect()
      .remove()
  }, [])

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Video videoStream={remoteStream} />
      <Tooltip title="Thoát">
        <Button
          style={{ position: 'absolute', top: 0, right: 10 }}
          icon={<LogoutOutlined />}
          shape="circle"
          ghost
        />
      </Tooltip>
    </div>
  )
}

export default JoinSenimar
