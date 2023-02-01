<template>
  <el-upload
    class="avatar-uploader"
    action="#"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :http-request="upload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    <el-progress
      v-if="isShowProgiress"
      :text-inside="true"
      :stroke-width="26"
      :percentage="percentage"
    ></el-progress>
  </el-upload>
</template>

<script>
const COS = require('cos-js-sdk-v5')
var cos = new COS({
  SecretId: 'AKID1CFY2gNUcq2Ij1baF8wC40H4JD6Ap6hh',
  SecretKey: '5Ur6ZuHspNOXv5WgG7fFfJio5KCT6mcX'
})
export default {
  data() {
    return {
      imageUrl: '',
      // 上传头像进度条
      isShowProgiress: false,
      percentage: 0
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }

      return isJPG && isLt2M
    },

    // 自定义上传属性
    upload(res) {
      this.isShowProgiress = true
      if (res.file) {
        cos.putObject(
          {
            Bucket: 'zhangxinxin-1316692028', // 存储桶的名称，必须
            Region: 'ap-nanjing', // 存储桶所在地域，必须字段
            Key: res.file.name, // 文件名，必须
            StorageClass: 'STANDARD', // 上传模式, 标准模式
            Body: res.file, // 上传文件对象
            // 上传进度条
            onProgress: (progressData) => {
              this.percentage = progressData.percent * 100
            }
          },
          (err, data) => {
            if (err === null && data.statusCode === 200) {
              this.imageUrl = `https://${data.Location}`
              this.isShowProgiress = false
            }
          }
        )
      }
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
