<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed />

    <!-- 标签栏 -->
    <van-tabs v-model="active">
      <!-- 面包按钮 -->
      <div slot="nav-right" class="wap-nav" @click="isChannelEditShow = true">
        <van-icon name="wap-nav" size="24" />
      </div>
      <!-- 面包线弹出层 -->
      <van-popup v-model="isChannelEditShow" round position="bottom" :style="{ height: '90%' }"
        closeable close-icon-position="top-left">
        <div class="channel-container">
          <van-cell title="我的频道" :border="false">
            <van-button type="danger" size="mini">编辑</van-button>
          </van-cell>
          <!-- :gutter 间距 -->
          <van-grid :gutter="10">
            <van-grid-item v-for="value in 8" :key="value" text="文字" />
          </van-grid>

          <van-cell title="推荐频道" :border="false" />
          <van-grid :gutter="10">
            <van-grid-item v-for="value in 8" :key="value" text="文字" />
          </van-grid>
        </div>
      </van-popup>

      <!-- 频道列表 -->
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="item.isPullDownLoading" @refresh="onRefresh">
          <!-- 文章列表 -->
          <!-- loading-控制上拉加载更多  finished-控制是否已加载结束 -->
          <!-- finished-text -加载结束提示文本  @load="onLoad" -上拉加载更多触发事件,组件初始化时自动触发 -->
          <van-list v-model="item.loading" :finished="item.finished" finished-text="没有更多了"
            @load="onLoad">
            <!-- 列表内容 -->
            <van-cell v-for="(it,index) in item.articles" :key="index" :title="it.title">
              <div slot="label">
                <van-grid :border="false" :column-num="3">
                  <van-grid-item v-for="(img, index) in it.cover.images" :key="index">
                    <van-image height="80" :src="img" lazy-load />
                  </van-grid-item>
                </van-grid>
                <div>
                  <div class="meta">
                    <span>{{ it.aut_name }}</span>
                    <span>{{ it.comm_count }}评论</span>
                    <span>{{ it.pubdate | relativeTime }}</span>
                  </div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { list as channelList } from '@/api/channel'
import { article as articleList } from '@/api/article'
export default {
  name: 'homeIndex',
  data () {
    return {
      active: 0, // 标签页对应的索引
      channels: [], // 频道列表
      isChannelEditShow: false
    }
  },
  methods: {
    // 下拉刷新请求加载数据
    async onRefresh () {
      const activeChannel = this.channels[this.active] // 获取当前点击的频道对象
      // 1.请求获取数据-频道文章列表
      const params = {
        channel_id: activeChannel.id,
        timestamp: Date.now(),
        with_top: 1
      }
      const { data } = await articleList(params)

      // 2.将数据添加到' 当前频道.articles ' 中
      activeChannel.articles.unshift(...data.data.results)

      // 3.关闭下拉刷新的 loading 状态
      activeChannel.isPullDownLoading = false

      // 4.提示
      this.$toast('刷新成功')
    },

    // 获取文章列表
    async onLoad () {
      const activeChannel = this.channels[this.active] // 获取当前点击的频道对象
      // 1.请求获取数据-频道文章列表
      const params = {
        channel_id: activeChannel.id,
        timestamp: activeChannel.timestamp || Date.now(),
        with_top: 1
      }
      const { data } = await articleList(params)

      // 2.将数据添加到' 当前频道.articles ' 中
      activeChannel.articles.push(...data.data.results)

      // 3.结束本次loading (每次数据加载完毕，van-cell都会判断是否满屏，如未满，则继续onLoad加载)
      activeChannel.loading = false

      // 4.判断数据是否已全部加载结束，如有数据，则更新获取下一页数据的时间戳，如没有数据了，则将 finish 设置为 true
      if (data.data.pre_timestamp) {
        activeChannel.timestamp = data.data.pre_timestamp
      } else {
        activeChannel.finished = true
      }
    },
    // 用户频道列表
    async loadChannels () {
      const { data } = await channelList()
      // 定制频道的内容数据
      data.data.channels.forEach(item => {
        item.articles = [] // 频道的文章列表

        item.loading = false // 频道的上拉加载更多的loading状态

        item.finished = false // 频道的加载结束的状态

        item.timestamp = null // 存储获取频道下一页的时间戳

        item.isPullDownLoading = false // 存储频道的下拉刷新 loading 状态
      })
      this.channels = data.data.channels
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style lang="less" scoped>
.home {
  .van-tabs {
    .wap-nav {
      position: fixed;
      right: 16px;
      top: 55px;
      display: flex;
      align-items: center;
      background-color: #fff;
    }
    .channel-container {
      margin-top: 40px;
    }
    /deep/ .van-tabs__wrap--scrollable {
      position: fixed;
      top: 46px;
      left: 0;
      right: 16px;
      z-index: 2;
    }
    /deep/ .van-tabs__content {
      margin-top: 90px;
      .meta span {
        margin-right: 10px;
      }
    }
  }
}
</style>
