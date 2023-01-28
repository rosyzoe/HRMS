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
          <el-tab-pane label="公司信息" name="second">
            <!-- 顶部警告文字 -->
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="warning"
              show-icon
            />

            <!-- 表单区域 -->
            <el-form class="form" size="small">
              <el-form-item label="公司名称" label-width="80px">
                <el-input v-model="companyInfo.name" disabled style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item label="公司地址" label-width="80px">
                <el-input v-model="companyInfo.companyAddress" disabled style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" label-width="80px">
                <el-input v-model="companyInfo.mailbox" disabled style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item label="备注" label-width="80px">
                <el-input
                  v-model="companyInfo.remarks"
                  type="textarea"
                  disabled
                  style="width: 400px"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
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
import { getAllRoleListAPI, getCompanyByIdAPI } from '@/api'
import { mapGetters } from 'vuex'
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
      roleList: [],

      // 公司信息
      companyInfo: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    // 页面dom结构加载完毕后,调用接口获取角色列表
    this.getAllRoleListFn()
    this.getCompanyByIdFn()
  },

  methods: {
    // 请求所有角色列表数据
    async getAllRoleListFn() {
      const res = await getAllRoleListAPI(this.pageInfo)

      // 保存到data
      this.roleList = res.data.rows
      this.pageInfo.total = res.data.rows.length
    },

    // 根据企业id请求企业信息
    async getCompanyByIdFn() {
      const res = await getCompanyByIdAPI(this.companyId)
      this.companyInfo = res.data
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

.form {
  margin-top: 50px;
}
</style>
