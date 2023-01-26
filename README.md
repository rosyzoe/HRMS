# 1.项目初始化

```js
  1.拉取项目: git clone vue-element-template
  2.模板肃清: 删除不需要的的代码
  3.git: 删除自带的.git文件夹,git init初始化一个新的git文件夹,创建远程仓库,绑定并提交代码
  4.样式: 引入样式文件,common.sass&variables.sass,并引入到index.sass中实现使用
  5.图片资源: 引入公用的图片资源
```

# 2.登录模块

```js
  1.更换登录页面背景图片: login-container下设置
  2.重置登录表单的文字颜色和光标颜色
  3.重置登录按钮的样式
  4.修改表单内绑定的变量名:
      将username修改为 => mobile
      所有用到username的地方修改为mobile(表单,校验规则)
  5.自定义校验手机号: 将uitls下的validateUsername修改为 validMobile,接收一个手机号,使用正则判断是否符合规则
  6.在登录页引入validMobile,在data中,使用自定义校验,传入表单所绑定的值实现校验手机号,并向用户给出对应的提示
  7.将自定义校验密码方法删除,使用elementui自带的校验属性, min&max实现控制密码长度的功能
  8.修改.env.development环境文件内的VUE_APP_BASE_API: VUE_APP_BASE_API = '基础地址'
  9.src/api/user.js: 封装登录接口
  10.src/api文件夹下新建一个index.js,文件内引入user.js文件中所有被导出的方法,并按需导出
      export * from './user.js'
  11.登录组件中引入登录接口,在兜底验证通过后发起登录请求,兜底验证没有通过返回false将登录表单标红
  12.在登录组件中,使用try-catch将登录请求包起来,在响应拦截器中返回Promise.reject()错误对象,可以实现在try-catch中捕获错误
```

## 3.跨域

```js
  通过代理转发的方式解决跨域:
    1.将.env.development环境文件中将基础地址修改为: VUE_APP_BASE_API = '/api'
    2.在vue.config.js中配置:
        devServer: {
          proxy: {
            // /api: 表示请求地址以/api开头的时候就会触发代理机制
            "/api": {
              target: "需要代理的地址",
              changeOrigin: true // 是否开启跨域,需要设置此值为true才可以让本地服务代理我们发出请求
            }
          }
        }
```

## 4.拦截器

```js
在响应拦截器内根据返回的success字段来判断用户是否登录成功
const { success, message } = response.data // 解构出登录状态和描述信息

// success: true代表登录成功
if (success) {
  // 返回处理后的数据
  return response.data
} else {
  // 登录失败,提示弹窗并返回错误信息
  Message.error(message)
  return Promise.reject(message)
}
```

```js
利用请求拦截器统一携带请求头token

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
```

## 5.token 处理

```js
  1.将token保存到vuex中
      + src/store/user:
        const getDefaultState = () => {
        return {
          // token
          token: getToken()
        }
      }

      // 修改token
      + SET_TOKEN: (state, token) => {
        state.token = token
      }

  2.实现token持久化
  import { getToken, setToken, removeToken } from '@/utils/auth'

  const getDefaultState = () => {
    return {
      // token
      token: getToken() // 从本地取出token,实现持久化
    }
  }

  const state = getDefaultState()

  const mutations = {
    // 修改token
    SET_TOKEN: (state, token) => {
      state.token = token // 修改state
      setToken(token) // 向本地也存储一份
    },

    // 重置token
    RESET_TOKEN: (state) => {
      state.token = '' // 重置state内的token
      removeToken() // 移除本地中的token
    }
  }
```

## 6.登录模块优化

```js
在vuex中的actions发起登录请求
const actions = {
  // 用户登录
  async loginAction({ commit }, data) {
    // 获取返回的数据
    const res = await userLoginAPI(data)
    // 设置token
    commit('SET_TOKEN', res.data)
  }
}
```

## 7.配置环境变量

```js
  1.配置端口号

  .env.development文件中,添加port属性: port = 8888

  // vue.conifg.js
  // 运行npm run dev时: 如果生产环境文件内没有设置prot,则使用9528端口号
  // 运行npm run build:prod时: 如果生产环境文件内没有设置prot,则使用9528端口号
  const port = process.env.port || process.env.npm_config_port || 9528 // dev port

  // 在vue.config.js的devServer对象中,设置端口号
    devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
```

