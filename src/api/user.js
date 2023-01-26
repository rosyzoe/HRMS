import request from '@/utils/request'

/**
 * 用户登录
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

/**
 * 获取用户的基本资料
 * @returns promise
 */
export const getUserProfileAPI = () =>
  request({
    url: '/sys/profile',
    method: 'POST'
  })

// 获取员工的基本信息-这里只为了获取员工头像
export const getUserPhotoAPI = (id) =>
  request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
