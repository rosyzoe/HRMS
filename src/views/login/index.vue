<template>
  <!-- 容器 -->
  <div class="login-container">
    <!-- 登录表单区域 -->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <!-- 顶部logo区域 -->
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/images/login-logo.png" alt="" />
        </h3>
      </div>

      <!-- 手机号 -->
      <el-form-item prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="mobile"
          v-model="loginForm.mobile"
          placeholder="请输入手机号"
          name="mobile"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button
        class="login_btn"
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >

      <!-- 底部文字提示 -->
      <div class="tips">
        <span style="margin-right: 20px">account: 13800000002</span>
        <span> password: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validMobile } from '@/utils/validate'
import { userLoginAPI } from '@/api'

export default {
  name: 'Login',
  data() {
    // 自定义校验手机号
    const validateMobile = (rule, value, callback) => {
      if (!validMobile(value)) {
        callback(new Error('请输入正确的手机号!'))
      } else {
        callback()
      }
    }

    return {
      // 用户登录信息
      loginForm: {
        mobile: '13800000002',
        password: '123456'
      },
      // 登录表单的校验规则
      loginRules: {
        mobile: [
          { required: true, trigger: 'blur', validator: validateMobile }
        ],
        password: [{ required: true, trigger: 'blur', min: 6, max: 16 }]
      },
      // 控制登录按钮的加载状态
      loading: false,
      // 密码的状态
      passwordType: 'password',
      redirect: undefined
    }
  },

  watch: {
    // 监听路由的改变
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },

  methods: {
    // 显示密码
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    // 点击登录按钮
    handleLogin() {
      // 表单兜底校验
      this.$refs.loginForm.validate(async (valid) => {
        // 判断表单是否全部通过验证
        if (valid) {
          // 开启登录按钮的加载状态
          this.loading = true

          // 放入可能报错的代码
          try {
            // 调用请求接口
            const res = await userLoginAPI(this.loginForm)
            console.log(res)
            this.$store.commit('user/SET_TOKEN', res.data)
          } catch (error) {
            console.dir(error)
          }
        } else {
          // 返回false,直接将登录表单标红
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #68b0fe; // 将输入框颜色改成蓝色
$cursor: #68b0fe; // 将输入框光标改成蓝色

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: unset;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    color: #454545;
  }

  .el-form-item__error {
    font-size: 14px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url('~@/assets/images/login.jpg') no-repeat center center;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .login_btn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }
}
</style>