# 8.主页模块

## 1.登录成功后跳转到首页

```js
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
            + const res = await this.$store.dispatch(
              'user/loginAction',
              this.loginForm
            )

            // 登陆成功,提示弹窗
            + this.$message.success(res.message)

            // 跳转到首页
            + this.$router.replace('/')
          } catch (error) {
            console.dir(error)
          } finally {
            // 无论登陆成功还是失败,都将登录按钮的加载状态移除
            this.loading = false
          }
        } else {
          // 返回false,直接将登录表单标红
          return false
        }
      })
    }

    // vuex/user
    const actions = {
    /**
     * @param {object} data 用户登录信息: 手机号,密码
     */
    async loginAction({ commit }, data) {
      // 获取返回的数据
      const res = await userLoginAPI(data)
      // 设置token
      commit('SET_TOKEN', res.data)
      console.log('登陆成功')
      + return res // 返回请求到的数据
    }
  }
```

## 2.权限拦截控制和开启/关闭加载进度条

```js
import router from './router'
import store from './store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 白名单
const whiteList = ['/login', '/404']

router.beforeEach((to, from, next) => {
  nprogress.start() // 开启加载进度条

  // 从vuex中取出token
  const token = store.getters.token

  // 查看vuex中是否存有token,如果存有token代表用户已登录
  if (token) {
    // 判断已登录用户所要去的页面
    if (to.path === '/login') {
      // 如果已登录用户所要去的页面是登录页,则强制跳转到首页
      next('/')
      // 关闭进度条
      nprogress.done()
    } else {
      // 跳转到其他页面则放行
      next()
    }
  } else {
    // vuex中不存在token,代表用户未登录
    if (whiteList.includes(to.path)) {
      // 如果未登录用户所要去的页面存在于白名单内,则放行
      next()
    } else {
      // 白名单内不包含所要去的页面则跳转到登录页
      next('/login')
      // 关闭进度条
      nprogress.done()
    }
  }
})

router.afterEach(() => {
  // 关闭进度条
  nprogress.done()
})
```

## 3.修改主页左侧边栏的结构和样式

## 4.修改主页顶部导航的左侧结构和样式

## 5.修改主页顶部导航的右侧菜单的内容和样式

## 6.动态显示顶部导航右侧的用户名

      1.src/api: 封装获取用户基本资料的接口
      2.在vuex中设置保存用户资料的空对象
      3.增加修改和重置用户资料对象的mutations: SET_USERINFO, RESET_USERINFO
      4.新建获取用户基本资料的actions: getUserProfileAction
          将获取到的用户基本资料,通过SET_USERINFO修改state
      5.修改store/getters.js: name: (state) => state.user.userInfo.username
      6.将getters里的name变量映射到navBar组件, 并使用
      6.在路由前置守卫里判断getteers中的name变量是否存在, 如果不存在则在路由跳转之前(next函数前),派发action获取用户基本资料并通过mutations修改state实现设置资料

## 7.token 的过期的处理

    当过了一段时间后,token会自动过期(后端控制)
    前端可以通过后端提供的字段来判定token是否过期,例如状态码,code码
    在响应拦截器中,获取错误信息,通过返回的code码来判定token是否过期
    如果tokne已过期: 引入vuex实例,调用移除token和重置用户资料的mutations,然后强制跳转到登录页实现过期处理

## 8.需求: 主页顶部导航右侧显示头像

    1.src/api/user.js: 定义获取员工基本信息的接口(这里只为了获取员工头像)
    2.store/modules/user.js: 引入获取员工基本信息接口,在获取用户基本资料的actions中,调用并传入用户资料中的id,获取数据
    3.将获取到的员工基本信息和用户基本资料合并在一起,然后通过mutations保存到state
    4.store/getters.js: 设置快捷访问 avatar: (state) => state.user.userInfo.staffPhoto
    5.在navBar组件中使用此计算属性实现动态显示头像
