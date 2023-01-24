<template>
  <div>
    <ul>
      <router-link :to="'/home'"><li ref="slider">首页</li></router-link>
      <router-link :to="'/stock'"><li ref="slider">股票分析</li></router-link>
      <router-link :to="'/article'"><li ref="slider">精选文章</li></router-link>
      <li ref="slider" @click="gotoAdmin" :class="powerStyle ? 'powerStyle' : ''">管理中心</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'userHeader',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    powerStyle () {
      if (!this.$store.state.isLogin) {
        return false
      } else if (this.$store.state.user.level !== null ? this.$store.state.user.level <= 2 : true) {
        return false
      } else return true
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    gotoAdmin () {
      this.$router.push('/admin')
    }
  }
}
</script>

<style scoped lang="less">
  .powerStyle{
    color: #eee;
    cursor: pointer;
  }
  a{
    text-decoration: none;
    outline: none;
    color: #eee;
  }
  div{
    height:60px;
  }
  ul{
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  li{
    display: flex;
    justify-content: center;
    width: 80px;
    padding: 0 20px;
  }
  li:hover{
    color:#fff;
    font-weight: 600
  }
</style>
