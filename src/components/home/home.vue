<template>
	<section class="home">
		<my-navbar @destroyScroll="destroyScroll" ref="navbar"></my-navbar>
		<section class="carousel" id="carousel">
			<div class="carousel-indicators">
				<div class="item-wrapper" v-for="category in categorys" v-show="sellers" >
					<a href="javascript:;" class="item" v-for="item in category.category" v-show="categorys" @tap.stop.prevent="showList($event)">
						<span class="pic">
							<img :src="item.url" alt="分类图片" height="100%" width="100%">
						</span>
						<span>{{item.caption}}</span>
					</a>
				</div>
			</div>
			<div class="carousel-control">
				<span class="active"></span>
				<span></span>
			</div>
		</section>
		<my-divider></my-divider>
		<section class="sales">
			<h1 class="title">
				<span class="text">附近商家</span>
			</h1>
			<ul class="sales-info" v-show="sellers" ref="sellersDom">
				<li v-for="seller in sellers.sellers" @tap="salesShow(seller,$event)">
				<!-- 此处判断条件无效 -->
					<div class="newAdd" v-show="seller.deliveryTime>20">
						<span>新增</span>
					</div>
					<div class="img">
						<img :src="seller.avatar" alt="商家" height="100%" width="100%">
					</div>
					<div class="info">
						<h2 class="name" v-text="seller.name"></h2>
						<div class="score">
							<my-star :size="24" :score="score(seller)"></my-star>
							<span class="score-num">{{score(seller)}}</span>
							<span class="sell-num">月售{{seller.sellCount}}单</span>
						</div>
						<p class="priceTime">
							<span class="price">￥{{seller.minPrice}}起送/配送费￥{{seller.deliveryPrice}}</span>
							<span class="dis-time">{{seller.sellCount}} m / {{seller.deliveryTime}}分钟</span>
						</p>
					</div>
				</li>
			</ul>
		</section>
		<div class="reloadMore" v-show="showMore">{{loadingText}}</div>
	</section>
</template>

<script>
import iScroll from "../../../static/javascript/iscroll-probe.js"
import {slide} from "../../common/js/slide.js";
// 加载组件
import divider from "../divider/divider.vue";
import star from "../star/star.vue";
import navbar from "../navbar/navbar.vue"
const ERR_OK=0;
export default {
	name: 'home',
	data () {
		return {
			loading:false,
			err:false,
			sellers:[],
			categorys:[],
			selectSeller:{},
			showMore:false,
			first:true,
			loadingText:"加载中..."
		};
	},
	created(){
		this.feachData();
	},
	methods:{
		// 初始化
		feachData(){
			this.loading=true;
			this.$http.get("http://localhost:8086/home").then((data)=>{
				this.loading=false;
				let json=data.data;
				if(json.error==ERR_OK){
					// 获取分类
					//合并重复分类,用于滑动,在slidejs中设置innerHTML时,点击事件无效
					this.categorys=[].concat(json.category,json.category)
					// 获取商家数据
					this.sellers=json.sellers;
					this.$emit("getSellersData",this.sellers);
				}
				// 滚动
				if(!this.myScroll){
					this.$nextTick(()=>{
						this.scroll();
					});
				}else{
					this.$nextTick(()=>{
						this.myScroll.refresh();
					});
				}
				// 滑动
				this.$nextTick(()=>{
					let oWrap=document.getElementById("carousel");
					slide(oWrap);
				})
			},(err)=>{
				this.loading=false;
				this.err=true;
			})
		},
		// 综合得分
		score(seller){
			let num=(seller.serviceScore+seller.foodScore)/2;
			let score=num.toFixed(1);
			return score;
		},
		scroll(){
			this.myScroll=new iScroll("#homeWrapper",{
				scrollY:true,
				scrollX:false,
				scrollbars: true,
				shrinkScrollbars:"scale",
				interactiveScrollbars:true,
				fadeScrollbars:true,
				tap: true,
				probeType:3
			})
			//  上拉
			this.myScroll.on("scroll",()=>{
				let _this=this.myScroll;
				let disY=_this.maxScrollY -_this.y;
				if(this.first){
					if( disY>0&&disY <40){
						this.showMore=true;
						this.loadingText="正在加载中..."
						this.first=false;
					}
				}
				if(!this.first){
					// 模拟无更多数据
					if(disY>40){
						this.first=true;
						this.loadingText="没有更多内容"
					}
				}
			})
		},
		salesShow(seller,event){
			this.selectSeller=seller;
			// 将选择的商家数据传递给负组件APP.vue
			this.$emit("getSelectData",this.selectSeller)
			// 跳转到goods页面
			this.$router.push('/sales/goods?_id='+this.selectSeller._id+'');
			this.destroyScroll();
		},
		destroyScroll(){
			// 销毁滚动
			this.myScroll.destroy();
		},
		showList(){

		}
	},
	components:{
		"my-divider":divider,
		"my-navbar":navbar,
		"my-star":star
	}
};
</script>

