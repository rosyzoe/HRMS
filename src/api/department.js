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

/**
 * 新增部门
 * @param {string} name 部门名称
 * @param {string} code 部门编码
 * @param {string} manager 部门负责人 部门编码
 * @param {string} introduce 部门介绍 部门编码
 * @param {string} pid 要新增部门的父级部门的id(要新增在哪个部门下id就是哪个)
 * @returns
 */
export const addDepartmentAPI = ({ name, code, manager, introduce, pid }) =>
  request({
    url: '/company/department',
    method: 'POST',
    data: {
      name,
      code,
      manager,
      introduce,
      pid
    }
  })

/**
 * 根据部门id获取部门详情信息
 * @param {string} id 部门id
 * @returns promise
 */
export const getDepartmentDetailAPI = (id) =>
  request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
