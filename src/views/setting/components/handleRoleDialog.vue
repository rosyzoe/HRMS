<template>
  <div class="handle-role-dialog">
    <el-dialog
      :title="isEdit ? '编辑角色' : '新增角色'"
      :visible="isShowDialog"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <!-- 表单区域 -->
      <el-form ref="dialogRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="formData.description"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部按钮区域 -->
      <template #footer>
        <el-row type="flex" justify="center">
          <el-button type="info" size="small" @click="cancelBtn">取消</el-button>
          <el-button type="primary" size="small" @click="confirmBtn">确定</el-button>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { addRoleAPI, updateRoleDetailAPI } from '@/api'
export default {
  name: 'HandleRoleDialog',
  components: {},
  props: {
    // 接收父组件中的获取所有角色列表方法
    getAllRoleListFn: {
      type: Function,
      default: () => Function
    },

    // 接收父组件中根据角色id查询到的角色详情
    roleDetail: {
      type: Object,
      default: () => {}
    },

    // 当前是否处于编辑状态
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 控制dialog的显示/隐藏
      isShowDialog: false,

      // 表单数据
      formData: {
        name: '', // 角色名称
        description: '' // 角色描述
      },

      // 表单校验规则
      rules: {
        name: [{ required: true, message: '角色名称不能为空!', trigger: 'blur' }],
        description: [{ required: true, message: '角色描述不能为空!', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {
    // 侦听roleDetail数据的改变
    roleDetail() {
      // 发生改变时,就将改变后的数据赋予给formData
      this.formData = this.roleDetail
    }
  },
  created() {},
  methods: {
    // 点击取消按钮
    cancelBtn() {
      this.isShowDialog = false
      this.$refs.dialogRef.resetFields()
    },

    // 点击确认按钮
    confirmBtn() {
      this.$refs.dialogRef.validate(async (valid) => {
        if (!valid) return false

        // 判断当前是否处于编辑状态,如果是则不执行新增角色相关代码
        if (!this.isEdit) {
          const res = await addRoleAPI(this.formData)
          console.log(res)
        } else {
          const res = await updateRoleDetailAPI(this.roleDetail)
          console.log(res)
        }
        this.isShowDialog = false
        this.getAllRoleListFn()
        this.$refs.dialogRef.resetFields()
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
