<template>
  <div class="depart-dialog">
    <el-dialog
      title="添加子部门"
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="50%"
      center
    >
      <el-form ref="deptForm" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name" style="width: 80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="form.code" style="width: 80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select v-model="form.manager" style="width: 80%" placeholder="请选择">
            <el-option v-for="item in departSimpleList" :key="item.id" :value="item.username" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            v-model="form.introduce"
            style="width: 80%"
            placeholder="1-300个字符"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DepartDialog',
  components: {},
  props: {
    // 控制弹窗的显示/隐藏
    showDialog: {
      type: Boolean,
      default: false
    },

    // 部门负责人列表
    departSimpleList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },

      // 表单验证规则
      rules: {
        name: [
          { required: true, message: '部门名称不能为空!', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度为1-50个字符!', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空!', trigger: true },
          { min: 1, max: 50, message: '部门编码长度为1-50个字符!', trigger: 'blur' }
        ],
        manager: [{ required: true, message: '部门负责人不能为空!', trigger: 'blur' }],
        introduce: [
          { required: true, message: '部门介绍不能为空!', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍长度为1-300个字符!', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    // 点击取消按钮
    cancelBtn() {
      // 通过sync语法糖,改变父组件中showDialog的值
      this.$emit('update:showDialog', false)
    },

    // 点击确定按钮
    confirmBtn() {
      this.$refs.deptForm.validate((valid) => {
        if (!valid) return false
        // 通过sync语法糖,改变父组件中showDialog的值
        this.$emit('update:showDialog', false)
        this.$emit('addFormData', this.form)
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
