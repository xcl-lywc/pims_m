<template>
  <div class="base-info">
    <div class="base-container" v-if="detailData">
			<ul class="base-container-cell">
				<h4 class="base-title">
					<img src="../../assets/img/系统管理_icon.png" alt="" class="fl">
					<span class="fl">基本信息</span>
				</h4>
				<li class="base-item">
					<span class="label fl">项目名称：</span>
					<span class="fl">{{ detailData.name }}</span>
				</li>
				<li class="base-item">
					<span class="label fl">申报单位：</span>
					<span class="fl">{{ detailData.orgName }}</span>
				</li>
				<li class="base-item">
					<span class="label fl">项目负责人：</span>
					<span class="fl">{{ detailData.linkman }}</span>
				</li>
				<li class="base-item">
					<span class="label fl">项目联系人：</span>
					<span class="fl">{{ detailData.liabilityUser }}</span>
				</li>
				<li class="base-item">
					<span class="label fl">联系手机：</span>
					<span class="fl">{{ detailData.tel }}</span>
				</li>
				<li class="base-item">
					<span class="label fl">联系固话：</span>
					<span class="fl">{{ detailData.phone }}</span>
				</li>
				<li class="base-item">
					<span class="label fl">邮箱：</span>
					<span class="fl">{{ detailData.mail }}</span>
				</li>
			</ul>
			<ul class="base-container-cell">
				<h4 class="base-title">
					<img src="../../assets/img/系统管理_icon.png" alt="" class="fl">
					<span class="fl">项目预算</span>
				</h4>
				<li class="base-item">
					<span class="label fl">预算金额：</span>
					<span class="fl">{{ detailData.budgetMoney+'万元' }}</span>
				</li>
				<li class="base-item">
					<span class="label fl">预算来源：</span>
					<span class="fl" v-for="typeItem in detailData.budgetType">{{budgetRoute[typeItem]}}&nbsp;&nbsp;&nbsp;</span>
				</li>
				<li class="base-item" v-if="detailData.budgetRemarks">
					<span class="label fl">其他资金来源备注：</span>
					<span v-if="detailData.budgetRemarks!=''">{{detailData.budgetRemarks}}</span>
					<span v-else>暂无</span>
				</li>
				<li class="base-item">
					<span class="label fl">资金落实情况：</span>
					<span class="fl">{{detailData.financialSituation}}</span>
				</li>
				<li class="base-item" v-if="detailData.resourceRemarks">
					<span class="label fl">资金落实情况说明：</span>
					<span class="fl">{{detailData.resourceRemarks}}</span>
				</li>
				<li class="base-item">
					<span class="label fl">落实情况附件材料：</span>
					<file-list class="fl" v-if="detailData.situationFlie" :fileList="JSON.parse(detailData.situationFlie)"></file-list>
					<span class="fl" v-else-if="detailData.situationFlie == '[]'">暂无</span>
					<span class="fl" v-else>暂无</span>
				</li>
			</ul>
			<ul class="base-container-cell">
				<h4 class="base-title">
					<img src="../../assets/img/系统管理_icon.png" alt="" class="fl">
					<span class="fl">项目情况</span>
				</h4>
				<li class="base-item">
					<span class="label fl">项目类型：</span>
					<span class="fl" v-if="detailData.projectType" v-for="item in JSON.parse(detailData.projectType)">{{item}}</span>
					<span class="fl" v-else></span>
				</li>
				<li class="base-item" v-if="!!detailData.projectSelfBasis">
					<span class="label fl">自建项目立项依据：</span>
					<span class="fl">{{ detailData.projectSelfBasis }}</span>
				</li>
				<li class="base-item" v-if="!!detailData.projectSuperviseBasis">
					<span class="label fl">督察督办项目立项依据：</span>
					<span class="fl">{{ detailData.projectSuperviseBasis }}</span>
				</li>
				<li class="base-item" v-if="!!detailData.projectHeartBasis">
					<span class="label fl">民心工程项目依据：</span>
					<span class="fl">{{ detailData.projectHeartBasis }}</span>
				</li>
				<li class="base-item"  v-if="!!detailData.projectAchievementsBasis">
					<span class="label fl">绩效考核项目立项依据：</span>
					<span class="fl">{{ detailData.projectAchievementsBasis }}</span>
				</li>
				<li class="base-item" v-if="!!detailData.projectElseBasis">
					<span class="label fl">其他项目立项依据：</span>
					<span class="fl">{{ detailData.projectElseBasis }}</span>
				</li>
				<li class="base-item">
					<span class="label fl">'三重一大'会议纪要：</span>
					<file-list class="fl" v-if="detailData.meetingSummary" :fileList="JSON.parse(detailData.meetingSummary)"></file-list>
					<span class="fl" v-else>暂无</span>
				</li>
				<li class="base-item">
					<span class="label fl">项目方案：</span>
					<a class="a-style fl" v-if="detailData.projectPlan" :href="detailData.projectPlan ? '/pics'+JSON.parse(detailData.projectPlan)[0].url : ''" target="view_window">
						{{JSON.parse(detailData.projectPlan)[0].name}}
					</a>
					<span v-else class="fl">暂无</span>
				</li>
				<li class="base-item">
					<span class="label fl">附件材料：</span>
					<file-list class="fl" v-if="detailData.remarksFile" :fileList="JSON.parse(detailData.remarksFile)"></file-list>
					<span class="fl" v-else-if="detailData.remarksFile == '[]'">暂无</span>
					<span class="fl" v-else>暂无</span>
				</li>
			</ul>
			<ul class="base-container-cell">
				<h4 class="base-title">
					<img src="../../assets/img/系统管理_icon.png" alt="" class="fl">
					<span class="fl">阶段方案</span>
				</h4>
				<li class="base-item">
					<span class="label fl">预审方案(一稿)：</span>
					<a class="a-style fl" v-if="detailData.budgetMPlan" :href="detailData.budgetMPlan ? '/pics'+JSON.parse(detailData.budgetMPlan)[0].url : '' " target="view_window">
						{{JSON.parse(detailData.budgetMPlan)[0].name}}
					</a>
					<span v-else class="fl">暂无</span>
				</li>
				<li class="base-item">
					<span class="label fl">预审方案(二稿)：</span>
					<a class="a-style fl" v-if="detailData.budgetMMPlan" :href="detailData.budgetMMPlan ? '/pics'+JSON.parse(detailData.budgetMMPlan)[0].url : '' " target="view_window">
						{{JSON.parse(detailData.budgetMMPlan)[0].name}}
					</a>
					<span v-else class="fl">暂无</span>
				</li>
				<li class="base-item">
					<span class="label fl">评审方案(一稿)：</span>
					<a class="a-style fl" v-if="detailData.expertMPlan" :href="detailData.expertMPlan ? '/pics'+JSON.parse(detailData.expertMPlan)[0].url : '' " target="view_window">
						{{JSON.parse(detailData.expertMPlan)[0].name}}
					</a>
					<span v-else class="fl">暂无</span>
				</li>
				<li class="base-item">
					<span class="label fl">评审方案(二稿)：</span>
					<a class="a-style fl" v-if="detailData.expertMMPlan" :href="detailData.expertMMPlan ? '/pics'+JSON.parse(detailData.expertMMPlan)[0].url : '' " target="view_window">
						{{JSON.parse(detailData.expertMMPlan)[0].name}}
					</a>
					<span v-else class="fl">暂无</span>
				</li>
			</ul>
			<ul class="base-container-cell">
				<h4 class="base-title">
					<img src="../../assets/img/系统管理_icon.png" alt="" class="fl">
					<span class="fl">上会材料</span>
				</h4>
				<li class="base-item">
					<span class="label fl">调整预算金额：</span>
					<span class="fl" v-if="detailData.budgetApproval">{{detailData.budgetApproval+'万元'}}</span>
					<span v-else class="fl">暂无</span>
				</li>
				<li class="base-item">
					<span class="label fl">网信办意见：</span>
					<file-list class="fl" v-if="detailData.metingFile" :fileList="JSON.parse(detailData.metingFile)"></file-list>
					<span v-else class="fl">暂无</span>
				</li>
				<li class="base-item">
					<span class="label fl">项目方案(简版)：</span>
					<file-list class="fl" v-if="detailData.projectPlanSimple" :fileList="JSON.parse(detailData.projectPlanSimple)"></file-list>
					<span class="fl" v-else-if="detailData.projectPlanSimple == 'null'">未上传</span>
					<span class="fl" v-else>暂无</span>
				</li>
				<li class="base-item">
					<span class="label fl">申报单位汇报稿：</span>
					<file-list class="fl" v-if="detailData.leaderReport" :fileList="JSON.parse(detailData.leaderReport)"></file-list>
					<span class="fl" v-else-if="detailData.leaderReport == 'null'">未上传</span>
					<span class="fl" v-else>暂无</span>
				</li>
				<li class="base-item">
					<span class="label fl">评审方案(二稿)：</span>
					<a class="a-style fl" v-if="detailData.expertMMPlan" :href="detailData.expertMMPlan ? '/pics'+JSON.parse(detailData.expertMMPlan)[0].url : '' " target="view_window">
						{{JSON.parse(detailData.expertMMPlan)[0].name}}
					</a>
					<span v-else class="fl">暂无</span>
				</li>
			</ul>
			
			<ul class="base-container-cell">
				<h4 class="base-title">
					<img src="../../assets/img/系统管理_icon.png" alt="" class="fl">
					<span class="fl">财政意见</span>
				</h4>
				<li class="base-item">
					<span class="label fl">调整预算金额：</span>
					<span class="fl" v-if="detailData.budgetFinance">{{detailData.budgetFinance+'万元'}}</span>
					<span v-else class="fl">暂无</span>
				</li>
				<li class="base-item">
					<span class="label fl">财政专家评审意见：</span>
					<file-list class="fl" v-if="detailData.financeDudget" :fileList="JSON.parse(detailData.financeDudget)"></file-list>
					<span class="fl" v-else>暂无</span>
				</li>
				<li class="base-item">
					<span class="label fl">项目建设方案(终审稿)：</span>
					<a class="a-style fl" v-if="detailData.financePlan" :href="detailData.financePlan ? '/pics'+JSON.parse(detailData.financePlan)[0].url : '' " target="view_window">
						{{ JSON.parse(detailData.financePlan)[0].name }}
					</a>
					<span v-else class="fl">暂无</span>
				</li>
			</ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .base-container{
  	.base-container-cell {
			background: #f6fbfe;
  		min-height: 120px;
  		padding: 9px 12px;
  		box-sizing: border-box;
  		margin-bottom: 10px;
  		.base-title{
  			height: 29px;
  			padding: 0 0 0 10px;
  			margin: 0 0 10px 0;
  			font-size: 14px;
  			font-weight: normal;
  			line-height: 29px;
  			border-bottom: 1px solid #d8e1f6;
  			img{
  				width: 20px;
  				height: 20px;
  				vertical-align: middle;
  				margin: 5px 5px 0 0;
  			}
  		}
  		.base-item{
				margin-bottom: 10px;
				color: #222222;
				overflow: hidden;
				.label{
					width: 150px;
					display: inline-block;
					color: #666;
				}
  			.a-style{
  				color: #147cf4;
  				text-decoration: none;
  			}
  			.a-style:hover{
  				color: #0000FF;
  			}
  		}
  	}
  }
