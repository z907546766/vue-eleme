<template>
	<div class="login">
		<navbar  @nowPage="nowPage"></navbar>
		<form action="" method="post" class="login-form" onSubmit="return false">
			<div class="loginName">
				<!-- 手机号码登陆 -->
				<div v-show="Show">
					<input type="text" name="username" value="" placeholder="手机号" id="tel" v-model="name" @keyup="checkName" autocomplete="off" maxlength="11" required >
					<button @touchstart="sendMsg" v-text="text" :class="{'disabled':disabled}" v-show="Show"></button>
				</div>
				<!-- 用户名登陆 -->
				<div v-if="!Show">
					<input type="text" name="username" value="" placeholder="手机/邮箱/用户名" id="username" v-model="name" @keyup="checkName" autocomplete="off" maxlength="25" required >
				</div>
			</div>
			<div class="loginpwd">
				<!-- 验证码 -->
				<div v-show="Show">
					<input type="text" name="password" value="" placeholder="验证码" id="code" v-model="pwd" autocomplete="off" maxlength="4" required @keyup="checkPwd">
				</div>
				<!-- 密码登陆 -->
				<div v-if="!Show">
					<input type="password" name="password" value="" placeholder="密码" id="password" v-model="pwd" autocomplete="off"required ref="password"@keyup="checkPwd">
					<span class="switch" :class="{active:active}" @touchstart.prevent.stop="switchNow">
						<span class="showText">abc</span>
						<span class="hideText">...</span>
						<span class="showBtn" :class="{active:active}"></span>
					</span>
				</div>
			</div>
			<div class="loginAgree" v-show="Show">
				<span>
					温馨提示：未注册饿了么帐号的手机号，登录时将自动注册，且代表您已同意
				</span>
				<a href="https://h5.ele.me/service/agreement/">《用户服务协议》</a>
			</div>
			<div class="loginSub">
				<a href="javascipt:;" @touchstart="submitData">登陆</a>
			</div>
			<div class="forgetPwd" v-show="!Show">
				<a href="https://m.ele.me/forget">忘记密码？</a>
			</div>
		</form>
	</div>
</template>

<script>
	import{rexCheckTel,rexCheckCode,rexCheckEmail,rexCheckUsername,rexCheckPassword} from "../../common/js/validate.js"
	import navbar from "../navbar/navbar.vue"
	export default {
		name: 'login',
		data () {
			return {
				// 登录名和密码
				name:"",
				pwd:"",
				// 控制密码登陆显示
				Show:true,
				text:"获取验证码",
				// 发送验证码按钮激活
				disabled:true,
				// switch激活
				active:false,
				firstDisable:true
			};
		},

		methods:{
			nowPage(msg){
				this.name="";
				if(msg){
					this.Show=false;
				}else{
					// 短信登陆
					this.Show=true;
				}

			},
			// 验证用户名
			checkName(){
				if(this.Show){
					if(rexCheckTel(this.name)){
						this.disabled=false;
						return true;
					}
				}else{
					if(rexCheckUsername(this.name)||rexCheckEmail(this.name)||rexCheckTel(this.name)){
						return true;
					};
				};
				return false;
			},
			sendMsg(){
				// 验证失败返回
				if(!this.checkName()){
					return;
				}
				this.disabled=true;
				if(!this.firstDisable){
					return;
				}
				// 发送验证码倒计时
				let n=30;
					this.timer=setInterval(()=>{
						this.firstDisable=false;
						n--;
						if(n<=0){
							this.disabled=false;
							this.text="重新发送"
							clearInterval(this.timer);
							this.firstDisable=true;
							return;
						}
						this.text="已发送("+n+"s)"
					}, 1000);
			},
			// 验证密码
			checkPwd(){
				if(this.Show){
					if(rexCheckCode(this.pwd)){
						return true;
					}
				}else{
					if(rexCheckPassword(this.pwd)){
						return true;
					}
				}
				return false;
			},
			submitData(){
				// 验证填写
				if(!this.checkName()&&!this.checkPwd()){
					console.log("填写错误");
					return;
				}else{
					console.log("验证成功");
				}
			},
			// 用户名登陆切换时,密码显示隐藏开关
			switchNow(){
				this.active=!this.active;
				if(this.active){
					this.$refs.password.setAttribute("type","text");
				}else{
					this.$refs.password.setAttribute("type","password");
				}
			}
		},
		components:{
			navbar
		}
	};
