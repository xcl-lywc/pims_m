<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

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
		//自适应浏览器大小
    /* this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100) */
    window.addEventListener('resize', this.__resizeHanlder)
  },
	created(){
		this.getPieData();
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
		
		/* 
		 初始化echarts实例
		 */
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
    },
		
		/*
		* 线性图标的相关数据
		*/
		getPieData(){
			this.axios.get(`${this.common.basePath}/project/pie`,this._lineParams()).then( (response) => {
				if(response.data.meta.code === 0){
					var pieChartData = response.data.data;
					//饼状图数据配置
					this.chart.setOption({
						tooltip: {
							trigger: 'item',
							formatter: '{a} <br/>{b} : {c} ({d}%)'
						},
						legend: {
							left: 'center',
							bottom: '10',
							data: ['未受理', '预审中', '专家审批', '上会审批', '财政审批','已立项','已结项']
						},
						calculable: true,
						series: [
							{
								name: '项目进度',
								type: 'pie',
								roseType: 'radius',
								radius: [15, 95],
								center: ['50%', '38%'],
								data:pieChartData,
								animationEasing: 'cubicInOut',
								animationDuration: 2600
							}
						]
					})
				}else{
					this.$toast(response.data.meta.message, 20);   
				}
			}).catch( (erroPier) => {
				// this.$toast(error);
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

<style scoped>
	.chart-wrapper{
		border-radius: 5px;
	}
</style>
