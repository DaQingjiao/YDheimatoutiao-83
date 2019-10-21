<template>
  <div class="search">
    <!-- 搜索框 -->
    <van-search v-model="searchText" placeholder="请输入搜索关键词" show-action shape="round"
      @search="onSearch(searchText)" @input="SearchInput">
      <div slot="action" @click="onSearch(searchText)">搜索</div>
      <van-icon @click="$router.back()" class="search-icon" slot="label" name="arrow-left"
        size="16px" />
    </van-search>
    <van-cell-group>
      <!-- 联想建议 -->
      <van-cell @click="onSearch(item)" v-for="(item,index) in suggestionList" :key="index"
        :title="item" icon="search">
        <div v-html="highlight(item)" slot="title"></div>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <!-- 搜索历史列表 -->
      <van-cell class="history-span" title="历史记录">
        <span v-show="isDeleteShow" @click="searchHistory = []" class="delSpan">全部删除</span>
        <span v-show="isDeleteShow" @click="isDeleteShow = false" class="wanSpan">完成</span>
        <van-icon @click="isDeleteShow = true" v-show="!isDeleteShow" name="delete" />
      </van-cell>
      <van-cell @click="onSearch(item)" v-for="(item,index) in searchHistory" :key="index"
        :title="item">
        <van-icon @click="searchHistory.splice(index,1)" v-show="isDeleteShow" name="close" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { searchAdvice } from '@/api/search'
import { getItem, setItem } from '@/utils/storage'
import { debounce } from 'lodash'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '', // 输入的文本
      suggestionList: [], // 联想建议列表
      searchHistory: getItem('Search-History') || [],
      isDeleteShow: false
    }
  },
  watch: {
    searchHistory (newVal) {
      setItem('Search-History', newVal)
    }
  },
  methods: {
    // 搜索记录本地存储
    onSearch (str) {
      const index = this.searchHistory.indexOf(str)
      if (index !== -1) {
        this.searchHistory.splice(index, 1) // 移除元素
      }
      this.searchHistory.unshift(str) // 前面添加

      setItem('Search-History', this.searchHistory) // 持久化本地存储

      this.$router.push(`/search/${str}`) // 跳转到搜索结果页
    },
    // 获取搜索结果列表
    SearchInput: debounce(async function () {
      const searchText = this.searchText.trim() // 移除两边的空字符

      if (!searchText) { // 判断searchText是否为空,如为空，则让联想列表为空
        this.suggestionList = []
        return
      }
      const { data } = await searchAdvice({ q: searchText })
      const suggestionList = data.data.options
      // -----------------
      // new RegExp(pattern, attributes); 表示正则表达式
      // pattern-正则表达式的模式的字符串
      // attributes-可选字符串，包含属性 "g"、"i" 和 "m"，分别用于指定全局匹配、区分大小写的匹配和多行匹配。
      // const reg = new RegExp(searchText, 'g')
      // suggestionList.forEach((item, index) => {
      //   // replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
      //   suggestionList[index] = item.replace(reg, `<span style="color:red">${searchText}</span>`)
      // })
      // -----------------
      this.suggestionList = suggestionList
    }, 500),
    // 高亮处理
    highlight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color: red">${this.searchText}</span>`)
    }
  }
}
</script>

<style lang="less" scoped>
.van-search {
  padding: 10px 10px 10px 40px;
  .search-icon {
    margin-left: -40px;
    vertical-align: middle;
  }
}
.history-span {
  position: relative;
  .delSpan {
    position: absolute;
    right: 50px;
  }
  .wanSpan {
    position: absolute;
    right: 0px;
  }
}
</style>
