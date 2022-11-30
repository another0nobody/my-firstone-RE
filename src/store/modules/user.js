import { login } from "@/api/user"
import { getToken, setToken, removeToken } from "@/utils/auth"
const state = {
  token : getToken() || null
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  }
}
const actions = {
  async logins(context, data) {
    const result = await login(data)
    context.commit('setToken', result)

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

