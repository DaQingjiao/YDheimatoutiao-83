<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" />

    <!-- 标签栏 -->
    <van-tabs v-model="active">
      <!-- 频道列表 -->
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 文章列表 -->
        <!-- loading-控制上拉加载更多  finished-控制是否已加载结束 -->
        <!-- finished-text -加载结束提示文本  @load="onLoad" -上拉加载更多触发事件,组件初始化时自动触发 -->
        <van-list v-model="item.loading" :finished="item.finished" finished-text="没有更多了"
          @load="onLoad">
          <!-- 列表内容 -->
          <van-cell v-for="it in item.articles" :key="it" :title="it" />
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
      active: 0, // 标签页对应的索引
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
        // 每次数据加载完毕，van-cell都会判断是否满屏，如未满，则继续onLoad加载
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
        item.articles = []

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
