import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/date'
import '@/styles/index.less'
import {
  NavBar,
  Cell,
  CellGroup,
  Field,
  Button,
  Toast,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  List,
  PullRefresh,
  Search,
  Grid,
  GridItem,
  Image,
  Icon,
  Lazyload,
  Popup,
  Loading,
  DatetimePicker,
  ActionSheet,
  Dialog
} from 'vant' // 导入组件
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate' // 导入组件
import zhCN from 'vee-validate/dist/locale/zh_CN' // 加载验证插件的语言包
import * as rules from 'vee-validate/dist/rules'

// 配置使用中文语言
for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: zhCN.messages[rule] // add its message
  })
}

// 注册为全局组件
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// 扩展自定义校验规则
// extend('规则名称', 配置对象)
extend('phone', {
  // 验证方法：value为需要校验的数据，返回一个布尔值，表示验证是否成功
  validate: function (value) {
    return /^1\d{10}$/.test(value)
  }, // 添加规则
  message: '请输入有效的手机号码' // 错误提示信息
})

// 注册全局共享
Vue
  .use(NavBar)
  .use(Cell)
  .use(CellGroup)
  .use(Field)
  .use(Button)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(PullRefresh)
  .use(Search)
  .use(Grid)
  .use(GridItem)
  .use(Image)
  .use(Icon)
  .use(Lazyload)
  .use(Popup)
  .use(Loading)
  .use(DatetimePicker)
  .use(ActionSheet)
  .use(Dialog)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
