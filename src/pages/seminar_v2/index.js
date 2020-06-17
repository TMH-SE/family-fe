import React, { useRef, useState, useEffect } from 'react'
import {
  Row,
  Col,
  Carousel,
  Button,
  Space,
  Tooltip,
  message,
  Comment,
  Avatar
} from 'antd'
import {
  LeftOutlined,
  RightOutlined,
  AudioOutlined,
  ShareAltOutlined,
  CameraOutlined,
  AudioMutedOutlined,
  StopOutlined
} from '@ant-design/icons'
import firebase from 'firebase/app'
import { configRTCPeerConnection } from '@constants'
import Video from './video'
import { InputCustomize } from '@components'

function index() {
  const listUser = useRef()
  const [participants, setParticipants] = useState({})
  const [localStream, setLocalStream] = useState(null)
  const [currentStream, setCurrentStream] = useState(null)
  const [videoTrack, setVideoTrack] = useState(null)
  const [audioEnable, setAudioEnable] = useState(true)
  const [videoEnable, setVideoEnable] = useState(true)
  const idSeminar = '1'
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        // videoTrack = pc.addTrack(stream.getVideoTracks()[0], stream)
        // pc.addTrack(stream.getAudioTracks()[0], stream)
        setLocalStream(stream)
        setCurrentStream(stream)
        firebase.database().ref(`seminars/${idSeminar}/isStart`).set(true)
        firebase
          .database()
          .ref(`seminars/${idSeminar}/participants`)
          .on('child_added', snapshot => {
            const { _id, fullName, offer } = snapshot.val()
            // eslint-disable-next-line no-prototype-builtins
            if (snapshot.val() && !participants.hasOwnProperty(_id)) {
              const pc = new RTCPeerConnection(configRTCPeerConnection)
              setParticipants({ ...participants, [_id]: pc })
              pc.onicecandidate = e => {
                if (e.candidate) {
                  firebase
                    .database()
                    .ref(`seminars/${idSeminar}/participants/${_id}/candidate`)
                    .set(JSON.stringify(e.candidate))
                }
              }
              // firebase
              //   .database()
              //   .ref(`seminars/${idSeminar}/participants/${_id}/candidate`)
              //   .on('value', snap => {
              //     const candidate = JSON.parse(snap.val())
              //     if (candidate) {
              //       pc.addIceCandidate(new RTCIceCandidate(candidate))
              //     }
              //   })
              if (stream) {
                setVideoTrack(pc.addTrack(stream.getVideoTracks()[0], stream))
                pc.addTrack(stream.getAudioTracks()[0], stream)
              }
              console.log('index -> offer', offer)
              pc.setRemoteDescription(
                new RTCSessionDescription(JSON.parse(offer))
              ).then(() => {
                pc.createAnswer({
                  offerToReceiveAudio: true,
                  offerToReceiveVideo: true
                }).then(answerSdp => {
                  console.log('index -> answerSdp', answerSdp)
                  pc.setLocalDescription(answerSdp)
                  firebase
                    .database()
                    .ref(`seminars/${idSeminar}/participants/${_id}/answer`)
                    .set(JSON.stringify(answerSdp))
                })
                message.info(`${fullName} tham dự hội thảo`)
              })
            }
          })
      })
      .catch(err => console.log(err))

    firebase.database().ref(`seminars/${idSeminar}/isStart`).set(false)
  }, [])
  useEffect(() => {}, [localStream])

  const count =
    Object.keys(participants).length * 4 > 20
      ? 20
      : Object.keys(participants).length * 4

  const handleShareScreen = async () => {
    let streamDisplay
    if (navigator.getDisplayMedia) {
      streamDisplay = await navigator.getDisplayMedia({ video: true })
    } else if (navigator.mediaDevices.getDisplayMedia) {
      streamDisplay = await navigator.mediaDevices.getDisplayMedia({
        video: true
      })
    } else {
      streamDisplay = await navigator.mediaDevices.getUserMedia({
        video: { mediaSource: 'screen' }
      })
    }
    setCurrentStream(streamDisplay)
    videoTrack.replaceTrack(streamDisplay.getVideoTracks()[0])
    streamDisplay.addEventListener('inactive', e => {
      setCurrentStream(localStream)
      videoTrack.replaceTrack(localStream.getVideoTracks()[0])
    })
  }

  return (
    <Row>
      <Col style={{ height: '100vh', background: '#000' }} span={18}>
        <div style={{ height: 'calc(100% - 120px)', position: 'relative' }}>
          <Video videoStream={currentStream} />
          <Space
            size="large"
            style={{
              position: 'absolute',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              bottom: 20
            }}
          >
            <Tooltip title={videoEnable ? 'Tắt camera' : 'Mở camera'}>
              <Button
                icon={videoEnable ? <CameraOutlined /> : <StopOutlined />}
                shape="circle"
                ghost
                onClick={() => {
                  localStream.getVideoTracks()[0].enabled = !localStream.getVideoTracks()[0]
                    .enabled
                  setVideoEnable(localStream.getVideoTracks()[0].enabled)
                }}
              />
            </Tooltip>
            <Tooltip title={audioEnable ? 'Tắt micro' : 'Mở micro'}>
              <Button
                icon={audioEnable ? <AudioOutlined /> : <AudioMutedOutlined />}
                shape="circle"
                ghost
                onClick={() => {
                  localStream.getAudioTracks()[0].enabled = !localStream.getAudioTracks()[0]
                    .enabled
                  setAudioEnable(localStream.getAudioTracks()[0].enabled)
                }}
              />
            </Tooltip>
            <Tooltip title="Chia sẻ màn hình">
              <Button
                icon={<ShareAltOutlined />}
                shape="circle"
                ghost
                onClick={handleShareScreen}
              />
            </Tooltip>
          </Space>
        </div>
        {/* <Popover
          style={{ background: 'transparent' }}
          placement="bottomRight"
          content={
            <Space>
              <Button icon={<AudioOutlined />} shape="circle" />
              <Button icon={<ShareAltOutlined />} shape="circle" />
            </Space>
          }
        >
          <Button
            style={{
              position: 'absolute',
              top: 0,
              right: 10,
              color: '#fff',
              fontWeight: 'bold'
            }}
            type="link"
            icon={<MoreOutlined />}
          />
        </Popover> */}
        <Row>
          <Col
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
            span={(24 - count) / 2}
          >
            <Button
              type="link"
              onClick={() => listUser.current.prev()}
              icon={<LeftOutlined />}
            />
          </Col>
          <Col span={count}>
            <Carousel
              ref={listUser}
              dots={false}
              slidesToShow={
                Object.keys(participants).length > 5
                  ? 5
                  : Object.keys(participants).length
              }
            >
              {Array}
              <div>
                <h3 style={{ margin: 5, height: 100, background: 'red' }}>1</h3>
              </div>
              <div>
                <h3 style={{ margin: 5, height: 100, background: 'yellow' }}>
                  2
                </h3>
              </div>
              <div>
                <h3 style={{ margin: 5, height: 100, background: 'orange' }}>
                  3
                </h3>
              </div>
              <div>
                <h3 style={{ margin: 5, height: 100, background: 'purple' }}>
                  4
                </h3>
              </div>
              <div>
                <h3 style={{ margin: 5, height: 100, background: 'green' }}>
                  5
                </h3>
              </div>
              <div>
                <h3 style={{ margin: 5, height: 100, background: 'grey' }}>
                  6
                </h3>
              </div>
            </Carousel>
          </Col>
          <Col
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
            span={(24 - count) / 2}
          >
            <Button
              type="link"
              onClick={() => listUser.current.next()}
              icon={<RightOutlined />}
            />
          </Col>
        </Row>
      </Col>
      <Col style={{ height: '100vh', background: '#fff' }} span={6}>
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <InputCustomize
            // replyAuthor={rep && rep.author}
            // idElement={comment.id}
            // onSubmit={reply}
            // placeholder="Nhập bình luận"
            // mentions={comment.mention}
            // onAdd={onAdd}
            // value={value}
            />
          }
        />
      </Col>
    </Row>
  )
}

export default index
