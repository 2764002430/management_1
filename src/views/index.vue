<template>
  <el-container>
    <div class="header-wrapper">
      <div class="header-content">
        <userHeader></userHeader>
        <div class="right">
          <search></search>
          <Avator></Avator>
        </div>
      </div>
    </div>
    <div class="main">
     <router-view></router-view>
    </div>
  </el-container>
</template>

<script>
import userHeader from '@/components/user/header.vue'
import search from '@/components/search.vue'
import Avator from '@/components/avator.vue'
export default {
  name: 'index',
  components: {
    userHeader,
    search,
    Avator
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
  .header-wrapper {
    width: 100%;
    position: absolute;
    background: rgba(0,0,0,0.1);
    display: flex;
    justify-content: center;
    z-index: 5;
  }
  .header-content {
    width: 1440px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .main {
    min-height: 100vh;
    width: 100vw;
    background: #000e17;
  }
  /deep/ .search-box {
    margin-right: 50px;
  }
</style>
