<template>
    <el-dropdown trigger="click" size="medium">
      <span class="el-dropdown-link">
        <el-avatar :size="45" :src="$store.getters.init"></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown" v-if="!$store.state.isLogin">
        <el-dropdown-item @click.native="handleLogin">登录</el-dropdown-item>
        <el-dropdown-item @click.native="handleSign">注册</el-dropdown-item>
      </el-dropdown-menu>
      <el-dropdown-menu slot="dropdown" v-if="$store.state.isLogin">
        <el-dropdown-item icon="el-icon-user">个人空间</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus">更换头像</el-dropdown-item>
        <el-dropdown-item icon="el-icon-back" @click.native="handleClick">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import { mapMutations } from 'vuex'
import bus from '@/util/eventBus.js'
export default {
  name: 'Avtor',
  components: {},
  props: {},
  data () {
    return {
      model: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    ...mapMutations(['logOut']),
    handleClick () {
      this.logOut()
      this.$message({
        message: '退出成功!',
        type: 'success'
      })
    },
    handleLogin () {
      this.model = 0
      console.log()
      bus.$emit('LS_model', this.model)
    },
    handleSign () {
      this.model = 1
      bus.$emit('LS_model', this.model)
    }
  }
}
</script>

<style scoped lang="less"></style>
