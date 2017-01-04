import Goods from "./components/goods/goods.vue"
import Rating from "./components/rating/ratings.vue"
import Login from "./components/login/login.vue"
import Sales from "./components/sales/sales.vue"
import Home from "./components/home/home.vue"
import Search from "./components/search/search.vue"
export default {
    routes: [
    {
        path: "/",
        component:Home
    },
    {
        path: "/login",
        component: Login
    },
     {
        path: "/search",
        component: Search
    },
    {
        path: "/sales",
        component:Sales,
        children:[
        {
            path:"/sales/goods",
            component: Goods
        },{
            path: "/sales/rating",
            component: Rating
        }]

    }]
}
