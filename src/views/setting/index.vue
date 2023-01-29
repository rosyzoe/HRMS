<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first">
            <!-- 新增角色按钮 -->
            <el-row type="flex" justify="end">
              <el-button class="addRoleBtn" type="primary" @click="addRoleBtn">新增角色</el-button>
            </el-row>

            <!-- 表格区域 -->
            <el-table :data="roleList" border stripe highlight-current-row>
              <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
              <el-table-column prop="name" label="名称" align="center"></el-table-column>
              <el-table-column prop="description" label="描述" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="{ row }">
                  <el-button type="success" size="small">分配权限</el-button>
                  <el-button type="primarydanger" size="small" @click="editBtn(row)">编辑</el-button>
                  <el-button type="danger" size="small" @click="deleteBtn(row)">删除</el-button>
                </template>
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
        <el-row v-if="activeName === 'first'" class="pagination" type="flex" justify="center">
          <el-pagination
            layout="sizes,prev,pager, next"
            :total="pageInfo.total"
            :page-size="+pageInfo.pagesize"
            :page-sizes="pageInfo.pageSizes"
            :current-page="+pageInfo.page"
            @size-change="handlePageSize"
            @current-change="handleCurrenyPage"
          >
          </el-pagination>
        </el-row>
      </el-card>

      <handle-role-dialog
        ref="dialogRef"
        :get-all-role-list-fn="getAllRoleListFn"
        :role-detail="roleDetail"
        :is-edit="isEdit"
      ></handle-role-dialog>
    </div>
  </div>
</template>

<script>
import { getAllRoleListAPI, getCompanyByIdAPI, getRoleDetailAPI, deleteRoleByIdAPI } from '@/api'
import { mapGetters } from 'vuex'
import HandleRoleDialog from './components/handleRoleDialog.vue'
export default {
  components: {
    HandleRoleDialog
  },
  data() {
    return {
      // tab选项卡的默认选中状态
      activeName: 'first',

      // 分页信息
      pageInfo: {
        page: '1',
        pagesize: '10',
        total: 0,
        pageSizes: [5, 10, 15, 20]
      },

      // 所有角色列表
      roleList: [],

      // 公司信息
      companyInfo: {},

      // 根据角色id查询到的角色详情
      roleDetail: {},

      // 区分当前处于新增角色还是编辑角色状态
      isEdit: true
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
      this.pageInfo.total = res.data.total
    },

    // 根据企业id请求企业信息
    async getCompanyByIdFn() {
      const res = await getCompanyByIdAPI(this.companyId)
      this.companyInfo = res.data
    },

    // 点击新增角色
    addRoleBtn() {
      this.isEdit = false
      this.$refs.dialogRef.isShowDialog = true
    },

    // 点击编辑角色
    async editBtn(row) {
      this.isEdit = true
      this.$refs.dialogRef.isShowDialog = true
      const res = await getRoleDetailAPI(row.id)
      this.roleDetail = res.data
    },

    // 点击删除角色
    async deleteBtn(row) {
      await deleteRoleByIdAPI(row.id)

      // 解决删除第二页显示暂无数据的问题: 原因,删除了第二页的最后一条数据,还是会请求第二页的的数据
      // 所以需要在这里加一个判断逻辑,如果当前角色列表的长度等于1,就将分页信息中的page修改为1,最后删除完之后,调用接口实现刷新时就会自动请求第一页的角色数据了
      if (this.roleList.length === 1) {
        this.pageInfo.page = '1'
      }
      this.getAllRoleListFn()
    },

    // 分页-改变每页显示的条目个数时触发
    handlePageSize(page) {
      this.pageInfo.pagesize = page
      this.getAllRoleListFn()
    },

    // 分页-当前页数发生改变时触发
    handleCurrenyPage(currentPage) {
      this.pageInfo.page = currentPage
      this.getAllRoleListFn()
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
