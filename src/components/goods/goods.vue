<template>
	<transition name="slide" enter-active-class="animated slideInLeft"  leave-active-class="animated slideOutLeft">
		<div class="goods-wrapper">
			<div v-show="loading" class="data-tooltip">
				正在加载中,请稍后...
			</div>
			<div v-show="err" class="data-tooltip">
				加载失败,请重新加载！
			</div>
			<div class="goods" v-show="goods">
				<div class="menu-wrapper" id="menuWrapper">
					<ul>
						<li v-for="(item,index) in goods" :class="{active:index==nowIndex}" @tap="scrollTo(index,$event)" >
							<span class="text">
								<span class="icon" :class="classmap[item.type]" v-if="item.type>0"></span>
								{{item.name}}
							</span>
						</li>
					</ul>
				</div>
				<div class="foods-wrapper" id="foodsWrapper" ref="foodsWrapper">
					<ul>
						<li v-for="item in goods" class="food-list food-list-hook" >
							<h3 v-text="item.name"></h3>
							<ul>
								<li v-for="food in item.foods" class="food-item" @tap="select(food,$event)">
									<div class="food-pic">
										<img :src="food.icon" alt="食物" width="100%">
									</div>
									<div class="food-content">
										<h4 class="name" v-text="food.name"></h4>
										<p class="desc"
										v-text="food.description" v-show="food.description"></p>
										<p class="extra">
											<span class="num" v-text="'月售'+food.sellCount+'份'">
											</span>
											<span class="rote" v-text="'好评率'+food.rating+'%'">
											</span>
										</p>
										<p class="price" >
											<span v-text="'￥'+food.price"></span>
											<del  v-text="food.oldPrice"></del>
											<cartcontrol :food="food"></cartcontrol>
										</p>
									</div>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<shopcart :deliveryPrice="seller.deliveryPrice"  :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopcart>
			<food :food="selectedFoods" ref="food"></food>
		</div>
	</transition>
</template>
<script>
	import iScroll from "../../../static/javascript/iscroll-probe.js";
	// 加载组件
	import shopcart from "../shopcart/shopcart.vue";
	import cartcontrol from "../cartcontrol/cartcontrol.vue";
	import food from "../food/food.vue"
	const ERR_OK=0;
	let firstMove=true;
	export default {
		name: 'goods',
		props:["seller","nowId"],
		data () {
			return {
				loading:false,
				err:false,
				goods:null,
				foodsListH:[],
				scrollY:0,
				selectedFoods:{},
			}
		},
		created(){
			this.fetchData();
    		// 图标对应className
    		this.classmap=["decrease","discount","special","invoice","guarantee"];
    	},
    	watch:{
    		"$route":"fetchData"
    	},
    	computed:{
    		// 左侧食品分类栏
    		nowIndex(){
    				for (let i = 0,len=this.foodsListH.length; i < len; i++) {
    				let height1=this.foodsListH[i];
    				let height2=this.foodsListH[i+1];
    				if(!height2||this.scrollY>=height1&&this.scrollY<height2 ){
    					return i;
    				}
    			}
    		},
    		// 选择
    		selectFoods(){
    			let foodCount=[];
    			for(let item in this.goods){
    				let foods=this.goods[item].foods
    				for(let item in foods){
    					let food=foods[item]
    					if(food.count){
    						foodCount.push(food)
    					}
    				}
    			}
    			return foodCount;
    		}
    	},
    	methods:{
    		// 加载数据
    		fetchData(){
    			this.loading=true;
    			this.$http.get("http://192.168.0.113:8086/goods?id="+this.$route.query._id+"").then((data)=>{
		    		 // 成功
		    		 this.loading=false;
		    		 let json=data.data;
		    		 if(json.error==ERR_OK){
		    		 	let goods=json.goods.goods;
		    		 	this.goods=goods;
		    		 }
		    		 // 加载滚动
		    		 if(!this.menuScroll||!this.foodScroll){
		    		 	this.$nextTick(()=>{
		    				// 滚动
		    				this.initScroll();
		    				this.calculateH();
		    			})
		    		 }else{
		    		 	this.$nextTick(()=>{
		    				// 滚动
		    				this.menuScroll.refresh()
		    				this.foodScroll.refresh()
		    			})
		    		 }
		    		},(err)=>{
		   				this.loading=false;
		    			this.err=true;
		    		});
    		},
    		// 初始化滚动
    		initScroll(){
    			this.menuScroll=new iScroll("#menuWrapper",{
    				scrollY:true,
    				scrollX:false,
    				tap:true
    			})
    			this.foodScroll=new iScroll("#foodsWrapper",{
    				scrollY:true,
    				scrollX:false,
    				probeType:3,
    				tap:true
    			})
    			// 获取滚动时的位置
    			this.foodScroll.on("scroll",(pos)=>{
    				let _this=this.foodScroll;
    			this.scrollY=Math.abs(Math.floor(_this.y));
    			})
    		},
    		calculateH(){
    			let els=this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
    			let height=0;
    			this.foodsListH.push(height);
    			for (let i = 0; i< els.length; i++) {
    				let elH=els[i].offsetHeight;
    				height+=elH;
    				this.foodsListH.push(height);
    			}
    		},
    		scrollTo(index,event){
    			let els=this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
    			let H=-this.foodsListH[index];
				// 左侧点击右侧滚动
				this.foodScroll.scrollTo(0,H,300);
			},
			select(food,event) {
				this.selectedFoods=food;
				// 子组件中的show的调用
				this.$refs.food.show();
			}
		},
		components:{
			shopcart,
			cartcontrol,
			food
		}
	};
