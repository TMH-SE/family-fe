/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import { Modal, Button, Radio, notification, Input } from 'antd'
// import 'antd/dist/antd.css'
// import Editor from '../editor'
import firebase from 'firebase/app'
import { IContext } from '@tools'

const data = [
  {
    reason: 'Vi phạm Quy định chung'
  },
  {
    reason: 'Quảng cáo / Bán hàng'
  },
  {
    reason: 'Bản quyền'
  },
  {
    reason: 'Gây mâu thuẫn giữa các dân tộc, vùng miền / tôn giáo'
  },
  {
    reason: 'Nội dung không phù hợp / nội dung rác / sai chủ đề / spam'
  },
  {
    reason: 'Bạo lực/dâm ô, đồi trụy/tội ác/tệ nạn xã hội/mê tín dị đoan'
  },
  {
    reason: 'Chỉ trích cá nhân / xuyên tạc / đưa thông tin đời tư / bí mật'
  },
  {
    reason: ' Chính trị / an ninh trật tự xã hội / hàng hoá dịch vụ cấm'
  },
  {
    reason: 'Lý do khác'
  }
]
function ModalReport(props) {
  const [value, setValue] = useState('')
  const [isTextValue, setIsTextValue] = useState(false)
  const [text, setText] = useState(false)
  const { me } = useContext(IContext)
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  }
  const onChange = e => {
    setIsTextValue(false)
    setText('')
    setValue(e.target.value)
    if (e.target.value === 'Lý do khác') {
      setIsTextValue(true)
    }
  }
  return (
    <Modal
      centered
      width="50%"
      className="modal"
      visible={props.visible}
      title="Lý do báo cáo bài viết này là: "
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      footer={[
        <Button key="back" onClick={props.handleCancel}>
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            if (value.trim() !== '') {
              if (value.trim() !== 'Lý do khác' || text.trim() !== '') {
                firebase
                  .database()
                  .ref(`reports/posts/${props.postId}/${me?._id}`)
                  .set({
                    reason: value,
                    createdAt: +new Date()
                  })
                notification.success({
                  message: 'Bạn đã báo cáo bài viết.',
                  duration: 1.5
                })
                props.handleOk()
              } else {
                notification.info({
                  message: 'Bạn chưa báo cáo bài viết. Vui lòng nhập lí do',
                  duration: 1.5
                })
              }
            } else {
              notification.info({
                message: 'Bạn chưa chọn lí do báo cáo bài viết',
                duration: 1.5
              })
            }
          }}
        >
          Submit
        </Button>
      ]}
    >
      <Radio.Group onChange={onChange} value={value}>
        {data.map((item, idx) => {
          return (
            <Radio key={idx} style={radioStyle} value={item.reason}>
              {item.reason}
            </Radio>
          )
        })}
      </Radio.Group>
      {isTextValue && (
        <Input
          placeholder="Nhập lí do ..."
          onChange={e => setText(e.target.value)}
        />
      )}
    </Modal>
  )
}
export default ModalReport
