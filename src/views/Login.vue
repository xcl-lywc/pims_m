<template>
  <!--登录 -->
  <div>
    <div class="background-wrap">
      <div class="login-background"></div>
    </div>
    <img id="title-img" src="../assets/img/文字_image.png" alt="">
      <div class="login-box">
        <div class="box-title">
          欢迎登录
        </div>
        <div class="box-form">
					<van-cell-group class="box-form-item">
						<van-field
							v-model="ruleForm.username"
							required
							clearable
							placeholder="请输入用户名"
							error-message=""
							>
							<i slot="left-icon" class="el-input__icon fa fa-user"></i>
						</van-field>
					</van-cell-group>
					<van-cell-group class="box-form-item">
						<van-field
							v-model="ruleForm.password"
							type="password"
							required
							clearable
							placeholder="请输入密码"
							error-message=""
							>
							<i slot="left-icon" class="el-input__icon fa fa-lock"></i>
						</van-field>
					</van-cell-group>
					<div  class="box-form-item">
						<van-checkbox v-model="checked" class="fl" @change="rememberClick" shape="square"><span class="text-dark-blue">记住密码</span></van-checkbox>
						<p class="text-dark-blue fr">忘记密码</p>
					</div>
					<van-cell-group class="box-form-item">
						<van-button type="primary" :loading="buttonLoading" @click="submitForm" class="fill-width" size="small">{{buttonLoading ? '登录中' : '登录'}}</van-button>
					</van-cell-group>
					<van-cell-group class="box-form-item">
						<van-button type="primary" :disabled="buttonLoading" @click="resetForm" class="fill-width" size="small">重置</van-button>
					</van-cell-group>
        </div>
      </div>
  </div>
</template>

<script>
  import qs    from "qs"; //需要传表单时, 引用此包
  import { request } from '../plugins/request.js'
  import VueParticles from 'vue-particles/src/vue-particles/vue-particles.vue'
  export default {
    data() {
      return {
        checked: false,
        buttonLoading: false,
        ruleForm: {
          password: null,
          username: null,
        },
      };
    },
    components: {
      "vue-particles": VueParticles
    },
    created () {
      let self = this
      self.common.startInterval = false
    },
    mounted () {
      var self = this;
      //self.initCanvas()
      self._remember();
    },
    methods: {
      initCanvas () {
        var canvas = document.getElementById('canvas');

        var ctx = canvas.getContext("2d");
        ctx.fillStyle="#FF0000";
        ctx.fillRect(0,0,150,75);
      },
      //重置按钮
      resetForm() {
      	this.ruleForm.password = null;
				this.ruleForm.username = null;
      },
			//登录按钮
      submitForm() {
				if (this.ruleForm.password&&this.ruleForm.username) {
					this.login();
				} else {
					this.$toast('您还未填写账号或密码!!!', 20);
					return;
				}
      },
      //登录
      login: function() {
        var self = this;
        self.buttonLoading = true;
        self.axios.post(self.common.basePath+ '/login/in', qs.stringify(this.ruleForm)).then(function (response){
            let responseData = response.data;
            if(responseData.meta.code === 0){
                //登录成功储存token
                self.axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
                //session中存储获取用户信息
                sessionStorage.setItem('userData',JSON.stringify(response.data.data));
                //session中存储用于图片和文件上传
                sessionStorage.setItem('token',JSON.stringify(response.data.data.token));
                //session存储assignee
                sessionStorage.setItem("assignee",response.data.data.id)
                setTimeout(function(){
                    self.goToPage(responseData.data)
                },1010);

                // 获取字典数据，并session存储dictionary
                self._getDictionary().then( (response) => {
                  response.data.data ? sessionStorage.setItem('controlTable', JSON.stringify(response.data.data.rows)) : '';
                }).catch((error) => {
									self.$toast('查询字典失败!!!');
                })
            }else{
              self.buttonLoading = false;
							self.$toast(responseData.meta.message);
            }
        }).catch(function (error) {
						self.$toast('登陆失败!!!');
            self.buttonLoading = false;
        });
      },
      goToPage (data) {
        let self  = this
        let targetRole = data.roleIds[0] || null
        if(targetRole == 6 || targetRole == 5) {
          switch(targetRole) {
            case 5: //网信办
							self.$router.push({name:'Dashboard',params:{}})
              break;
            case 6: //公安局
              self.$router.push({name:'Dashboard',params:{}})
              break
          }
        } else {
          self.$router.push({name:'Dashboard',params:{}})
        }
        
      },
      //查询字典
      _getDictionary(){
        return new Promise( (resolve, reject) => {
          this.axios.get(this.common.basePath + '/contrast/choice/list', '').then(function (response){
            resolve(response)
          }).catch(function (error) {
            reject(error)
          });
        });
      },
      //点击按钮记住账号密码
      rememberClick() {
        this.checked? localStorage.setItem("remember",'true') : localStorage.setItem("remember",'false')
        localStorage.setItem("username", this.ruleForm.username);
        localStorage.setItem("password", this.ruleForm.password);
      },
      //记住账号密码
      _remember: function() {
				if(localStorage.getItem("remember") === "true") { 
					if(localStorage.getItem("username") && localStorage.getItem("password")) {
						this.ruleForm.username = localStorage.getItem("username");
						this.ruleForm.password = localStorage.getItem("password");
						this.checked = true;
					}
				}
      },
    },
  }
