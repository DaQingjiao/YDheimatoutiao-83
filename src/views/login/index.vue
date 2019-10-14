<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <ValidationObserver ref="loginForm">
      <!-- 手机号和验证码 -->
      <van-cell-group class="btn-wrap">
        <!-- name-提示文本 rules-验证规则 required-必填项 v-slot="{ errors }"-获取校验结果数据
        errors[0]-读取校验结果的失败信息 -->
        <ValidationProvider name="手机号" rules="required|phone" v-slot="{ errors }">
          <van-field v-model="user.mobile" required clearable label="手机号" placeholder="请输入手机号"
            :error-message="errors[0]" />
        </ValidationProvider>

        <ValidationProvider name="验证码" rules="required|max:6|min:6" v-slot="{ errors }">
          <van-field v-model="user.code" type="password" label="验证码" placeholder="请输入验证码"
            :error-message="errors[0]" required />
        </ValidationProvider>
      </van-cell-group>
    </ValidationObserver>
    <!-- 登录 -->
    <div class="btn-wrap">
      <van-button @click="goLogin" class="btn" type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { setItem } from '@/utils/storage'
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
      // 表单验证
      const isValid = await this.$refs.loginForm.validate()
      // 如验证失败，则不提交表单
      if (!isValid) {
        return
      }
      // toast.clear() 清除loading：如后面有success\fail之类，不需要手动关闭loading
      this.$toast.loading({
        // 持续展示 toast
        duration: 0,
        // 禁用背景点击
        forbidClick: true,
        loadingType: 'spinner',
        message: '登录中'
      })
      // try语句 是进行错误代码测试
      // 当try代码发生错误时，执行catch语句代码块
      try {
        // 请求提交表单数据
        const res = await login(this.user)

        // 登录成功，将token存储到VueX容器中
        this.$store.commit('setUser', res.data.data)

        // 将token本地存储
        setItem('user', res.data.data)

        this.$toast.success(res.data.message)
      } catch (err) {
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
