import React, { useState, useContext, useEffect } from 'react'
import { Dropdown, Menu, notification } from 'antd'
import { ModalReport } from '@components'
import { EllipsisOutlined, FlagOutlined, BookOutlined } from '@ant-design/icons'
import { IContext } from '@tools'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CHECK_IS_SAVED, CREATE_AND_DELETE_SAVEDPOST } from '@shared'
// import { brokenContext } from '../../../layouts/MainLayout'

function SaveAndReport(props) {
  const { me, refetchSavedPost } = useContext(IContext)
  const [isSaved, setIsSaved] = useState(false)
  const [visibleModalReport, setVisibleModalReport] = useState(false)
  const { postId, postItem } = props
  const [createAndDelete] = useMutation(CREATE_AND_DELETE_SAVEDPOST)
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={() => setVisibleModalReport(true)}>
          <FlagOutlined key="flag" /> Báo cáo bài viết
        </div>
      </Menu.Item>
      <Menu.Item key="1">
        <div
          onClick={async () => {
            console.log(postItem, 'post')
            await createAndDelete({
              variables: {
                id: { userId: me?._id, postId }
              }
            }).then(res => {
              notification.success({
                message: isSaved
                  ? 'Hủy lưu bài viết thành công'
                  : 'Lưu bài viết thành công'
              })
              refetchSavedPost()
              setIsSaved(!isSaved)
            })
            refetch()
          }}
        >
          <BookOutlined /> {isSaved ? 'Hủy lưu bài viết' : 'Lưu bài viết'}
        </div>
      </Menu.Item>
    </Menu>
  )
  const { data, refetch } = useQuery(CHECK_IS_SAVED, {
    variables: { id: { userId: me?._id, postId } }
  })
  useEffect(() => {
    data && setIsSaved(data.checkIsSaved)
  }, [postId, data])

  const handleOk = () => {
    setVisibleModalReport(false)
  }
  const handleCancel = () => {
    setVisibleModalReport(false)
  }
  return (
    <>
      <Dropdown
        key="menu"
        overlay={menu}
        trigger={['click']}
        placement="bottomRight"
      >
        <EllipsisOutlined />
      </Dropdown>
      <ModalReport
        visible={visibleModalReport}
        handleCancel={handleCancel}
        handleOk={handleOk}
        postId={postId}
      ></ModalReport>
    </>
  )
}
export default SaveAndReport
