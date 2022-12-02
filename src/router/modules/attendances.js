import Layout from '@/layout'
export default {
  path: '/attendances',
  name: 'attendances',
  component: Layout,
  children: [{
    path: '', // 默认路由
    component: () => import('@/views/attendances'),
    meta: {
      title: '考勤',// 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      icon:'skill',
    }
  }]
}