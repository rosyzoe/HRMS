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

/**
 * 根据企业id获取企业信息
 * @param {string} id 企业id
 * @returns promise
 */
export const getCompanyByIdAPI = (id) =>
  request({
    url: `/company/${id}`,
    method: 'GET'
  })

/**
 * 新增角色
 * @param {string} name 角色名称
 * @param {string} description 角色描述
 * @returns
 */
export const addRoleAPI = ({ name, description }) =>
  request({
    url: '/sys/role',
    method: 'POST',
    data: {
      name,
      description
    }
  })

/**
 * 根据角色id虎丘角色详情
 * @param {*} id 角色id
 * @returns promise
 */
export const getRoleDetailAPI = (id) =>
  request({
    url: `/sys/role/${id}`,
    method: 'GET'
  })

/**
 * 根据角色id更新角色信息
 * @param {string} id 角色id
 * @returns promise
 */
export const updateRoleDetailAPI = (data) =>
  request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
