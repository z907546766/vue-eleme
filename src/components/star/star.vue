<template>
	<ul :class="scoreType" class="star">
		<li v-for="itemclass in itemclasses" :class="itemclass" ></li>
	</ul>
</template>

<script>
		const staron="on";
		const starhalf="half";
		const staroff="off";
		const starcount=5;
	export default {
		name: 'star',
		props:["size","score"],
		computed:{
			scoreType(){
				return "star-"+this.size;
			},
			itemclasses(){
				// 加载评分的class
				let result=[];
				let score=Math.floor(this.score *2)/2;
				let onLen=Math.floor(score);
				// 将className添加到数组
				for(let i=0;i<onLen;i++){
					result.push(staron);
				};
				if(onLen==0){
					result.push(staroff);
				};
				if(score!=onLen){
					result.push(starhalf);
				};
				// 得分小于5
				if( result.length< starcount ){
					 let dis=starcount-result.length;
					for (let i = 0; i < dis; i++) {
						result.push(staroff);
					}
				}
				return result;
			}
		}
	};
</script>

<style lang="less" scoped>
	@import url("../../../static/less/reset.less");
	.star{
		display: flex;
	}
	.star-24{
		li{
			height:0.32rem;
			width:0.32rem ;
			&+li{
				margin-left:0.04rem;
			}
			&.on{
				.bgImg("star/img/star24_on");
				background-size: 0.32rem 0.32rem;
			}
			&.half{
				.bgImg("star/img/star24_half");
				background-size: 0.32rem 0.32rem;
			}
			&.off{
				.bgImg("star/img/star24_off");
				background-size: 0.32rem 0.32rem;
			}
		}

	}
	.star-36{
		li{
			height:0.48rem;
			width: 0.48rem;
			&+li{
				margin-left:0.133333rem;
			}
			&.on{
				.bgImg("star/img/star36_on");
				background-size: 0.48rem 0.48rem;
			}
			&.half{
				.bgImg("star/img/star36_half");
				background-size: 0.48rem 0.48rem;
			}
			&.off{
				.bgImg("star/img/star36_off");
				background-size: 0.48rem 0.48rem;
			}
		}
	}
	.star-48{
		li{
			height:0.64rem;
			width:0.64rem;
			&+li{
				margin-left: 0.533333rem;
			}
			&.on{
				.bgImg("star/img/star48_on");
				background-size:0.64rem 0.64rem;
			}
			&.half{
				.bgImg("star/img/star48_half");
				background-size:0.64rem 0.64rem;
			}
			&.off{
				.bgImg("star/img/star48_off");
				background-size:0.64rem 0.64rem;
			}

		}
	}


</style>