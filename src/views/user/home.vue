<template>
  <div class="home">
    <login v-if="!$store.state.isLogin && model== 0"></login>
    <sign v-if="!$store.state.isLogin && model!=0"></sign>
    <el-carousel :interval="5000" arrow="always" height="100vh">
      <el-carousel-item>
        <img src="@/assets/pic/1.png" alt="" ref="pic">
      </el-carousel-item>
      <el-carousel-item >
        <img src="@/assets/pic/2.png" alt="" ref="pic">
      </el-carousel-item>
      <el-carousel-item  >
        <img src="@/assets/pic/3.png" alt="" ref="pic">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import login from '@/components/Login/login.vue'
import sign from '@/components/Login/Sign.vue'
import bus from '@/util/eventBus.js'
export default {
  name: 'home',
  components: {
    login,
    sign
  },
  props: {},
  data () {
    return {
      model: 0,
      pic: {
        num: 3,
        src: [
          '@/assets/pic/2.png',
          '../assets/pic/1.jpg',
          '../assets/pic/3.jpg'
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    bus.$on('LS_model', model => {
      console.log(model)
      this.model = model
    })
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
  /deep/ .login {
    top: calc(50% - 215px);
    right: calc(50% - 215px);
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 100vh;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
