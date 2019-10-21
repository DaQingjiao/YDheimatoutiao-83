<template>
  <div id="app">
    <keep-alive :exclude="['ArticleIndex']">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>
