import Layout from '@/layout'
export default {
  path: '/setting',
  name: 'setting',
  component: Layout,
  children: [{
    path: '', // 默认路由
    component: () => import('@/views/setting'),
    meta: {
      title: '公司设置',// 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      icon:'setting',
    }
  }]
}