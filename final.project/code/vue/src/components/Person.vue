<template>
    <el-card style="width: 500px;">
      <el-form label-width="80px" size="small">
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="新密码">
          <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="text-align: center;margin-right: 100px">
          <el-button type="primary" @click="save">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
</template>

<script>
export default {
  name: 'Person',
  data(){
    return {
      form: {},
      user: JSON.parse(localStorage.getItem("user")),
    }
  },
  methods: {
    save(){
      console.log(this.form);
      this.request.put('/user',this.form).then(res => {
        if(res.code === '200' || res.code === 200) {
          this.$message.success("保存成功");
          this.user.username = this.form.username;
          this.user.nickname = this.form.nickname;
          localStorage.setItem("user",JSON.stringify(this.user));
          this.$bus.$emit('updateUser',this.user);
        }
        else
          this.$message.error(res.msg);
      })
    }
  },
  mounted() {
    console.log("############",this.user);
    if(!this.user){
      this.$message.error("用户信息加载错误，请重新登录");
      return;
    }
    console.log(this.user.username);
    this.request.get(`/user/username/${this.user.username}`).then(res => {
      console.log(res.data);
      this.form = res.data;
    })
  }
}
</script>

<style>
.avatar-uploader {
  text-align: center;
  padding-bottom: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 138px;
  height: 138px;
  line-height: 138px;
  text-align: center;
}
.avatar {
  width: 138px;
  height: 138px;
  display: block;
}
</style>