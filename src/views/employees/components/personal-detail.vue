<template>
  <div class="personal-detail">
    <el-form :model="form" label-width="200px">
      <!-- 工号和入职时间区域 -->
      <el-row type="flex" justify="center">
        <el-col>
          <el-form-item label="工号">
            <el-input v-model="form.workNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="入职时间">
            <el-date-picker v-model="form.timeOfEntry" type="date" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 姓名和部门区域 -->
      <el-row type="flex">
        <el-col>
          <el-form-item label="姓名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="部门">
            <el-input v-model="form.departmentName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 手机号和聘用形式区域 -->
      <el-row type="flex">
        <el-col>
          <el-form-item label="手机">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="聘用形式">
            <el-select v-model="form.formOfEmployment" placeholder="请选择">
              <el-option v-for="item in Employees" :key="item.value" :label="item.value" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 员工头像区域 -->
      <el-row>
        <el-form-item label="员工头像">
          <upload-photo ref="uploadPhotoRef"></upload-photo>
        </el-form-item>
      </el-row>

      <!-- 按钮区域 -->
      <el-row type="flex" justify="center">
        <el-button type="success" size="small" @click="updateBtn">保存更新</el-button>
        <el-button type="info" size="small" @click="backBtn">返回</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getEmployeeDetailAPI, changeEmployeeDetailAPI } from '@/api'
import Employees from '@/constant/hireType'
import UploadPhoto from '@/components/uploadPhoto'
export default {
  name: 'PersonalDetail',
  components: {
    UploadPhoto
  },
  props: {},
  data() {
    return {
      form: {},
      Employees: Employees.hireType // 员工聘用形式枚举数组
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getEmployeeDetailFn()
  },
  methods: {
    // 获取员工个人信息
    async getEmployeeDetailFn() {
      // 获取到员工id
      const empId = this.$route.query.id
      // 获取到员工的聘用形式
      const formOfEmploymentInfo = Number(this.$route.query.formOfEmployment)
      const res = await getEmployeeDetailAPI(empId)
      this.form = res.data
      this.$set(this.form, 'formOfEmployment', formOfEmploymentInfo)

      this.$refs.uploadPhotoRef.imageUrl = res.data.staffPhoto
    },

    // 点击更新按钮
    async updateBtn() {
      this.form.staffPhoto = this.$refs.uploadPhotoRef.imageUrl

      await changeEmployeeDetailAPI(this.form)

      this.$message.success('员工信息修改成功!')
    },

    // 点击返回按钮
    backBtn() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.el-input__inner {
  width: 200px;
}
</style>
