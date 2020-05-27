/* eslint-disable quote-props */
/* eslint-disable indent */
/* eslint-disable handle-callback-err */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Menu, Upload, Popover } from 'antd'
import { FileImageTwoTone, SmileTwoTone, LoadingOutlined, CloseCircleFilled } from '@ant-design/icons'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import './index.scss'
import { MentionsInput, Mention } from 'react-mentions'

function InputCustome (props) {
  console.log(props.replyAuthor, 'tttt')
  const mentionData = []
  props.mentions && props.mentions.map((item, idx) => {
   mentionData.push({
    id: item + idx + '',
    display: item
  })
})
  const CLOUDINARY_UPLOAD_PRESET = 'graduation-pj'
const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/nhuht/image/upload'
  const [emoji, setEmoji] = useState({
    showEmoji: false,
    chosenEmoji: null
  })
  const [image, setImage] = useState({
    loading: false,
    srcImg: '',
    listSrcImage: []
  })

  const [text, setText] = useState(props.replyAuthor ? '^@@@' + props.replyAuthor : '')
  useEffect(() => {
    props.replyAuthor && document.getElementById(`input-custom-${props.idElement}`).focus()
    // const arr = document.getElementsByClassName('contentMess-box')
    // arr.length !== 0 && arr.mapsetAttribute('style', 'border: #e6f4ff solid 5px;')
    // const a = document.getElementsByClassName(`contentMess-box ${props.idElement}`)
    // console.log(a, 'ấdsađ')
    // a.length !== 0 && a[0].setAttribute('style', 'border: blue solid 3px ')
  })
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

  const deleteImg = (idx) => {
    var array = [...image.listSrcImage] // make a separate copy of the array nhớ nha nha
    array.splice(idx, 1)
    setImage({ ...image, listSrcImage: array })
  }
  const addEmoji = e => {
    const sym = e.unified.split('-')
    const codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    const emoji = String.fromCodePoint(...codesArray)
    setText(text + emoji)
  }
  const handleChange = async info => {
    if (info.file.status === 'uploading') {
      setImage({ ...image, loading: true })
      console.log(image.loading)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, async imageUrl => {
        const url = await uploadMessage(imageUrl)
        setImage({
          srcImg: url,
          listSrcImage: [...image.listSrcImage, url],
          loading: false
        })
      })
      document.getElementById(`input-custom-${props.idElement}`).focus()
  }
}
const uploadMessage = async (file) => {
  const data = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    file: file,
    upload_preset: CLOUDINARY_UPLOAD_PRESET
  })
}
  const upload = await fetch(CLOUDINARY_UPLOAD_URL, data).then(res => res.json())
 return upload.secure_url
}
  const handleSubmit = (event) => {
    if (event.shiftKey && event.keyCode === 13) {
      event.stopPropagation()
    } else if (event.keyCode === 13) {
      if (text.trim() || image.listSrcImage.length !== 0) {
        props.onSubmit(text, image.listSrcImage)
        setText('')
        setImage({ ...image, listSrcImage: [] })
      }
    }
  }
  return (
    <div className='input-custome' style={{ width: '100%' }}>
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
      <div className='input-menu'>
        <MentionsInput
          // defaultValue={props.replyAuthor && props.replyAuthor }
          style={{ width: '100%' }}
          onFocus={() => {
            const a = document.getElementsByClassName(`contentMess-box ${props.idElement}`)[0]
            a && a.classList.add('focus')
          }}
          onBlur={() => {
            const a = document.getElementsByClassName(`contentMess-box ${props.idElement}`)[0]
            a && a.classList.remove('focus')
          }}
          id={`input-custom-${props.idElement}`}
          className="textMention"
          // style={{ border: 'none' }}
          placeholder={props.placeholder}
          // markup='@__display__'
          // markup='^@@@__display__'
          // autoSize={{ minRows: 1, maxRows: 3 }}
          onChange={(event, newValue, newPlainTextValue, mentions) => {
              console.log(newValue, newPlainTextValue, mentions, 'uuuu')
                // value: newValue,
                // mentionData = { newValue, newPlainTextValue, mentions}
              // })
            setText(newValue)
          }}
          value={text}
          onKeyUp={(event) => handleSubmit(event)}
          allowSuggestionsAboveCursor
          allowSpaceInQuery
        >
           <Mention
           appendSpaceOnAdd
            trigger="@"
            markup='^@@@__display__'
            data={mentionData}
            className="textMention__mention"
          />
        </MentionsInput>
        <Menu mode='horizontal' style={{ lineHeight: 0 }}>
          <Menu.Item key='mail'>
            <Popover
              placement='bottomRight'
              // content={<a onClick>Close</a>}
              title={<Picker onSelect={e => addEmoji(e)} />}
              trigger='click'
              visible={emoji.showEmoji}
              onVisibleChange={() => setEmoji({ ...setEmoji, showEmoji: !emoji.showEmoji })}
            >
              <SmileTwoTone style={{ marginBottom: 3 }} onClick={() => setEmoji({ ...setEmoji, showEmoji: true })} />
            </Popover>
          </Menu.Item>
          <Menu.Item key='app' >
            <Upload
              {...propsUpload} onChange={(info) => handleChange(info)
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
