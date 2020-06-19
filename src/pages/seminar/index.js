/* eslint-disable no-prototype-builtins */
import React, { useMemo } from 'react'
import { Row, Col, Grid } from 'antd'
import Comments from './commentForm'
import OwnSeminar from './ownSeminar'

function index() {
  const screens = Grid.useBreakpoint()
  const breakPoint = useMemo(
    () => Object.entries(screens).filter(v => !v[1] && v[0] === 'lg').length === 1,
    [screens]
  )

  return (
    <Row>
      <Col style={{ height: breakPoint ? '50vh' : '100vh', background: '#000' }} xs={24} lg={18}>
        <OwnSeminar />
      </Col>
      <Col xs={24} lg={6}>
        <Comments breakPoint={breakPoint} />
      </Col>
    </Row>
  )
}

export default index
