<template>
  <div class="employees-container">
    <div class="app-container">
      <!-- 顶部区域 -->
      <page-top-nav>
        <!-- 左侧标题 -->
        <template #left> 共{{ pageInfo.total }}条记录 </template>

        <!-- 右侧按钮 -->
        <template #right>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="warning" size="small" @click="uploadBtn">excel导入</el-button>
          <el-button type="primary" size="small" @click="addEmployeeBtn">新增员工</el-button>
        </template>
      </page-top-nav>

      <!-- 表格区域 -->
      <el-card class="table-box">
        <el-table :data="employeeList" :default-sort="{ prop: 'workNumber' }" border highlight-current-row>
          <el-table-column type="index" label="序号" align="center"></el-table-column>
          <el-table-column label="姓名" prop="username" align="center"></el-table-column>
          <el-table-column label="头像" prop="staffPhoto" align="center">
            <template slot-scope="{ row }">
              <img class="user-photo" :src="row.staffPhoto" alt="" />
            </template>
          </el-table-column>
          <el-table-column label="手机号" prop="mobile" align="center" width="120"></el-table-column>
          <el-table-column
            label="工号"
            prop="workNumber"
            align="center"
            sortable
            :sort-method="sortWorkNumberFn"
          ></el-table-column>
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            align="center"
            :formatter="formatHireType"
          ></el-table-column>
          <el-table-column label="部门" prop="departmentName" align="center"></el-table-column>
          <el-table-column
            label="入职时间"
            prop="timeOfEntry"
            align="center"
            :formatter="formatTime"
          ></el-table-column>
          <el-table-column label="操作" align="center" width="240">
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="lookEmpDetailBtn(row.id, row.formOfEmployment)"
                >查看</el-button
              >
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 底部分页区域 -->
        <el-row class="pagination-box" type="flex" justify="center">
          <el-pagination
            layout="sizes, prev, pager, next"
            :current-page="+pageInfo.page"
            :page-size="+pageInfo.size"
            :total="pageInfo.total"
            :page-sizes="pageInfo.sizes"
            @size-change="handlePageSize"
            @current-change="handleCurrentPage"
          >
          </el-pagination>
        </el-row>
      </el-card>

      <!-- 弹出层 -->
      <el-dialog
        :visible="isShowDialog"
        title="新增员工"
        :close-on-press-escape="false"
        :show-close="false"
        :close-on-click-modal="false"
      >
        <emp-form :show.sync="isShowDialog" @addEmpFormData="addEmpFn"></emp-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getEmployeeListAPI, addEmployeeAPI } from '@/api'
import dayjs from 'dayjs'
import hireType from '@/constant/hireType'
import EmpForm from './components/empForm.vue'
export default {
  components: {
    EmpForm
  },
  data() {
    return {
      // 分页信息
      pageInfo: {
        page: '1', // 当前页码
        size: '10', // 当前页面需要的内容长度
        total: 0, // 内容总数
        sizes: [5, 10, 15, 20] // 内容长度
      },

      // 员工列表
      employeeList: [],

      // 聘用形式
      hireType: hireType.hireType,

      // 控制dialog的显示隐藏
      isShowDialog: false
    }
  },
  mounted() {
    this.getEmployeeListFn()
  },
  methods: {
    // 获取员工列表
    async getEmployeeListFn() {
      const res = await getEmployeeListAPI(this.pageInfo)
      // 保存到data
      this.employeeList = res.data.rows

      // 将数据个数保存到data
      this.pageInfo.total = res.data.total
    },

    // 格式化聘用形式
    formatHireType(row) {
      return this.hireType.find((item) => item.id === Number(row.formOfEmployment))?.value || '非正式'
    },

    // 对工号进行排序
    sortWorkNumberFn(a, b) {
      return Number(a.workNumber) - Number(b.workNumber)
    },

    // 格式化入职时间
    formatTime(row) {
      return dayjs(row.timeOfEntry).format('YYYY-MM-DD')
    },

    // 点击新增员工
    addEmployeeBtn() {
      this.isShowDialog = true
    },

    // 点击导入excel
    uploadBtn() {
      this.$router.push('/excel')
    },

    // 获取将要被添加的员工信息
    async addEmpFn(addEmpFormData) {
      await addEmployeeAPI(addEmpFormData)
      this.getEmployeeListFn()
    },

    // 点击查看按钮
    lookEmpDetailBtn(empId, formOfEmploymentInfo) {
      // 接收传入的员工id和员工聘用形式,跳转网页时传入到query
      this.$router.push(`/employees/empdetail?id=${empId}&formOfEmployment=${formOfEmploymentInfo}`)
    },

    // 分页 - 更改页面内容显示长度触发
    handlePageSize(pageSize) {
      this.pageInfo.size = pageSize
      this.getEmployeeListFn()
    },

    // 分页 - 分页发生改变时触发
    handleCurrentPage(currentPage) {
      this.pageInfo.page = currentPage
      this.getEmployeeListFn()
    }
  }
}
</script>

<style lang="scss" scoped>
.table-box {
  margin-top: 20px;
}

.pagination-box {
  margin-top: 20px;
}

.user-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
