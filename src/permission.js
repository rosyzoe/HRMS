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
