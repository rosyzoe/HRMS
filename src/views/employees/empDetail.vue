<template>
  <div class="emp-detail">
    <el-card class="box">
      <el-tabs v-model="active">
        <el-tab-pane class="tab-pane" label="登录账户设置" name="first">
          <AccountStting />
        </el-tab-pane>
        <el-tab-pane class="tab-pane" label="个人详情" name="second">
          <personal-detail />
        </el-tab-pane>
        <el-tab-pane class="tab-pane" label="岗位信息" name="third">岗位信息</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import AccountStting from './components/account-setting.vue'
import PersonalDetail from './components/personal-detail.vue'
export default {
  name: 'EmpDetail',
  components: {
    AccountStting,
    PersonalDetail
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

.tab-pane {
  margin: 30px 0;
}
</style>
