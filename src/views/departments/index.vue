<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 实现页面的基本布局 -->
      <el-card class="tree-card">
        <TreeTool
          :tree-node="company"
          :is-root="true"
          @makeDialogVisible="addDept"
        />
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <TreeTool
            slot-scope="{ data }"
            :tree-node="data"
            :is-root="false"
            @delDep="getDepartmentInfo"
            @makeDialogVisible="addDept"
          />
        </el-tree>
      </el-card>
    </div>
    <AddDept :dialogVisible="dialogVisible" />
  </div>
</template>

<script>
import TreeTool from './components/tree-tools.vue'
import { getDepartmentInfo } from '@/api/departments'
import { transListToTree } from '@/utils/index'
import AddDept from './components/add-dept.vue'
export default {
  components: {
    TreeTool,
    AddDept
  },
  data() {
    return {
      company: {},
      defaultProps: {
        label: 'name'
      },
      departs: [],
      dialogVisible: false,
      node: {}
    }
  },
  created() {
    this.getDepartmentInfo()
  },
  methods: {
    async getDepartmentInfo() {
      const result = await getDepartmentInfo()
      this.company = { name: result.companyName, manager: '负责人' }
      this.departs = transListToTree(result.depts, '')
      console.log(result)
    },
    addDept(node) {
      this.dialogVisible = true //显示弹层
      this.node = node
    }
  }
}
</script>

<style>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
