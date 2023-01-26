import { getToken, setToken, removeToken } from '@/utils/auth'
import { userLoginAPI, getUserProfileAPI, getUserPhotoAPI } from '@/api'

const getDefaultState = () => {
  return {
    // token
    token: getToken(), // 从本地取出token,实现持久化
    // 用户基本资料
    userInfo: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },

  // 修改token
  SET_TOKEN: (state, token) => {
    state.token = token // 修改state
    setToken(token) // 向本地也存储一份
  },

  // 重置token
  RESET_TOKEN: () => {
    state.token = '' // 重置state内的token
    removeToken() // 移除本地中的token
  },

  // 设置用户基本资料
  SET_USERINFO: (state, value) => {
    state.userInfo = value
  },

  // 重置用户基本资料
  RESET_USERINFO: (state) => {
    state.userInfo = {}
  }
}

const actions = {
  /**
   * @param {object} data 用户登录信息: 手机号,密码
   */
  async loginAction({ commit }, data) {
    // 获取返回的数据
    const res = await userLoginAPI(data)
    // 设置token
    commit('SET_TOKEN', res.data)
    return res // 返回请求到的数据
  },

  // 获取用户的基本资料
  async getUserProfileAction({ commit }) {
    const { data: userObj } = await getUserProfileAPI()
    const { data: staffObj } = await getUserPhotoAPI(userObj.userId)

    const obj = { ...userObj, ...staffObj }
    // 修改state
    commit('SET_USERINFO', obj)
  },

  // 用户退出登录
  async logoutAction({ commit }) {
    await commit('RESET_TOKEN') // 重置token为空字符串
    await commit('RESET_USERINFO') // 重置用户资料为空对象
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
