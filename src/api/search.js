// 搜索相关接口模块

import request from '@/utils/request'

// 获取联想建议
export const searchAdvice = (params) => request({ url: '/app/v1_0/suggestion', method: 'GET', params })

// 获取搜索结果
export const searchList = (params) => request({ url: '/app/v1_0/search', method: 'GET', params })
