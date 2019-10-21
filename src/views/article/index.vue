<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="文章详情"></van-nav-bar>
    <!-- 加载中 loading -->
    <van-loading class="article-loading" v-if="loading" />
    <!-- 文章详情 -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image round width="2rem" height="2rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate | relativeTime }}</p>
        </div>
        <van-button @click="clickFocus" size="mini" type="info"
          :class="{buttonColor:article.is_followed}">
          {{ article.is_followed ? '已关注' : '+ 关注' }}
        </van-button>
      </div>
      <div class="content" v-html="article.content"></div>
      <!-- 文章评论 -->
      <article-comment ref="addPl" :article-id="$route.params.articleId" />

      <!-- 底下评论 -->
      <van-tabbar border fixed>
        <van-search v-model="commentText" placeholder="写评论..." show-action shape="round">
          <van-icon slot="left-icon" name="edit" size="23px" />
          <div class="pl-Icon" slot="action">
            <van-icon name="chat-o" size="25px" />
            <van-icon name="star-o" size="25px" />
            <van-icon @click="clickKan" :class="{iconZan:zanColor}" name="good-job-o" size="25px" />
            <van-icon @click="onAddComment" name="passed" size="25px" />
          </div>
        </van-search>
      </van-tabbar>
    </div>

    <!-- 加载失败的消息提示 -->
    <div class="error" v-else>
      <p>网络超时，点击 <a href="#" @click.prevent="articlesDetails">刷新</a> 试一试。</p>
    </div>
  </div>
</template>

<script>
import { getArticles, addLike, deleteLike } from '@/api/article'
import { followUser, unFollowUser } from '@/api/user'
import ArticleComment from './components/article-comment'
import { addComment } from '@/api/comment'
export default {
  name: 'ArticleIndex',
  components: {
    'article-comment': ArticleComment
  },
  data () {
    return {
      zanColor: null,
      loading: true, // 控制加载中的 loading 状态
      article: { // 文章详情
        title: '',
        content: '',
        aut_name: '',
        pubdate: '',
        aut_photo: ''
      },
      commentText: '',
      list: []
    }
  },
  created () {
    this.articlesDetails()
  },
  methods: {
    // 发布评论
    async onAddComment () {
      // 获取评论内容
      const commentText = this.commentText.trim()
      if (!commentText) {
        return
      }

      // 请求提交
      const { data } = await addComment({
        target: this.$route.params.articleId, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
        content: commentText // 评论内容
        // art_id // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
      })

      // 将最新的评论传给子组件
      this.$refs.addPl.addList(data.data.new_obj)

      // 清空文本框
      this.commentText = ''
    },

    // 用户点赞
    async clickKan () {
      const id = this.article.art_id.toString()
      if (this.article.attitude === 1) { // 如果已赞，则取消点赞
        await deleteLike(id)
        this.article.attitude = -1
        this.zanColor = false
      } else { // 否则点赞
        await addLike({ target: id })
        this.article.attitude = 1
        this.zanColor = true
      }
    },

    // 点击关注
    async clickFocus () {
      if (this.article.is_followed) { // 如已关注，则取消关注
        await unFollowUser(this.article.aut_id)
      } else { // 如未关注，则关注
        await followUser({ target: this.article.aut_id })
      }
      this.article.is_followed = !this.article.is_followed
    },

    // 获取文章详情
    async articlesDetails () {
      this.loading = true // 开启loading
      try {
        const id = this.$route.params.articleId // 获取id
        const { data } = await getArticles(id)
        this.article = data.data
      } catch (err) {
        console.log(err)
      }
      this.loading = false // 关闭loading
    }
  }

}
</script>

<style scoped lang='less'>
.article-container {
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.article-loading {
  padding-top: 100px;
  text-align: center;
}
.error {
  padding-top: 100px;
  text-align: center;
  color: #666;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
    .buttonColor {
      background-color: #fff;
      color: #999;
      border: 1px solid #999;
    }
  }
  .content {
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
  }
  .pl-Icon {
    margin-top: 10px;
    margin-left: 10px;
    .van-icon {
      margin-right: 12px;
    }
    .iconZan {
      color: rgb(255, 176, 7);
    }
  }
}
</style>
