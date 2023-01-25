import request from '@/utils/request'

/**
 *
 * @param {string} mobile 手机号
 * @param {string} password 密码
 * @returns promise对象
 */
export const userLoginAPI = ({ mobile, password }) =>
  request({
    url: '/sys/login',
    method: 'POST',
    data: {
      mobile,
      password
    }
  })
