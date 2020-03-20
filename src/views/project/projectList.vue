 <!--
    项目列表
  -->
<template>
  <div class="project-list">
		<div class="header-wrap">
			<van-nav-bar title="信息化项目监督管理平台" @click-left="onClickLeft" @click-right="onClickRight">
				<van-icon name="arrow-left" slot="left"/>
				<van-icon name="wap-home" slot="right"/>
			</van-nav-bar>
		</div> 
    <div class="block-wrap" v-if="tableData.rows">
      <h4 class="block-title">{{common.projectTitleStatusData(projectId).name}}</h4>
      <div class="block-body">
				<!-- 已完结项目 -->
        <div class="body-content" v-if="projectId=='projects_finished'">
					<div v-for="(item,index) in tableAllData.rows" class="content-item"  @click="$router.push({name:'projectDetail',params:{id:item.id}})">
						<div v-if="item.stage==9">
							<van-panel :title="'项目名称：'+item.name" :desc="'项目编号：'+item.projectNum" :status="'当前状态：'+common.showStatusText(item.stage) ? common.showStatusText(item.stage).name : '' ">
								<div class="content-item-else">
									<p><span>申报时间：</span>{{common._convertDate(item.createTime, 'yyyy年MM月dd日')}}</p>
									<p><span>申报单位：</span>{{item.orgName}}</p>
								</div>
							</van-panel>
						</div>
					</div>
					<div v-if="tableAllData.rows.length==0" class="no-data">暂无数据</div>
        </div>
				<!-- 所有项目 -->
				<div class="body-content" v-else-if="projectId=='project-all'">
					<div v-for="(item,index) in tableData.rows" class="content-item"  @click="$router.push({name:'projectDetail',params:{id:item.id}})">
						<van-panel :title="'项目名称：'+item.name" :desc="'项目编号：'+item.projectNum" :status="'当前状态：'+common.showStatusText(item.stage) ? common.showStatusText(item.stage).name : '' ">
							<div class="content-item-else">
								<p><span>申报时间：</span>{{common._convertDate(item.createTime, 'yyyy年MM月dd日')}}</p>
								<p><span>申报单位：</span>{{item.orgName}}</p>
							</div>
						</van-panel>
					</div>
					<div v-if="tableData.rows.length==0" class="no-data">暂无数据</div>
				</div>
				<!-- 其他各个阶段项目 -->
				<div class="body-content" v-else>
					<div v-for="(item,index) in tableData.rows" class="content-item" @click="$router.push({name:'projectDetail',params:{id:item.processVariables.projectId}})">
						<van-panel :title="'项目名称：'+item.processVariables.name" :desc="'项目编号：'+item.processVariables.projectNum" :status="'当前状态：'+common.projectCurStatusData(item.processVariables.cur_status)">
							<div class="content-item-else">
								<p><span>申报时间：</span>{{common._convertDate(item.processVariables.applyTime, 'yyyy年MM月dd日')}}</p>
								<p><span>申报单位：</span>{{item.processVariables.company | convertToText}}</p>
								<p>{{'项目金额：'+item.processVariables.budgetMoney+'万元'}}</p>
							</div>
						</van-panel>
					</div>
					<div v-if="tableData.rows.length==0" class="no-data">暂无数据</div>
				</div>
      </div>
      <div class="block-bottom">
				<p v-on:click="clickMore" class="more" v-if="number!=0">{{number<=5?"没有更多数据了":moreText}}</p>
			</div>
    </div>
  </div> 
</template>

