import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data:data
  })//返回一个promise对象
}

export function getInfo() {
  return request({
    method: 'post',
    url: '/sys/profile',
  })
}
export function getUserDetailById(id) {
  return request({
    url:`/sys/user/${id}`
  })
}
export function logout() {
  return request({
    
  })
}
