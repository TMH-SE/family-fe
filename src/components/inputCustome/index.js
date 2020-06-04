/* eslint-disable quote-props */
/* eslint-disable indent */
/* eslint-disable handle-callback-err */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react'
import { Menu, Upload, Popover, notification, message } from 'antd'
import {
  FileImageTwoTone,
  SmileTwoTone,
  LoadingOutlined,
  CloseCircleFilled
} from '@ant-design/icons'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import './index.scss'
import { MentionsInput, Mention } from 'react-mentions'
import { uploadImg } from '@shared'

function InputCustome(props) {
  const mentionData = []
  props.mentions &&
    props.mentions.map((item, idx) => {
      mentionData.push({
        id: item.id,
        display: item.name
      })
    })
  const [arrMentions, setArrMentions] = useState([])
  const [emoji, setEmoji] = useState({
    showEmoji: false,
    chosenEmoji: null
  })
  const [image, setImage] = useState({
    loading: false,
    srcImg: ''
  })

  const [text, setText] = useState('')
  useEffect(() => {
    setText(
      props.replyAuthor
        ? `<a href='${window.location.origin}/${props.replyAuthor.id}/info'>${props.replyAuthor.name}</a> `
        : ''
    )
    props.replyAuthor &&
      document.getElementById(`input-custom-${props.idElement}`).focus()
    // props.onAdd && props.onAdd([{ id: props.replyAuthor.id, display: props.replyAuthor.name }])
  }, [props.replyAuthor])
  const propsUpload = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture-cards'
    // defaultFileList: [...fileList]
  }

  function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const deleteImg = () => {
    setImage({ ...image, srcImg: '' })
  }
  const addEmoji = e => {
    const sym = e.unified.split('-')
    const codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    const emoji = String.fromCodePoint(...codesArray)
    setText(text + emoji)
  }
  function beforeUpload(file) {
    // const isJpgOrPng =
    //   heading.includes('89504E470D0A1A0A') || heading.includes('FFD8FFDB')
    // if (!isJpgOrPng) {
    //   message.error('You can only upload JPG/PNG file!')
    //   return false
    // }
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      notification.error({ message: 'Image must smaller than 2MB!' })
    }
    return isJpgOrPng && isLt2M
  }
  const handleChange = async info => {
    if (info.file.status === 'uploading') {
      setImage({ ...image, loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, async imageUrl => {
        const url = await uploadImg(imageUrl)
        setImage({
          srcImg: url,
          loading: false
        })
      })
      document.getElementById(`input-custom-${props.idElement}`).focus()
    }
  }

  const handleSubmit = event => {
    if (event.shiftKey && event.keyCode === 13) {
      event.stopPropagation()
    } else if (event.keyCode === 13) {
      if (text.trim() || image.srcImg) {
        props.onSubmit(text, image.srcImg)
        setText('')
        setImage({ ...image, srcImg: '' })
      }
    }
  }
  return (
    <div className="input-custome" style={{ width: '100%' }}>
      {/* <div> */}
      {image.loading && (
        <LoadingOutlined color="black" style={{ padding: 10 }} />
      )}
      {image.srcImg && (
        <div style={{ display: 'flex', overflowX: 'auto' }}>
          <div
            className="img-upload"
            style={{
              display: 'flex',
              height: 65,
              width: 70,
              margin: '5px 0 0 5px'
            }}
          >
            <img
              style={{ height: 60, width: 60, objectFit: 'cover' }}
              src={image.srcImg}
            />
            <div className="delete-img">
              <CloseCircleFilled onClick={() => deleteImg()} />
            </div>
          </div>
          {/* </div> */}
        </div>
      )}
      <div className="input-menu">
        <MentionsInput
          // defaultValue={props.replyAuthor && props.replyAuthor }
          style={{ width: '100%' }}
          onFocus={() => {
            const a = document.getElementsByClassName(
              `contentMess-box ${props.idElement}`
            )[0]
            a && a.classList.add('focus')
    //           const ele = document.getElementsByClassName(
    //   `message-list-container ${props.idElement}`
    // )[0]
    // ele.scrollTop = ele.scrollHeight
          }}
          onBlur={() => {
            const a = document.getElementsByClassName(
              `contentMess-box ${props.idElement}`
            )[0]
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
            setText(newValue)
            setArrMentions(mentions)
            props.onAdd && props.onAdd(arrMentions)
          }}
          value={text}
          onKeyUp={event => {
            handleSubmit(event)
          }}
          allowSuggestionsAboveCursor
          allowSpaceInQuery
        >
          <Mention
            appendSpaceOnAdd
            trigger="@"
            markup={`<a href='${window.location.origin}/__id__/info'>__display__</a>`}
            data={mentionData}
            className="textMention__mention"
          />
        </MentionsInput>
        <Menu mode="horizontal" style={{ lineHeight: 0 }}>
          <Menu.Item key="mail">
            <Popover
              placement="bottomRight"
              // content={<a onClick>Close</a>}
              title={<Picker onSelect={e => addEmoji(e)} />}
              trigger="click"
              visible={emoji.showEmoji}
              onVisibleChange={() =>
                setEmoji({ ...setEmoji, showEmoji: !emoji.showEmoji })
              }
            >
              <SmileTwoTone
                style={{ marginBottom: 3 }}
                onClick={() => setEmoji({ ...setEmoji, showEmoji: true })}
              />
            </Popover>
          </Menu.Item>
          <Menu.Item key="app">
            <Upload
              {...propsUpload}
              beforeUpload={beforeUpload}
              onChange={info => handleChange(info)}
            >
              <FileImageTwoTone />
            </Upload>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  )
}
export default InputCustome
