import Layout from '@/layout'
export default {
  path: '/departments',
  name: 'departments',
  component: Layout,
  children: [{
    path: '', // 默认路由
    component: () => import('@/views/departments'),
    meta: {
      title: '组织架构' // 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
    }
  }]
}