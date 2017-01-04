<template>
	<div class="shopcart-wrapper">
	<!-- 购物车 -->
		<div class="shopcart">
			<div class="shopcart-shop" >
				<div class="shop-content" @touchstart="toggleList">
					<div class="login-wrapper">
						<div class="login">
							<i class="icon icon-shopping_cart" :class="{highlight:totalCount!=0}"></i>
						</div>
						<div class="num" v-show="totalCount!=0" v-text="totalCount"></div>
					</div>
					<div class="price-desc-wrapper">
						<span class="price"  :class="{highlight:totalPrice!=0}" v-text="'￥'+totalPrice"></span>
						<span class="desc"  v-text="'另需配送费￥'+deliveryPrice+'元'"></span>
					</div>
				</div>
				<div class="shop-btn"  v-text="disPrice" :class="{enough:enough}" @touchstart.stop.prevent="pay">
				</div>
			</div>
			商品列表
			<transition name="fold">
				<div class="shopcart-list" v-show="listshow" >
					<div class="list-header">
						<h1>购物车</h1>
						<span @touchstart="empty">清空</span>
					</div>
					<div class="list-body" id="listBody">
						<ul>
							<li class="list-item"  v-for="food in selectFoods">
								<h2 class="name" v-text="food.name"></h2>
								<span class="price" v-text="'￥'+food.price*food.count"></span>
								<cartcontrol :food="food"></cartcontrol>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		 </div>
		<!-- 遮罩层 -->
		<transition  name="fade">
			<div class="mask" v-show="listshow" @touchstart="hidelist">
			</div>
		</transition>
	</div>
</template>

<script>
	import iScroll from "../../../static/javascript/iscroll-probe.js";
	// 组件
	import cartcontrol from "../cartcontrol/cartcontrol.vue";
	export default {
		name: 'shopcart',
		props:{
			selectFoods:{
				type:Array,
				default(){
					return []
				}
			},
			deliveryPrice:{
				type:Number,
				default:0
			},

			minPrice:{
				type:Number,
				default:0
			}
		},
		data () {
			return {
				show:false,
				selectFs:[],
				enough:false
			};
		},
		components:{
			cartcontrol
		},
		methods:{
			scroll(){
				this.myScroll=new iScroll("#listBody",{
					scrollX:false,
					scrollY:true,
					tap:true
				})
			},
			// 清空购物车
			empty(){
				for(let key in this.selectFoods){
					this.selectFoods[key].count=0;
				}
				this.show=false;

			},
			// 列表切换
			toggleList(){
				if(!this.totalCount){
					return;
				}
				this.show=!this.show;
			},
			hidelist(){
				this.show=false;
			},
			// 支付
			pay(){
				if(this.totalPrice<this.minPrice+this.deliveryPrice){
					return;
				}
			}
		},
		computed:{
			// 总价
			totalPrice(){
				let totalP=0;
				this.selectFoods.forEach((val)=>{
					totalP+=val.count*val.price
				})
				return totalP;
			},
			// 总购买数
			totalCount(){
				let totalC=0;
				this.selectFoods.forEach((val)=>{
					totalC+=Number(val.count)
				})
				return totalC;
			},

			disPrice(){
				let disP=this.minPrice+this.deliveryPrice-this.totalPrice;
				if(this.totalPrice===0){
					return `￥${this.minPrice}元起送`;
				}
				//背景色
				if(disP<=0){
					this.enough=true;
				}else{
					this.enough=false;
				}
				return disP<=0 ? "去结算" : `还差${disP}元起送`
			},
			//滚动
			listshow(){
				if(!this.totalCount){
					return false;
				}
				if(this.show){
					// 每次计算不存在创建
					if(!this.myScroll){
						this.$nextTick(()=>{
							this.scroll()
						})
					}else{
						this.$nextTick(()=>{
							this.myScroll.refresh();
						})
					}
				}
				return this.show;
			},
		}
	};
</script>

