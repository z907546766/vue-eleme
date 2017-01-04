<template>
	<div class="navbar">
		<div class="icon-wrapper"  @touchstart="back($event)">
			<i class="icon" :class="{'icon-search':searchIcon,'icon-arrow_lift':backIcon}"></i>
		</div>
		<div class="title-wrapper">
			<span class="title" v-text="title"></span>
		</div>
		<div @touchstart="show" class="tab-wrapper">
			<!-- 未登录 -->
			<span v-text="loginBtn"></span>
			<!-- 登陆后图标 -->
			<i class="icon icon-user" v-show="myselfIcon"></i>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'navbar',
		data () {
			return {
				backIcon:false,
				searchIcon:true,
				firstClick:true,
				title:"北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340",
				myselfIcon:false,
				loginBtn:"登陆",
				buff:true
			};
		},
		created(){
			// 登陆
			if(this.$route.fullPath=="/login"){
				this.firstClickIcon();
				this.smsLogin();
			};
			// 搜索
			if(this.$route.fullPath=="/search"){
				this.firstClickIcon();
				this.loginBtn="";
				this.title="搜索";
			};
			// 商家列表
			if(this.$route.fullPath=="/storlist"){
				this.firstClickIcon();
				this.loginBtn="";
				this.title="美食";
			};
		},
		methods:{
			firstClickIcon(){
				this.firstClick=false;
				this.backIcon=true;
				this.searchIcon=false;
			},
			show(event){
				if(this.firstClick){
					// 销毁主页中的滚动
					this.$emit("destroyScroll");
					this.$router.push('/login');
				}else{
					// 切换登录方式
					if(this.buff){
						this.usernameLogin();
						this.$emit("nowPage",true)
					}else{
						this.smsLogin();
						this.$emit("nowPage",false)
					}
					this.buff=!this.buff;
				}
			},
			back(event){
				if(this.firstClick){
					this.$emit("destroyScroll");
					this.$router.push("/search");
				}else{
					this.$router.push("/");
				}
			},
			// 进入login页面初始化,短信验证码登陆页面
			smsLogin(){
				this.title="登陆",
				this.loginBtn='密码登陆';
			},
			// 短信密码登陆页面
			usernameLogin(){
				this.title="密码登陆",
				this.loginBtn='短信登陆';
			}
		},
	};
</script>

<style lang="less" scoped>
	@import url("../../../static/less/reset.less");
	a:link{
		text-decoration: none;
	}
	.navbar{
		display: -webkit-box;
		display: flex;
		height: 1.173333rem;
		-webkit-box-align:center;
		align-items:center;
		background-color: #3190e8;
		color: #fff;
		.common{
			line-height: 1.173333rem;
			padding: 0 0.4rem;
		}
		.icon-wrapper{
			.common;
			.icon{
				position: relative;
				top:0.066667rem;
				.fontSize(16px);
				color: #fff;
			}
		}
		.title-wrapper{
			.common;
			width: 50%;
			margin: 0 auto;
			text-align: center;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			.title{
				.fontSize(18px);
			}
		}
		.tab-wrapper{
			.common;
			span{
				.fontSize(16px);
				color: #fff;
			}
		}
	}
</style>