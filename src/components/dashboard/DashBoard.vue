<template>
  <div class="dashboard-editor-container">
		<!-- 
			小模块
		 -->
    <panel-group></panel-group>
		<!-- 
			扇形图
		 -->
		 <div class="chart-wrapper">
		 	<pie-chart></pie-chart>
		 </div>
		 
		 <!-- 
		 	柱状图
		 -->
		 <div class="chart-wrapper">
		 	<bar-chart></bar-chart>
		 </div>
		 
		 

  </div>
</template>


<script>
import PanelGroup from './components/PanelGroup'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup,
    PieChart,
		BarChart,
  },
  data() {
    return {
      
    }
  },
  methods: {
		
  },
	mounted(){
		
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.dashboard-editor-container {
		padding: 12px;
		background-color:#f7f7f7;
		background-size: 100% 100%;
		.chart-wrapper {
			background: #fff;
			padding: 10px 0;
			margin: 0 auto 24px;
		}
	}
</style>
