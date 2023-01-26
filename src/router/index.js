import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 静态路由表：不需要做权限控制的路由，每个用户都可以正常访问。
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 动态路由表，项目中不同的用户可以访问不同的功能
export const asyncRoutes = [
  // 动态路由规则
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
  },
  {
    path: '/attendances', // 考勤
    component: Layout,
    children: [
      {
        path: '',
        name: 'Attendances',
        component: () => import('@/views/attendances'),
        meta: { title: '考勤' }
      }
    ]
  },
  {
    path: '/departments', // 组织架构
    component: Layout,
    children: [
      {
        path: '',
        name: 'Departments',
        component: () => import('@/views/departments'),
        meta: { title: '组织架构' }
      }
    ]
  },
  {
    path: '/employees', // 员工
    component: Layout,
    children: [
      {
        path: '',
        name: 'Employees',
        component: () => import('@/views/employees'),
        meta: { title: '员工' }
      }
    ]
  },
  {
    path: '/permission', // 权限
    component: Layout,
    children: [
      {
        path: '',
        name: 'Permission',
        component: () => import('@/views/permission'),
        meta: { title: '权限' }
      }
    ]
  },
  {
    path: '/salarys', // 薪资
    component: Layout,
    children: [
      {
        path: '',
        name: 'Salarys',
        component: () => import('@/views/salarys'),
        meta: { title: '薪资' }
      }
    ]
  },
  {
    path: '/setting', // 角色设置
    component: Layout,
    children: [
      {
        path: '',
        name: 'Setting',
        component: () => import('@/views/setting'),
        meta: { title: '角色设置' }
      }
    ]
  },
  {
    path: '/social', // 社保
    component: Layout,
    children: [
      {
        path: '',
        name: 'Social',
        component: () => import('@/views/social'),
        meta: { title: '社保' }
      }
    ]
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes, ...asyncRoutes]
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