<style lang="less" scoped>
	@import url("../../../static/less/reset.less");
	a:hover{
		text-decoration: none;
	}
	.home{
		width: 100%;
		.carousel{
			position: relative;
			width: 100%;
			height: 4.706667rem;
			overflow: hidden;
			.carousel-indicators{
				height:3.84rem;
				width: 100%;
				overflow-y: hidden;
				.item-wrapper{
					width: 50%;
					float: left;
					.item{
						float: left;
						width: 25%;
						text-align: center;
						margin-top: 0.293333rem;
						.pic{
							width:1.2rem;
							height: 1.2rem;
							margin: 0 auto;
						}
						span{
							display: block;
							color: rgb(102, 102, 102)
							;
							.fontSize(12px);
						}
					}
				}
			}
			.carousel-control{
				position: absolute;
				bottom: 0.133333rem;
				height:0.4rem;
				width: 100%;
				text-align: center;
				font-size: 0;
				span{
					display: inline-block;
					height: 0.213333rem;
					width: 0.213333rem;
					border-radius: 50%;
					background-color:#000;
					margin-top: 0.093333rem;
					opacity: .6;
					& + span{
						margin-left:0.133333rem;
					}
					&.active{
						opacity: 1;
					}
				}
			}
		}
		.divider{
			height:0.266667rem;
			margin-left: 0;
		}
		.sales{
			.title{
				width: 100%;
				padding: 0 0.4rem;
				box-sizing: border-box;
				color: #999;
				border-bottom:1px solid rgb(238,238,238);
				background-color: #fff;
				line-height: 0.906667rem;
				.icon{
					display: inline-block;
					width: 0.373333rem;
					height: 0.373333rem;
					.fontSize(14px);
					margin-right:0.133333rem;
				}
				.text{
					.fontSize(14px);
				}
			}
			.sales-info{
				li{
					position: relative;
					z-index: 1;
					display: flex;
					padding: 0.4rem 0.266667rem;
					border-bottom: 1px solid rgb(238, 238, 238);
					color: rgb(102, 102, 102);
					.fontSize(11px);
					.newAdd{
						position: absolute;
						left: 0;
						top: 0;
						z-index: 2;
						background:linear-gradient(135deg,#26ce61,#26ce61 50%,transparent 0);
						height:0.853333rem;
						width: 0.853333rem;
						span{
							display: block;
							margin-top: 3px;
							margin-left: -8px;
							.fontSize(11px);
							color: #fff;
							font-weight: bold;
							-webkit-transform: rotate(-45deg) scale(0.85);

						}
					}
					.img{
						flex:0 1 auto;
						height:1.6rem;
						width: 1.6rem;
						margin-right:0.266667rem;
					}
					.info{
						flex:1 1 auto;
						.name{
							width: 5.0rem;
							text-overflow:ellipsis;
							overflow: hidden;
							white-space: nowrap;
							color:rgb(51, 51, 51);
							.fontSize(15px);
							font-weight: bold;
							line-height: 0.426667rem;
						}
						.score{
							margin-top:0.2rem;
							display: flex;
							align-items:center;
							.score-num{
								margin: 0 0.106667rem;
								color: #ff6000;
							}
						}
						.priceTime{
							margin-top: 0.22rem;
							display: flex;
							.price{
								margin-right: auto;
							}
						}
					}
				}
			}

		}
		.reloadMore{
			width: 100%;
			line-height: 0.666667rem;
			text-align: center;
			color:rgb(102, 102, 102);
			.fontSize(16px);
			margin-top: 0.2rem;
		}
	}
</style>