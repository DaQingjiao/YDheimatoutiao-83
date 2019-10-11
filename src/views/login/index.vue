<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 手机号和验证码 -->
    <van-cell-group class="btn-wrap">
      <van-field v-model="user.mobile" required clearable label="手机号" placeholder="请输入手机号" />

      <van-field v-model="user.code" type="password" label="验证码" placeholder="请输入验证码" required />
    </van-cell-group>
    <!-- 登录 -->
    <div class="btn-wrap">
      <van-button @click="goLogin" class="btn" type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async goLogin () {
      try {
        // 请求提交表单数据
        let res = await request({
          url: '/app/v1_0/authorizations',
          method: 'POST',
          data: this.user
        })
        this.$toast.success(res.data.message)
      } catch (err) {
        console.log(err)
        if (err.response && err.response.status === 400) {
          this.$toast.fail('登录失败，手机号或验证码错误')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn-wrap {
  padding: 20px;
  .btn {
    width: 100%;
  }
}
</style>
