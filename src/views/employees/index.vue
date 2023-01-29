<template>
  <div class="employees-container">
    <div class="app-container">
      <!-- 顶部区域 -->
      <page-top-nav>
        <!-- 左侧标题 -->
        <template #left> 共{{ pageInfo.total }}条记录 </template>

        <!-- 右侧按钮 -->
        <template #right>
          <el-button type="danger" size="small">简单表头导出</el-button>
          <el-button type="info" size="small">复杂表头导出</el-button>
          <el-button type="warning" size="small">excel导入</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </page-top-nav>

      <!-- 表格区域 -->
      <el-card class="table-box">
        <el-table :data="employeeList" border highlight-current-row>
          <el-table-column type="index" label="序号" align="center"></el-table-column>
          <el-table-column label="姓名" prop="username" align="center"></el-table-column>
          <el-table-column label="头像" prop="staffPhoto" align="center"></el-table-column>
          <el-table-column label="手机号" prop="mobile" align="center" width="120"></el-table-column>
          <el-table-column label="工号" prop="workNumber" align="center"></el-table-column>
          <el-table-column label="聘用形式" prop="formOfEmployment" align="center"></el-table-column>
          <el-table-column label="部门" prop="departmentName" align="center"></el-table-column>
          <el-table-column label="入职时间" prop="timeOfEntry" align="center"></el-table-column>
          <el-table-column label="账户状态" prop="enableState" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="240">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 底部分页区域 -->
        <el-row type="flex" justify="center">
          <el-pagination layout="prev, pager, next" :total="pageInfo.total"> </el-pagination>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeListAPI } from '@/api'
export default {
  data() {
    return {
      // 分页信息
      pageInfo: {
        page: '1', // 当前页码
        size: '10', // 当前页面需要的内容长度
        total: 0 // 内容总数
      },

      // 员工列表
      employeeList: []
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
    }
  }
}
</script>

<style lang="scss" scoped>
.table-box {
  margin-top: 20px;
}
</style>
