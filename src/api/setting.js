import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    method: 'get',
    params
  })
}
// 获取员工列表
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
// 获取公司信息
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
// 删除员工
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}
// 修改员工
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 获得员工详情
export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}
// 新增员工