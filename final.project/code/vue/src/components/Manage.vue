<template>
  <el-container style="min-height: 100vh">
    <el-aside :width="asideWidth + 'px'" style="box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
      <Aside :isCollapse="isCollapse"/>
    </el-aside>

    <el-container>
      <el-header style="border-bottom: 1px solid #ccc;" >
        <Header :collapse="collapse" :collapseBtnClass="collapseBtnClass" />
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>

import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";

export default {
  name: 'Home',
  components: {
    Aside,
    Header,
  },
  data(){
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      asideWidth: 200,
      currentPathName: '用户管理',
    }
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.collapseBtnClass = 'el-icon-s-unfold';
        this.asideWidth = 64;
      } else {
        this.asideWidth = 200;
        this.collapseBtnClass = 'el-icon-s-fold';
      }
    }
  }
}
</script>

<style>
</style>