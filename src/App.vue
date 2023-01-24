<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  watch: {},
  created () {},
  mounted () {
    console.log('1', this.getUser)
    if (this.getUser.username !== '') {
      this.updateLogin(Boolean(localStorage.getItem('login')))
      this.updateUser(JSON.parse(localStorage.getItem('userid')))
    }
  },
  methods: {
    ...mapMutations(['updateLogin', 'updateUser'])
  }
}
</script>

<style lang="less">
@import '@/assets/css/default.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