</script>

<style scoped lang="less">
  @darkBlue: #114275;
  @keyframes scaleBackground {
    0% {transform:scale(1, 1);background-image: url("../assets/img/1.jpg");}
    50% {transform:scale(1.08, 1.08);background-image: url("../assets/img/2.jpg");}
    100% {transform:scale(1, 1);background-image: url("../assets/img/1.jpg");}
  }
  .background-wrap {
    overflow: hidden;
    .login-background {
      width: 100vw;
      height: 100vh;
      background-position: center;
      background-size:cover;
      animation: scaleBackground 15s infinite;
      transition-timing-function: ease-in-out;
    }
  }
  #title-img {
    position: absolute;
    width: 50vw;
    left: 26vw;
    margin: -160px auto 0;
    top: 38%;
  }
  .text-dark-blue {
    color: @darkBlue;
  }
  .login-box {
    position: absolute;
    top: 80%;
    right: 10vw;
    width: 80vw;
    overflow: hidden;
    margin: -300px auto 0;
    padding: 20px 10px;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 10px #ebeef5;
    color: #333;
    opacity: 1;
    -webkit-box-sizing: border-box;
    background-color: #d4d4d496;
    border-radius: 10px;
    box-shadow: 5px 5px 10px #171717b8;
    .box-title{
      color: @darkBlue;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid @darkBlue;
    }
    .box-form{
      padding: 0 15px;
			.box-form-item{
				margin-bottom: 10px;
				overflow: hidden;
				.van-cell{
					line-height: 16px;
				}
				.van-button--primary{
						background-color: #1989fa;
						border: 1px solid #1989fa;
				}
				.van-button--small{
					height: 34px;
				}
				.el-input__icon{
					color: #969799;
					padding: 1px 8px 0 0;
				}
			}
      .head-img{
        margin-left: 35%;
        border-radius: 50%;
        width: 80px;
      }
    }
    .box-footer{
      cursor: pointer;
      color: royalblue;
      text-align: center;
      font-size: 14px;
    }
  }
</style>
<style lang="less">
  #particles-js{
    width: 100vw;
    height: 99.5vh;
    position: absolute;
    top: 0;
  }
  #canvas {
    position: absolute;
    width: 100vw;
    height: 100vh;
  }
  .login-box {
    .van-checkbox .van-checkbox__icon .van-icon{
    	line-height: 16px;
    	width: 16px;
    	height: 16px;
    }
    .van-checkbox__label{
    	height: 16px;
    	line-height: 16px;
    	margin-bottom: 4px;
    }
    /* .van-button--primary{
    		background-color: #1989fa;
    		border: 1px solid #1989fa;
    }
    .van-button--small{
    	height: 34px;
    } */
  }
	
</style>