<template>
	<transition name="slide" enter-active-class="animated slideInRight"  leave-active-class="animated slideOutRight">
		<section class="seller-wrapper"v-show="showSeller">
			<section class="caption">
				<h1 class="title">商家详情</h1>
				<div class="back" @touchstart="hide">
					<i class="icon-arrow_lift"></i>
				</div>
				<div class="bg">
					<img :src="seller.avatar" alt="背景" width="100%" height="100%">
				</div>
			</section>
			<section class="seller"  id="seller" >
				<div class="scroll">
					<div class="seller-store">
						<div class="top">
							<div class="img">
								<img :src="seller.avatar" alt="商家" width="100%" height="100%">
							</div>
							<div class="info">
								<h3 class="name" v-text="seller.name"></h3>
								<p class="desc">
									<my-star :score="seller.score" :size="36"></my-star>
									<span class="num" v-text="seller.ratingCount"></span>
								</p>
								<div class="sales" v-text="'月售'+seller.sellCount+'单'" ></div>
							</div>
							<div class="collect" @touchstart="collect($event)">
								<span class="icon icon-favorite" :class="{active:collected}" ></span>
								<p class="text" v-text="collectText"></p>
							</div>

						</div>
						<div class="bottom">
							<div>
								<h3 class="title">起送价</h3>
								<p class="price">
									<span v-text="seller.minPrice"></span>
									<i>元</i>
								</p>
							</div>
							<div>
								<h3 class="title">商家配送</h3>
								<p class="price">
									<span v-text="seller.deliveryPrice"></span>
									<i>元</i>
								</p>
							</div>
							<div>
								<h3 class="title">平均配送时间</h3>
								<p class="price">
									<span v-text="seller.deliveryTime"></span>
									<i>元</i>
								</p>
							</div>
						</div>
					</div>
					<my-divider ></my-divider>
					<div class="seller-bulletin">
						<h3 class="name">商家公告与活动</h3>
						<p class="text" v-text="seller.bulletin"></p>
						<ul class="affordable" v-show="seller.supports&&seller.supports.length>0">
							<li v-for="(item,index) in seller.supports">
								<span class="icon " :class="classmap[seller.supports[index].type]"></span>
								<span class="desc" v-text="item.description"></span>
							</li>
						</ul>
					</div>
					<my-divider ></my-divider>
					<div class="seller-img">
						<h3 class="name">商家实景</h3>
						<div id="scroll-wrapper" class="scroll-wrapper">
							<div class="img-wrapper" v-show="seller.pics&&seller.pics.length>0" :style="json">
								<a href="" v-for="picSrc in seller.pics">
									<img :src="picSrc" alt="商家实景" height="100%" width="100%">
								</a>
							</div>
							<div class="line" v-show="active" :class="{active:active}"></div>
						</div>
					</div>
					<my-divider ></my-divider>
					<div class="seller-info">
						<h3 class="name">商家信息</h3>
						<ul class="content"  v-show="seller.infos&&seller.infos.length>0">
							<li v-for="item in seller.infos" v-text="item"></li>
						</ul>
					</div>
				</div>
			</section>
		</section>
	</transition>
</template>

<script>
	import iScroll from "../../../static/javascript/iscroll-probe.js"
// 加载组件
import star from "../star/star.vue"
import divider from "../divider/divider.vue"
export default {
	name: 'seller',
	props:["seller"],
	data () {
		return {
			collected:true,
			showSeller:false,
			json:{
				width:0
			},
			active:false
		}
	},
	computed:{
		collectText(){
			if(this.collected){
				return "已收藏"
			}
			return "收藏"
		}
	},
	created(){

		this.classmap=["decrease","discount","special","invoice","guarantee"];
	},
	methods:{
		// 计算实景图片wrapper宽度W
		ImgWrapperW(){
			// 数量*每个宽度 - 第一个前的margin
			let len,w;
				len=this.seller.pics.length;
				w=len*3.36+"rem";
				this.json.width=w;
		},
		// 滚动
		scroll(){
			this.myScroll=new iScroll("#seller",{
				scrollX:false,
				scrollY:true,
				touchstart:true
			});
			this.scrollImg=new iScroll("#scroll-wrapper",{
				scrollX:true,
				scrollY:false,
				touchstart:true,
				probeType:3
			})
			// 滚动图片底线
			this.scrollImg.on("scroll",(pos)=>{
				this.active=true;
			})
			this.scrollImg.on("scrollEnd",(pos)=>{
				this.active=false;
			})
		},
		// 收藏
		collect(event){
			this.collected=!this.collected;
			// this.$http.get("http://10.29.0.112:8086/home?collect="+Boolean(this.collected)+"&id="+this._id+"&thisId="+this.seller._id+"")
		},
		// 显示
		show(){
			this.showSeller=true;
			// 显示调用ImgWrapperW,设置商家图片的排列
			this.collected=this.seller.collected;
			this.ImgWrapperW()
				// 滚动,存在刷新，不存在调用
				if(!this.myScroll||!this.scrollImg){
					this.$nextTick(()=>{
						this.scroll()
					})
				}else{
					this.$nextTick(()=>{
						this.myScroll.refresh();
						this.scrollImg.refresh();
					})
				}
			},
			hide(){
				this.showSeller=false;
			}
		},
		components:{
			"my-star":star,
			"my-divider":divider
		}
	};
