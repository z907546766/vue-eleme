<template>
	<div class="cartcontrol">
		<transition name="translate">
			<section class="decrease" v-show="food.count>0"   @tap.stop.prevent="decrease">
				<transition name="rotate">
					<div  v-show="food.count>0" class="icon-wrapper">
						<i class="icon-remove_circle_outline"></i>
					</div>
				</transition>
			</section>
		</transition>
		<div class="text">
			<span v-show="food.count>0" v-text="food.count"></span>
		</div>
		<div  class="add icon-wrapper"  @tap.stop.prevent="add">
			<i class="icon-add_circle "></i>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'cartcontrol',
		props:["food"],
		data(){
			return{
			}
		},
		methods:{
			add(){
				this.focus=true;
				if(!this.food.count){
					this.$set(this.food,"count",1);
				}else{
					this.food.count++
				}
			},
			decrease(){
				if(this.food.count){
					this.food.count--
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	@import url("../../../static/less/reset.less");
	// 偏移
	.translate-enter-active, .translate-leave-active {
		-webkit-transition: all .25s;
	}
	.translate-enter, .translate-leave-active{
		-webkit-transform:translate3d(0.586667rem,0,0);
		opacity: 0;
	}
	// 旋转
	.rotate-enter-active, .rotate-leave-active {
		-webkit-transition: all .25s;
	}
	.rotate-enter, .rotate-leave-active{
		-webkit-transform:rotate(180deg);
	}

	.cartcontrol{
		height: 100%;
		display: -webkit-box;
		display: flex;
		justify-content:space-between;
		-webkit-box-align:center;
		align-items:center;
		.icon-wrapper{
			i{
				.fontSize(24px);
				color:rgb(0,160,220);
				padding:0.066667rem;
			}
		}
		.text{
			span{
				.fontSize(10px);
				line-height:0.64rem;
				color:rgb(147,153,159);
				display: inline-block;
				width:0.586667rem;
				text-align: center;
				border:none;
			}
		}
	}
</style>