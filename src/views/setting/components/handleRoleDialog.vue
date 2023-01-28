<template>
  <div class="handle-role-dialog">
    <el-dialog
      title="新增角色"
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
import { addRoleAPI } from '@/api'
export default {
  name: 'HandleRoleDialog',
  components: {},
  props: {
    getAllRoleListFn: {
      type: Function,
      default: () => Function
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
  watch: {},
  created() {},
  methods: {
    // 点击取消按钮
    cancelBtn() {
      this.isShowDialog = false
    },

    // 点击确认按钮
    confirmBtn() {
      this.$refs.dialogRef.validate(async (valid) => {
        if (!valid) return false

        const res = await addRoleAPI(this.formData)
        console.log(res)
        this.getAllRoleListFn()
        this.isShowDialog = false
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
