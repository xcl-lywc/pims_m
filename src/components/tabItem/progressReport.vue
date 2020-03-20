<template>
	<div v-if="pointDetail">
		<ul class="content" v-if="pointDetail.stage >= 8">
			<!-- <h4 class="block-depart-title">整体进度</h4> -->
			<!-- <el-progress type="circle" :percentage="pointDetail.schedule * 100" color="#8e71c7"></el-progress> -->
			
			<div v-if="pointDetail">
				<h4 class="block-depart-title">
					汇报历史
				</h4>
				<div class="schedule-box" v-for="(item, index) in pointDetail.checkPoint">
					<p class="point-time">{{common._convertDate(item.endTime, 'yyyy.MM.dd')}}</p>
					<ul class="point-box point-box-w">
						<h4 class="block-depart-title_" style="overflow: hidden;">
							<span class="fl">{{item.pointName}}</span>
							<span class="fr">{{common._convertDate(item.beginTime, 'yyyy.MM.dd')}}~{{common._convertDate(item.endTime, 'yyyy.MM.dd')}}</span>
						</h4>
						<!-- <li>
							<span class="fl item-p">项目进度：</span>
							<span class="fl">+{{item.schedule * 100}}%</span>
							<el-progress :show-text="false" :stroke-width="16" :percentage="item.schedule * 100" class="fl schedule-line"></el-progress>
						</li> -->
						<!-- <li>
							<span class="fl item-p">项目资金：</span>
							<span class="fl">{{item.payMoney}}万元</span>
						</li> -->
						<li class="file-h50">
							<span class="fl item-p">进度简述：</span>
							<span>{{item.remark}}</span>
						</li>
						<li>
							<span class="item-p fl">项目附件：</span>
							<a :href="item.attachment ? '/pics' + JSON.parse(item.attachment).path : '' " class="fl"  target="view_window">
								{{item.attachment ? JSON.parse(item.attachment).name : ''}}
							</a>
						</li>
						<li class="mark-h60">
							<div class="text-r">报送人：{{item.creator}}</div>
							<div class="text-r">报送时间：{{common._convertDate(item.createTime, 'yyyy.MM.dd')}}</div>
						</li>
					</ul>
				</div> 
			</div>
			<!-- 添加阶段节点 -->
			<div class="schedule-box schedule-box-add" v-if="pointDetail.stage == 8 && userData.id == pointDetail.orgId">
				<!-- <i class="el-icon-circle-plus add-btn point-time" @click="clickIsShowAddPoint" size="medium" style="font-size: 28px;cursor: pointer;">
				</i> -->
				<el-button type="info" icon="el-icon-plus" class="add-btn point-time " size="mini" @click="clickIsShowAddPoint">进度汇报</el-button>
				<el-button type="success" class="add-btn point-time " size="mini" icon="el-icon-setting" @click="completion">实施完结</el-button>
				<div class="point-box point-box-w" v-if="isShowAddPoint">
					<el-form ref="formSchedule" :model="formSchedule" label-width="140px" size="middle">
					  <el-row>
					  	<el-col :span="24">
					  		<el-form-item  
					  			label="阶段名称：" 
					  			prop="pointName" 
					  			:rules="[
						     	 { required: true, message: '请输入阶段名称', trigger: 'blur' }, 
						    	]">
							  	<el-input type="text" placeholder="阶段名称" class="input" v-model="formSchedule.pointName"></el-input>
							  </el-form-item>
					  	</el-col>
					  	<el-col :span="24">
					  		<el-form-item   
					  			label="开始结束时间："
					  			prop="pointDate"
						  		:rules="[
							      { required: true, message: '请选择开始结束时间', trigger: 'blur' }, 
							    ]">
							  	<el-date-picker
										v-model="formSchedule.pointDate"
										type="daterange" 
										range-separator="~"
										start-placeholder="开始时间"
										end-placeholder="结束时间"
										align="right" >
									</el-date-picker>
							  </el-form-item>
					  	</el-col>
					  	<!-- <el-col :span="24">
					  		<el-form-item 
					  			label="项目进度：" 
					  			prop="schedule"
					  			:rules="[
					  				{ required: true, message: '请输入项目进度', trigger: 'blur' }, 
							      { validator: validatorProgress,  trigger: 'blur' }, 
							    ]"> 
									<el-input placeholder="请输入项目进度" v-model="formSchedule.schedule" class="input-with-select">
								    <template slot="prepend" class="fl">+</template>
								    <template slot="append">%</template>
								  </el-input>
					  		</el-form-item>
					  	</el-col>
					  	<el-col :span="24">
					  		<el-form-item 
					  			label="项目资金：" 
					  			prop="payMoney"
					  			:rules="[
							      { required: true, message: '请输入项目金额', trigger: 'blur' }, 
							    ]"> 
									<el-input placeholder="请输入项目金额" v-model="formSchedule.payMoney" class="input-with-select">
								    <template slot="append">万元</template>
								  </el-input>
					  		</el-form-item>
					  	</el-col> -->
					  	<el-col :span="24">
					  		<el-form-item 
					  			label="进度简述：" 
					  			prop="remark"
					  			:rules="[
							      { required: true, message: '请输入进度简述', trigger: 'blur' },
							      { validator: validatorRemark, trigger: 'blur' } 
							    ]">
					  			<el-input type="textarea" :autosize="{ minRows: 4}" placeholder="请输入进度描述(150~230字)" class="fl input" v-model="formSchedule.remark"></el-input>
					  		</el-form-item>
					  	</el-col>
					  	<el-col :span="24">
					  		<el-form-item 
					  			label="项目附件：" 
					  			prop="attachment"
					  			:rules="[
							      { required: true, message: '请上传项目附件', trigger: 'blur' }, 
							    ]">
					  			<el-upload
										class="upload-demo" 
										:action="UploadUrl()"
										:headers="myHeaders"
										:auto-upload="true"
										multiple
										:limit="1"
										:on-success="uploadSuccessFile">
										<el-button slot="trigger" size="small" type="primary">上传文件</el-button> 
									</el-upload>
					  		</el-form-item>
					  	</el-col>
					  	<el-col :span="24">
					  		<el-form-item label="" class="mark-h30">
					  			<el-button size="small" class="fr" @click="savePoint">保存</el-button>
									<el-button size="small" class="fr btn-marr16" @click="isShowAddPoint = false">取消</el-button>
					  		</el-form-item>
					  	</el-col>
					  </el-row>
					</el-form>
				</div>   
			</div>
		</ul>
		<span class="text-gray" v-if="pointDetail.stage < 8">
			该项目审批进行中, 还未进行实施.
		</span>
		<span class="complete" v-if="pointDetail.stage == 9"  show-overflow-tooltip>
			已完结
		</span>
	</div>