</script>

<style lang="less" scoped>
	@import url("../../../static/less/reset.less");
	a:link{
		text-decoration: none;
	}
	.login{
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		background-color: rgb(239, 239, 244)
		;
		z-index: 99999;
		.login-form{
			width: 100%;
			margin-top:0.4rem;
			input{
				width: 100%;
				background-color: #fff;
				height:0.533333rem;
				padding: 0.133333rem 0;
				border: none;
				color:rgb(51, 51, 51);
				.fontSize(15px);
			}
			::-webkit-input-placeholder{
				.fontSize(15px);
				color:rgb(51, 51, 51);
			}
			.loginName{
				position: relative;
				padding:0.2rem 0.426667rem;
				background-color: #fff;
			// 发送验证码
			button{
				position: absolute;
				right: 0.426667rem;
				top: 0.2rem;
				height:0.8rem;
				line-height:0.8rem;
				padding: 0.133333rem 0;
				width: 2.666667rem;
				text-align: center;
				background-color:rgb(49, 144, 232)
				;
				color: #fff;
				line-height: 0.533333rem;
				border: none;
				.fontSize(14px);
				&.disabled{
					background-color:rgb(204,204,204)
				}
			}
		}
		.loginpwd{
			position: relative;
			padding: 0.2rem 0.426667rem;
			border-top:1px solid rgb(221, 221, 221)
			;
			background-color: #fff;
			// 密码显示隐藏
			.switch{
				position: absolute;
				right: 0.426667rem;
				top:0.4rem;
				width: 1.2rem;
				height: 0.4rem;
				padding: 0 0.133333rem;
				box-sizing: border-box;
				align-items:center;
				background-color: rgb(204, 204, 204);
				display: block;
				display: flex;
				justify-content:space-between;
				border-radius: 0.2rem;
				color: #fff;
				.fontSize(10px);
				&.active{
					background-color:rgb(152, 200, 244);
				}
				.showText{
					margin-top: -0.066667rem;
				}
				.hideText{
					margin-top: -0.16rem;

				}
				.showBtn{
					position: absolute;
					left: 0;
					top: -0.133333rem;
					width: 0.666667rem;
					height: 0.666667rem;
					border-radius: 50%;
					background-color:rgb(241, 241, 241);
					transition:all .2s;
					&.active{
						background-color:rgb(49, 144, 232);
						-webkit-transform: translateX(0.533333rem);
					}
				}
			}
		}
		// 协议
		.loginAgree{
			padding: 0.186667rem 0.426667rem;
			color: rgb(153, 153, 153);
			.fontSize(12px);
			a{
				color: rgb(59, 149, 233)
				;
			}
		}
		// 登陆
		.loginSub{
			margin: 0.266667rem 0.426667rem;
			box-sizing: border-box;
			height:1.173333rem;
			line-height: 1.173333rem;
			text-align: center;
			color: #fff;
			background-color: rgb(76, 217, 100);
			a{
				display: block;
				height: 100%;
				background-color: rgb(76, 217, 100);
				color: #fff;
				.fontSize(15px);
				border-radius: 0.08rem;

			};
		};
		// 忘记密码
		.forgetPwd{
			width: 100%;
			text-align: right;
			color:#3b95e9;
			.fontSize(12px);
			a{
				margin-right: 0.426667rem;
			}
		}
	}
}

</style>