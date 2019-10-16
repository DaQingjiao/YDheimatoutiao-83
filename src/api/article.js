//  文章接口相关请求模块

import request from '@/utils/request'

export const article = (params) => request({ url: '/app/v1_1/articles', method: 'GET', params })
