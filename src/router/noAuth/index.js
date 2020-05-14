export const routersNotAuth = [
  {
    exact: true,
    path: '/login',
    component: 'login'
  },
  {
    exact: true,
    path: '/register',
    component: 'register'
  },
  {
    exact: true,
    path: '/homepage',
    component: 'home',
    root: true
  },
  {
    exact: true,
    path: '/popular',
    component: 'popularposts',
    name: 'Thịnh hành'
  }
]
