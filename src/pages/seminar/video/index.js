import React, { useRef, useEffect } from 'react'

const Video = ({ videoStream }) => {
  const videoRef = useRef()
  useEffect(() => {
    if (videoStream) {
      videoRef.current.srcObject = videoStream
    }
  }, [videoStream])
  return (
    <video ref={videoRef} style={{ width: '100%', height: '100%' }} autoPlay />
  )
}

export default Video