</style>

<script>
  import fileList from "../FileList.vue"
  export default {
    props:{
      projectId: {
        required: true,
      }
    },
    components: {
      "file-list": fileList
    },
    computed: {
      
    },
    data(){
      return{
        detailData:null,
        budgetRoute:['','国家专项资金','市财政资金','区财政资金','其他资金'],
      };
    },
    methods:{
      /*
      * 获取详情
      */
      getDetail(){
        let self = this
        self.axios.get(`${self.common.basePath}/project/detail/${self.projectId}`,self._detailParams()).then( (response) => {
          if(response.data.meta.code === 0){
            self.detailData = response.data.data;
          }else{
            self.$toast(response.data.meta.message, 20);
          }
        }).catch((error) => {
          self.$toast(error);
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
        获取申报单位
      */
      getDeclareUnit(){
        var formData = {
          id:6,
        }
        this.axios.post(`${this.common.basePath}/hr_users/user/list`,formData).then( (response) => {
          if(response.data.meta.code === 0){
            this.company = response.data.data;
          }else{
            this.$toast(response.data.meta.message, 20);   
          }
        }).catch( (error) => {
          this.$toast(error,20);            
        });
      },
      
    },
    mounted() {
      /* 
      获取详情 
      */
      this.getDetail();
      
      /* 
      申报单位
      */
      this.getDeclareUnit();
    },
  }
</script>