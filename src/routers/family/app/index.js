import React, { Suspense, lazy } from 'react'
import { MainLayout } from '@layouts'
import { Switch, Route, Redirect } from 'react-router-dom'

const FamilyAppRoutes = ({ isAuth }) => {
  const authRoutes = [
    {
      exact: true,
      path: '/pagegroup/:groupId',
      component: 'pageGroup',
      title: 'Cộng đồng'
    },
    {
      exact: true,
      path: '/createpost',
      component: 'createPost',
      title: 'Tạo bài viết'
    },
    {
      exact: true,
      path: '/profile',
      component: 'profile',
      title: 'Trang cá nhân'
    },
    {
      exact: true,
      path: '/:userId/messenger/:idChat',
      component: 'messageDetail',
      title: 'Chat'
    }
  ]

  const commonRoutes = [
    {
      exact: true,
      path: '/homepage',
      component: 'homepage',
      title: 'Family'
    },
    {
      exact: true,
      path: '/popular',
      component: 'popularposts',
      title: 'Thịnh hành'
    },
    {
      exact: true,
      path: '/:userId/:type',
      component: 'profile',
      title: 'Trang cá nhân'
    },
    {
      exact: false,
      path: '/postdetail/:postId',
      component: 'postDetail',
      title: 'Chi tiết bài viết'
    }
  ]

  return (
    <MainLayout>
      <Suspense fallback={null}>
        <Switch>
          {isAuth &&
            authRoutes.map((route, idx) => (
              <Route
                key={idx}
                exact={route.exact}
                path={route.path}
                render={() => {
                  if (!isAuth) {
                    return <Redirect to="/login" />
                  }
                  const Component = lazy(() =>
                    import(`@pages/${route.component}`)
                  )
                  document.title = route.title
                  return <Component />
                }}
              />
            ))}
          {commonRoutes.map((route, idx) => (
            <Route
              key={idx}
              exact={route.exact}
              path={route.path}
              render={() => {
                const Component = lazy(() =>
                  import(`@pages/${route.component}`)
                )
                document.title = route.title
                return <Component />
              }}
            />
          ))}
          <Route path="/" render={() => <Redirect to="/homepage" />} />
          <Route render={() => <Redirect to="/404" />} />
        </Switch>
      </Suspense>
    </MainLayout>
  )
}

export default FamilyAppRoutes
