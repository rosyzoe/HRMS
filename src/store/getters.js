const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token, // 用户token
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.userInfo.username // 用户名
}
export default getters
