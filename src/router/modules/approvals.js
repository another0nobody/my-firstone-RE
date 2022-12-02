import Layout from '@/layout'
export default {
  path: '/approvals',
  name: 'approvals',
  component: Layout,
  children: [{
    path: '', // 默认路由
    component: () => import('@/views/approvals'),
    meta: {
      title: '审批', // 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      icon:'tree-table',
    }
  }]
}