</template>
<script> 
  export default { 
  	props:{
  		projectId: {
  			required: true,
  		}
  	},
		data(){ 
			return{
				isLoading: true,
				userData: JSON.parse(sessionStorage.getItem('userData')),
				isShowAddPoint:false,
				isShowBaseInfo:true,
				pointDetail: 	null,
				point:'', 
				formSchedule:{
					pointDate: '',
					attachment: '',
					payMoney:'',
					schedule:'',
					remark:'',
					pointName:'',
				}, 
				history:'',
				processTaskIdArr:[],
				opinionArr:[],
				headimg: 'this.src="' + require('../../../assets/img/a8.jpg') + '"',//默认头像
				opinionContent:'',
				headimgindex:'',
				placeholder:'请填写你的宝贵审核意见...',
				
				myHeaders: {Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem("token"))}, 
			};
		},
		methods: {
			/* 
				上传增加节点附件 ---文件上传成功时
			*/
			uploadSuccessFile(res) {
				this.formSchedule.attachment = JSON.stringify(res.data);
			},
			/* 
			保存增加的节点
			*/
			savePoint(){
				this.postAdd();
			},
			/* 
				上传增加节点附件的url
			*/
			UploadUrl(){
				return "api/file/"+ this.projectId +"/uplode";     
			},
			/* 
			 点击是否展示增加节点框
			 */
			clickIsShowAddPoint(){
				this.isShowAddPoint = !this.isShowAddPoint;
			},
			/*
			 * 验证项目进度
			 */
			validatorProgress(rule, value, callback){
				let regex = /^\d+$/;
				if(regex.test(value)){
					if(value > 100){
						callback(new Error('只能填写小于一百的正整数'));
					}else{
						callback();
					}
				}else{
					callback(new Error('只能填写小于一百的正整数'));
				}
				
			},
			/*
			 * 验证进度描述
			 */ 
			validatorRemark(rule, value, callback){
				if(value.length < 150){
					callback(new Error('内容个数必须大于150'));
				}else if(value.length > 230){
					callback(new Error('内容个数不能超过230'));
					
				}else{
					callback();
				}
			},
			/*
			* 获取节点详情
			*/
			getPointDetail(){
				this.axios.get(`${this.common.basePath}/checkpoint/point/${this.projectId}`,this._pointDetailParams()).then( (response) => {
					// this.$message.success(response.data.meta.message, 20);
					this.pointDetail = response.data.data;
					this.point = response.data.data.checkPoint;
					if(response.data.data.stage == 8){
						this.isShowSchedulePoint = false;
						this.isShowScheduleText = true;
					} 
					
				}).catch( (error) => {
					this.$message.error(error); 
				});
			},
			_pointDetailParams(){
				return {
					params: {
						projectId:this.projectId,
					}
				}
			}, 
			/* 
				提交添加的节点
			*/
			postAdd(){ 
				this.$refs.formSchedule.validate((valid) => {
          if (valid) {
            this.axios.post(`${this.common.basePath}/checkpoint/point`,this._postAddParams()).then( (response) => {
							if(response.data.meta.code === 0){ 
								this.isShowAddPoint = false;
								this.$refs.formSchedule.resetFields();
								this.getPointDetail();//刷新节点详情
								this.$emit('addPointEmit');// 广播
							}else{
								this.$message.error(response.data.meta.message, 20);   
							}
						}).catch( (error) => {
							this.$message.error(error,20);            
						});
          } else { 
            return false;
          }
        });
				
			},
			_postAddParams(){
				let formScheduleNew = JSON.parse(JSON.stringify(this.formSchedule));
          	formScheduleNew.beginTime = new Date(formScheduleNew.pointDate[0]).getTime();
						formScheduleNew.endTime = new Date(formScheduleNew.pointDate[1]).getTime();
						formScheduleNew.schedule = formScheduleNew.schedule/100;
						formScheduleNew.projectId = this.projectId;
				return formScheduleNew;
			},
			/* 
			 实施完结
			 */
			completion(){
				let form = {
					instanceId:this.pointDetail.instanceId,
				}
				this.$confirm('项目实施完成？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.post(`${this.common.basePath}/project/end`,form).then( (response) => {
						if(response.data.meta.code === 0){ 
							this.$message.success(response.data.meta.message, 20);   
							this.getPointDetail();//刷新节点详情
						}else{
							this.$message.error(response.data.meta.message, 20);   
						}
					}).catch( (error) => {
						this.$message.error(error,20);            
					});
				}).catch(() => {
				});
			},
			/*
			 * 上传意见附件成功后
			 * @params {object} item 当前被编辑的对象
			 * @params {object} res 上传成功后的对象 
			 */
			handleRemoveComment(res, item, uploadName){
				if(res.meta.code == 0) {
					this.publishOpinion(res.data, item);
					item.comment = JSON.stringify(res.data);
					this.$refs[uploadName][0].clearFiles();
				}
			}, 
			/* 
				文件上传成功后，点击查看文件
			 */
			handlePreview(file){
				this.fileUrl = file.url;
				this.fileDialogVisible = true;
			}, 
		
		},
		mounted() {  
		},
		created(){ 
			this.getPointDetail();
		},
  }
</script>
<style lang="css" scoped>
	/* 时间轴的样式 */
	@import "../../../assets/style/time_line.css"
	
</style>
<style>
	span.text-gray {
		color: #ccc!important;
	}
	span.complete {
		color: #fff!important;
		padding: 4px 8px;
		background: #67c23a;
		border-radius: 5px;
		margin-top: 10px;
		margin-left:10px ;
		display: inline-block;
	}
</style>