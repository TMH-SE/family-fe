import React, { useState, useEffect } from 'react'
import { Line } from '@ant-design/charts'
import firebase from 'firebase/app'

function index() {
  const [data, setData] = useState([])

  useEffect(() => {
    firebase.database().ref('report/lastDays').on('value', snapshot => {
      setData(snapshot.val())
    })
  }, [])

  return (
    <Line
      title={{ text: 'Thống kê diễn đàn Family trong 7 ngày gần nhất', visible: true }}
      description={{ text: 'Cập nhật lần cuối lúc:', visible: true }}
      padding='auto'
      forceFit
      xField='date'
      yField="count"
      seriesField='type'
      responsive
      legend={{
        position: 'bottom-left'
      }}
      data={data}
    />
  )
}

export default index
