<template>
  <div class="emp-detail">
    <el-card class="box">
      <el-tabs v-model="active">
        <el-tab-pane label="登录账户设置" name="first">
          <AccountStting />
        </el-tab-pane>
        <el-tab-pane label="个人详情" name="second">个人详情</el-tab-pane>
        <el-tab-pane label="岗位额信息" name="third">岗位额信息</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import AccountStting from './components/account-setting.vue'
export default {
  name: 'EmpDetail',
  components: {
    AccountStting
  },
  props: {},
  data() {
    return {
      active: 'first'
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.box {
  margin: 30px 20px;
}
</style>
