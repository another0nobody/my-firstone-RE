<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="always">
        <el-tabs>
          <el-tab-pane label="员工管理">
            <el-row style="height: 60px">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-plus"
                @click="addRole"
              >
                新增员工</el-button
              >
            </el-row>
            <!-- 表格 -->
            <el-table :data="list" :border="true" highlight-current-row>
              <el-table-column
                label="序号"
                width="120"
                type="index"
                align="center"
              />
              <el-table-column
                label="员工名称"
                width="240"
                prop="name"
                align="center"
              />
              <el-table-column label="描述" prop="description" align="center" />
              <el-table-column label="操作" align="center">
                <template slot-scope="{ row }">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="editRole(row.id)"
                    >编辑</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteRole(row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                layout="prev,pager,next"
                :page-size="page.size"
                :total="page.total"
                :current-page="page.page"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              :show-icon="true"
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  disabled
                  style="width: 500px"
                  v-model="formData.name"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  disabled
                  style="width: 500px"
                  v-model="formData.companyAddress"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  disabled
                  style="width: 500px"
                  v-model="formData.mailbox"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 500px"
                  v-model="formData.remarks"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog :title="dialogTitle" :visible="showDialog">
      <el-form
        label-width="100px"
        :model="roleForm"
        :rules="roleRules"
        ref="roleForm"
      >
        <el-form-item label="员工名称" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="员工描述">
          <el-input v-model="roleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <!-- 按钮在footer插槽里 -->
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-button size="small" @click="btnCancle">取消</el-button>
          <el-button size="small" type="primary" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  getCompanyInfo,
  deleteRole,
  updateRole,
  getRoleDetail,
  addRole
} from '@/api/setting.js'
import { Dialog } from 'element-ui'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      list: [],
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 10,
        total: 0 // 记录总数
      },
      formData: {
        name: '',
        companyAddress: '',
        mailbox: '',
        remarks: ''
      },
      showDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      roleRules: {
        name: [{ required: true, message: '员工名不能为空', trigger: 'blur' }]
      },
      dialogTitle: '编辑员工'
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    changePage(newPage) {
      this.page.page = newPage // 将当前页码赋值给当前的最新页码
      this.getRoleList()
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    async deleteRole(id) {
      try {
        await this.$confirm('确认删除该员工吗?')
        deleteRole(id)
        this.getRoleList()
        this.$message.success('删除成功')
      } catch (error) {
        this.$message.error('删除取消')
      }
    },
    async editRole(id) {
      this.roleForm = await getRoleDetail(id)
      this.dialogTitle = '编辑员工'
      this.showDialog = true
    },
    async btnOk(id) {
      try {
        this.$refs.roleForm.validate()
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }
        this.getRoleList()
        this.$message.success('操作成功')
        this.showDialog = false
      } catch (error) {
        this.$message.error('编辑失败')
      }
    },
    btnCancle() {
      this.roleForm = {
        name: '',
        description: '',
        id: ''
      }
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    addRole() {
      this.dialogTitle = '新增员工'
      this.showDialog = true
    }
  }
}
</script>

<style>
</style>