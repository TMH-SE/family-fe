/* eslint-disable no-prototype-builtins */
import React, { useEffect, useContext, useState, useRef } from 'react'
import { Button, Tooltip } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import firebase from 'firebase/app'
import { configRTCPeerConnection } from '@constants'
import Video from '../video'
import { IContext } from '@tools'

const JoinSenimar = ({ idSeminar }) => {
  const { me, history } = useContext(IContext)
  const [remoteStream, setRemoteStream] = useState(null)
  const idUser = me?._id
  const videoRef = useRef()

  useEffect(() => {
    const pc = new RTCPeerConnection(configRTCPeerConnection)

    pc.ontrack = e => {
      setRemoteStream(e.streams[0])
    }

    pc.onicecandidate = e => {
      if (e.candidate) {
        firebase
          .database()
          .ref(`seminars/${idSeminar}/participants/${idUser}/joinCandidate`)
          .push(JSON.stringify(e.candidate))
      }
    }

    firebase
      .database()
      .ref(`seminars/${idSeminar}/participants/${idUser}/candidate`)
      .on('child_added', snap => {
        const candidate = JSON.parse(snap.val())
        if (candidate) {
          pc.addIceCandidate(new RTCIceCandidate(candidate))
        }
      })

    firebase
      .database()
      .ref(`seminars/${idSeminar}/isStart`)
      .on('value', snapshot => {
        if (!snapshot.val()) {
          firebase.database().ref(`seminars/${idSeminar}/isStart`).off()
          firebase
            .database()
            .ref(`seminars/${idSeminar}/participants/${idUser}`)
            .remove()
          pc.close()
          history.push('/ket-thuc')
        } else {
          if (idUser) {
            pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true
            })
              .then(sdp => {
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
      <Video ref={videoRef} videoStream={remoteStream} />
      <Tooltip title="Thoát">
        <Button
          onClick={() => window.close()}
          style={{ position: 'absolute', top: '5%', right: '5%' }}
          icon={<LogoutOutlined />}
          shape="circle-outline"
          ghost
        />
      </Tooltip>
    </div>
  )
}

export default JoinSenimar
