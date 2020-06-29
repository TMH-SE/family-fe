import React, { useContext } from 'react'
import {
  Input,
  Form,
  Modal,
  DatePicker,
  Radio,
  Button,
  notification,
  InputNumber,
  Checkbox
} from 'antd'
import { IContext } from '@tools'
import moment from 'moment'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_USER_INFO } from '@shared'
import firebase from 'firebase/app'
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
    const { areasOfExpertise, jobTitle, yearsExperience } = values
    const expert = {
      areasOfExpertise,
      jobTitle,
      yearsExperience
    }
    delete values.areasOfExpertise
    delete values.jobTitle
    delete values.yearsExperience
    delete values['confirm-password']
    delete values.isExpert
    await updateUserInfo({
      variables: {
        userId: me?._id,
        userInfo: {
          ...values,
          expert,
          birthday: values.birthday
            ? Date.parse(values.birthday.toString())
            : null
        }
      }
    }).then(async res => {
      form.resetFields()
      await refetchMe()
      onCancel()
    })
    if (!me?.expert?.isVerify) {
      firebase.database().ref(`awaitVerifyExperts/${me?._id}`).set({
        createdAt: new Date().getTime()
      })
    }
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
      afterClose={() => form.resetFields()}
    >
      <Form
        name="dynamic_rule"
        form={form}
        onFinish={onFinish}
        initialValues={{
          isExpert: me?.expert,
          areasOfExpertise: me?.expert?.areasOfExpertise,
          yearsExperience: me?.expert?.yearsExperience,
          jobTitle: me?.expert?.jobTitle,
          firstname: me?.firstname,
          lastname: me?.lastname,
          phoneNumber: me?.phoneNumber,
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
            defaultPickerValue={
              me?.birthday
                ? moment(new Date(me?.birthday).toLocaleDateString())
                : moment(`12/31/${new Date().getFullYear() - 16}`)
            }
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
            <Radio value="OTHER">Khác</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="phoneNumber"
          label="Số điện thoại"
          //   initialValue={me?.phone}
        >
          <Input />
        </Form.Item>
        {/* {!me?.expert?.isVerify && ( */}
        <Form.Item name="isExpert" valuePropName="checked">
          <Checkbox>Tôi là một chuyên gia</Checkbox>
        </Form.Item>
        {/* )} */}
        {/* {me?.expert?.isVerify && ( */}
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.isExpert !== currentValues.isExpert
          }
        >
          {({ getFieldValue }) => {
            return !!getFieldValue('isExpert') ? (
              <>
                <Form.Item name="areasOfExpertise" label="Lĩnh vực chuyên môn">
                  <Input />
                </Form.Item>
                <Form.Item name="jobTitle" label="Chức danh">
                  <Input />
                </Form.Item>
                <Form.Item name="yearsExperience" label="Số năm kinh nghiệm">
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </>
            ) : null
          }}
        </Form.Item>
        {/* )} */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default EditUser
