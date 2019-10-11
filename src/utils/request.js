import axios from 'axios'
import JSONbig from 'json-bigint'
// axios.create 方法 ：复制axios，拥有和axios完全相同的功能，只是配置不同
// 可创建多个请求对象，而不同的请求对象拥有不同的 baseURL
// 如有请求有 a 请求拦截器，可以制定不同请求器
const request = axios.create({
  // 请求的基础路径
  baseURL: 'http://ttapi.research.itcast.cn'
})
request.defaults.transformResponse = [(data) => {
  // 配置处理后端返回数据中超出 js 安全整数范围问题
  return data ? JSONbig.parse(data) : {} // 转换方法：使得计算更加精准，确保id不失真
}]
export default request
