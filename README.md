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

## 9.需求: 主页顶部导航右侧菜单点击退出实现主动退出登录

    1.store/modules/user.js: 新建退出的actions(logoutAction),通过调用RESEET_TOKEN和RESET_USERINFO这两个mutation, 实现重置token为空字符串和重置用户基本资料为空对象
    2.navBar组件: 新建logout函数,当点击右侧菜单中的退出按钮时触发
    3.logout函数中引入this.$confirm提示组件,点击确定退出后,开始派发vuex中退出登录的action,并跳转到登录页面,点击取消时提示已取消退出

## 10.需求: 实现登录未遂地址

    想要实现登录未遂功能首先要搞清楚$route中的fullPath和path属性
    path: 只记录了当前的路径地址,例如: /info
    fullPath: 记录了当前的完整路径地址和参数,例如: /info?username=aaa&age=10

    1.在主动退出和被动退出(token过期)登录时,需要通过this.$route或router记录下来当前路径信息,然后携带到首页
       主动退出:  this.router.replace(`/login?redirect=${this.$route.fullPath}`)
       被动退出:  router.replace(`/login?redirect=${router.currentRoute.fullPath}`) // 未遂地址
    2.在首页登录成功后,判断一下是否有登录未遂地址,如果有就跳转到未遂地址,没有则正常进入首页
        this.router.replace(this.router.query.redirect || "/")

# 9.路由

## 1.理解静态路由表和动态路由表

    静态路由表：不需要做权限控制的路由，每个用户都可以正常访问。
    动态路由表：需要做权限控制的路由，用户如果权限不一致访问到的路由也不一样。

## 2.拆分静态和动态路由表

```js
// 动态路由表，项目中不同的用户可以访问不同的功能
export const asyncRoutes = [
  // 先空着这里，后面来补充功能
]

// 静态路由表，项目中每个用户都可以访问的功能
export const constantRoutes = [
  // 省略....
]

const createRouter = () =>
  new Router({
    // 控制路由滚动行为  滚动到顶部
    scrollBehavior: () => ({ y: 0 }),
    // 组合到一起组成路由表
    routes: [...constantRoutes, ...asyncRoutes]
  })
```

## 3.创建其他 8 个功能页面并配置路由到动态路由表

```js
export const asyncRoutes = [
  {
    path: '/approvals', // 审批
    component: Layout,
    children: [
      {
        path: '',
        name: 'Approvals',
        component: () => import('@/views/approvals'),
        meta: { title: '审批' }
      }
    ]
  }
]
```

## 4.模块化管理动态路由

```js
// 对router.js路由表中的动态路由进行物理目录拆分，实现真正的**模块化**管理
// 把每一个路由配置单独写在一个文件中，然后再统一导入使用
// src/router: 新建modules文件夹,文件夹内创建八个.js的路由文件
//  创建路由文件
echo > departments.js

// 文件内容
import Layout from '@/layout'

// Layout 组件中包含
export default {
  path: '/approvals', // 路径
  component: Layout, // 组件
  children: [
    {
      path: '', // 这里当二级路由的 path 什么都不写的时候 表示当前路由为默认路由直接渲染对应组件
      name: 'Approvals', // 给路由规则加一个 name
      component: () => import('@/views/approvals'),
      // 路由元信息 其实就是存储数据的对象 我们可以在这里放置一些信息
      meta: { title: '审批' }
    }
  ]
}
```

## 5.设置菜单图标

## 6.设置菜单选中高亮

## 7.动态设置网页标题

# 10.组织架构模块

## 1.搭建页面布局:

          卡片主容器
            tab选项卡
            头部导航: 左: 公司名 右: 管理员 操作选项
            树形控件

## 2.渲染静态数据

## 3.封装获取部门列表的接口,在组织架构页面引入,在 mounted 生命周期函数中调用接口,将请求回来的数据保存到 data,并动态渲染

## 4.src/views/departments 下: 新建 component 文件夹并创建 departDialog.vue 弹出框组件

      1.搭建dialog弹出框的基本布局结构和内容
      2.引入到组织架构页面并使用
      3.利用组件通信实现弹出框的显示和关闭
      4.搭建dialog组件的表单布局
      5.封装获取部门负责人列表接口&动态渲染到下拉菜单中

## 5.需求: 新增部门功能

      1.封装新增部门接口
      2.在dialog弹框组件中将输入的表单信息通过组件通信传入到组织架构父组件
      3.组织架构页面接收传递过来的表单数据
      4.在接收传递过来的表单数据的自定义方法中,调用新增部门接口,并将传递过来的表单信息传入到接口
          还需要另外一个参数: pid, 在点击添加部门时,已经传入了一个对象,里面有pid, 将pid保存到data,实现公用
      5.新增部门完成后,重新调用请求组织架构列表数据的接口,实现页面刷新功能

