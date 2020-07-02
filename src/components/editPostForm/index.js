import React, {
  useContext,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react'
import { Form, notification, Input, Upload, Button } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { IContext } from '@tools'
import { Editor } from '@components'
import UploadButton from '../uploadButton'
import { uploadImg, beforeUpload } from '@shared'
const UPDATE_POST = gql`
  mutation updatePost($postId: String, $updatePost: UpdatePostInput) {
    updatePost(postId: $postId, updatePost: $updatePost)
  }
`
const EditPostForm = forwardRef((props, ref) => {
  const { setConfirmLoading, handleCancel, postItem, refetch } = props
  const { me } = useContext(IContext)
  const [loading, setLoading] = useState(false)
  const [editor, setEditor] = useState(null)
  const [form] = Form.useForm()
  const [updatePost] = useMutation(UPDATE_POST)
  const [imageUrl, setImageUrl] = useState(postItem?.thumbnail)
  useImperativeHandle(ref, () => ({
    handleOk: () => {
      form.submit()
    }
  }))
  const submitUpdatePost = ({ content, title, thumbnail }) => {
    setConfirmLoading(true)
    updatePost({
      variables: {
        postId: postItem?._id,
        updatePost: {
          title,
          content: `<div>${editor.getData()}</div>`,
          thumbnail: imageUrl
        }
      }
    })
      .then(async ({ data }) => {
        if (data?.updatePost) {
          notification.success({ message: 'Chỉnh sửa bài viết thành công' })
          setConfirmLoading(false)
          await refetch()
          form.resetFields()
          handleCancel && handleCancel()
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
  const handleUpload = async file => {
    setLoading(true)
    uploadImg(file).then(url => {
      setImageUrl(url)
      setLoading(false)
    })
  }
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={submitUpdatePost}
      initialValues={{
        title: postItem?.title,
        content: postItem?.content,
        // thumbnail: postItem?.thumbnail,
        community: postItem?.community?.name
      }}
    >
      <Form.Item name="community" label="Cộng đồng">
        <Input disabled />
      </Form.Item>
      <Form.Item label="Tiêu đề" name="title">
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
          <Editor setEditor={setEditor} initialValue={postItem?.content} />
        </div>
      </Form.Item>
      {/* <Form.Item
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
        ></Form.Item> */}
    </Form>
  )
})

export default EditPostForm
