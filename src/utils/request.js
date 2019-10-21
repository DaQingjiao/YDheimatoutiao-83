import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'
import router from '@/router' // 非组件模块中使用容器，就直接加载即可
import { promised } from 'q'

// axios.create 方法 ：复制axios，拥有和axios完全相同的功能，只是配置不同
// 可创建多个请求对象，而不同的请求对象拥有不同的 baseURL
// 如有请求有 a 请求拦截器，可以制定不同请求器
const request = axios.create({
  // 请求的基础路径
  baseURL: 'http://ttapi.research.itcast.cn'
})

request.defaults.transformResponse = [(data) => {
  // 配置处理后端返回数据中超出 js 安全整数范围问题
  return data ? JSONbig.parse(data) : {} // 转换方法：使得大数字计算更加精准，确保id不失真
}]

// ----------请求拦截器
request.interceptors.request.use(function (config) {
  // 获取token
  const user = store.state.user
  if (user) {
    // 将token加入到请求头中-config:发送请求的配置信息
    config.headers['Authorization'] = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求失败做处理
  return promised.reject(error)
})
// ----------请求拦截器

// ----------响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  // 如状态码为401
  // console.dir(error.config) 有之前请求失败的数据
  if (error.response && error.response.status === 401) {
    const { user } = store.state
    if (!user) { // 如没有user，则直接跳转登录页
      router.push(`/login?redirect = router.currentRoute.fullPath`) // 登录返回之前页面
      // =====================
      // router.push({
      //   name: 'login',
      //   query: {
      //     redirect: router.currentRoute.fullPath
      //     // foo: 'bar'
      //   }
      // })
      // =====================
    } else { // 如有user,则请求获取新的token
      try {
        const { data } = await axios({
          url: '/app/v1_0/authorizations',
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })

        store.commit('setUser', { // 将最新的token，替换原有token
          token: data.data.token,
          refresh_token: user.refresh_token // 原来的refresh_token
        })

        return request(error.config) // 继续完成之前失败的请求
      } catch (err) { // 如没有refresh_token,则只能重新登录
        router.push(`/login?redirect = router.currentRoute.fullPath`)
      }
    }
  }
  // 如refresh_token, 则请求刷新token
  return promised.reject(error)
})
// ----------响应拦截器
export default request
