<template>
  <div class="article-wrapper">
    <div class="article-wrapper-left">
      <img :src="item.img" alt="">
    </div>
    <div class="article-wrapper-right">
      <h1>{{ item.name }}</h1>
      <p>{{ item.describe }}</p>
      <span>
        <i>发布日期：{{ item.date }}</i>
        <i>用户：{{ item.author }}</i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-item',
  components: {},
  props: {
    item: {
      id: Number,
      name: String,
      describe: String,
      date: Date,
      author: String,
      img: String
    }
  },
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
  .article-wrapper{
    border-radius: 5px;
    height: 140px;
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
    display: flex;
    align-items: center;
    transition: all 0.2s linear;
  }
  .article-wrapper:hover{
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
  }
  .article-wrapper-left {
      width: 200px;
      height: 120px;
      float: left;
      img{
        border-radius: 5px;
        width: 100%;
        height: 100%;
      }
    }
  .article-wrapper-right {
    width: calc(100% - 200px - 20px);
    margin-left:20px;
    float: left;
    h1 {
      font-size: 20px;
      color: white;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p{
      font-size: 14px;
      color: rgba(255, 255, 255, 0.4);
      display: -webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      width: 100%;
      height: 60px;
      text-align:left;
      border-bottom: 1px solid rgba(255,255,255,0.2);
      word-wrap: break-word;
      word-break: break-all;
    }
    span{
      height: calc(120px - 90px);
      display: flex;
      align-items:flex-end;
      justify-content: space-between;
    }
  }
</style>
