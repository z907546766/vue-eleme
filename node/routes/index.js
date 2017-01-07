const router = require('koa-router')();
const Seller = require('../schemas/seller.js');
const Goods = require('../schemas/goods.js');
const Ratings = require('../schemas/ratings.js');
const Category = require('../schemas/category.js');

router.get('/home', async(ctx, next) => {
    let categoryData;
    // 获取分类
    await Category.find({}).exec().then((category) => {
        categoryData = category;
    }, (err) => {
        handleError(err);
    });
    // 获取商家信息
    await Seller.findOne({}).exec().then((seller) => {
        ctx.body = {
            seller: seller,
            category: categoryData,
            error: 0
        };
    }, (err) => {
        handleError(err);
    });
    next();
})
router.get('/goods', async(ctx, next) => {
    let _id = ctx.request.query.id;
    await Goods.findById({ _id: _id }).exec().then((goods) => {
        ctx.body = {
            goods: goods,
            error: 0
        }
    }, (err) => {
        handleError(err);
    })
    next()
})
router.get('/ratings', async(ctx, next) => {
    let _id = ctx.request.query.id;
    await Ratings.findById({ _id: _id }).exec()
        .then((ratings) => {
            ctx.body = {
                ratings: ratings,
                error: 0
            }
        }, (err) => {
            handleError(err);
        })
    next()
})
router.get("/search", async(ctx, next) => {
    let data = ctx.request.query;
    let name = data.name;
    let page = data.page;
    let now = page * 4;
    let re = new RegExp(`(${name})`, 'i');
    let resultArr = [];
    let status;
    // 模拟初略查询
    await Seller.find({}).limit(4).skip(now).exec().then((seller) => {
        // 数据加载完毕
        if (seller.length == 0) {
            status = 2;
        } else {
            for (let i = 0, len = seller.length; i < len; i++) {
                let result = seller[i].sellers
                for (let j = 0; j < result.length; j++) {
                    if (re.test(result[j].name)) {
                        // 返回结果数据
                        status = 1;
                        resultArr.push(result[j]);
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
    }, (err) => {
        handleError(err);
    });
    next();
})
module.exports = router;
