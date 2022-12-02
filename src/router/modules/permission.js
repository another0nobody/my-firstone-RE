import Layout from '@/layout'
export default {
  path: '/permission',
  name: 'permission',
  component: Layout,
  children: [{
    path: '', // 默认路由
    component: () => import('@/views/permission'),
    meta: {
      title: '权限管理' // 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
    }
  }]
}