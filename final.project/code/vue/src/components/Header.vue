<template>

  <div style="font-size: 12px; line-height: 60px; display: flex">
    <div style="flex: 1; font-size: 20px">
      <span :class="collapse" style="cursor: pointer" @click="collapse"></span>
      <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
        <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown style="width: 150px; cursor: pointer; text-align: right">
      <div style="display: inline-block">
        <img :src="user.avatarUrl" alt=""
             style="width: 30px; border-radius: 50%; position: relative; top: 5px; right: 5px">
        <span>{{ user.nickname }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><router-link to="/person" style="text-decoration: none">个人信息</router-link></el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: [
    'collapseBtnClass',
    'collapse',
  ],
  data(){
    return {
      currentPathName: '',
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(){
        this.currentPathName = localStorage.getItem("currentPathName");
      }
    }
  },
  methods: {
    logout(){
      localStorage.removeItem("user");
      this.$router.push("/login");
      this.$message.success("退出成功");
    }
  },
  mounted() {
    this.$bus.$on('updateUser',user => {
      this.user = user;
    })
  }
}
</script>

<style scoped>

</style>