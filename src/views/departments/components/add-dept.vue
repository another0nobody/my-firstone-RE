<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible.sync="dialogVisible">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form label-width="120px" :rules="rules" :model="formData">
      <el-form-item label="部门名称" prop="name">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          :v-model="formData.name"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          :v-model="formData.code"
        />
      </el-form-item>
      <el-form-item
        label="部门负责人"
        prop="manager"
        @focus.native="getEmployeesUnifo"
      >
        <el-select
          style="width: 80%"
          placeholder="请选择"
          :v-model="formData.manager"
        />
        <el-option
          v-for="item in peoples"
          :key="item.id"
          :label="item.username"
          :value="item.value"
        >
        </el-option>
      </el-form-item>
      <el-form-item
        label="部门介绍"
        prop="introduce"
        :v-model="formData.introduce"
      >
        <el-input
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartmentInfo } from '@/api/departments'
import { getEmployeesSimple } from '@/api/employees'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    const checkNameRepeat = async (rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartmentInfo()
      // depts是所有的部门数据
      // 如何去找技术部所有的子节点
      const isRepeat = depts
        .filter((item) => item.pid === this.treeNode.id)
        .some((item) => item.name === value)
      isRepeat
        ? callback(new Error(`同级部门下已经有${value}的部门了`))
        : callback()
    }

    const checkCodeRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartmentInfo()
      const isRepeat = depts.some((item) => item.code === value && value)
      isRepeat
        ? callback(new Error(`部门中已存在编码为${value}的部门`))
        : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { require: true, message: '部门名称不能为空', triggle: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门名称要求1-50个字符',
            trigger: 'blur'
          },
          { validator: checkNameRepeat, triggle: 'blur' }
        ],
        code: [
          { require: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50字符' },
          { validator: checkCodeRepeat, trigger: 'blur' }
        ], // 部门编码
        manager: [
          { require: true, message: '部门管理者不能为空', trigger: 'blur' }
        ], // 部门管理者
        introduce: [
          { require: true, message: '部门介绍不能为空', trigger: 'blur' },
          {
            trigger: 'blur',
            min: 1,
            max: 300,
            message: '部门介绍要求1-300个字符'
          }
        ] // 部门介绍
      },
      peoples: []
    }
  },
  method: {
    async getEmployeesUnifo() {
      const result = await getEmployeesSimple()
      this.peoples = result
    }
  }
}
</script>

<style>
</style>