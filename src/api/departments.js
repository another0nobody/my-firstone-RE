import request from '@/utils/request'
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
    url: ' /company/department',
    method: 'post',
    data
  })
}