<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <el-table :data="tableData" border highlight-current-row style="width: 100%; margin-top: 20px">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { uploadEmployeeExcelAPI } from '@/api'
import { formatExcelDate } from '@/utils'
export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    async handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
      console.log(results, header)

      // 将表格中的数据进行格式化
      const userRelations = {
        入职日期: 'timeOfEntry',
        手机号: 'mobile',
        姓名: 'username',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName',
        聘用形式: 'formOfEmployment'
      }

      const newObj = results.map((item) => {
        const obj = {}
        const zhKey = Object.keys(item)
        zhKey.forEach((zhKey) => {
          const enKey = userRelations[zhKey]

          if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
            const transDate = formatExcelDate(item[zhKey])
            obj[enKey] = transDate
          } else {
            obj[enKey] = item[zhKey]
          }
        })
        return obj
      })

      const res = await uploadEmployeeExcelAPI(newObj)
      console.log(res)
      this.$message.success(res.message)
      this.$router.back()
    }
  }
}
</script>
