<template>
  <div class="adminGUI">
    <el-container><asideMenu></asideMenu>
      <el-container>
        <el-header><adminHeader></adminHeader></el-header>
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import asideMenu from '@/components/aside.vue'
import adminHeader from '@/components/header'
export default {
  name: 'admin',
  components: {
    asideMenu,
    adminHeader
  },
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
  .el-header {
    padding: 0;
  }
</style>