<style lang="less" scoped>
	@import url("../../../static/less/reset.less");
	@color:rgba(255,255,255,.4);
	// 购物列表过渡
	.fold-enter-active,.fold-leave-active{
		transition:all .5s linear;
	}
	.fold-enter,.fold-leave-active{
		-webkit-transform:translate3d(0,100%,0);
	}
	// 背景层过渡
	.fade-enter-active,.fade-leave-active{
		transition:all .5s linear;
	}
	.fade-enter,.fade-leave-active{
		opacity: 0;
	}
	.shopcart-wrapper{
		.shopcart{
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
			z-index:10;
			.shopcart-shop{
				.highlight{
					color: #fff !important;
				};
				position: absolute;
				bottom: 0;
				z-index: 100;
				width: 100%;
				height: 1.28rem;
				display: -webkit-box;
				display: flex;
				-webkit-box-align:center;
				align-items:center;
				background:#141d27;
				.shop-content{
					-webkit-box-flex:1 1 auto;
					flex:1 1 auto;
					display: -webkit-box;
					display: flex;
					.login-wrapper{
						position: absolute;
						bottom: 0.053333rem;
						height:1.546667rem;
						width: 1.546667rem;
						margin-left: 0.32rem;
						line-height: 1.546667rem;
						border-radius: 50%;
						background:#141d27;
						.login{
							height: 1.173333rem;
							width: 1.173333rem;
							margin: 0.16rem auto;
							background:#2b343c;
							text-align: center;
							border-radius: 50%;
							i{
								line-height: 0.373333rem;
								color:@color;
								.fontSize(24px);

							}
						}
						.num{
							position: absolute;
							top: 0;
							right: 0;
							border-radius:0.213333rem;
							line-height: 0.426667rem;
							text-align: center;
							width: 0.64rem;
							padding: 0 0.16rem;
							box-sizing: border-box;
							background:rgb(240,20,20);
							box-shadow: 0 0.053333rem 0.106667rem 0 rgba(0,0,0,.4);
							color:#fff;
							.fontSize(9px);
							font-weight: 700;
						}
					}
					.price-desc-wrapper{
						margin-left:2.133333rem;
						color:@color;
						line-height: 0.64rem;
						.fontSize(14px);
						.price{
							padding-right: 0.32rem;
							border-right: 1px solid @color;
							font-weight: 700;
						}
						.desc{
							padding-left: 0.32rem;
							font-weight: 200;
						}
					}
				}
				.shop-btn{
					width:2.8rem;
					height: 100%;
					line-height: 0.64rem;
					-webkit-box-flex:0 1 2.8rem;
					flex:0 1 2.8rem;
					padding:0.32rem 0.213333rem;
					box-sizing: border-box;
					text-align: center;
					color: @color;
					font-weight:700;
					background-color: #202932;
					margin-left: 0.32rem;
					.fontSize(12px);
					&.enough{
						background: #00b43c;
						color: #fff;
					}
				}
			}
			.shopcart-list{
				position: absolute;
				bottom: 1.28rem;
				width: 100%;
				max-height:8.146667rem;
				height: auto;
				z-index: 99;
				background:#fff ;
				.list-header{
					display: -webkit-box;
					display: flex;
					justify-content:space-between;
					alian-items:center;
					line-height: 1.066667rem;
					background: #f3f5f7;
					padding: 0 0.48rem;
					box-sizing: border-box;
					border-bottom: 2px solid rgba(7,17,27,.1);
					h1{
						.fontSize(14px);
						font-weight: 200;
						color: rgba(7,17,27,1);
					}
					span{
						.fontSize(12px);
						color: rgba(0,160,220,1);
					}
				}
				.list-body{
					max-height:5.8rem;
					height: auto;
					overflow: hidden;
					.list-item{
						display: -webkit-box;
						display: flex;
						-webkit-box-align:center;
						align-items:center;
						height: 1.28rem;
						padding: 0.32rem 0.48rem;
						line-height: 48px;
						border-bottom: 1px solid rgba(7,17,27,.1);
						box-sizing: border-box;
						.name{
							.fontSize(14px);
							color: rbga(7,17,27,1);
							margin-right: auto;
						}
						.price{
							margin: 0 0.32rem 0 0.48rem;
							color: rbg(240,20,20);
							font-weight: 700;
						}
					}
				}
			}
		}
		.mask{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index:9;
			opacity: 1;
			background:rgba(7,17,27,.6);
			backdrop-filter:blur(10px);
		}
	}
</style>