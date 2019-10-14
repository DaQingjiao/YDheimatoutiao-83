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
    path: '/',
    component: () => import('@/views/tabbar'),
    children: [{
      name: 'home',
      path: '',
      component: () => import('@/views/home')
    }]
  }
  ]
})
export default router
