<template>
  <div class="account-setting">
    <el-form :model="form" :rules="rules" class="form" label-width="200px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="form.username" style="width: 300px"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" style="width: 300px"></el-input>
      </el-form-item>

      <el-form-item>
        <el-row>
          <el-button type="success" size="small" @click="changeBtn">修改</el-button>
          <el-button type="warning" size="small">重置</el-button>
          <el-button type="info" size="small" @click="$router.back()">返回员工页</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getEmployeeDetailAPI, changeEmployeeDetailAPI } from '@/api'
export default {
  name: 'AccountSetting',
  components: {},
  props: {},
  data() {
    return {
      // 表单信息
      form: {
        username: '',
        password: ''
      },

      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '员工名字不能为空!', trigger: 'blur' },
          { min: 1, max: 4, message: '员工名字长度为1-4位!', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空!', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getEmployeeDetail()
  },
  methods: {
    // 请求员工信息
    async getEmployeeDetail() {
      const empId = this.$route.query.id

      const res = await getEmployeeDetailAPI(empId)

      // 将返回的员工信息保存到data,实现数据回显
      // this.form.username = res.data.username
      // this.form.password = res.data.password
      this.form = res.data
    },

    // 点击修改按钮
    async changeBtn() {
      await changeEmployeeDetailAPI(this.form)
      this.$message.success('员工信息修改成功!')
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  margin-top: 30px;
}
</style>
