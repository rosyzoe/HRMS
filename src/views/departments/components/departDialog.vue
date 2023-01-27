<template>
  <div class="depart-dialog">
    <el-dialog
      title="提示"
      :visible.sync="showDialog"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <span>这是一段信息</span>
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
    }
  },
  data() {
    return {}
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
      // 通过sync语法糖,改变父组件中showDialog的值
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
