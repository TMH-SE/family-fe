import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AdminLayout } from '@layouts'

const AdminAuthRoutes = ({ isAuth }) => {
  const routes = [
    {
      exact: true,
      path: '/dashboard',
      component: 'dashboard',
      title: 'Dashboard Admin'
    }
  ]
  return (
    <AdminLayout>
      <Suspense fallback={null}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to={isAuth ? '/dashboard' : '/login'} />}
          />
          {routes.map((route, idx) => (
            <Route
              key={idx}
              exact={route.exact}
              path={route.path}
              render={() => {
                if (!isAuth) {
                  console.log(54645654)
                  return <Redirect to="/403" />
                }
                const Component = lazy(() =>
                  import(`@pages/admin/${route.component}`)
                )
                document.title = route.title
                return <Component />
              }}
            />
          ))}
          <Route render={() => <Redirect to="/404" />} />
        </Switch>
      </Suspense>
    </AdminLayout>
  )
}

export default AdminAuthRoutes
