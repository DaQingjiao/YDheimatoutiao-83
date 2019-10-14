// 用户相关接口模块

// 遵循一个原则：不直接在组件中发送请求，都封装成函数进行调用
// 好处：1.易于维护 2.可统一管理 3.可重用
import request from '@/utils/request'

// export const login = (data) => {
//   return request({
//     url: '/app/v1_0/authorizations',
//     method: 'POST',
//     data
//   })
// }

// 简写
export const login = (data) => request({ url: '/app/v1_0/authorizations', method: 'POST', data })
