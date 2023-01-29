<template>
  <div class="page-top-nav">
    <el-card>
      <el-row type="flex" justify="space-between" align="middle">
        <!-- 左侧文字提示区域 -->
        <el-col>
          <el-alert class="tip" type="success" :closable="false" show-icon>
            <template #title>
              <slot name="left">我是左侧的默认标题</slot>
            </template>
          </el-alert>
        </el-col>
        <!-- 右侧按钮区域 -->
        <el-col>
          <el-row type="flex" justify="end">
            <slot name="right"> 我是右侧的默认内容 </slot>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PageTopNav',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.tip {
  width: 200px;
  border: 1px solid #e6f7ff;
  font-weight: bold;
}
</style>
