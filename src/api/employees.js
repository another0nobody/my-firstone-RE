import request from '@/utils/request'

export function getEmployeesSimple() {
  return request({
    url:'/sys/user/simple'
  })
} 
// 获取职员信息
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
// 获得员工列表

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete',
  })
}
// 删除员工
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}