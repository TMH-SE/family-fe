import React, { useState } from 'react'
import {  Modal, Button, Radio} from 'antd'
import "antd/dist/antd.css";
import Editor from '../editor'
// import './index.css'

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
function ModalReport(props){
  
    const [value, setValue] = useState('')
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };
    const onChange = e => {
        console.log('radio checked', e.target.value);
       setValue(e.target.value)
      };
    return (
        <Modal
        centered
        width='50%'  
        className='modal'
        visible={props.visible}
        title="Lý do báo cáo bài viết này là: "
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={[
          <Button key="back" onClick={props.handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={props.handleOk}>
            Submit
          </Button>,
        ]}
      >
           <Radio.Group onChange={onChange} value={value}>
          {data.map((item, idx) => {
            return <Radio style={radioStyle} value={idx}>
              {item.reason}
          </Radio>
          })}
      </Radio.Group>
        </Modal>
    )}
export default ModalReport
 