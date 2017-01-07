<template>
	<header class="header">
		<div class="header-content">
			<div class="top">
				<div class="back" @touchstart="back">
					<i class="icon-arrow_lift"></i>
				</div>
				<span class="more">...</span>
			</div>
			<!-- 头部内容 -->
			<div class="content-warpper">
				<img :src="seller.avatar" alt="商家">
				<div class="content-title">
					<h2 class="clearfix">
						<span class="brand"></span>
						<span class="name" v-text="seller.name"></span>
					</h2>
					<p v-text="seller.description+'/'+seller.deliveryTime+'分钟送达'" class="content-time">
					</p>
					<div v-if="seller.supports" class="content-reduce">
						<div class="reduce-text">
							<span :class="classmap[seller.supports[0].type]"></span>
							<span v-text="seller.supports[0].description"></span>
						</div>
						<div class="reduce-num" @touchstart="showSeller">
							<span v-text="seller.supports.length+'个'"></span>
							<i class="icon-keyboard_arrow_right"></i>
						</div>
					</div>
				</div>
			</div>
			<!-- 公告 -->
			<div class="bulletin-warpper clearfix" @touchstart="show">
				<span class="bulletin-title"></span>
				<span class="bulletin-text" v-text="seller.bulletin" ></span>
				<i class="bulletin-icon icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<!-- 背景图 -->
		<div class="header-bg">
			<img :src="seller.avatar" alt="背景" width="100%" height="100%">
		</div>
		<!-- 弹出层 -->
		<transition name="fade">
			<div class="detail" v-show="detailShow">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="title" v-text="seller.name"></h1>
						<div class="starwrapper">
							<star :size="48" :score="seller.score"  ></star>
						</div>
						<div class="content">
							<section class="offers-info ">
								<div class="title">
									<div></div>
									<h4 >优惠信息</h4>
									<div></div>
								</div>
								<ul class="info" v-if="seller.supports">
									<li v-for="(item,index) in seller.supports">
										<span class="icon" :class="classmap[seller.supports[index].type]"></span>
										<span class="text" v-text="seller.supports[index].description"></span>
									</li>

								</ul>
							</section>
							<section class="announcement-info">
								<div class="title">
									<div></div>
									<h4>商家公告</h4>
									<div></div>
								</div>
								<p class="info" v-text="seller.bulletin"></p>

							</section>
						</div>

					</div>
				</div>
				<div class="detail-close">
					<i class="icon-close" @touchstart="show">
					</div>
				</div>
			</transition>
			<Seller :seller="seller" ref="sellerShow" ></Seller>
		</header>
	</template>

	<script>
	// 加载组件
	import Seller from "../seller/seller.vue"
	import star from "../star/star.vue"
	export default {
		name: 'seller',
		props:['seller'],
		data () {
			return {
				arr:[1, 2, 3],
				detailShow:false
			};
		},
		created(){
			this.classmap=["decrease","discount","special","invoice","guarantee"]
		},
		methods:{
			show(){
				this.detailShow=!this.detailShow;
			},
			showSeller(){
				this.$refs.sellerShow.show();
			},
			// 返回主页
			back(){
				this.$emit("clearlocalS")
				this.$router.push("/");
			}
		},
		components:{
			Seller,
			star
		}
	};
</script>

