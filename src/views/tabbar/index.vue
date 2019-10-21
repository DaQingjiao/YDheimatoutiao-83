<template>
  <div>
    <!-- 路由入口 -->
    <router-view />

    <!-- 底部导航栏 -->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="question-o">问答</van-tabbar-item>
      <van-tabbar-item icon="tv-o">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tabbarIndex'
}
</script>

<style>
</style>
