import request from '@/utils/request'

/**
 * 获取-部门列表
 * @returns promise
 */
export const getDepartmentAPI = () =>
  request({
    url: '/company/department',
    method: 'GET'
  })
