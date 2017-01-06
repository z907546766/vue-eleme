<template>
	<transition name="slide" enter-active-class="animated slideInRight"  leave-active-class="animated slideOutRight">
		<div class="rating-wrapper" id="ratings">
			<div class="scroll">
				<div class="rating">
					<div class="rating-left">
						<p class="score" v-text="seller.score"></p>
						<p class="ComScore" v-text="">综合评分</p>
						<p class="overtop" v-text="'高于周边商家'+seller.rankRate+'%'"></p>
					</div>
					<div class="rating-right">
						<div class="score-wrapper">
							<span class="title">服务态度</span>
							<star :size="36" :score="seller.serviceScore"></star>
							<span class="score" v-text="seller.serviceScore"></span>
						</div>
						<div class="score-wrapper">
							<span class="title">描述相符</span>
							<star :size="36" :score="seller.foodScore"></star>
							<span class="score" v-text="seller.foodScore"></span>
						</div>
						<div class="score-wrapper">
							<span class="title">送达时间</span>
							<span class="time" v-text="seller.deliveryTime+'分钟'"></span>
						</div>
					</div>
				</div>
				<divider></divider>
				<ratingSelect :ratingType="ratingType" :pageId="pageId" :state="state" @select="nowSelected" @check="nowChecked" :ratings="ratings" :onlyContent="onlyContent"></ratingSelect>
			</div>
		</div>
	</transition>
</template>

<script>
	import iScroll from "../../../static/javascript/iscroll-probe.js"

// 加载组件
import star from "../star/star.vue";
import divider from "../divider/divider.vue";
import ratingSelect from "../ratingSelect/ratingSelect.vue";
import shopcart from "../shopcart/shopcart.vue";
const ratingType={
	all:"全部",
	positive:"满意",
	negative:"不满意"
};
const pageId=2;
const state={
	All:2,
	Positive:0,
	Negative:1
}
const ERR_OK=0;
export default {
	name: 'rating',
	props:["seller"],
	data () {
		return {
			ratings:[],
			ratingType:ratingType,
			pageId:pageId,
					// 选择有内容按钮选中
					onlyContent:true,
					state:state
				};
			},
			created(){
				// 加载数据
				this.feachData();
			},
			watch:{
				// 监控路由
				"$route":"feachData"
			},
			methods:{
				feachData(){
					this.$http.get("http://192.168.0.113:8086/ratings?id="+this.$route.query._id+"").then((data)=>{
    		 // 成功
    		 var json=data.data;
    		 if(json.error==ERR_OK){
    		 	var ratings=json.ratings.ratings;
    		 	this.ratings=ratings;
    		 }
    		 // 加载滚动
    		 if(!this.myScroll){
    		 	this.$nextTick(()=>{
		    				// 滚动
		    				this.scroll();
		    			})
    		 }else{
    		 	this.$nextTick(()=>{
    		 		this.myScroll.refresh()
    		 	})
    		 }
    		},(err)=>{
    			console.log(err);
    		});
				},
				// ratingSelect中触发
				nowSelected(nowSelected){
					this.$nextTick(()=>{
						this.myScroll.refresh();
					})
				},
				// ratingSelect中触发
				nowChecked(nowChecked){
					this.$nextTick(()=>{
						this.myScroll.refresh();
					})
				},
				scroll(){
					this.myScroll=new iScroll("#ratings",{
						tap:true
					})
				}
			},
			components:{
				star,
				divider,
				ratingSelect,
				shopcart
			}
		};
	</script>

	<style lang="less" scoped>
		@import url("../../../static/less/reset.less");
		@import url("../../../static/css/animate.css");
		.slideInRight,.slideOutRight{
			-webkit-animation-duration:.2s;
		}
		.rating-wrapper{
			position: fixed;
			left:0;
			top: 0;
			box-sizing: border-box;
			width: 100%;
			height:100%;
			overflow: hidden;
			z-index:-1;
			background: #fff;
			padding-top: 4.64rem;
			.rating{
				padding:0.48rem;
				display: -webkit-box;
				display:flex;
				.rating-left{
					margin-right: 0.64rem;
					width: 3.666667rem - 0.48rem;
					margin-left: -0.48rem;
					text-align: center;
					border-right: 1px solid rgb(147,153,159);

					.score{
						color: rgb(255,153,0);
						line-height:0.746667rem;
						.fontSize(24px);
					}
					.ComScore{
						margin-top:0.16rem;
						color: rgb(7,17,27);
						line-height:0.32rem;
						.fontSize(12px);
					}
					.overtop{
						margin-top:0.213333rem;
						padding-bottom: 0.16rem;
						color: rgb(147,153,159);
						line-height:0.266667rem;
						.fontSize(10px);
					}
				}
				.rating-right{
					div{
						line-height: 0.48rem;
						display: -webkit-box;
						display: flex;
						&+div{
							margin-top: 0.213333rem;
						}
						span{
							.fontSize(12px);
							&.title{
								margin-right:0.32rem;
								color: rgb(7,17,27);
							}
							&.score{
								margin-left:0.32rem;
								color: rgb(255,153,0);
							}
							&.time{
								color: rgb(147,153,159);
							}
						}
					}
				}
			}
			// 分割条
			.divider{
				margin-left: 0;
			}
			.ratingSelect{
			}
		}

	</style>