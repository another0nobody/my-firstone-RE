<template>
  <!-- 新增部门的弹层 -->
  <el-dialog
    :title="showTitle"
    :visible.sync="dialogVisible"
    @close="btnCancle"
  >
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form
      label-width="120px"
      :rules="formRules"
      :model="formData"
      ref="addForm"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.name"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.code"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 80%"
          placeholder="请选择"
          v-model="formData.manager"
          @focus="getEmployeesUnifo"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
          v-model="formData.introduce"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnCheck"
          >确定</el-button
        >
        <el-button size="small" @click="btnCancle">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {
  getDepartmentInfo,
  addDepartment,
  getDepartDetail,
  updateDepartments
} from '@/api/departments'
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
      let isRepeat = false
      if (this.formData.id) {
        // 有id就是编辑模式
        // 编辑模式下 张三 => 校验规则 除了我之外 同级部门下 不能有叫张三的
        isRepeat = depts
          .filter(
            (item) =>
              item.id !== this.formData.id && item.pid === this.treeNode.pid
          )
          .some((item) => item.name === value)
      } else {
        // 没id就是新增模式, 张三 => 校验规则 同级部门下 不能有叫张三的
        isRepeat = depts
          .filter((item) => item.pid === this.treeNode.id)
          .some((item) => item.name === value)
      }
      isRepeat
        ? callback(new Error(`同级部门下已经有${value}的部门了`))
        : callback()
    }

    const checkCodeRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartmentInfo()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑模式  因为编辑模式下 不能算自己
        isRepeat = depts.some(
          (item) => item.id !== this.formData.id && item.code === value && value
        )
      } else {
        // 新增模式
        isRepeat = depts.some((item) => item.code === value && value) // 我们的部门有可能没有code
      }
      isRepeat
        ? callback(new Error(`组织架构中已经有部门使用${value}编码`))
        : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      formRules: {
        name: [
          { required: true, message: '部门名称不能为空', triggle: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门名称要求1-50个字符',
            trigger: 'blur'
          },
          { validator: checkNameRepeat, triggle: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50字符' },
          { validator: checkCodeRepeat, trigger: 'blur' }
        ], // 部门编码
        manager: [
          { required: true, message: '部门管理者不能为空', trigger: 'blur' }
        ], // 部门管理者
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
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
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  methods: {
    async getEmployeesUnifo() {
      const result = await getEmployeesSimple()
      // console.log(result)
      this.peoples = result
    },
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
      // 这个方法需要由父组件调用,而props传值是异步的,可能取不到
    },
    btnCheck() {
      this.$refs.addForm.validate(async (isOK) => {
        if (isOK) {
          // console.log(isOK)
          if (this.formData.id) {
            // 编辑模式  调用编辑接口
            await updateDepartments(this.formData)
          } else {
            // 新增模式  调用新增接口
            await addDepartment({
              ...this.formData,
              pid: this.treeNode.id
            })
          }
          this.$emit('addDept')
          this.$emit('changeDialog', false)
          // 关闭dialog的时候会自动触发close事件
        }
      })
    },
    btnCancle() {
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      } // 只有form表单内的数据才能用resetFields重置,其他的要手动重置
      this.$refs.addForm.resetFields()
      // 移除校验结果,同时删除数据
      this.$emit('changeDialog', false)
    }
  }
}
</script>


<style>
</style>
