// 搜索相关接口模块

import request from '@/utils/request'

// 获取联想建议
export const search = (params) => request({ url: '/app/v1_0/suggestion', method: 'GET', params })
