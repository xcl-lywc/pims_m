<!-- 
  项目详情
 -->
<template>
  <div class="project-detail">
		<div class="header-wrap">
			<van-nav-bar title="信息化项目监督管理平台" @click-left="onClickLeft" @click-right="onClickRight">
				<van-icon name="arrow-left" slot="left"/>
				<van-icon name="wap-home" slot="right"/>
			</van-nav-bar>
		</div> 
    <div class="block-wrap" v-if="detailData">
			<h4 class="block-title">{{'项目名称：'+detailData.name}}</h4>
      <div class="block-body">
        <div class="body-content">
					<van-tabs v-model="active" @click="handleClick" sticky animated>
						<van-tab title="基础信息">
							<base-info :projectId="projectId"></base-info>
						</van-tab>
						<!-- <van-tab title="申报历史">申报历史</van-tab>
						<van-tab title="进度汇报">进度汇报</van-tab> -->
					</van-tabs>
        </div>
      </div>
    </div> 
  </div> 
</template>

<script>
  import  baseInfo from '../../components/tabItem/baseInfo.vue';
  export default {
    components: {
      'base-info': baseInfo,
    },
    filters: {
			
    },
    computed: {
      
    },
    data(){
      return{
        projectId:this.$route.params.id,
        detailData:null,//详情
        active: 0,
      };
    },
    methods: {
			
			/* 
			返回上一级
			*/
			onClickLeft(){
 				var name = this.common.projectStageNameData(this.detailData.stage).name;
				this.$router.push({name:'projectList',params:{id:name}})
			},
			/* 
			返回首页
			*/
			onClickRight(){
				this.$router.push({path: '/'});
			},
			
      /*
      * 获取详情
      */
      getDetail(){
        this.axios.get(`${this.common.basePath}/project/detail/${this.projectId}`,this._detailParams()).then( (response) => {
            this.detailData = response.data.data; 
        }).catch( (error) => {
          this.$toast(error);
        });
      },
      _detailParams(){
        return {
          params: {
            id:this.projectId,
          }
        }
      },
      
     
      /* 
        tab切换
       */
      handleClick(index, title) {
        console.log(index, title)
      }, 
      
    },
    computed: {
      
    },
    mounted() { 
      
    },
    created(){
      /* 
       详情
      */
      this.getDetail();
    },
  }
</script>

<style lang="less" scoped>  
  
</style>