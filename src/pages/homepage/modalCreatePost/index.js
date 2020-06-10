/* eslint-disable react/prop-types */
import React, { useState, useContext, useRef } from 'react'
import {
  Modal,
  Select,
  Form,
  Upload,
  Input,
  Tag,
  Row,
  Col,
  Button,
  notification
} from 'antd'
import 'antd/dist/antd.css'
import { Editor, UploadButton } from '../../../components'
import './index.css'
import { beforeUpload, uploadImg } from '@shared'
import * as handlebars from 'handlebars'
import postTemplate from '@assets/templates/post.html'
import { IContext } from '@tools'
import { PlusOutlined } from '@ant-design/icons'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const CREATE_POST = gql`
  mutation createPost($newPost: NewPost) {
    createPost(newPost: $newPost)
  }
`

function ModalCreatePost(props) {
  const { isBroken, visible, handleCancel } = props

  const keywordRef = useRef()

  const { me } = useContext(IContext)

  const [visibleInputKeyword, setVisibleInputKeyword] = useState(false)
  const [editor, setEditor] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [keywords, setKeywords] = useState([])
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [form] = Form.useForm()

  const [createPost] = useMutation(CREATE_POST)

  const options = [
    { label: 'Community 1', value: 1 },
    { label: 'Community 2', value: 2 },
    { label: 'Community 3', value: 3 }
  ]

  const handleUpload = async file => {
    setLoading(true)
    uploadImg(file).then(url => {
      setImageUrl(url)
      setLoading(false)
    })
  }

  const submitCreatePost = ({ title, communityId }) => {
    setConfirmLoading(true)
    const html = handlebars.compile(postTemplate)
    createPost({
      variables: {
        newPost: {
          title,
          communityId,
          content: html({
            title,
            author: `${me?.firstname} ${me?.lastname}`,
            content: editor.getData()
          }),
          thumbnail: imageUrl
        }
      }
    })
      .then(({ data }) => {
        if (data?.createPost) {
          notification.success({ message: 'Tạo bài viết thành công' })
          handleCancel()
          setConfirmLoading(false)
        }
      })
      .catch(({ graphQLErrors }) => {
        notification.error({
          message: graphQLErrors[0].message,
          placement: 'bottomRight'
        })
        setConfirmLoading(false)
      })
  }

  const addKeywords = e => {
    const keyword = e.target.value
    if (keyword && !keywords.includes(keyword.trim())) {
      setKeywords([...keywords, keyword.trim()])
      setVisibleInputKeyword(false)
      form.resetFields(['keyword'])
    }
  }

  return (
    <Modal
      confirmLoading={confirmLoading}
      afterClose={() => {
        form.resetFields()
        setLoading(false)
        setImageUrl(null)
        setVisibleInputKeyword(false)
        setKeywords([])
      }}
      width={isBroken ? '100vw' : '70%'}
      centered
      className="modal"
      visible={visible}
      title="Bài viết mới"
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Đăng bài"
      cancelText="Đóng"
    >
      <Form form={form} layout="vertical" onFinish={submitCreatePost}>
        <Form.Item name="communityId" label="Cộng đồng">
          <Select
            placeholder="Chọn cộng đồng"
            showArrow={false}
            options={options}
            showSearch
            filterOption={(inputValue, option) =>
              option.label
                .toLocaleLowerCase()
                .indexOf(inputValue.toLowerCase()) !== -1
            }
          />
        </Form.Item>
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[
            { required: true, message: 'Vui lòng nhập tiêu đề bài viết' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Thumbnail">
          <div style={{ width: 'auto' }}>
            <Upload
              action={handleUpload}
              listType="picture-card"
              beforeUpload={beforeUpload}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                <UploadButton loading={loading} />
              )}
            </Upload>
          </div>
          {imageUrl && (
            <Button danger onClick={() => setImageUrl(null)}>
              Xóa ảnh
            </Button>
          )}
        </Form.Item>
        <Form.Item
          required
          label="Nội dung"
          name="content"
          rules={[
            {
              validator: () => {
                if (!editor.getData()) {
                  return Promise.reject('Nội dung không được để trống')
                }
                return Promise.resolve()
              }
            }
          ]}
        >
          <div style={{ width: '100%' }}>
            <Editor setEditor={setEditor} />
          </div>
        </Form.Item>
        <Form.Item
          name="keyword"
          label="Từ khóa"
          rules={[
            {
              validator: (_, value) => {
                if (value && keywords.includes(value.trim())) {
                  return Promise.reject('Từ khóa này đã có')
                }
                return Promise.resolve()
              }
            }
          ]}
        >
          <Row style={{ width: '100%' }}>
            <Col span={24}>
              {keywords.map(keyword => (
                <Tag
                  style={{ marginBottom: 5 }}
                  closable
                  onClose={e => {
                    e.preventDefault()
                    setKeywords(keywords.filter(key => key !== keyword))
                  }}
                >
                  {keyword}
                </Tag>
              ))}
            </Col>
            <Col span={24}>
              {visibleInputKeyword ? (
                <Input
                  ref={keywordRef}
                  placeholder="Nhập từ khóa"
                  onPressEnter={addKeywords}
                  onBlur={addKeywords}
                  autoFocus
                />
              ) : (
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setVisibleInputKeyword(true)
                  }}
                >
                  Thêm từ khóa
                </Button>
              )}
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default ModalCreatePost
