import request from '@/utils/request'

/**
 * 获取所有角色列表
 * @param {string} page 当前页码数
 * @param {string} pagesize 当前页面需要的数据条数
 * @returns promise
 */
export const getAllRoleListAPI = ({ page, pagesize }) =>
  request({
    url: '/sys/role',
    method: 'GET',
    params: {
      page,
      pagesize
    }
  })
