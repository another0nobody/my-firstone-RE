import request from '@/utils/request'

export function getEmployeesSimple() {
  return request({
    url:'/sys/user/simple'
  })
} 
// 获取职员信息