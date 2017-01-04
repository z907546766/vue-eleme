<template>
	<div class="ratingSelect">
		<!-- 切换 -->
		<div class="ratingType-wrapper">
			<div class="ratingType">
				<div :class="{active:nowSelected==2}" @tap="select(2,$event)">
					<span v-text="ratingType.all"></span>
					<i v-text="ratings.length"></i>
				</div>
				<div :class="{active:nowSelected==0}" @tap="select(0,$event)">
					<span v-text="ratingType.positive"></span>
					<i v-text="positive.length"></i>
				</div>
				<div :class="{active:nowSelected==1}" @tap="select(1,$event)">
					<span v-text="ratingType.negative"></span>
					<i v-text="negative.length"></i>
				</div>
			</div>
		</div>
		<!-- 只看内容 -->
		<p class="swich">
			<span class="icon icon-check_circle" :class="{on:nowChecked}" @tap="check($event)"></span>
			<span class="text">只看有内容的评价</span>
		</p>
		<ul class="content" v-show="ratings||ratings.length>0">
			<li v-for="rating in ratings" v-show="filterContent(rating.text,rating.rateType)" >
				<ratingContent1  :rating="rating" v-show="pageId===1"></ratingContent1>
				<ratingContent2  :rating="rating"  v-show="pageId===2"></ratingContent2 >
				</li>
			</ul>
			<div class="no-text" v-show="ratings.length===0||!ratings">暂无评价</div>
		</div>
	</template>

	<script>
		import ratingContent1 from "../ratingContent1/ratingContent1.vue"
		import ratingContent2 from "../ratingContent2/ratingContent2.vue"

		export default {
			name: 'ratingSelect',
			props:{
				ratings:{
					type:Array,
					default(){
						return [];
					}
				},
				ratingType:{
					type:Object,
					default(){
						return {
							all:"全部",
							positive:"满意",
							negative:"不满意"
						};
					}
				},
				pageId:{
					type:Number
				},
				onlyContent:{
					type:Boolean
				},
				state:{
					type:Object
				}
			},
			data(){
				return{
					nowChecked:this.onlyContent,
					nowSelected:this.state.All
				}
			},
			methods:{
			// 初始化(父组件调用)
			_init(){
				this.nowChecked=this.onlyContent;
				this.nowSelected=this.state.All;
			},
			// 切换
			select(type,event){
				this.nowSelected=type;
				this.$emit("select",this.nowSelected)

			},
			// 查看全部内容
			check(event){
				this.nowChecked=!this.nowChecked;
				this.$emit("check",this.nowChecked)
			},

			// 评论筛选
			filterContent(text,rateType){
				 // 全部
				 if(this.nowSelected==this.state.All){
				 	// 选中要有内容或者不选中为 真
				 	if(this.nowChecked&&text||!this.nowChecked){
				 		return true;
				 	}
				 }
				 // 选中对应的,加载对应的类型留言
				 if(this.nowSelected==rateType){
				 	if(this.nowChecked&&text||!this.nowChecked){
				 		return true;
				 	}
				 }
				}
			},
			computed:{
				positive(){
				// 筛选
				let arr=this.ratings.filter((rating)=>{
					return rating.rateType===this.state.Positive;
				})

				return arr;
			},
			negative(){
				let arr=this.ratings.filter((rating)=>{
					return rating.rateType===this.state.Negative;
				})
				return arr;
			}
		},
		components:{
			ratingContent1,
			ratingContent2
		}
	};
</script>

<style lang="less" scoped>
	@import url("../../../static/less/reset.less");
	.ratingSelect{
		.ratingType-wrapper{
			padding:0 0.48rem;
			.ratingType{
				padding: 0.48rem 0;
				display: -webkit-box;
				display: flex;
				border-bottom: 1px solid rgba(7,17,27,.1);
				div{
					color: rgb(77,85,93);
					border-radius: 0.026667rem;
					.fontSize(12px);
					display: -webkit-box;
					display: flex;
					padding: 0.213333rem 0.32rem;
					line-height: 0.426667rem;

					&.active{
						color: #fff;
					}
					&:nth-of-type(1){
						background:rgba(0,160,220,.2);
						border-radius: 0.053333rem;
						&.active{
							background:rgba(0,160,220,1)
						}
					}
					&:nth-of-type(2){
						background:rgba(0,160,220,.2);
						&.active{
							background:rgba(0,160,220,1)
						}
					}
					&:nth-of-type(3){
						background:rgba(77,85,93,.2);
						&.active{
							background:rgba(77,85,93,1)
						}
					}
					& + div{
						margin-left: 0.213333rem;
					}
					i{
						.fontSize(8px);
						font-style: normal;
						margin-left:0.133333rem;
					}
				}
			}
		}

		.swich{
			width:100%;
			line-height: 0.64rem;
			color:rgb(147,153,159);
			border-bottom: 2px solid rgba(7,17,27,.1);
			padding:0.32rem 0;
			display: -webkit-box;
			display: flex;
			-webkit-box-align:center;
			align-items:center;
			.icon{
				margin-left: 0.48rem;
				.fontSize(24px);
				&.on{
					color:#00c850;
				}
			}
			.text{
				margin-left:0.106667rem;
				.fontSize(12px);
			}
		}
		.content{
			padding:0 0.48rem;
			li{
				padding: 0.426667rem 0;
				border-bottom: 1px solid rgba(147,153,159,.1);
			}
		}
		.no-text{
			width: 100%;
			text-align: center;
			padding: 0.266667rem;
			.fontSize(14px);
			color: rgb(77,85,93);
		}
	}
</style>