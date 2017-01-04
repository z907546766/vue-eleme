<template>
	<div class="ratingContent">
		<div class="top">
			<span class="time">{{rating.rateTime | formatD }}</span>
			<span class="username"  v-text="rating.username"></span>
			<a href="" class="img">
				<img :src="rating.avatar" alt="商家" width="100%" height="100%">
			</a>
		</div>
		<div class="rating">
			<span class="icon" :class="{'icon-thumb_up':rating.rateType==0,'icon-thumb_down':rating.rateType==1,'active':rating.rateType==0}"></span>
			<span class="text" v-text="rating.text"></span>
		</div>
	</div>
</template>

<script>
import {formatDate} from "../../common/js/date.js"
	export default {
		name: '',
		props:["rating"],
		filters:{
			formatD(time){
				var date=new Date(time);
				return formatDate(date,"YYYY-MM-DD   HH:mm:ss")
			}
		}

	};
</script>

<style lang="less" scoped>
	@import url("../../../static/less/reset.less");
	.ratingContent{
		.top{
			display: -webkit-box;
			display: flex;
			.fontSize(10px);
			color: rgb(147,153,159);
			line-height: 0.32rem;
			margin-bottom: 0.16rem;
			// 时间
			.time{
				margin-right: auto;
				// 保留js中时间输出的空格，js默认只输出一个空格
				white-space:pre;
			}
			.img{
				height: 0.32rem;
				width: 0.32rem;
				margin-left: 0.16rem;
				img{
					border-radius:0.16rem;
				}
			}
		}
		.rating{
			.icon{
				.fontSize(10px);
				color: rgb(147,153,159);
				line-height:0.64rem;
				&.active{
					color:rgba(0,160,220,1)
				}
			}
			.text{
				.fontSize(12px);
				margin-left: 0.106667rem;
				color: rgb(7,17,27);
				line-height:0.426667rem;
			}
		}
	}

</style>