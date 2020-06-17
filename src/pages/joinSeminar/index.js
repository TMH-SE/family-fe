import React, { useRef, useEffect, useContext } from 'react'
import firebase from 'firebase/app'
import { configRTCPeerConnection } from '@constants'
import { IContext } from '@tools'

function index() {
  const { me, history } = useContext(IContext)
  const remoteVideo = useRef()
  const idSeminar = '1'
  const idUser = me?._id

  useEffect(() => {
    const pc = new RTCPeerConnection(configRTCPeerConnection)

    pc.ontrack = e => {
      console.log(e.streams[0].getVideoTracks()[0], remoteVideo.current)
      remoteVideo.current.srcObject = new MediaStream(e.streams[0])
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
          firebase.database().ref(`seminars/${idSeminar}/participants/${idUser}`).remove()
          pc.close()
          history.push('/waitroom')
        } else {
          console.log(123456)
          if (idUser) {
            pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true
            }).then(sdp => {
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
    <div style={{ padding: 50 }}>
      <video
        ref={remoteVideo}
        autoPlay
        playsInline
        style={{ width: 360, height: 240, background: '#000' }}
      />
    </div>
  )
}

export default index
