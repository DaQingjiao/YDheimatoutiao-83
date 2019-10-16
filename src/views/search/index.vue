<template>
  <div class="search">
    <van-search v-model="searchText" placeholder="请输入搜索关键词" show-action shape="round"
      @search="onSearch" @input="Search">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <van-cell-group>

    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    onSearch () {
      console.log('123')
    },
    Search () {
      console.log('123')
    }
  }
}
</script>

<style>
</style>
