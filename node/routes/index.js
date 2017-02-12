/**
 *本地数据
 */
const router = require('koa-router')();
const sellers=require("../data/seller.js")
const goods=require("../data/goods.js")
const ratings=require("../data/ratings.js")
const category=require("../data/category.js")

router.get('/home', async(ctx, next) => {
	ctx.body={
		sellers:sellers.data[0],
		category:category.data,
		error: 0
	}
	await next()
})
router.get('/goods', async(ctx, next) => {
	let _id=ctx.request.query.id;
	for (let i = 0,len=goods.data.length; i <len ; i++) {
		let _this=goods.data[i];
		if(_this._id==_id){
			ctx.body={
				goods:_this,
				error: 0
			}
		}
	}
	await next()
})
router.get('/ratings', async(ctx, next) => {
	let _id=ctx.request.query.id;
	for (let i = 0,len=ratings.data.length; i <len ; i++) {
		let _this=ratings.data[i];
		if(_this._id==_id){
			ctx.body={
				ratings:_this,
				error: 0
			}
		}
	}
	await next()
})
router.get('/search', async(ctx, next) => {
	// 获取到前台数据
	let data=ctx.request.query;
	let name=data.name;
	let page=Number(data.page);
	// 本地数据
	let seller=sellers.data;
	// 定义查询规则
	let re = new RegExp(`(${name})`, 'i');
	let start=page * 4;
	let end = (page+1) * 4;
	let resultArr = [];
	let status;
	// 超过条数
	if(end>seller.length){
		end=seller.length;
	}
	if(start>seller.length){
		start=seller.length;
	}
	if(start==end){
		status = 2;
	}else{
		for (let i = start; i <end ; i++) {
			let _this=seller[i].sellers;
			for (let j = 0,len=_this.length; j <len; j++) {
				if(re.test(_this[j].name)){
				 // 返回结果数据
				 status = 1;
				 resultArr.push(_this[j]);
				}
			}
		}
	// 未找到符合数据
	if (resultArr.length == 0) {
		status = 0;
	}
}
ctx.body = {
	data: resultArr,
	status: status
}
await next()
})
module.exports=router;
