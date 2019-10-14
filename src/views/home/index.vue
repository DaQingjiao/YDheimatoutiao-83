<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" />

    <!-- 标签栏 -->
    <van-tabs>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <van-list v-model="channels.loading" :finished="channels.finished" finished-text="没有更多了"
          @load="onLoad">
          <van-cell v-for="item in channels.articles" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { list as channelList } from '@/api/channel'
export default {
  name: 'homeIndex',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      channels: [] // 频道列表
    }
  },
  methods: {
    onLoad () {
      const activeChannel = this.channels[this.active]
      // 1.请求获取数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          // 2.将数据添加到' 当前频道.articles ' 中
          activeChannel.articles.push(activeChannel.articles.length + 1)
        }
        // 3.结束本次loading
        activeChannel.loading = false

        // 4.判断数据是否已全部加载结束，如没有数据，则将 finish 设置为 true
        if (activeChannel.articles.length >= 40) {
          activeChannel.finished = true
        }
      }, 500)
    },
    // 用户频道列表
    async loadChannels () {
      const { data } = await channelList()
      // 定制频道的内容数据
      data.data.channels.forEach(item => {
        // 频道的文章列表
        item.articles = [0]

        // 频道的上拉加载更多的loading状态
        item.loading = false

        // 频道的加载结束的状态
        item.finished = false
      })
      this.channels = data.data.channels
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style>
</style>
