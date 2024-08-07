<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden"
           background-color="rgb(48, 65, 86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="../assets/logo.webp" alt="" style="width: 60px; position: relative; top: 10px; right: 10px">
      <b style="color: white" v-show="!isCollapse">新闻管理系统</b>
    </div>


    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">最新新闻</span>
      </template>
      <el-menu-item index="/sina">
        <i class="el-icon-news"></i>
        <span slot="title">新浪国内新闻</span>
      </el-menu-item>
      <el-menu-item index="/wy">
        <i class="el-icon-news"></i>
        <span slot="title">网易国内新闻</span>
      </el-menu-item>
      <el-menu-item index="/eastmoney">
        <i class="el-icon-news"></i>
        <span slot="title">东方财富</span>
      </el-menu-item>
    </el-submenu>

    <el-menu-item index="/home">
      <template slot="title">
        <i class="el-icon-monitor"></i>
        <span slot="title">热度看板</span>
      </template>
    </el-menu-item>

    <el-menu-item index="/person">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span slot="title">个人信息</span>
      </template>
    </el-menu-item>

    <el-menu-item index="/index">
      <template slot="title">
        <i class="el-icon-reading"></i>
        <span slot="title">关于</span>
      </template>
    </el-menu-item>

    <el-menu-item index="/feedback">
      <template slot="title">
        <i class="el-icon-chat-square"></i>
        <span slot="title">意见反馈</span>
      </template>
    </el-menu-item>

  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: [
    'isCollapse',
    'asideWidth',
  ]
}
</script>

<style scoped>

</style>