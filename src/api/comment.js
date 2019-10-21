// 评论接口相关请求模块

import request from '@/utils/request'

// 获取文章评论列表
export const getComments = (params) => request({ url: '/app/v1_0/comments', method: 'GET', params })

// 发布评论
export const addComment = (data) => request({ url: '/app/v1_0/comments', method: 'POST', data })

// 文章评论点赞
export const addCommentLike = (data) => request({ url: '/app/v1_0/comment/likings', method: 'POST', data })

// 取消对评论点赞
export const deleteCommentLike = (commentId) => request({ url: `/app/v1_0/comment/likings/${commentId}`, method: 'DELETE' })
