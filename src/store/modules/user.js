import { login, getInfo} from "@/api/user"
import { getToken, setToken, removeToken } from "@/utils/auth"
const state = {
  token: getToken() || null,
  userInfo: {}//不定义null 一些情况要取userInfo里的内容，null在引用时会出现异常报错
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async logins(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
  },
  async getUserInfo(context) {
    const result = await getInfo()
    context.commit('setUserInfo', result)
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

