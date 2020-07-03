import React, { useState, forwardRef, useImperativeHandle } from 'react'
import {
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Col,
  Row,
  notification
} from 'antd'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import moment from 'moment'

const CREATE_SEMINAR = gql`
  mutation createSeminar($newSeminar: NewSeminar) {
    createSeminar(newSeminar: $newSeminar)
  }
`

const ModalSeminar = forwardRef((props, ref) => {
  const { refetchSeminars } = props
  const [visible, setVisible] = useState(false)
  useImperativeHandle(ref, () => ({
    openModal: () => setVisible(true)
  }))
  const [createSeminar] = useMutation(CREATE_SEMINAR)
  const [form] = Form.useForm()
  const submitCreateSeminar = ({ title, description, time, date }) => {
    const startTime = new Date(+moment(time))
    const startDate = new Date(+moment(date))
    createSeminar({
      variables: {
        newSeminar: {
          title,
          description,
          startAt: startDate.setHours(
            startTime.getHours(),
            startTime.getMinutes(),
            0
          )
        }
      }
    }).then(({ errors }) => {
      if (!errors) {
        notification.success({
          message: 'Tạo hội thảo thành công',
          placement: 'bottomRight'
        })
        setVisible(false)
      }
    })
  }
  return (
    <Modal
      centered
      title="Hội thảo mới"
      visible={visible}
      onCancel={() => setVisible(false)}
      afterClose={() => {
        refetchSeminars()
        form.resetFields()
      }}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={submitCreateSeminar} layout="vertical">
        <Form.Item
          label="Chủ đề"
          name="title"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập chủ đề của hội thảo'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Thông tin chi tiết" name="description">
          <Input.TextArea
            style={{ resize: 'none', borderRadius: 0 }}
            rows={5}
          />
        </Form.Item>
        <Form.Item required label="Thời gian bắt đầu">
          <Row style={{ width: '100%' }}>
            <Col span={10}>
              <Form.Item
                name="date"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn ngày bắt đầu của hội thảo'
                  }
                ]}
              >
                <DatePicker
                
                  disabledDate={current => {
                    // Can not select days before today and today
                    return current && current < moment().startOf('day')
                  }}
                  placeholder="Ngày bắt đầu"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={10} offset={1}>
              <Form.Item
                name="time"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn giờ bắt đầu của hội thảo'
                  }
                ]}
              >
                <TimePicker
                  placeholder="Giờ bắt đầu"
                  format="HH:mm"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default ModalSeminar
