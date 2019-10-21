<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item, index) in list" :key="index" :title="item.aut_name">
        <van-image slot="icon" round width="30" height="30" :src="item.aut_photo" />
        <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{ item.content }}</p>
          <p>
            <span class="p-span">{{ item.pubdate | relativeTime }}</span>
            <van-button @click="onReplyShow(item)" size="mini" type="default">回复
              {{ item.reply_count }}
            </van-button>
            <van-popup v-model="isReplyShow" round position="bottom" :style="{ height: '90%' }">
              <comment-reply v-if="isReplyShow" :comment="currentComment"
                @close="isReplyShow = false" />
            </van-popup>
          </p>
        </div>
        <van-icon @click="onCommentLike(item)" class="Icon-color"
          :name="item.is_liking ? 'like' : 'like-o'" slot="right-icon" size="18px" />
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getComments, addCommentLike, deleteCommentLike } from '@/api/comment'
import CommentReply from './comment-reply'
export default {
  name: 'ArticleComment',
  components: {
    'comment-reply': CommentReply
  },
  props: ['articleId'],
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      limit: 10,
      isReplyShow: false,
      currentComment: {}
    }
  },

  methods: {
    // 展示回复弹层
    onReplyShow (comment) {
      this.currentComment = comment
      this.isReplyShow = true
    },
    // 评论点赞/取消评论点赞
    async onCommentLike (comment) {
      const commentId = comment.com_id.toString()
      // 如果已点赞，则取消点赞
      if (comment.is_liking) {
        await deleteCommentLike(commentId)
      } else {
        // 否则，点赞
        await addCommentLike({ target: commentId })
      }
      comment.is_liking = !comment.is_liking
    },

    // 父传评论数据
    addList (p) {
      this.list.unshift(p)
    },

    // 评论列表
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getComments({
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.$route.params.articleId, // 源id，文章id或评论id
        offset: this.offset // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        // limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      })

      // 2. 将数据添加到数组中
      this.list.push(...data.data.results)

      // 3. 结束 loading
      this.loading = false

      // 4. 判断是否加载结束
      //    如果还有数据，则更新获取下一页数据的页码（offset）
      //    如果没有数据，则 finished = true
      if (data.data.results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.van-image {
  margin-right: 10px;
}
.van-list {
  margin-bottom: 45px;
  .Icon-color {
    color: #3196fa;
  }
}
.p-span {
  margin-right: 10px;
}
</style>
