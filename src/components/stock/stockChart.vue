<template>
  <div class="stockChart">
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>
<script>
export default {
  name: 'stockChart',
  components: {
  },
  props: {
    items: {
      type: Array
    }
  },
  data () {
    return {
      rawData: []
    }
  },
  computed: {
    option () {
      return {
        title: {
          text: '上证指数',
          x: '50px',
          y: 'top',
          textStyle: { // 主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            fontSize: 30,
            color: 'white'
          }
        },
        legend: {
          data: ['日K', '5日均线', '10日均线', '20日均线', '30日均线'],
          inactiveColor: '#777'
        },
        tooltip: {
          confine: true,
          trigger: 'axis',
          axisPointer: {
            animation: false,
            type: 'cross',
            lineStyle: {
              color: '#376df4',
              width: 2,
              opacity: 1
            }
          }
        },
        xAxis: {
          type: 'category',
          data: this.dates,
          axisLine: { lineStyle: { color: '#8392A5' } }
        },
        yAxis: {
          scale: true,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: { show: false }
        },
        grid: {
          bottom: 80
        },
        dataZoom: [
          {
            textStyle: {
              color: '#8392A5'
            },
            handleIcon:
              'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            dataBackground: {
              areaStyle: {
                color: '#8392A5'
              },
              lineStyle: {
                opacity: 0.8,
                color: '#8392A5'
              }
            },
            brushSelect: true
          },
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'candlestick',
            name: '日K',
            data: this.data,
            itemStyle: {
              normal: {
                color0: '#FD1050',
                color: '#0CF49B',
                borderColor0: '#FD1050',
                borderColor: '#0CF49B'
              }
            }
          },
          {
            name: '5日均线',
            type: 'line',
            data: this.calculateMA(5, this.data),
            smooth: true,
            showSymbol: false,
            encode: {
              x: '日期',
              y: '5日均线'
            },
            lineStyle: {
              width: 1
            }
          },
          {
            name: '10日均线',
            type: 'line',
            data: this.calculateMA(10, this.data),
            smooth: true,
            showSymbol: false,
            encode: {
              x: '日期',
              y: '10日均线'
            },
            lineStyle: {
              width: 1
            }
          },
          {
            name: '20日均线',
            type: 'line',
            data: this.calculateMA(20, this.data),
            smooth: true,
            showSymbol: false,
            encode: {
              x: '日期',
              y: '20日均线'
            },
            lineStyle: {
              width: 1
            }
          },
          {
            name: '30日均线',
            type: 'line',
            data: this.calculateMA(30, this.data),
            smooth: true,
            showSymbol: false,
            encode: {
              x: '日期',
              y: '30日均线'
            },
            lineStyle: {
              width: 1
            }
          }]
      }
    },
    dates () {
      return this.rawData.map(item => item[0])
    },
    data () {
      return this.rawData.map(item => [item[1], item[4], item[3], item[2]])
    }
  },
  watch: {
    items: function (newVal, oldVal) { // 造成无线循环
      // console.log(newVal);
      const tmp = JSON.parse(JSON.stringify(newVal)).reverse()// 深拷贝
      this.rawData = tmp
    }
  },
  created () {
    console.log(this.dates)
  },
  mounted () {},
  methods: {
    calculateMA (dayCount, data) {
      const result = []
      for (let i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-')
          continue
        }
        let sum = 0
        for (let j = 0; j < dayCount; j++) {
          sum += data[i - j][1]
        }
        result.push(sum / dayCount)
      }
      return result
    }
  }
}
</script>

<style scoped lang="less">
  .stockChart{
  }
</style>
