//  文章接口相关请求模块

import request from '@/utils/request'
// 获取文章列表
export const article = (params) => request({ url: '/app/v1_1/articles', method: 'GET', params })

// 获取文章详情
export const getArticles = (articleId) => request({ url: `/app/v1_0/articles/${articleId}`, method: 'GET' })

// 点赞
export const addLike = (data) => request({ url: '/app/v1_0/article/likings', method: 'POST', data })

// 取消点赞
export const deleteLike = (articleId) => request({ url: `/app/v1_0/article/likings/${articleId}`, method: 'DELETE' })
