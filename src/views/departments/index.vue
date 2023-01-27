<template>
  <div class="departments-container">
    <div class="app-container">
      <!-- 卡片容器 -->
      <el-card class="box-card">
        <!-- 卡片头部插槽 -->
        <template #header>
          <!-- tab标签页区域 -->
          <el-tabs v-model="tabActive">
            <el-tab-pane class="tab-pane" label="组织架构" name="first">
              <!-- 头部内容区域 -->
              <el-row type="flex" justify="space-between" align="middle">
                <!-- 头部左侧内容 -->
                <el-col :span="20">
                  <i class="el-icon-s-home"></i>
                  <span class="base">北京字节跳动科技股份有限公司</span>
                </el-col>

                <!-- 头部右侧内容 -->
                <el-col :span="4">
                  <el-row type="flex" justify="end">
                    <el-col>
                      <div class="principal">负责人</div>
                    </el-col>

                    <!-- 下拉菜单区域 -->
                    <el-col>
                      <el-dropdown>
                        <span class="el-dropdown-link">
                          操作
                          <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>添加子部门</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>

              <!-- 树形控件区域 -->
              <el-tree class="tree" :data="treeData" :props="defaultProps" default-expand-all>
                <!-- 默认插槽  并且使用内部的数据进行自定义模板的渲染
                  scope.data 所以直接key解构赋值变量也是data(对应数据对象)
                 -->
                <template #default="{ data }">
                  <el-row
                    type="flex"
                    justify="space-between"
                    align="middle"
                    style="height: 40px; width: 100%"
                  >
                    <!-- 部门名字 -->
                    <el-col :span="20">
                      <span>{{ data.name }}</span>
                    </el-col>
                    <!-- 功能操作区域 -->
                    <el-col :span="4">
                      <el-row type="flex" justify="end">
                        <!-- 两个内容 -->
                        <el-col>{{ data.manager }}</el-col>
                        <el-col>
                          <!-- 下拉菜单 element -->
                          <el-dropdown>
                            <span> 操作<i class="el-icon-arrow-down" /> </span>
                            <!-- 下拉菜单 -->
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item>添加子部门</el-dropdown-item>
                              <el-dropdown-item>编辑部门</el-dropdown-item>
                              <el-dropdown-item>删除部门</el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </template>
              </el-tree>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDepartmentAPI } from '@/api'
import { transTree } from '@/utils'
export default {
  data() {
    return {
      // tab标签页选中状态
      tabActive: 'first',
      // 树形控件数据
      treeData: [],
      // 定义树形控件的结构显示
      defaultProps: {
        children: 'children',
        label: 'departName'
      }
    }
  },
  mounted() {
    this.getDepartmentListFn()
  },
  methods: {
    // 获取部门列表数据
    async getDepartmentListFn() {
      const res = await getDepartmentAPI()
      console.log(res)
      this.treeData = transTree(res.data.depts, '')
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  padding: 10px 30px;

  .tab-pane {
    padding: 20px 80px;

    .base {
      margin-left: 10px;
      font-weight: bold;
    }
    .principal {
      font-size: 14px;
    }

    .tree {
      padding: 20px 0;
      font-size: 14px;
    }
  }
}
</style>
