import { getToken, setToken, removeToken } from '@/utils/auth'
import { userLoginAPI } from '@/api'

const getDefaultState = () => {
  return {
    // token
    token: getToken() // 从本地取出token,实现持久化
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
  RESET_TOKEN: (state) => {
    state.token = '' // 重置state内的token
    removeToken() // 移除本地中的token
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
    console.log('登陆成功')
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
