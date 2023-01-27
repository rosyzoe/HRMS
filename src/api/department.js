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

/**
 * 获取-部门负责人列表
 * @returns promsie
 */
export const getDepartmentSimpleAPI = () =>
  request({
    url: '/sys/user/simple',
    method: 'GET'
  })
