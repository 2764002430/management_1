<template>
  <div class="stock">
    <stockChart></stockChart>
  </div>
</template>

<script>
import stockChart from '@/components/stock/stockChart.vue'
export default {
  name: 'stock',
  components: {
    stockChart
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

<style scoped lang="less"></style>
