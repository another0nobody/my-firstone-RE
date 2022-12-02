import Layout from '@/layout'
export default {
  path: '/salarys',
  name: 'salarys',
  component: Layout,
  children: [{
    path: '', // 默认路由
    component: () => import('@/views/salarys'),
    meta: {
      title: '工资', // 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      icon:'money'
    }
  }]
}