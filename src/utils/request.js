import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'
import { getTime } from '@/utils/auth'
const TIMEMAP = 3600

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器  
service.interceptors.request.use(config => {
  // 注入token
  if (store.getters.token) {
     if (checkIsTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('超时,登录信息已失效'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  // axios默认加了一层data
  const { success, message, data } = response.data
  //   要根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else { 
    // 失败则进入rejected
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message))
  }
}, error => {
    if (error?.response?.data?.code === 10002) {
      store.dispatch('user/logout')
      router.push('/login')
    }
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
})

function checkIsTimeOut() {
  var currentTime = Date.now() 
  var timeStamp = getTime() 
  return (currentTime - timeStamp) / 1000 > TIMEMAP
}
export default service
