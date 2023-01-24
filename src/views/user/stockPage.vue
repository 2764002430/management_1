<template>
  <div class="stock">
    <div class="search-content">
      <h2>股票查询</h2>
      <el-input
      placeholder="请输入股票代号"
      v-model="input" style="width:400px" @keyup.enter.native="handleSearch(1)">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <div class="stock-content">
      <div id="dateSelect">
        <el-select v-model="value">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-popover
          placement="right"
          width="400"
          trigger="click">
          <div class="tooltip">
            <span v-for="item in Company" :key="item.id">
            {{ item.id }} - {{ item.value }}
            <br>
          </span>
          </div>
          <el-button slot="reference">公司详情</el-button>
        </el-popover>
      </div>
      <stockChart :items="items"></stockChart>
    </div>

  </div>
</template>

<script>
import stockChart from '@/components/stock/stockChart.vue'
import { getstock } from '@/api/stock/getstock.js'
export default {
  name: 'stock',
  components: {
    stockChart
  },
  props: {},
  data () {
    return {
      input: '',
      items: [],
      options: [{
        value: '20230101',
        label: '最新'
      }, {
        value: '20220101',
        label: '2022'
      }, {
        value: '20210101',
        label: '2021'
      }, {
        value: '20200101',
        label: '2020'
      }],
      Company: [
        {
          id: '股票代码',
          value: ''
        },
        {
          id: '交易所代码',
          value: ''
        },
        {
          id: '法人代表',
          value: ''
        },
        {
          id: '总经理',
          value: ''
        },
        {
          id: '注册资本',
          value: 0
        },
        {
          id: '注册日期',
          value: ''
        },
        {
          id: '城市',
          value: ''
        }
      ],
      value: '20230101'
    }
  },
  computed: {
    selectDate () {
      const n = JSON.parse(JSON.stringify(this.value))
      const x = n.substring(0, 3) + (+n.charAt(3) + 1) + n.substring(3 + 1)
      return this.value === '20230101' ? this.formatDate : x
    }
  },
  watch: {
    value: function (newVal) { // 监听
      if (this.items.length <= 0) {
        return
      }
      return this.handleSearch()
    }
  },
  created () {},
  mounted () {},
  methods: {
    formatDate () {
      const date = new Date()
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + m + d
    },
    handleSearch (first) {
      if (this.input.trim().length <= 0) {
        return
      }
      const params = {
        ts_code: this.input,
        start_date: this.value,
        end_date: this.selectDate
      }
      console.log(this.selectDate) // 获取当前日期
      console.log(new Date().toLocaleDateString()) // 获取当前日期
      getstock('daily', params, 'trade_date,open,high,low,close').then(data => {
        const res = data.data.data
        console.log(res.items)
        this.items = res.items
        if (first === 1) {
          if (res.items.length <= 0) {
            this.$message({
              showClose: true,
              message: '未找到有关股票代码',
              type: 'error',
              duration: 1000
            })
          } else {
            this.$message({
              showClose: true,
              message: '搜索成功',
              type: 'success',
              duration: 1000
            })
          }
        }
      })
      getstock('stock_company', { ts_code: this.input }, 'ts_code,exchange,chairman,manager,reg_capital,setup_date,province').then(data => {
        const res = data.data.data
        console.log(res.items)
        // const obj = this.Company
        // let i = 0
        // for (const key in obj) {
        //   obj[key] = res.items[0][i]
        //   i++
        // }
        this.Company.map((item, i) => {
          item.value = res.items[0][i]
          return item
        })
        console.log(this.Company[0].id)
      })
    }
  }
}
</script>

<style scoped lang="less">
  .el-select {
    height: 50px;
    width: 100px;

  }
  .stock-content{
    position: relative;
    width: 1080px;
    display: flex;
    align-items: flex-start;
  }
  .dateSelect {
    position: absolute;
    left: 60px;
    right: 100px;
    bottom: 50px;
  }
  .search-content h2{
    font-size: 26px;
    margin-bottom: 30px;
  }
  .stock {
    padding-top: 60px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
  }
  /deep/ .stockChart {
    height: 600px;
    width: 1080px
  }
</style>
