import request from '@/utils/request'

/**
 * 获取员工列表
 * @param {string} page 当前页码数
 * @param {string} size 当前页面需要的数据条数
 * @returns promise
 */
export const getEmployeeListAPI = ({ page, size }) =>
  request({
    url: '/sys/user',
    method: 'GET',
    params: {
      page,
      size
    }
  })

/**
 * 新增员工
 * @param {object} data 新增员工信息
 * @returns promise
 */
export const addEmployeeAPI = (data) =>
  request({
    url: '/sys/user',
    method: 'POST',
    data
  })

/**
 * 批量导入员工
 * @param {object} data 员工信息
 * @returns promise
 */
export const uploadEmployeeExcelAPI = (data) =>
  request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })

/**
 * 获取员工个人信息: 员工名字和密码
 * @param {object} data 员工信息
 * @returns promise
 */
export const getEmployeeDetailAPI = (empId) =>
  request({
    url: `/sys/user/${empId}`,
    method: 'GET'
  })

/**
 * 修改员工个人信息: 名字和密码
 * @param {object} data 员工信息
 * @returns promise
 */
export const changeEmployeeDetailAPI = (data) =>
  request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