</script>

<style lang="less" scoped>
	@import url("../../../static/less/reset.less");
	@import url("../../../static/css/animate.css");
	.slideInLeft,.slideOutLeft{
		-webkit-animation-duration:.2s;
	}
	// 加载信息
	.data-tooltip{
		width: 100%;
		height: 100%;
		display: -webkit-box;
		display: flex;
		justify-content:center;
		-webkit-box-align:center;
		align-items:center;
		margin-top: -1.28rem;
	}
	.goods-wrapper{
		position:absolute;
		left: 0;
		top: 0;
		padding-top:4.64rem;
		overflow: hidden;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
	}
	.goods{
		height: 100%;
		width: 100%;
		display: -webkit-box;
		display:-webkit-flex;
		display:flex;
		z-index:100;
		.menu-wrapper{
			flex:0 1 2.133333rem;
			background: #f3f5f7;
			li{
				width: 100%;
				padding: 0 0.32rem;
				height: 1.44rem;
				display: table;
				line-height: 0.373333rem;
				box-sizing: border-box;
				&.active{
					position: relative;
					background: #fff;
					font-weight: 700;
					margin-top: -1px;
					z-index: 3;
					.text{
						border-bottom: none;
					}
				}
				.text{
					.fontSize(12px);
					font-weight: 200;
					color:#2c3238;
					display: table-cell;
					width: 1.493333rem;
					vertical-align: middle;
					border-bottom: 1px solid rgba(7,17,27,.1);
					.icon{
						display: inline-block;
						height: 0.373333rem;
						width: 0.373333rem;
						margin-right: 2px;
						vertical-align: top;
						.iconBg(goods,3,0.48rem,0.48rem);
					}
				}
			}
		}
		.foods-wrapper{
			flex:1 1 auto;
			.food-list{

				h3{
					width: 100%;
					height:0.693333rem;
					line-height: 0.693333rem;
					background: #f3f5f7;
					padding-left: 0.373333rem;
					border-left: 0.106667rem solid #d9dde1;
					box-sizing: border-box;
					color: rgba(147,153,159,1);
					.fontSize(12px);
				}
				ul{
					padding: 0 0.48rem;
					.food-item{
						padding: 0.48rem 0;
						display: -webkit-box;
						display: -webkit-flex;
						display:flex;
						border-bottom: 1px solid rgba(7,17,27,.1);
						&:last-child{
							border-bottom: none;
						}
						.food-pic{
							-webkit-box-flex:0;
							flex:0 1 auto;
							width: 1.546667rem;
							height: 1.546667rem;
						}
						.food-content{
							-webkit-box-flex:1;
							flex:1 1 auto;
							margin-left: 0.266667rem;
							.name{
								margin-top: 0.053333rem;
								.fontSize(14px);
								line-height: 0.373333rem;
								color: rgb(7,17,27);
							}
							// 公共样式
							.common{
								.fontSize(10px);
								color: rgb(147,153,159);
								line-height: 0.266667rem;
							}
							.desc{
								.common;
								margin-top: 0.213333rem;
								line-height: 0.32rem;
							}
							.extra{
								.common;
								margin-top: 0.213333rem;

								.num{
									margin-right:0.32rem;
								}
							}
							.price{
								line-height: 0.64rem;
								height: 0.64rem;
								display: -webkit-box;
								display: -webkit-flex;
								display: flex;
								span{
									.fontSize(14px);
									font-weight: 700;
									color: rgb(147,153,159);
									margin-right: 0.213333rem;
								}
								del{
									.common;
									line-height: 0.64rem;
									font-weight: 700;
									margin-right: auto;
								}

							}
						}
					}
				}
			}
		}
	}
</style>