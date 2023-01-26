import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // 统一携带请求头
    const token = store.getters.token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    // 用户登录: 根据返回的success字段判断用户是否登录成功,true表示成功,false表示失败
    const { success, message } = response.data
    if (success) {
      // 登录成功,返回数据
      return response.data
    } else {
      // 登录失败,弹窗提示并返回错误信息
      Message.error(message)
      return Promise.reject(message)
    }
  },
  (error) => {
    console.dir(error)
    // 错误状态码400的时候,给出弹窗提示
    Message.error(
      (error.response && error.response.data && error.response.data.message) ||
        error.message
    )

    // 根据返回的code码判断用户token是否已过期
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 10002
    ) {
      // 移除本地和vuex中的token
      store.commit('user/RESET_TOKEN')
      // 重置用户基本资料
      store.commit('user/RESET_USERINFO')
      // 跳转到登录页
      router.replace(`/login?redirect=${router.currentRoute.fullPath}`) // 未遂地址
    }
    return Promise.reject(error)
  }
)

export default service
