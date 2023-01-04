import request from '@/utils/request'
// 获取部门信息
export function getDepartmentInfo() {
  return request({
    url:'/company/department'
  })
}
// 删除部门
export function delDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
// 新增部门
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
// 获取部门信息细节
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
// 更新部门信息
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}