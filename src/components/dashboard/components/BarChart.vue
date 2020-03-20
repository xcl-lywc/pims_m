<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import { debounce } from '@/utils'

const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
    }
  },
  mounted() {
    this.initChart()
//     this.__resizeHanlder = debounce(() => {
//       if (this.chart) {
//         this.chart.resize()
//       }
//     }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
			let yBarData = [];
			let xBarData = [];
			
			this.axios.get(`${this.common.basePath}/project/budget`,this._lineParams()).then( (response) => {
				if(response.data.meta.code === 0){
					this.barData = response.data.data;
					for(var i= 0;i<response.data.data.length;i++){
						xBarData.push(response.data.data[i].name)
					}
					for(var i= 0;i<response.data.data.length;i++){
						yBarData.push(response.data.data[i].money)
					}
					
					this.chart = echarts.init(this.$el, 'macarons')
					
					this.chart.setOption({
						tooltip: {
							trigger: 'axis',
							axisPointer: { // 坐标轴指示器，坐标轴触发有效
								type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							top: 10,
							left: '2%',
							right: '2%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: [{
							type: 'category',
							data: xBarData,
							axisTick: {
								alignWithLabel: true
							}
						}],
						yAxis: [{
							type: 'value',
							axisTick: {
								show: false
							}
						}],
						series: [{
							itemStyle: {
								normal: {
									color: function(params) { 
											var colorList = ['#B74AE5','#16A085','#BA4A00',]; 
											return colorList[params.dataIndex] 
									}
								},
							},
							name: '资金/万元',
							type: 'bar',
							stack: 'vistors',
							barWidth: '60%',
							data: yBarData,
							animationDuration
						},]
					})
					
					
				}else{
					this.$message.error(response.data.meta.message, 20);   
				}
			}).catch( (error) => {
				this.$message.error(error);
			});
    },
		_lineParams(){
			return {
				params: {}
			}
		},
  }
}
</script>
