import Vue from 'vue' // 导入Vue实例
import VueRouter from 'vue-router' // 导入router实例

Vue.use(VueRouter) // router注册全局共享

const router = new VueRouter({
  // 配置路由表
  routes: [{
    // 登录页面
    name: 'login',
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    // 搜索页面
    name: 'search',
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    // 搜索文章
    name: 'search-result',
    path: '/search/:q',
    component: () => import('@/views/search-result')
  },
  {
    // 首页文章
    name: 'article',
    path: '/article/:articleId',
    component: () => import('@/views/article')
  },
  {
    // 我的信息页
    name: 'user',
    path: '/user',
    component: () => import('@/views/user')
  },
  {
    // 小度页面
    name: 'chat',
    path: '/chat',
    component: () => import('@/views/chat')
  },
  {
    // 导航栏
    path: '/',
    component: () => import('@/views/tabbar'),
    children: [{
      // 首页
      name: 'home',
      path: '',
      component: () => import('@/views/home')
    },
    {
      // 我的页面
      name: 'my',
      path: '/my',
      component: () => import('@/views/my')
    }]
  }
  ]
})
export default router
