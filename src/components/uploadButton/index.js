import React from 'react'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'

const UploadButton = ({ loading }) => {
  return (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>Upload</div>
    </div>
  )
}
export default UploadButton
