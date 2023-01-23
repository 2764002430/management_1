<template>
  <div class="article">
    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled">
        <articleItem  class="list-item" v-for="(item, index) in list" :item="list[index]" :key="item.id"></articleItem>
      </ul>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
  </div>
</template>

<script>
import articleItem from '@/components/user/article-item.vue'
import { articleList } from '@/api/article/articleList.js'
export default {
  name: 'Article',
  components: {
    articleItem
  },
  props: {},
  data () {
    return {
      count: 0,
      total: 0,
      loading: false,
      page: 0,
      list: []
    }
  },
  computed: {
    noMore () {
      return this.count >= this.total
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  watch: {},
  created () {
    articleList().then(res => {
      this.total = res.data.total
      console.log(this.total)
    })
  },
  mounted () {},
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        this.init().then(res => {
          console.log('page', res)
          this.list = [...this.list, ...res.list] // 拼接
          this.count += res.count
          console.log(this.list)
          this.loading = false
        })
      }, 2000)
    },
    async init () {
      this.page++
      const { data: res } = await articleList(this.page)
      return res
    }
  }
}
</script>

<style scoped lang="less">
  .article {
    margin: auto;
    margin-top: 80px;
    padding: 30px 20px;
    width: 600px;
    background-color: #011421;
  }
  /deep/ .article-wrapper {
    margin-bottom: 10px;
  }
</style>
