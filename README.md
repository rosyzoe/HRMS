## 1.项目初始化

```js
  1.拉取项目: git clone vue-element-template
  2.模板肃清: 删除不需要的的代码
  3.git: 删除自带的.git文件夹,git init初始化一个新的git文件夹,创建远程仓库,绑定并提交代码
  4.样式: 引入样式文件,common.sass&variables.sass,并引入到index.sass中实现使用
  5.图片资源: 引入公用的图片资源
```

## 2.登录模块

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
