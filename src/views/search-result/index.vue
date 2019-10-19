<template>
  <div class="search-result">
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.params.q+'-的搜索结果'" left-arrow fixed @click-left="$router.back()" />
    <!-- 文章列表 -->
    <van-list class="search-list" v-model="loading" :finished="finished" finished-text="没有更多了"
      @load="onLoad">
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title">
        <div slot="label">
          <van-grid :border="false" :column-num="3">
            <van-grid-item v-for="(img, index) in item.cover.images" :key="index">
              <van-image height="80" :src="img" lazy-load />
            </van-grid-item>
          </van-grid>
          <div>
            <div class="meta">
              <span>{{ item.aut_name }}</span>
              <span>( {{ item.comm_count }} )评论</span>
              <span>{{ item.pubdate | relativeTime }}</span>
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { searchList } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [], // 搜索结果列表
      loading: false,
      finished: false,
      params: {
        page: 1,
        per_page: 10,
        q: this.$route.params.q
      }
    }
  },
  methods: {
    async onLoad () {
      //  1.请求获取数据
      const { data } = await searchList(this.params)

      // 2.将数据添加到List中
      this.list.push(...data.data.results)
      // 3.结束loading
      this.loading = false
      // 4. 判断是否还有数据
      if (data.data.results) {
        this.params.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-list {
  margin-top: 46px;
  .meta span {
    margin-right: 10px;
  }
}
</style>
