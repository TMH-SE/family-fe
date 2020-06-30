import React from 'react'
import { Line } from '@ant-design/charts'
function index() {
  const data = [
    {
      date: 1,
      count: 10,
      type: 'user'
    },
    {
      date: 1,
      count: 15,
      type: 'post'
    },
    {
      date: 1,
      count: 2,
      type: 'seminar'
    },
    {
      date: 2,
      count: 5,
      type: 'user'
    },
    {
      date: 2,
      count: 10,
      type: 'post'
    },
    {
      date: 2,
      count: 3,
      type: 'seminar'
    },
    {
      date: 3,
      count: 3,
      type: 'user'
    },
    {
      date: 3,
      count: 12,
      type: 'post'
    },
    {
      date: 3,
      count: 5,
      type: 'seminar'
    },
    {
      date: 4,
      count: 6,
      type: 'user'
    },
    {
      date: 4,
      count: 6,
      type: 'post'
    },
    {
      date: 4,
      count: 7,
      type: 'seminar'
    },
    {
      date: 5,
      count: 15,
      type: 'user'
    },
    {
      date: 5,
      count: 11,
      type: 'post'
    },
    {
      date: 5,
      count: 4,
      type: 'seminar'
    },
    {
      date: 6,
      count: 20,
      type: 'user'
    },
    {
      date: 6,
      count: 30,
      type: 'post'
    },
    {
      date: 6,
      count: 2,
      type: 'seminar'
    }
  ]
  return (
    <Line
      title={{ text: 'Report', visible: true }}
      description={{ text: 'Hello report family', visible: true }}
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