## 6.需求: 编辑部门功能

      1.点击部门对应的编辑按钮,将部门数据回显到表单
      2.实现步骤:
          封装根据部门id获取部门信息数据的接口
          在点击编辑部门按钮之后进行调用接口
          将当前被点击的部门id传入到接口
          接收返回的部门数据
          传入到dialog弹出框组件,这里有两种方式

          第一种: 在组织架构组件中定义一个空对象用于保存根据部门id查询到的部门信息数据
                 将部门信息数据通过父传子的组件通信方式传递到子组件(dialog组件),在子组件中使用props接收
                 利用watch侦听props中刚刚接收的部门信息数据的改变
                 发生改变时,将dialog中的表单数据,修改为接收到的数据
          第二种: 利用ref组件别名
                 点击编辑部门按钮时,获取dialog组件实例,通过this获取到dialog中的form表单对象
                 接口调用成功后,将返回的数据直接赋予给dialog中的form对象实现数据回显

# 11.公司设置模块

## 角色管理

        1.搭建角色管理页面的布局和准备将要用到的数据, pageInfo(分页信息数据){ page, pagesize, total }
        2.封装获取所有角色列表的接口并导出
        3.在公司设置组件中引入,并在mounted生命周期函数中调用并传入分页信息
        4.在公司设置组件中定义一个新的空数组,将返回的角色列表保存到空数组中,将返回的所有角色列表数据的长度保存到之前定义的对象内的total
        5.渲染数据:
            将角色列表数组绑定到表格组件的data属性中实现循环
            绑定并渲染对应的字段数据
            将分页组件的静态数据换成pageInfo对象中的total动态渲染

## 公司信息

        1.搭建公司信息区域的布局和准备要用到的数据, 创建companyInfo(保存公司信息)的空对象
        2.封装根据公司id获取公司信息的接口
        3.公司id在vuex内的用户基本资料中有保存(store/modules/user.js/userInfo)
        4.将userInfo下的公司id,在getters.js文件中添加一个,实现快捷访问
        5.在公司设置组件中,将getters.js中的companyId(公司id)映射进来
        6.调用接口,传入公司id
        7.将返回的公司信息保存到data中的空对象
        8.动态渲染公司信息的form组件

## 需求: 新增角色功能

        1.封装dialog弹窗组件
            1.搭建dialog组件的布局和准备数据
            2.绑定表单验证规则
            3.为底部的两个按钮,确认/取消绑定点击事件,点击取消时隐藏dialog,点击确定时,验证表单是否全部通过
            3.引入到父组件并使用(角色管理区域)
            4.点击新增角色按钮时,弹出dialog
                实现思路: 通过ref别名,获取到dialog组件的实例,通过实例改变组件内isShowDialog的值实现

        2.新增角色功能实现思路
            1.封装新增角色接口,需要传入name(角色名称),descrition(角色描述)
            2.点击dialog中底部确认按钮时,获取到dialog表单实例,校验表单是否全部通过
            3.全部验证通过时,调用新增角色接口,传入表单数据
            4.利用父子通信,在父组件中,将获取全部角色列表的方法传入到子组件(dialog组件)
            5.dialog组件中,使用props接收该函数
            6.当新增角色接口执行成功后,通过this调用props中的获取所有角色列表方法,实现刷新功能

## 需求: 编辑角色功能

          1.编辑数据回显功能
            1.在公司设置页面点击编辑按钮时,显示dialog弹窗组件,为编辑按钮绑定点击事件,获取到dialog组件的实例,通过改变子组件内的变量值,实现dialog的显示
            2.通过el-table表格组件的作用域插槽,在绑定当点击事件的同时,传入一个row每行的数据对象,方便来获取当点击编辑按钮的时候,点击的是哪一行
            3.封装通过角色id获取角色详情的接口
            4.在公司设置组件(父组件)中,当点击按钮时,调用获取角色详情接口并传入角色id
            5.在公司设置组件(父组件)中,创建一个新的空对象,用于保存获取到的角色详情数据
            6.利用组件通信(父传子),将获取到的角色详情信息传递到子组件(dialog弹窗)中
            7.在子组件(dialog)中,使用props接收角色详情数据
            8.使用watch侦听角色详情数据的改变
            9.将角色详情数据赋值到表单数据实现数据回显

          2.编辑角色功能
              1.封装根据角色id更新角色的接口
              2.因为新增角色和编辑角色公用的是同一个dialog弹窗组件,因此需要在公司设置(父组件)中,创建一个isEdit变量,用于区分当前处于编辑角色状态下还是新增角色状态下
              3.将isEdit变量传入到子组件(dialog组件)
              4.dialog子组件中使用props接收,默认值给为true
              5.在dialog子组件中找到确认按钮,加入一个判断,如果isEdit为true,表示当前处于编辑状态,调用更新角色id的接口,实现更新角色信息功能
              6.如果isEdit为false,表示当前处于新增角色下,调用新增角色接口,实现功能
              7.无论是执行了新增角色还是编辑角色,最后都要重新获取员工列表实现刷新和点击确定关闭dialog
