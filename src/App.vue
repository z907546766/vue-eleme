<template>
	<section class="home-wrapper" id="homeWrapper" >
		<router-view @getSellersData="getSellersData" @getSelectData="getSelectData" :selectSeller="selectData" :_id="sellersData._id"></router-view>
	</section>
</template>

<script>
	export default {

		name: 'App',

		data () {
			return {
				sellersData:"",
				selectData:""
			};
		},
    	methods:{
    		getSellersData(msg){
    			this.sellersData=msg;
    		},
    		getSelectData(msg){
    			this.selectData=msg;
    		}
    	}
    };
</script>

<style lang="less" scoped>
	.home-wrapper{
		position: relative;
		height:100%;
		width: 100%;
		overflow:hidden;
	}
</style>