<template>
  <div class="search-box">
    <input class="search-txt" type="text" placeholder="输入关键字" />
      <a class="search-btn" href="#">
        <i class="el-icon-search"></i>
      </a>
  </div>
</template>

<script>
export default {
  name: 'adminSearch',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.search-box {
  background: rgba(0, 0, 0, 0.5);
  height: 35px;
  border-radius: 40px;
  padding: 5px;
}
.search-btn {
  font-size: 16px;
  color: #9499A0;
  float: right;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  text-decoration: none;
}
.search-txt {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: white;
  font-size: 16px;
  transition: 0.4s;
  line-height: 35px;
  width: 0;
}
.search-box:hover > .search-txt {
  width: 240px;
  padding: 0 6px;
}
.search-box:hover > .search-btn {
  background: white;
}
</style>
