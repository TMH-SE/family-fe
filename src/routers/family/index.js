import React, { useContext, Suspense, lazy } from 'react'
import { IContext } from '@tools'
import { Route, Switch } from 'react-router-dom'
import { Result, Button } from 'antd'
import FamilyAppRoutes from './app'

const FamilyRoutes = () => {
  const { isAuth } = useContext(IContext)
  const routes = [
    {
      exact: true,
      path: '/login',
      component: 'signIn',
      title: 'Đăng nhập'
    },
    {
      exact: true,
      path: '/register',
      component: 'register',
      title: 'Đăng ký thành viên'
    }
  ]
  return (
    <Suspense fallback={null}>
      <Switch>
        {routes.map((route, idx) => (
          <Route
            key={idx}
            exact={route.exact}
            path={route.path}
            render={() => {
              const Component = lazy(() => import(`@pages/${route.component}`))
              document.title = route.title
              return <Component />
            }}
          />
        ))}
        <Route
          path="/404"
          render={() => {
            document.title = '404'
            return (
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
              />
            )
          }}
        />
        <Route path="/" render={() => <FamilyAppRoutes isAuth={isAuth} />} />
      </Switch>
    </Suspense>
  )
}

export default FamilyRoutes
