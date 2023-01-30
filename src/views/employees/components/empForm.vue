<template>
  <div class="emp-form">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="150px" size="small">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="form.username" placeholder="请输入姓名" style="width: 300px"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号" style="width: 300px"></el-input>
      </el-form-item>

      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="form.timeOfEntry" type="date" placeholder="选择日期"></el-date-picker
      ></el-form-item>

      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="form.formOfEmployment" placeholder="请选择聘用形式">
          <el-option v-for="(item, index) in Employees" :key="index" :label="item.value" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="form.workNumber" placeholder="请输入工号" style="width: 300px"></el-input>
      </el-form-item>

      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="form.departmentName"
          placeholder="请选择部门"
          readonly
          style="width: 300px"
          @focus="departFocusFn"
        ></el-input>
        <el-tree
          v-if="isShowTree"
          :data="departmentList"
          :props="defaultProps"
          @node-click="nodeClick"
        ></el-tree>
      </el-form-item>

      <el-form-item label="转正时间">
        <el-date-picker v-model="form.hiredate" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-row type="flex" justify="center">
        <el-button type="info" size="small" @click="cancelBtn">取消</el-button>
        <el-button type="success" size="small" @click="confirmBtn">确定</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Employees from '@/constant/hireType'
import { getDepartmentAPI } from '@/api'
import { transTree } from '@/utils'
export default {
  name: 'EmpForm',
  components: {},
  props: {},
  data() {
    return {
      form: {
        username: '', // 员工名字
        mobile: '', // 员工手机号
        formOfEmployment: '', // 员工聘用形式
        workNumber: '', // 员工工号
        departmentName: '', // 员工部门名字
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },

      // 员工聘用形式枚举类型
      Employees: Employees.hireType,

      // 部门列表
      departmentList: [],

      defaultProps: {
        children: 'children',
        label: 'name'
      },

      // 是否显示tree组件
      isShowTree: false,

      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '用户名不能为空!', trigger: 'blur' },
          { min: 1, max: 4, message: '员工名字长度为1-4位字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空!', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号不符合规范!', trigger: 'blur' }
        ],
        timeOfEntry: [{ required: true, message: '入职时间为必选项!', trigger: 'blur' }],
        formOfEmployment: [{ required: true, message: '聘用形式为必选项!', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空!', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门为必选项!', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    // 获取部门列表
    async getDepartmentListFn() {
      const res = await getDepartmentAPI()
      console.log(res)
      this.departmentList = transTree(res.data.depts, '')
    },

    // 部门输入框聚焦时触发
    departFocusFn() {
      this.getDepartmentListFn()
      this.isShowTree = true
    },

    // tree组件选中节点时触发
    nodeClick(data) {
      console.log(data)
      this.form.departmentName = data.name
      this.isShowTree = false
    },

    // 点击确定按钮
    confirmBtn() {
      this.$refs.formRef.validate((valid) => {
        if (!valid) return false

        this.$emit('update:show', false)
      })
    },

    // 点击取消按钮
    cancelBtn() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
