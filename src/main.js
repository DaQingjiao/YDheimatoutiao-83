import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less'
import { NavBar, Cell, CellGroup, Field, Button, Toast } from 'vant' // 导入组件

// 注册全局共享
Vue
  .use(NavBar)
  .use(Cell)
  .use(CellGroup)
  .use(Field)
  .use(Button)
  .use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
