 <template>
     <transition name="slide" enter-active-class="animated sildeInRight"  leave-active-class="animated sildeOutRight">
        <div class="sales">
            <v-header :seller="selectedSeller" @clearlocalS="clearlocalS"></v-header>
            <div class="tab">
                <div class="tab-item">
                    <router-link :to="{path:'/sales/goods',query:{_id:selectedSeller._id}}" class="tab-item-list">
                        <span>商品</span>
                    </router-link>
                </div>
                <div class="tab-item">
                    <router-link  :to="{path:'/sales/rating',query:{_id:selectedSeller._id} }"  class="tab-item-list">
                        <span v-text="'评价 ('+score+'分)'"></span>
                    </router-link>
                </div>
            </div>
            <router-view :seller="selectedSeller" ref="goods" :score="score"></router-view>
        </div>
    </transition>
</template>

<script>
    import header from "../header/header.vue"
    const ERR_OK=0;
    export default {
        name: 'sales',
        props:["selectSeller"],
        data() {
            return {
                selectedSeller:this.selectSeller
            }
        },
        created(){
            // // 本地储存
            if(window.localStorage){
                let val=window.localStorage.getItem("name_"+this.$route.query._id+"")
                if(val){
                    this.selectedSeller=JSON.parse(val);
                }else{
                   window.localStorage.setItem("name_"+this.$route.query._id+"",JSON.stringify(this.selectSeller))
               }
           }
       },
       computed:{
        score(){
            let num=(this.selectedSeller.serviceScore+this.selectedSeller.foodScore)/2;
            let score=num.toFixed(1);
            return score;
        }
    },
    methods:{
        clearlocalS(){
            window.localStorage.clear();
        }
    },
    components: {
     "v-header":header
 }
}
</script>

<style media="screen" lang="less" scoped>
    @import url("../../../static/less/reset.less");
    @import url("../../../static/css/animate.css");
    .sildeInRight,.sildeOutRight{
        -webkit-animation-duration:.3s;
    }

    .sales{
     position: fixed;
     left: 0;
     top:0;
     width: 100%;
     height: 100%;
     z-index:22;
     .tab {
        position: relative;
        z-index:2;
        display: -webkit-box;
        display: flex;
        height: 1.066667rem;
        width: 100%;
        border-bottom: 1px solid rgba(7,17,27,.1);
        background: #fff;
        .tab-item {
            -webkit-box-flex: 1;
            -moz-box-flex: 1;
            -ms-flex: 1;
            flex: 1 1 auto;
            height: 100%;
            line-height: 1.066667rem;
            .tab-item-list {
                display: block;
                text-align: center;
                .fontSize(14px);
                color: rgba(77, 85, 93, 1);
                &:hover{
                    text-decoration: none;
                }
                &.router-link-active {
                    span{
                        color: rgba(240, 20, 20, 1);
                        border-bottom: 2px solid  rgba(240, 20, 20, 1);
                    }
                }
            }
        }
    }

}

</style>
