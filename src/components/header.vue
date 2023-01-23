<template>
  <div class="header">
    <el-radio-group v-model="isCollapse" >
      <img class="list" src="@/assets/icon/list.png" alt="" @click="changeCollapse()">
    </el-radio-group>
    <ul class="right">
      <li class="search"><adminSearch></adminSearch></li>
      <li class="admin-pic">
        <img src="@/assets/icon/user/user1.png" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
import adminSearch from '@/components/search'
import bus from '@/util/eventBus.js'
export default {
  name: 'adminHeader',
  components: {
    adminSearch
  },
  props: {},
  data () {
    return {
      isCollapse: true
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    changeCollapse () {
      this.isCollapse = !this.isCollapse
      bus.$emit('share', this.isCollapse)
    }
  }
}
</script>

<style lang="less">
  .header {
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f0f0f0;
    height: 100%;
    .list{
      width: 20px;
      height: 20px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    li {
      margin-left: 40px;
    }
  }
  .admin-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
</style>
