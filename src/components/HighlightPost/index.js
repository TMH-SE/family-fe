/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd'
import firebase from 'firebase/app'
import 'antd/dist/antd.css'
import './index.scss'
import HighlightItem from './highlightItem'

// const srcImg ='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'

function HighlightPost(props) {
  const { isBroken, history } = props
  const [data, setData] = useState([])
  useEffect(() => {
    firebase
      .database()
      .ref(`posts`)
      .orderByValue()
      .limitToLast(6)
      .once('value', snapshot => {
        const temp = snapshot.val() ? Object.keys(snapshot.val()).map(key => ({
          ...snapshot.val()[key],
          countComment: snapshot.val()[key].comments
            ? Object.keys(snapshot.val()[key].comments).length
            : 0,
          countReaction: snapshot.val()[key].reactions
            ? Object.keys(snapshot.val()[key].reactions)
                .map(keyA => ({ ...snapshot.val()[key].reactions[keyA] }))
                .reduce((a, b) => a.count + b.count).count
            : 0,
          id: key
        })) : []
        setData(
          temp.sort(
            (a, b) =>
              b.countComment +
              b.countReaction -
              (a.countComment + a.countReaction)
          )
        )
      })
  }, [])
  return (
    // <div className='site-card-wrapper'>
    <Carousel
      slidesToShow={isBroken ? 2 : 4}
      autoplay
      autoplaySpeed={1500}
      style={{ marginBottom: 10 }}
      swipeToSlide
    >
      {data.map((item, idx) => {
        return (
          <div key={idx}>
            <HighlightItem history={history} key={idx} item={item?.id} />
          </div>
        )
      })}
    </Carousel>
    // </div>
  )
}
export default HighlightPost
