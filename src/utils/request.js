import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
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
    // 错误状态码400的时候,给出弹窗提示
    Message.error((error && error.data && error.data.message) || error.message)
    return Promise.reject(error)
  }
)

export default service