</script>

<style lang="less" scoped>
	@import url("../../../static/less/reset.less");
	@import url("../../../static/css/animate.css");
	.slideInRight,.slideOutRight{
		-webkit-animation-duration:.3s;
	}
	.name{
		.fontSize(14px);
		color: rgb(7,17,27);
		line-height: 0.373333rem;
	}
	.divider{
		margin-left: 0 !important;
	}
	.seller-wrapper{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99999999;
		background-color: #fff;
		height: 100%;
		width: 100%;
		.caption{
			position: fixed;
			top: 0;
			left: 0;
			width:100%;
			line-height: 1.066667rem;
			z-index: 999999;
			text-align: center;
			color:#fff;
			.fontSize(16px);
			font-weight: 700;

			h1{
				position: relative;
				z-index: 999999;
				background-color: rgba(7,17,27,.3);

			}
			.bg{
				position: absolute;
				left: 0;
				top:0;
				width: 100%;
				height: 1.066667rem;
				z-index: 999998;
				filter:blur(3px);

			}
			.back{
				position: absolute;
				top: 0;
				left:0.133333rem;
				z-index: 999999;
				i{
					.fontSize(18px);
				}
			}
		}
	}
	.seller{
		height: 100%;
		overflow:hidden;
		.seller-store{
			padding:1.066667rem 0.48rem 0;
			.top{
				padding:0.48rem 0;
				display: -webkit-box;
				display: flex;
				border-bottom:1px solid rgba(7,17,27,.1);
				-webkit-box-align:center;
				align-items:center;
				.img{
					height:1.706667rem;
					width:1.706667rem;
					border-radius: 4px;
				}

				.info{
					margin-right: auto;
					margin-left: 0.32rem;
					.fontSize(10px);
					color: rgb(77,85,93);
					.desc{
						margin: 0.213333rem 0;
						display: -webkit-box;
						display: flex;
						line-height: 0.48rem;

						.num{
							margin-left: 0.213333rem;
							margin-right: 0.32rem;
						}
					}
				}
				.collect{
					text-align: center;
					color: rgb(77,85,93);
					.icon{
						line-height: 0.64rem;
						.fontSize(24px);
						&.active{
							color: rgb(240,20,20);
						}
					}
					.text{
						margin-top: 0.106667rem;
						line-height: 0.266667rem;
						.fontSize(10px);

					}
				}
			}
			.bottom{
				padding:0.48rem 0;
				display: -webkit-box;
				display: flex;
				div{
					-webkit-box-flex:1 1 auto;
					flex:1 1 auto;
					text-align: center;
					.fontSize(10px);

					&+div{
						border-left: 1px solid rgba(7,17,27,.1)
					}
					.title{
						line-height: 0.266667rem;
						margin-bottom: 0.106667rem;
						color: rgb(146,153,159);
					}
					.price{
						span{
							line-height: 0.64rem;
							.fontSize(24px);
							color: rgb(7,17,27);
							font-weight: 200;

						}
						i{
							color: rgb(7,17,27);
							font-style: normal;
						}
					}
				}

			}
		}
		.seller-bulletin{
			padding:0.48rem 0.48rem 0;
			.text{
				padding:0.213333rem 0.32rem 0.426667rem;
				line-height: 0.64rem;
				.fontSize(12px);
				font-weight: 200;
				color: rgb(240,20,20);
			}
			.affordable{
				li{
					padding:0.426667rem 0.32rem;
					border-top: 1px solid rgba(7,17,27,.1);
					display: -webkit-box;
					display: flex;
					.icon{
						height: 0.426667rem;
						width: 0.426667rem;
						margin-right: 0.213333rem;
						.iconBg(seller,4,0.426667rem,0.426667rem);
						background-size: 0.426667rem 0.426667rem;

					}
					.desc{
						line-height: 0.426667rem;
						.fontSize(12px);
						font-weight: 200;
						color: rgb(7,17,27);
					}

				}
			}
		}
		.seller-img{
			padding: 0.48rem 0.48rem;
			.scroll-wrapper{
				position: relative;
				width: 100%;
				overflow: hidden;
				.line{
					position: absolute;
					bottom: 0.066667rem;
					height: 2px;
					width: 100%;
					background: rgba(7,17,27,.5);
					z-index:99998;
					opacity:0;
					-webkit-transition:opacity .5s;
					&.active{
						opacity:1;
					}
				}
				.img-wrapper{
					position: relative;
					z-index:99999;
					margin-top:0.32rem;
					font-size: 0;
					a{
						width: 3.2rem;
						height: 2.4rem;
						display: inline-block;
						& + a{
							margin-left:0.16rem;
						}
					}
				}
			}
		}
		.seller-info{
			padding: 0.48rem 0.48rem;
			.content{
				margin-top:0.32rem;
				li{
					padding:0.426667rem 0.32rem;
					border-top: 1px solid rgba(7,17,27,.1);
					line-height: 0.426667rem;
					.fontSize(12px);
					font-weight: 200;
					color: rgba(7,17,27,1);
				}
			}
		}
	}
</style>