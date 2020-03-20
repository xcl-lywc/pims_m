<template>
  <div class="dashboard">
		<div class="header-wrap">
			<van-nav-bar title="信息化项目监督管理平台"></van-nav-bar>
		</div>  
		<div class="block-wrap">
			<h2 class="block-title">统计报表</h2>
			<div class="block-body">
				<div class="body-content">
					<DashBoard/>
				</div>
			</div>
			<div class="block-bottom"></div>
		</div>
  </div>
</template>
<script>
  import qs    from "qs"; //需要传表单时, 引用此包
  import DashBoard from '@/components/dashboard/DashBoard.vue'
  export default {
    name: 'dashboard',
    components: {
      DashBoard
    },
    mounted () {
			
    },
  }
</script>

<style scoped>
	
</style>
