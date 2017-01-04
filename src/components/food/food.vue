<template>
	<transition  name="slide"
	enter-active-class="animated slideInRight"
	leave-active-class="animated slideOutRight">
	<div class="food" v-show="showFlag" id="food">
		<div class="scroll">
			<div class="food-pic">
				<img :src="food.image" alt="食物" width="100%" height="100%">
			</div>
			<!-- 返回按钮 -->
			<div class="back" @touchstart="hide">
				<i class="icon-arrow_lift"></i>
			</div>
			<div class="food-content">
				<div class="food-title">
					<h3 class="name" v-text="food.name"></h3>
					<p class="num">
						<span  v-text="'月售'+food.sellCount+'份'"></span>
						<span v-text="'好评率'+food.rating +'%'"></span>
					</p>
					<div class="price">
						<span v-text="'￥'+food.price"></span>
						<del v-text="food.oldPrice||''" ></del>
						<button v-show="!food.count||food.count==0" @touchstart="addFood($event)">加入购物车</button>
						<cartcontrol :food="food" v-show="food.count>0" ></cartcontrol>
					</div>
				</div>
				<!-- 分割条 -->
				<divider></divider>
				<!-- 商品介绍 -->
				<div class="food-desc">
					<h4 class="title">商品介绍</h4>
					<p class="desc" v-text="food.info"v-show="food.info" ></p>
				</div>
				<!-- 分割条 -->
				<divider></divider>
				<!-- 评论 -->
				<div class="food-rating">
					<h4 class="title">商品评价</h4>
					<!-- 组件 -->
					<reatingSelect :ratings="food.ratings" :ratingType="ratingType" :pageId="pageId" :onlyContent="onlyContent" :state="state" @select="nowSelected" @check="nowChecked" ref="reatingSelect"></reatingSelect>
				</div>
				<!-- 占位 -->
				<div class="bottom"></div>
			</div>
		</div>
	</div>
</transition>

</template>

<script>
	import iScroll from "../../../static/javascript/iscroll-probe.js"
	// 加载组件
	import cartcontrol from "../cartcontrol/cartcontrol.vue"
	import divider from "../divider/divider.vue"
	import reatingSelect from "../ratingSelect/ratingSelect.vue"

	const ratingType={
		all:"全部",
		positive:"推荐",
		negative:"吐槽"
	};
	const pageId=1;
	const state={
		All:2,
		Positive:0,
		Negative:1
	}
	export default {
		name: 'food',
		props:["food"],
		data () {
			return {
				showFlag:false,
				ratingType:ratingType,
				pageId:pageId,
				// 选择有内容按钮选中
				onlyContent:true,
				state:state
			}
		},
		methods:{
			// 子组件改变时触发
			nowSelected(nowSelected){
				this.$nextTick(()=>{
					setTimeout(()=>{
						this.myScroll.refresh();
					},50)
				})
			},
			nowChecked(nowChecked){
				this.$nextTick(()=>{
					setTimeout(()=>{
						this.myScroll.refresh();
					},50)
				})
			},
			// 滚动
			scroll(){
				this.myScroll=new iScroll("#food",{
					tap:true
				})
			},
			// 展现
			show(){
				this.showFlag=true;
				// 加载时初始化
				this.$refs.reatingSelect._init();
				// 滚动
				if(!this.myScroll){
					this.$nextTick(()=>{
						setTimeout(this.scroll,50)
					})
				}else{
					setTimeout(()=>{
						this.myScroll.refresh();
					},50)
				}
			},
			hide(){
				this.showFlag=false;
			},
			// 购买添加
			addFood(event){
				this.$set(this.food,"count",1);
			}
		},
		components:{
			cartcontrol,
			divider,
			reatingSelect
		},
	};
</script>

<style lang="less" scoped>
	@import url("../../../static/less/reset.less");
	@import url("../../../static/css/animate.css");
	// 动画时间
	.slideInRight,.slideOutRight{
		-webkit-animation-duration:.3s;
	}
	// 分割条
	.divider{
		margin-left: 0;
	}
	.food{
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index:8;
		background: #fff;
		.back{
			position: absolute;
			top: 0.32rem;
			left:0.133333rem;
			i{
				.fontSize(18px);
				color: #fff;
			}
		}
		.food-pic{
			// 可设置图片的宽高相等
			position: relative;
			top: 0;
			left: 0;
			width: 100%;
			padding-top: 100%;
			img{
				position: absolute;
				left: 0;
				top: 0;
			}
		}
		.food-content{
			.common{
				padding: 0.48rem 0;
				.fontSize(14px);
				color: rbg(7,17,27);
				line-height:0.373333rem;
			}
			.food-title{
				padding:0 0.48rem;
				.name{
					.common;
					font-weight: 700;
					padding-bottom: 0;
					margin-bottom: 0.213333rem;
				}
				.num{
					span:first-child{
						margin-right: 0.32rem;
					}
				}
				.price{
					display: -webkit-box;
					display: flex;
					line-height:0.64rem;
					margin:0.48rem 0;
					span{
						.fontSize(14px);
						color:rgb(240,20,20);
						font-weight: 700;
						margin-right: 0.2rem;
					}
					del{
						.fontSize(10px);
						color: rgb(147,153,159);
						font-weight: 700;
						margin-right: auto;

					}
					button{
						width: 1.973333rem;
						height: 0.64rem;
						line-height: 0.64rem;
						text-align: center;
						color: #fff;
						border-radius: 0.32rem;
						background: rgb(0,160,220);
						border:none;
						.fontSize(10px);
					}
				}
			}
			.food-desc{
				.common;
				padding:0.48rem;
				p{
					padding: 0 0.213333rem;
					line-height:0.64rem;
					font-weight: 200;
					.fontSize(12px);
					color: rgb(77,85,93);
				}
			}
			.food-rating{
				.common;
				.title{
					padding:0 0.48rem;
					margin-bottom:0.16rem;
				}
			}
		}
		// 用于占位，滚动条底部购物车高度
		.bottom{
			height:0.933333rem;
			width: 100%;
		}
	}
</style>