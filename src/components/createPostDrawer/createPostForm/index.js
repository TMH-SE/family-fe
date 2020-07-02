import React, {
  useRef,
  useContext,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react'
import {
  Form,
  notification,
  Select,
  Input,
  Upload,
  Button,
  Row,
  Col,
  Tag
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import * as handlebars from 'handlebars'
import { IContext } from '@tools'
import { uploadImg, beforeUpload, GET_COMMUNITIES_BY_USER } from '@shared'
import postTemplate from '@assets/templates/post.html'
import { Editor, UploadButton } from '@components'
import firebase from 'firebase/app'
const CREATE_POST = gql`
  mutation createPost($newPost: NewPost) {
    createPost(newPost: $newPost) {
      _id
      title
    }
  }
`
const GET_SUM_FOLLOWER_BY_USER = gql`
  query getFollowerByUser($userId: String) {
    getFollowerByUser(userId: $userId) {
      _id {
        userId
      }
      follower {
        _id
        firstname
        lastname
      }
    }
  }
`

const CreatePostForm = forwardRef((props, ref) => {
  const { setConfirmLoading, handleCancel, data, refetch } = props
  const keywordRef = useRef()
  const { me } = useContext(IContext)
  const { data: dataCountFollow } = useQuery(GET_SUM_FOLLOWER_BY_USER, {
    variables: { userId: me?._id },
    fetchPolicy: 'no-cache'
  })
  const { data: dataCommunities, loading: loadingCommunities } = useQuery(
    GET_COMMUNITIES_BY_USER,
    {
      variables: { userId: me?._id },
      fetchPolicy: 'no-cache',
      skip: !me?._id
    }
  )
  const [visibleInputKeyword, setVisibleInputKeyword] = useState(false)
  const [editor, setEditor] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [keywords, setKeywords] = useState([])
  const [form] = Form.useForm()
  const [createPost] = useMutation(CREATE_POST)
  useImperativeHandle(ref, () => ({
    handleOk: () => {
      form.submit()
    },
    handleAfterClose: () => {
      form.resetFields()
      setLoading(false)
      setImageUrl(null)
      setVisibleInputKeyword(false)
      setKeywords([])
    }
  }))

  const handleUpload = async file => {
    setLoading(true)
    uploadImg(file).then(url => {
      setImageUrl(url)
      setLoading(false)
    })
  }
  const notifyToUser = (item, postId) => {
    try {
      item?._id !== me?._id &&
        firebase
          .database()
          .ref(`notifications/${item?._id}/${+new Date()}`)
          .set({
            action: 'post',
            reciever: item?._id,
            link: `/post-detail/${postId}`,
            content: `${me?.firstname} đã đăng bài viết mới`,
            seen: false,
            createdAt: +new Date()
          })
    } catch (err) {
      console.log(err)
    }
  }
  const submitCreatePost = ({ title, communityId }) => {
    setConfirmLoading(true)
    const html = handlebars.compile(postTemplate)
    const hashtags = keywords.map(key => key.replace(/\s/g, '_'))
    createPost({
      variables: {
        newPost: {
          title,
          communityId,
          content: html({
            title,
            author: `${me?.firstname} ${me?.lastname}`,
            content: `<div>${editor.getData()}</div>`,
            keywords,
            hashtags
          }),
          thumbnail: imageUrl,
          keywords
        }
      }
    })
      .then(async ({ data }) => {
        if (data?.createPost) {
          firebase
            .database()
            .ref(`posts/${data?.createPost?._id}`)
            .set({
              createdAt: +new Date()
            })
          communityId &&
            firebase
              .database()
              .ref(`communities/${communityId}/postsCount`)
              .once('value', snapshot => {
                firebase
                  .database()
                  .ref(`communities/${communityId}`)
                  .update({ postsCount: snapshot.val() + 1 })
              })

          notification.success({ message: 'Tạo bài viết thành công' })
          // setRefetchSumPosts(communityId)
          dataCountFollow?.getFollowerByUser?.map(item => {
            notifyToUser(item.follower, data?.createPost?._id)
          })
          await refetch()
          setConfirmLoading(false)
          handleCancel && handleCancel()
        }
      })
      .catch(err => {
        const { graphQLErrors } = err
        console.log(err)
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
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      layout="horizontal"
      onFinish={submitCreatePost}
      initialValues={{
        communityId: data?._id
      }}
    >
      {data !== null && (
        <Form.Item name="communityId" label="Cộng đồng">
          <Select
            disabled={!!data}
            allowClear
            loading={loadingCommunities}
            placeholder="Chọn cộng đồng"
            showArrow={false}
            showSearch
            filterOption={(inputValue, option) =>
              option.label
                .toLocaleLowerCase()
                .indexOf(inputValue.toLowerCase()) !== -1
            }
            options={dataCommunities?.getCommunitiesByUser?.map(
              ({ community }) => ({
                label: community.name,
                value: community._id
              })
            )}
          />
        </Form.Item>
      )}
      <Form.Item
        label="Tiêu đề"
        name="title"
        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài viết' }]}
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
        required
        rules={[
          {
            validator: (_, value) => {
              if (!value && keywords.length === 0) {
                return Promise.reject(
                  'Thêm từ khóa để giúp bài viết của bạn dễ dàng được mọi người tìm thấy'
                )
              }
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
            {keywords.map((keyword, index) => (
              <Tag
                key={index}
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
  )
})

export default CreatePostForm
