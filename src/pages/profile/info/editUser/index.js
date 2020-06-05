import React, { useContext } from 'react'
import {
  Input,
  Form,
  Modal,
  DatePicker,
  Radio,
  Button,
  notification
} from 'antd'
import { IContext } from '@tools'
import moment from 'moment'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_USER_INFO } from '@shared'
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 }
}
const EditUser = props => {

  const { visible, onCancel } = props
  const { me, refetchMe } = useContext(IContext)
  const [form] = Form.useForm()
  const [updateUserInfo] = useMutation(UPDATE_USER_INFO)
  const onFinish = async values => {
    // console.log(Date.parse(values.birthday.toString()))
    await updateUserInfo({
      variables: {
        userId: me?._id,
        userInfo: {
          ...values,
          birthday: values.birthday ? Date.parse(values.birthday.toString()) : null
        }
      }
    })
    refetchMe()
    notification.success({ message: 'Cập nhật thông tin thành công' })
  }
  const disabledDate = current => {
    // Can not select days before today and today
    return current && moment().year() - current.year() < 16
  }
  return (
    <Modal
      visible={visible}
      onCancel={() => onCancel()}
      title="Chỉnh sửa thông tin"
      footer={null}
    >
      <Form
        name="dynamic_rule"
        form={form}
        onFinish={onFinish}
        initialValues={{
          firstname: me?.firstname,
          lastname: me?.lastname,
          phone: me?.phone,
          gender: me?.gender,
          birthday: me?.birthday
            ? moment(new Date(me?.birthday).toLocaleDateString())
            : null
        }}
      >
        <Form.Item
          // {getFieldDecorator('username', {
          //     rules: [{ required: true }],
          //   })(<Input />)}
          {...formItemLayout}
          name="firstname"
          label="Tên"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên'
            }
          ]}
          //   initialValue={me?.firstname}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="lastname"
          label="Họ"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ'
            }
          ]}
          //   initialValue={me?.lastname}
        >
          <Input />
        </Form.Item>
        <Form.Item {...formItemLayout} name="birthday" label="Ngày sinh">
          <DatePicker
            // hideDisabledOptions
            showToday={false}
            defaultPickerValue={moment(`12/31/${new Date().getFullYear() - 16}`)}

            disabledDate={disabledDate}
            style={{ width: '100%' }}
            format="DD-MM-YYYY"
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="gender"
          label="Giới tính"
          //   initialValue={me?.bio}
        >
          <Radio.Group>
            <Radio value="MALE">Nam</Radio>
            <Radio value="FEMALE">Nữ</Radio>
            <Radio value="ORTHER">Khác</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="phone"
          label="Số điện thoại"
          //   initialValue={me?.phone}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default EditUser
