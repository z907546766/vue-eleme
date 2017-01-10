<template>
	<section class="ratingContent">
		<div class="top">
			<div class="pic">
				<img :src="rating.avatar" alt="商家" width="100%" height="100%">
			</div>
			<div class="info">
				<p>
					<span class="username" v-text="rating.username"></span>
					<span class="time">{{ rating.rateTime | formatD }}</span>
				</p>
				<p>
					<my-star :size="24" :score="rating.score"></my-star>
					<span class="catchTime" v-text="rating.deliveryTime+'分钟送达'" v-show="rating.deliveryTime"></span>
				</p>
			</div>
		</div>
		<div class="rating">
			<p class="text" v-text="rating.text"></p>
			<p>
				<span class="icon" :class="{'icon-thumb_up':rating.rateType==0,'icon-thumb_down':rating.rateType==1,'active':rating.rateType==0}"></span>
				<span v-for="item in rating.recommend"  class="tag" v-text="item" v-show="rating.recommend&&rating.recommend.length>0"></span>

			</p>
		</div>
	</section>
</template>

<script>
	import {formatDate} from "../../common/js/date.js"
// 加载组件
import star from "../star/star.vue";
export default {
	name: '',
	props:["rating"],
	filters:{
		formatD(time){
			var date=new Date(time);
			return formatDate(date,"YYYY-MM-DD    HH:mm:ss")
		}
	},
	components:{
		"my-star":star
	}

};
</script>

<style lang="less" scoped>
	@import url("../../../static/less/reset.less");
	.ratingContent{
		.top{
			display: -webkit-box;
			display: flex;
			.pic{
				width:0.746667rem;
				height: 0.746667rem;
				margin-right: 0.32rem;
				img{
					border-radius: 50%;
				}
			}
			.info{
				-webkit-box-flex:center;
				flex:1 1 auto;
				p{
					display: -webkit-box;
					display: flex;
					white-space: pre;
					color: rgba(147,153,159,1);
					font-weight: 200;
					line-height: 0.32rem;
					.fontSize(10px);
					.username{
						color: rgb(7,17,27);
						margin-right: auto;
					}
					&:last-child{
						margin:0.24rem 0 0.08rem;

						.catchTime{
							margin-left:0.16rem;
							line-height: 0.32rem;
						}
					}

				}
			}
		}
		.rating{
			margin-left: 0.746667rem+0.32rem;
			.text{
				.fontSize(12px);
				color: rgb(7,17,27);
				line-height:0.48rem;
			}
			.icon{
				.fontSize(12px);
				line-height: 0.426667rem;
				&.active{
					color: rgba(0,160,220,1);
				}
			}
			&:last-child{
				font-size: 0;
				.tag{
					display: inline-block;
					.fontSize(9px);
					margin-left: 0.213333rem;
					color: rgba(147,153,159,1);
					line-height: 0.426667rem;
					border:1px solid rgba(7,17,27,.1);
					background:#fff;
					padding: 0 0.16rem;
				}
			}
		}
	}
</style>