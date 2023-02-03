<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :showBefore="true">
        <template slot="before">
          <span>共166条记录</span>
        </template>
        <template slot="after">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import?type=user')"
            >excel导入</el-button
          >
          <el-button size="small" type="danger" @click="exportData"
            >excel导出</el-button
          >
          <el-button size="small" type="primary" @click="showDialog = true"
            >新增员工</el-button
          >
        </template>
      </PageTools>
      <el-card>
        <el-table :border="true" v-loading="loading" :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="手机号" sortable="" prop="mobile" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName">
          </el-table-column>
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template slot-scope="{ row }">
              <!-- 根据当前状态来确定 是否打开开关 -->
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :current-page="page.page"
            :page-size="page.size"
            :total="page.total"
            @current-change="changePage"
            layout="prev, pager, next"
          />
        </el-row>
      </el-card>
    </div>
    <add-employee :show-dialog.sync="showDialog"></add-employee>>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './component/add-employee.vue'
import { formatDate } from '@/filters/index'
export default {
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      loading: false,
      showDialog: false
    }
  },
  components: { AddEmployee },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.list = rows
      this.page.total = total
      this.loading = false
    },
    async changePage(newPage) {
      this.page.page = newPage
      await this.getEmployeeList()
    },
    formatEmployment(row, column, cellValue, index) {
      // 数字 转化为 具体内容
      const obj = EmployeeEnum.hireType.find((item) => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async delEmployee(id) {
      try {
        await this.$confirm('是否删除该员工')
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除成功')
      } catch {
        this.$message.error('删除失败')
      }
    },
    exportData() {
      const headers = {
        姓名: 'username',
        手机号: 'mobile',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async (excel) => {
        const { rows } = await getEmployeeList({
          page: 1,
          size: this.page.total
        })
        const data = this.formatJson(headers, rows)
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers), //表头 必填
          data, //具体数据 必填
          filename: '员工工资表', //非必填
          autoWidth: true, //非必填
          bookType: 'xlsx', //非必填
          merges,
          multiHeader
        })
      })
    },
    formatJson(headers, rows) {
      // 首先遍历数组
      // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
      return rows.map((item) => {
        return Object.keys(headers).map((key) => {
          if (
            headers[key] === 'timeOfEntry' ||
            headers[key] === 'correctionTime'
          ) {
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            var en = EmployeeEnum.hireType.find(
              (obj) => obj.id === item[headers[key]]
            )
            return en ? en.value : '未知'
          }
          return item[headers[key]]
        })
      })
    }
  }
}
</script>

<style>
</style>