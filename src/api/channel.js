// 频道相关接口模块

import request from '@/utils/request'

// 用户频道列表
export const list = () => request({ url: '/app/v1_0/user/channels', method: 'GET' })
