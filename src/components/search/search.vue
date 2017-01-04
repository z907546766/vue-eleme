<template>
	<div class="search-wrapper" id="searchWrapper">
		<div class="scroll">
			<navbar></navbar>
			<form action="" class="search-form">
				<div class="search">
					<input type="text" value="" placeholder="请输入商家或美食名称" class="search-input" v-model="val" @keyup="showHistoryPanel($event)">
					<input type="button" value="搜索" class="search-btn" @touchstart="searchResult" >
				</div>
			</form>
			<div class="search-result">
				<!-- 搜索失败 -->
				<p class="search-err"  v-show="searchData.length==0&&!showNow">
					搜索不到[
					<a href="" v-text="errorVal" class="searchVal"></a>
					]的信息
				</p>
				<!-- 搜索成功 -->
				<div class="search-success" v-show="searchData.length>0&&!showNow">
					<h2 class="title">商家</h2>
					<ul class="search-list">
						<li v-for="item in searchData">
							<div class="sellerInfo">
								<div class="sellerInfo-pic">
									<img :src="item.avatar" alt="商家" height="100%" width="100%">
								</div>
								<div class="sellerInfo-desc">
									<h4 class="name">{{item.name}}</h4>
									<div>
										<star :size="24" :score="item.score"></star>
										<span>({{item.ratingCount}})</span>
										<span>月售{{item.sellCount}}单</span>
									</div>
									<div>
										<span>￥{{item.minPrice}}起送</span>
										<span>/ {{item.deliveryTime}}分钟到达</span>
									</div>
								</div>
							</div>
							<h3 class="sellerName">
								<span>
									<img :src="item.avatar" alt="商家" height="100%" width="100%">
								</span>
								<span>{{item.name}}</span>
							</h3>
						</li>
					</ul>
				</div>
				<!-- 搜索历史 -->
				<div class="search-history" v-show="showNow&&historyData.length>0">
					<h2>搜索历史</h2>
					<ul class="search-list">
						<li  v-for="(item,index) in historyData" @touchstart.prevent.stop="searchAgain(index)">
							<span v-text="item"></span>
							<span class="icon-close" @touchstart.prevent.stop="deleteData(index)"></span>
						</li>
					</ul>
					<p @touchstart="empty">清空历史记录</p>
				</div>
			</div>
			<p class="loadMore" v-show="showMore">{{loadingText}}</p>
		</div>
	</div>
</template>

