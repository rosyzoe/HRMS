<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first">
            <!-- 新增角色按钮 -->
            <el-row type="flex" justify="end">
              <el-button class="addRoleBtn" size="small" type="primary">新增角色</el-button>
            </el-row>

            <!-- 表格区域 -->
            <el-table :data="roleList" border stripe highlight-current-row>
              <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
              <el-table-column prop="name" label="名称" align="center"></el-table-column>
              <el-table-column prop="description" label="描述" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <el-button type="success" size="small">分配权限</el-button>
                <el-button type="primarydanger" size="small">编辑</el-button>
                <el-button type="danger" size="small">删除</el-button>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
        </el-tabs>

        <!-- 分页区域 -->
        <el-row class="pagination" type="flex" justify="center">
          <el-pagination layout="prev, pager, next" :total="pageInfo.total" :page-size="5"> </el-pagination>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getAllRoleListAPI } from '@/api'
export default {
  data() {
    return {
      // tab选项卡的默认选中状态
      activeName: 'first',

      // 分页信息
      pageInfo: {
        page: '1',
        pagesize: '10',
        total: 0
      },

      // 所有角色列表
      roleList: []
    }
  },
  mounted() {
    // 页面dom结构加载完毕后,调用接口获取角色列表
    this.getAllRoleListFn()
  },

  methods: {
    // 请求所有角色列表数据
    async getAllRoleListFn() {
      const res = await getAllRoleListAPI(this.pageInfo)

      // 保存到data
      this.roleList = res.data.rows
      this.pageInfo.total = res.data.rows.length
    }
  }
}
</script>

<style lang="scss" scoped>
.addRoleBtn {
  margin-bottom: 20px;
  margin-right: 70px;
}

.pagination {
  margin-top: 20px;
}
</style>
