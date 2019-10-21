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

// 用户认证（登录注册）
export const login = (data) => request({ url: '/app/v1_0/authorizations', method: 'POST', data })

// 关注用户
export const followUser = (data) => request({ url: '/app/v1_0/user/followings', method: 'POST', data })

// 取消关注用户
export const unFollowUser = (userId) => request({ url: `/app/v1_0/user/followings/${userId}`, method: 'DELETE' })

// 获取用户自己信息
export const getSelf = (data) => request({ url: `/app/v1_0/user`, method: 'GET', data })

// 获取用户个人资料
export const getProfile = (data) => request({ url: '/app/v1_0/user/profile', method: 'GET', data })

// 更新用户头像
export const updateUserPhoto = (data) => request({ url: '/app/v1_0/user/photo', method: 'PATCH', data })

// 更新用户基本信息
export const updateUserProfile = (data) => request({ url: '/app/v1_0/user/profile', method: 'PATCH', data })
