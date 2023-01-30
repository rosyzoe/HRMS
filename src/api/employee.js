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
