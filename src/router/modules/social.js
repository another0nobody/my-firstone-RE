import Layout from '@/layout'
export default {
  path: '/social',
  name: 'social',
  component: Layout,
  children: [{
    path: '', // 默认路由
    component: () => import('@/views/social'),
    meta: {
      title: '社保',// 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      icon:'table'
    }
  }]
}