/* eslint-disable handle-callback-err */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Menu, Upload, Popover } from 'antd'
import { FileImageTwoTone, SmileTwoTone, LoadingOutlined, CloseCircleFilled } from '@ant-design/icons'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import './index.css'
import TextArea from 'antd/lib/input/TextArea'

function InputCustome (props) {
  const [emoji, setEmoji] = useState({
    showEmoji: false,
    chosenEmoji: null
  })
  const [image, setImage] = useState({
    loading: false,
    srcImg: '',
    listSrcImage: []
  })
  const [text, setText] = useState('')
  const propsUpload = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture-cards'
    // defaultFileList: [...fileList]
  }
  function getBase64 (img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setImage({ ...image, loading: true })
      console.log(image.loading)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        setImage({
          srcImg: imageUrl,
          listSrcImage: [...image.listSrcImage, imageUrl],
          loading: false
        })
      )
    }
    document.getElementById(`input-custom-${props.idElement}`).focus()
  }
  const deleteImg = (idx) => {
    var array = [...image.listSrcImage] // make a separate copy of the array nhớ nha nha
    array.splice(idx, 1)
    setImage({ ...image, listSrcImage: array })
  }
  const addEmoji = e => {
    console.log(e, 'emoji')
    const sym = e.unified.split('-')
    const codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    const emoji = String.fromCodePoint(...codesArray)
    setText(text + emoji)
  }
  const handleSubmit = (event) => {
    console.log(image.listSrcImage.length)
    if (event.shiftKey && event.keyCode === 13) {
      event.stopPropagation()
    } else if (event.keyCode === 13) {
      if (text.trim() || image.listSrcImage.length !== 0) {
        props.onSubmit(text, image.listSrcImage)
        setText('')
        setImage({ ...image, listSrcImage: [] })
      }
      // setText('')
      // return
    }
  }
  return (
    <div className='input-custome' style={{ borderTop: 'solid #A0A5AF 1px', width: '100%' }}>
      {/* <div> */}
      <div style={{ display: 'flex', overflowX: 'auto' }}>
        {image.listSrcImage.map((srcImg, idx) => {
          return <div className='img-upload' key={idx} style={{ display: 'flex', height: 65, width: 65, margin: '5px 0 0 5px' }}>
            <img style={{ height: 60, width: 60, objectFit: 'cover' }} src={srcImg} />
            <div className='delete-img'>
              <CloseCircleFilled onClick={() => deleteImg(idx)} />
            </div>
          </div>
        })}
        { image.loading && <LoadingOutlined style={{ padding: 10 }}/> }
        {/* </div> */}
      </div>
      <div style={{ display: 'flex' }}>
        <TextArea
          id={`input-custom-${props.idElement}`}
          style={{ border: 'none' }}
          placeholder={props.placeholder}
          autoSize={{ minRows: 1, maxRows: 3 }}
          onChange={(e) => {
            // e.preventDefault()
            setText(e.target.value)
          }}
          value={text}
          onKeyUp={(event) => handleSubmit(event)}
        />
        {/* <Input placeholder='Nhập tin nhăn'
          value={text} onChange={(e) => {
            setText(e.target.value)
            console.log(text, 'ẻt')
          }} style={{ border: 'none' }}></Input> */}
        <Menu mode="horizontal" style={{ lineHeight: 0 }}>
          <Menu.Item key="mail">
            <Popover
              placement='bottomRight'
              // content={<a onClick>Close</a>}
              title={<Picker onSelect={e => addEmoji(e)} />}
              trigger="click"
              visible={emoji.showEmoji}
              onVisibleChange={() => setEmoji({ ...setEmoji, showEmoji: !emoji.showEmoji })}
            >
              <SmileTwoTone style={{ marginBottom: 3 }} onClick={() => setEmoji({ ...setEmoji, showEmoji: true })} />
            </Popover>
          </Menu.Item>
          <Menu.Item key="app" >
            <Upload {...propsUpload} onChange={(info) => handleChange(info)
            }>
              <FileImageTwoTone />
            </Upload>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  )
}
export default InputCustome
