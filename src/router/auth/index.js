export const routersAuth = [
  {
    exact: true,
    path: '/pagegroup/:groupId',
    component: 'pageGroup',
    name: 'Tin nhắn'
  },
  {
    exact: true,
    path: '/createpost',
    component: 'createPost',
    name: 'Tạo bài viết'
  },
  {
    exact: true,
    path: '/',
    component: 'homepage',
    name: 'Trang chủ'
  },
  {
    exact: false,
    path: '/postdetail/:postId',
    component: 'postDetail',
    name: 'Chi tiết bài viết'
  },
  {
    exact: false,
    path: '/:userId/:type',
    component: 'profile',
    name: 'Trang cá nhân'
  }

  // {
  //     exact: true,
  //     path: '/idUser/communities',
  //     component: 'communities',
  //     name: 'Cộng đồng'
  // },
  // {
  //   exact: true,
  //   path: '/post',
  //   component: 'post',
  //   name: 'Đăng bài'
  // },
  // {
  //   exact: true,
  //   path: '/notification',
  //   component: 'notification',
  //   name: 'Thông báo'
  // },
  // {
  //   exact: true,
  //   path: '/:idUser/joinedcommunity',
  //   component: 'joinedcommunity',
  //   name: 'Cộng đồng đã tham gia'
  // },
  // {
  //     exact: true,
  //     path: '/:idUser/myposts',
  //     component: 'myposts',
  //     name: 'Bài viết của tôi'
  //   },
  // {
  //   exact: true,
  //   path: '/popular',
  //   component: 'popularposts',
  //   name: 'Thịnh hành'
  // },
]
