<template>
  <div class="aside" >
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      collapse-transition
      router>
      <span class="admin-title" :style="titleStyle" ref="title">后台管理中心</span>
      <el-submenu index="/">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/root-account">账户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/admin/root-setting">
        <i class="el-icon-setting"></i>
        <span slot="title">配置管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/devtxt">
        <i class="el-icon-menu"></i>
        <span slot="title">开发文档</span>
      </el-menu-item>
      <el-menu-item index="/home">
        <i class="el-icon-back"></i>
        <span slot="title">返回首页</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import bus from '@/util/eventBus.js'
export default {
  name: 'asideMenu',
  components: {},
  props: {},
  data () {
    return {
      isCollapse: true,
      titleStyle: {
        opacity: '1'
      }
    }
  },
  computed: {},
  watch: {
    isCollapse: function (newVal, oldVal) {
      this.titleStyle.opacity = this.isCollapse ? '0' : '1'
      this.$refs.title.classList.add('title')
      console.log(this.$refs.title.classList)
    }
  },
  created () {
    bus.$on('share', val => {
      this.isCollapse = val
    })
  },
  mounted () {},
  methods: {
  }
}
</script>

<style scoped lang="less">
.title{
  transition: all 0.5s ease-in-out;
}
.admin-title{
  transition: opacity 0.4s linear;
  color: aliceblue;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
}
.selected{
  /* opacity: 0; */
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
  background-color: #545c64;
}
.el-menu {
  height: 100vh;
  width: auto;
}
/* .selected {
  width: auto;
  transition:width 0.2s linear;
} */
</style>
