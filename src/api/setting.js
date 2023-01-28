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
