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
```