<script>
	import iScroll from "../../../static/javascript/iscroll-probe.js"
	import navbar from "../../components/navbar/navbar.vue"
	import star from "../../components/star/star.vue"
	export default {
		name: 'search',

		data () {
			return {
				val:'',
				errorVal:"",
				searchData:[],
				showNow:true,
				// 储存历史数据
				historyData:[],
				firstLoading:true,
				showMore:false,
				page:0,
				loadingText:"加载中...",
				status:0
			};
		},
		created(){
			// 存在,初始化页面,本地存储的值为逗号分隔的字符串,split(",")分割成数组
			if(window.localStorage.getItem("val")){
				this.historyData=window.localStorage.getItem("val").split(",");
			}
		},
		methods:{
			sendHttp(){
				if(!this.val){
					return;
				};
				// 加载更多不删除前面加载的内容,否则,反之
				if(this.firstLoading){
					// 隐藏历史记录
					this.showNow=false;
					this.searchData=[];
				}
				// 发送请求
				this.$http.get("http://localhost:8086/search?name="+this.val+"&page="+this.page+"").then((data)=>{
					let result=data.data;
					// 搜索到数据成功
					if(result.status==1){
						for (let i = 0,len=result.data.length; i < len; i++) {
							this.searchData.push(result.data[i])
						};
						if(this.firstLoading){
							this.$nextTick(()=>{
								this.scroll();
								this.firstLoading=false;
							})
						}
					//搜索到数据末尾
				}else if(result.status==2){
					this.status=result.status;
					// 搜索数据失败
				}else{
					this.errorVal=this.val;
				}
			},(err)=>{
			})
			},
			searchResult(){
				if(this.val==""){
					return;
				};
				if(this.myScroll){
					this.myScroll.destroy();
				}
				// 点击搜索按钮就初始化
				this.page=0;
				this.firstLoading=true;
				this.sendHttp();
				// 搜索内容已经搜索过,不在添加在搜索历史
				for (let i = 0,len=this.historyData.length; i <len; i++) {
					if(this.historyData[i]==this.val){
						return;
					}
				}
				// 储存数据
				this.historyData.unshift(this.val);
				// 长度大于5，扔出最后一个
				if(this.historyData.length>5){
					this.historyData.pop();
				}
				if(window.localStorage){
					window.localStorage.setItem("val",this.historyData);
				}
			},
			// 点击历史面板再次搜索
			searchAgain(index){
				if(this.myScroll){
					this.myScroll.destroy();
				}
				this.val=this.historyData[index];
				this.sendHttp();
			},
			// 清空
			empty(){
				if(this.myScroll){
					this.myScroll.destroy();
				}
				this.historyData=[];
				window.localStorage.clear();
			},
			deleteData(index){
				// 删除数组中index元素
				this.historyData.splice(index,1);
				if(window.localStorage){
					// 清空本地储存
					window.localStorage.clear();
					// 重新设置本地储存
					window.localStorage.setItem("val",this.historyData);
				}
			},
	  		// 按键为Backspace并且数据为空,显示历史面板
	  		showHistoryPanel(event){
	  			if(event.keyCode==8&&this.val==""){
	  				this.showNow=true;
	  				if(this.myScroll){
	  					this.myScroll.destroy();
	  				}
	  			}
	  		},
	  		scroll(){
	  			this.myScroll=new iScroll("#searchWrapper",{
	  				tap:true,
	  				scrollY:true,
	  				scrollX:false,
	  				scrollbars:true,
	  				fadeScrollbars:true,
	  				interactiveScrollbars:true,
	  				shrinkScrollbars:"scale",
	  				probeType:3
	  			});
	  			this.myScroll.on("scroll",()=>{
	  				let _this=this.myScroll;
	  				if(_this.maxScrollY-_this.y>0&&_this.maxScrollY-_this.y<40){
	  					this.showMore=true;
	  					this.loadingText="正在加载中...";
	  				}
	  				if(this.status==2){
	  					this.loadingText="没有更多内容啦";
	  				}
	  				if(_this.maxScrollY-_this.y>40){
	  					if(this.firstLoading){
	  						this.page++;
	  						this.firstLoading=false;
	  						this.sendHttp();
	  					}
	  				}
	  			});
	  			this.myScroll.on("scrollEnd",()=>{
	  				if(!this.firstLoading){
	  					this.$nextTick(()=>{
	  						this.showMore=false;
	  						this.myScroll.refresh();
	  						this.firstLoading=true;
	  					})
	  				}
	  			})
	  		}
	  	},
	  	components:{
	  		navbar,
	  		star
	  	}
	  };
	</script>

	<style lang="less" scoped>
		@import url("../../../static/less/reset.less");
		.search-wrapper{
			height: 100%;
			width: 100%;
			background-color: rgb(242, 242, 242);
		}
		.search-form{
			padding: 0.293333rem;
			background-color: #fff;
			.search{
				display: flex;
				.fontSize(16px);
				.search-input{
					flex:1 1 auto;
					height: 1.066667rem;
					padding:2px 2px 2px 16px;
					background-color: rgb(242, 242, 242);
					border-radius: 0.106667rem;
					border: 1px solid rgb(221, 221, 221);
					color: rgb(0, 0, 0);
					&::-webkit-input-placeholder{
						.fontSize(16px);
						color: #999;
					}

				}
				.search-btn{
					border: none;
					margin-left:0.266667rem;
					padding: 0.293333rem 0.64rem;
					background-color:rgb(49, 153, 232);
					border-radius: 0.106667rem;
					color: #fff;
				}
			}
		}
		.search-success{
			.title{
				width: 100%;
				box-sizing: border-box;
				padding-left: 0.4rem;
				margin: 0.4rem 0 0.213333rem 0 ;
				.fontSize(16px);
				color: rgb(102, 102, 102);
			}
			.search-list{
				li{
					border-bottom: 1px solid rgb(221, 221, 221);
					background-color: #fff;
					.sellerInfo{
						display: flex;
						padding: 0.266667rem;
						border-bottom: 1px solid rgb(221, 221, 221);
						.sellerInfo-pic{
							height:1.066667rem;
						}
						.sellerInfo-desc{
							margin-left: 0.266667rem;
							h4{
								.fontSize(14px);
								color:rgb(51, 51, 51);
							}
							&>div:nth-of-type(1){
								display: flex;
								color: rgb(102, 102, 102);
								.fontSize(13px);
								align-items:center;
								line-height: 0.533333rem;
								&>span:nth-of-type(1){
									margin-right: 0.266667rem;
								}
							}
							&>div:nth-of-type(2){
								.fontSize(16px);
								line-height: 0.533333rem;
								&>span:nth-of-type(1){
									color: rgb(255, 102, 0);
								}
								&>span:nth-of-type(2){
									color: rgb(51, 51, 51);
								}
							}

						}
					}
					.sellerName{
						display: flex;
						padding: 0.4rem;
						span:first-child{
							height:0.533333rem;
							width: 0.533333rem;
							margin-right: 0.133333rem;
						}
						span:last-child{
							color:rgb(51, 51, 51);
							.fontSize(13px);
						}
					}
				}
			}
		}
		.search-err{
			width: 100%;
			margin-top: 1.866667rem;
			text-align: center;
			color:rgb(51, 51, 51);
			.fontSize(16px);
			.searchVal{
				color: rgb(49, 153, 232);
			}
		}
		.search-history{
			h2{
				padding-left: 0.293333rem;
				width: 100%;
				box-sizing: border-box;
				color: rgb(102, 102, 102);
				margin: 0.4rem 0 0.213333rem 0;
				.fontSize(16px);
			}
			ul{
				li{
					display: flex;
					min-height: 1.173333rem;
					height: auto;
					padding:0.266667rem 0.293333rem;
					background-color: #fff;
					align-items:center;
					border-bottom:1px solid rgb(221, 221, 221);
					color: rgb(51,51,51);
					box-sizing: border-box;
					.fontSize(16px);
					span:first-child{
						width: 9.066667rem;
						line-height:0.64rem;
					}
					span:last-child{
						margin-left: auto;
						padding: 0.133333rem;
					}
				}
			}
			p{
				.fontSize(16px);
				width: 100%;
				text-align: center;
				line-height:1.173333rem;
				background-color: #fff;
				color: rgb(49, 153, 232);
			}
		}
		.loadMore{
			position: absolute;
			bottom: 0;
			width: 100%;
			padding: 0.266667rem 0;
			height:0.533333rem;
			line-height: 0.533333rem;
			background-color: rgb(242, 242, 242);
			text-align: center;
			.fontSize(14px);
			color: #999;
		}
	</style>