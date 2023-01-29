<template>
  <div class="employees-container">
    <div class="app-container">
      <!-- 顶部区域 -->
      <page-top-nav>
        <!-- 左侧标题 -->
        <template #left> 1 </template>

        <!-- 右侧按钮 -->
        <template #right>
          <el-button type="danger" size="small">简单表头导出</el-button>
          <el-button type="info" size="small">复杂表头导出</el-button>
          <el-button type="warning" size="small">excel导入</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </page-top-nav>
      <h2>员工</h2>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
