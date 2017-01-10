<template>
	<nav class="navbar">
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
	</nav>
</template>

<script>
	export default {
		name: 'navbar',
		data () {
			return {
				backIcon:false,
				searchIcon:true,
				firstClick:true,
				title:"",
				myselfIcon:false,
				loginBtn:"登陆",
				buff:true
			};
		},
		created(){
			if(this.$route.fullPath=="/"){
				this.getLocalPos()
			}
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
			},
			getLocalPos(){
				// 调用百度地图的获取地理信息,手机端直接使用html5获取不到
				let geolocation = new BMap.Geolocation();
				let options={
						 // 指示浏览器获取高精度的位置，默认为false
						enableHighAccuracy: true,
						 // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置
						 maximumAge        : 30000,
						 // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
						 timeout           : 27000
						};
						geolocation.getCurrentPosition((pos)=>{
							let _this=geolocation;
							if(_this.getStatus() == 0){
								let point =pos.point;
								let gc = new BMap.Geocoder();
								gc.getLocation(point,(rs)=>{
									let addComp = rs.addressComponents;
									this.title=`${addComp.province}${addComp.city}${addComp.district}${addComp.street}${addComp.streetNumber}`;
								});
							}
							else{
			            // 检索成功。对应数值“0”。
			            // 城市列表。对应数值“1”。
			            // 位置结果未知。对应数值“2”。
			            // 导航结果未知。对应数值“3”。
			            // 非法密钥。对应数值“4”。
			            //  非法请求。对应数值“5”。
			            // 没有权限。对应数值“6”。(自 1.1 新增)
			            //  服务不可用。对应数值“7”。(自 1.1 新增)
			            // 超时。对应数值“8”。(自 1.1 新增)
			            switch(_this.getStatus() )
			            {
			            	case 2:
			            	alert( '位置结果未知 获取位置失败.' );
			            	break;
			            	case 3:
			            	alert( '导航结果未知 获取位置失败..' );
			            	break;
			            	case 4:
			            	alert( '非法密钥 获取位置失败.' );
			            	break;
			            	case 5:
			            	alert( '对不起,非法请求位置  获取位置失败.' );
			            	break;
			            	case 6:
			            	alert( '对不起,当前 没有权限 获取位置失败.' );
			            	break;
			            	case 7:
			            	alert( '对不起,服务不可用 获取位置失败.' );
			            	break;
			            	case 8:
			            	alert( '对不起,请求超时 获取位置失败.' );
			            	break;
			            }
			        }
			    },options)
					}
				}
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