import React, { useContext, useState, useEffect } from 'react'
import { List, Skeleton } from 'antd'
import { CommunityItem, HighLightPost } from '@components'
import { MainContext } from '../../layouts/MainLayout'
import * as firebase from 'firebase/app'

function AllCommunities(props) {
  // const { data, loading } = useQuery(GET_COMMUNITIES)
  const [loading, setLoading] = useState(false)
  const { isBroken } = useContext(MainContext)
  const [dataCount, setDataCount] = useState([])
  useEffect(() => {
    getCount()
  }, [])
  const getCount = () => {
    setLoading(true)
    firebase.database().ref('communities').on('value', snapshot => {
      const temp = snapshot.val() ? Object.keys(snapshot.val()).map(key => ({
        ...snapshot.val()[key],
        id: key
      })) : []
      setDataCount(temp)
      setLoading(false)
    })
  }
  return loading ? (
    <Skeleton active avatar />
  ) : (
    <>
    <HighLightPost history={props.history} isBroken={isBroken}></HighLightPost>
      <p>Tất cả cộng đồng </p>
      <List
        pagination={{
          pageSize: 4
        }}
        itemLayout="horizontal"
        dataSource={dataCount}
        renderItem={item => <CommunityItem isActionJoin={true} item={item} />}
      />
    </>
  )
}
export default AllCommunities
