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
// 新增员工
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
} 
// 上传导入员工表格数组

export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
// 上传用户数据