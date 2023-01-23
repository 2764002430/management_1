<template>
  <div>
    <ul>
      <router-link :to="'/home'"><li ref="slider">首页</li></router-link>
      <router-link :to="'/stock'"><li ref="slider">股票分析</li></router-link>
      <router-link :to="'/article'"><li ref="slider">精选文章</li></router-link>
      <router-link :to="'/admin'"><li ref="slider">管理中心</li></router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'userHeader',
  components: {},
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