<style lang="less" scoped>
	@import url("../../../static/less/reset.less");
	.header{
		color: #fff;
		width: 100%;
		overflow: hidden;
		.top{
			position: absolute;
			top: 0.133333rem;
			width: 100%;
			line-height:0.4rem;
			padding: 0 0.48rem 0 0;
			box-sizing: border-box;
			color: #fff;
			display: flex;
			.back{
				margin-right: auto;
				i{
					.fontSize(18px);
					padding: 0 0.2rem;
				}
			}
			.more{
				font-weight: 700;
				.fontSize(18px);
			}
		}
		.header-content{
			position: relative;
			width: 100%;
			z-index: 2;
			background-color: rgba(7,17,27,.3);
			// 上部
			.content-warpper{
				.fontWeight{
					font-weight: 200;
					line-height:0.32rem;
				}
				display: -webkit-box;
				display: flex;
				padding:0.88rem 0 0 0.64rem;
				img{
					-webkit-box-flex:0 1 auto;
					flex:0 1 auto;
					height:1.706667rem;
					width:1.706667rem;
					margin:  0 32px
					0.48rem 0;
					border-radius: 4px;
				}
				.content-title{
					-webkit-box-flex:1 1 auto;
					flex:1 1 auto;
					padding-top:0.053333rem;
					h2{
						margin-bottom: 0.213333rem;
						span:first-child{
							margin-right: 0.16rem;
							height: 0.48rem;
							width: 0.8rem;
							float: left;
							.bgImg("header/img/brand");
							background-size: 0.8rem 0.48rem;

						}
						span:last-child{
							float: left;
							height: 0.48rem;
							.fontSize(16px);
							font-weight: bold;
							line-height: 0.48rem;
						}
					}
					.content-time{
						margin-bottom: 0.266667rem;
						.fontSize(12px);
						.fontWeight;
					}
					.content-reduce{
						display: -webkit-box;
						display: flex;
						justify-content:space-between;
						.reduce-text{
							span:first-child{
								margin:0 0.106667rem 0.053333rem 0;
								height: 0.32rem;
								width: 0.586667rem;
								float: left;
								.iconBg(header,1,0.586667rem,0.32rem);
							};
							span:last-child{
								float: left;
								.fontWeight;
								.fontSize(10px);
								height: 0.32rem;
								margin-top: 1px;
							}
						}
						.reduce-num{
							.fontWeight;
							.fontSize(10px);
							// transform后向下margin-top 文字高度一半
							.fontSizeHalf(10px);
							display: -webkit-box;
							display: flex;
							-webkit-box-align:center;
							align-items:center;

							padding: 0.186667rem 0.213333rem;
							background: rgba(0,0,0,.2);
							-webkit-transform: translateY(-50%);
							-moz-transform: translateY(-50%);
							-ms-transform: translateY(-50%);
							-o-transform: translateY(-50%);
							transform: translateY(-50%);
							border-radius:0.32rem;
							margin-right: 0.32rem;
							span{
								margin-right: 0.16rem;
							}
						}
					}
				}
			}
			// 公告
			.bulletin-warpper{
				height: 0.746667rem;
				padding:0 0.32rem;
				background-color: rgba(7,17,27,.3);
				.bulletin-title{
					float: left;
					width: 0.586667rem;
					height: 0.32rem;
					margin-top:0.213333rem;
					.bgImg("header/img/bulletin");
					background-size:0.586667rem 0.32rem;
				}
				.bulletin-text{
					float: left;
					margin: 0 0.106667rem;
					width:calc(10.0rem - 0.64rem - 0.213333rem - 0.586667rem - 0.213333rem);
					overflow: hidden;
					white-space: nowrap;
					text-overflow:ellipsis;
					line-height:  0.746667rem;
					.fontSize(10px);
				}
				.bulletin-icon {
					line-height:  0.746667rem;
					position: absolute;
					right: 0.32rem;
				}
			}
		}
		// 背景
		.header-bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 3.573333rem;
			z-index:1;
			filter:blur(10px);
		}
		// detail动画效果
		.fade-enter-active, .fade-leave-active {
			-webkit-transition: opacity .5s linear;
		}
		.fade-enter, .fade-leave-active {
			opacity: 0;
		}
		.detail{
			position: fixed;
			left: 0;
			top: 0;
			height: 100%;
			width: 100%;
			overflow: auto;
			backdrop-filter:blur(10px);
			background:rgba(7,17,27,.8);
			color: #fff;
			z-index:999999;
			.detail-wrapper{
				min-height: 100%;
				height: auto;
				padding: 1.706667rem 0.96rem;
				box-sizing: border-box;
				color: #fff;
				.detail-main{
					.title{
						.fontSize(16px);
						line-height: 0.426667rem;
						font-weight: 700;
						text-align: center;
					}
					.starwrapper{
						margin-top: 0.426667rem;
						ul{
							justify-content:center;
						}
					}
					.content{
						.common{
							.title{
								padding: 0.746667rem 0 0.64rem;
								display: -webkit-box;
								display: flex;
								-webkit-box-align:center;
								-webkit-box-align:center;
								align-items:center;
								div{
									-webkit-box-flex:1 1 auto;
									flex:1 1 auto;
									height:2px;
									background: rgba(255,255,255,.5);
								}
								h4{
									line-height: 0.373333rem;
									font-weight: 700;
									text-align: center;
									padding: 0 0.32rem;
									-webkit-box-flex:0 1 auto;
									flex:0 1 auto;
									.fontSize(14px);

								}

							}
							.info{
								padding:  0 0.32rem;
								width: 100%;
								box-sizing: border-box;
							}
						}
						.commonFont{
							font-weight: 200;
							.fontSize(12px);
						}

						.offers-info {
							.common;
							ul{
								li{
									height: 0.426667rem;

									overflow: hidden;
									& +li {
										margin-top:0.32rem;
									}
									.icon{
										float: left;
										height:0.426667rem;
										width: 0.426667rem;
										margin-right:0.16rem;
										.iconBg(header,2,0.426667rem,0.426667rem);
									}
									.text{
										.commonFont;
										line-height: 0.32rem;
									}
								}
							}
						}
						.announcement-info{
							.common;
							p{
								.commonFont;
								line-height: 0.64rem;
							}
						}
					}
				}
			}
			.detail-close{
				height: 0.853333rem;
				width: 0.853333rem;
				margin: -1.706667rem  auto 0;
				i{
					.fontSize(32px);
					color: rgba(255,255,255,.5)
				}

			}
		}
	}
</style>