<script>
  import {convertToText} from '../../plugins/convertToText.js';
  export default {
    data() {
      return {
				projectId:this.$route.params.id,
        elementPageData: {               
          //分页需要的数据
          defaultData:  this.common.elementPagination,
          pageNum:      this.common.elementPagination.pageNumDefault,
          pageSize:     this.common.elementPagination.pageSizeDefault,
        },
        tableData: {rows: [], total: 0},
				tableAllData: {rows: [], total: 0},
				number:null,//项目数量
				moreText:'点击加载更多数据',
      }
    },
    filters: {
      /* 
       转化申报单位 id=>文本
       */
      convertToText(idValue){
        return convertToText(idValue,JSON.parse(sessionStorage.getItem("unitArr")));
      }
    },
    methods: {
			
			/* 
			返回上一级
			*/
			onClickLeft(){
				this.$router.back(-1);
			},
			/* 
			返回首页
			*/
			onClickRight(){
				this.$router.push({path: '/'});
			},
			
			/* 
			 点击加载更多
			 */
			clickMore(){
				if(this.number<=5){
					this.moreText = '没有更多数据了'
					return;
				}else if(Math.abs(this.elementPageData.pageSize-this.number)>5){
					return;
				}else{
					this.elementPageData.pageSize+=5;
					this.getList();
					if(this.elementPageData.pageSize>=this.number){
						this.moreText = '没有更多数据了'
						return;
					}
				}
			},
			
			/* 
				获取某一项目数量
			 */
			getTotalNumber () {
				let self = this
				let config = {
					method: "get",
					url: `${self.common.basePath}/project/home/count`,
					params: {
						stage: self.common.projectTitleStatusData(self.projectId).stage,
					}
				}
				self.axios(config).then((response) => {
					self.number = response.data.data
				})
			},
			
      /* 
        获取申报单位
      */
      getDeclareUnit(){
        var formData = {
          id:6,
        }
        let self = this
        let p = new Promise ((resolve, reject) => {
          self.axios.post(`${self.common.basePath}/hr_users/user/list`,formData).then( (response) => {
            if(response.data.meta.code === 0){
              var declareUnitList = response.data.data;
              sessionStorage.setItem("unitArr",JSON.stringify(declareUnitList))
              resolve("查询成功")
            }else{
              self.$toast(response.data.meta.message, 20);
              resolve("查询失败")
            }
          }).catch( (error) => {
            resolve("查询失败")
            self.$toast(error,20);            
          });
        })
        return p
      },
      
      /* 
        项目详情 row, event, column
      */
      openDetails(row) {
        sessionStorage.setItem("declareProjectIsEdit",1)
        this.$router.push({
        name:'DeclareDetail',
          params:{
            id:row.processVariables.projectId,
          }
        })
      },
      
      /*
      * 改变当前页码触发此事件
      * @param {number} val 当前页码
      */
      handleCurrentChange(val){
        this.elementPageData.pageNum = val;
        this.getList();
      },
      
      /*
      * 改变每页条数触发此事件
      * @param {number} val 当前数据
      */
      handleSizeChange(val){
        this.elementPageData.pageSize = val;
        this.getList();
      },
      
      /*
      * 获取列表
      */
      getList(){
				if(this.projectId=='projects_finished'){
					var _allListParams_ = {
						/* pageSize: this.elementPageData.pageSize,
						pageNum:  this.elementPageData.pageNum, */
					}
					this.axios.post(`${this.common.basePath}/project/all`,_allListParams_).then( (response) => {
						if(response.data.meta.code === 0){
							//从所有项目中筛选出已完结的项目
							for(var i = 0;i<response.data.data.rows.length;i++){
								if(response.data.data.rows[i].stage==9){
									this.tableAllData.rows.push(response.data.data.rows[i])
								}
							}
							this.number = this.tableAllData.rows.length;
						}else{
							this.$toast(response.data.meta.message, 20);   
						}
						
					}).catch( (error) => {
						this.$toast(error);
					});
				}else if(this.projectId=='project-all'){
					var _allListParams = {
						pageSize: this.elementPageData.pageSize,
						pageNum:  this.elementPageData.pageNum,
					}
					this.axios.post(`${this.common.basePath}/project/all`,_allListParams).then( (response) => {
						if(response.data.meta.code === 0){
							this.tableData = response.data.data;
							this.number = response.data.data.total;
						}else{
							this.$toast(response.data.meta.message, 20);   
						}
						
					}).catch( (error) => {
						this.$toast(error);
					});
				}else{
					this.axios.get(`${this.common.basePath}/project/page`,this._listParams()).then( (response) => {
						if(response.data.meta.code === 0){
							// this.$message.success(response.data.meta.message, 20);
							this.tableData = response.data.data;
							this.number = response.data.data.total;
						}else{
							this.$message.error(response.data.meta.message, 20);   
						}
						
					}).catch( (error) => {
						this.$message.error(error);
					});
				}
      },
      _listParams(){
        return {
          params: {
            status:this.common.projectTitleStatusData(this.projectId).statusNum,
            pageSize: this.elementPageData.pageSize,
            pageNum:  this.elementPageData.pageNum,
          }
        }
      },
      
    },
    mounted() {
      /* 
       列表展示
       */
      this.getDeclareUnit().then(() => {
        this.getList();
      })
			
			/* 
			获取某一项目数量
			*/
			// this.getTotalNumber();
    },
    
  }
</script>

<style scoped>
  
</style>