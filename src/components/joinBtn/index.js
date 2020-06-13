/* eslint-disable react/prop-types */
import React from 'react'
import { Button, Popconfirm } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CHECK_IS_MEMBER, CREATE_AND_DELETE_MEMBER } from '@shared'

function JoinBtn(props) {
  const { data, refetch } = useQuery(CHECK_IS_MEMBER, {
    variables: { id: props.id }
  })
  const [createAndDelete] = useMutation(CREATE_AND_DELETE_MEMBER)
  const onHandleClick = async () => {
    await createAndDelete({ variables: { id: props.id } }).then(async res => {
      await refetch()
      ;(await props.refetchMemberCount) && props.refetchMemberCount()
    })
  }
  return data?.checkIsMember ? (
    <Popconfirm
      title="Bạn muốn bỏ tham gia nhóm"
      onConfirm={() => onHandleClick()}
      // onCancel={cancel}
      okText="Đồng ý"
      cancelText="Hủy"
    >
      <Button
        style={{ backgroundColor: '#ccc', color: '#fff' }}
      >
        Đã tham gia
      </Button>
    </Popconfirm>
  ) : (
    <Button
      style={{ backgroundColor: 'rgb(0, 152, 218)', color: '#fff' }}
      onClick={() => onHandleClick()}
    >
      Tham gia
    </Button>
  )
}
export default JoinBtn
