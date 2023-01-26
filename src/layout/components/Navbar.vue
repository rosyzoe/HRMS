<template>
  <div class="navbar">
    <!-- 汉堡包组件 -->
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- 顶部导航-左侧 -->
    <div class="app-breadcrumb">
      北京字节跳动科技股份有限公司
      <span class="breadBtn">体验版</span>
    </div>

    <!-- 顶部导航-右侧 -->
    <div class="right-menu">
      <!-- 下拉菜单组件 -->
      <el-dropdown class="avatar-container" trigger="click">
        <!-- 菜单左侧 -->
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <img :src="avatar" class="user-avatar" />
          <!-- 用户名 -->
          <span class="name">{{ name }}</span>
          <!-- 右侧箭头 -->
          <i class="el-icon-caret-bottom" style="color: #fff" />
        </div>

        <!-- 下拉菜单的每一项 -->
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- 首页 -->
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <!-- 项目地址 -->
          <a target="_blank" href="https://gitee.com/shuiruohanyu/hrsaas53">
            <el-dropdown-item> 项目地址 </el-dropdown-item>
          </a>
          <!-- 退出登录 -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex' // 引入映射计算属性的hook
import Hamburger from '@/components/Hamburger' // 引入汉堡包组件
import router from '@/router'

export default {
  components: {
    Hamburger // 注册汉堡包组件
  },

  // 计算属性
  computed: {
    // 从vuex中的getters.js文件中映射
    ...mapGetters(['sidebar', 'avatar', 'name'])
  },
  methods: {
    // 控制展开/收起左侧边栏
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },

    // 点击退出登录
    logout() {
      this.$confirm('确认要退出系统吗?', '退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.$message({
            type: 'success',
            message: '已成功退出系统!'
          })
          await this.$store.dispatch('user/logoutAction')
          router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出系统!'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .app-breadcrumb {
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
    color: #ffffff;
    cursor: text;

    .breadBtn {
      background: #84a9fe;
      font-size: 14px;
      padding: 0 10px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      margin-left: 15px;
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;

        // 头像
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          vertical-align: middle;
          margin-right: 10px;
        }

        // name
        .name {
          color: #fff;
          vertical-align: middle;
          margin-left: 5px;
        }

        .user-dropdown {
          color: #fff;
        }

        // 下拉 icon 图标位置
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
