import VueRouter from 'vue-router';
import home from './components/home.vue'
import vip from './components/vip.vue'
import shopping from './components/shopping.vue'
import search from './components/search.vue'
import list from './components/list.vue'
import news from './components/news.vue'
import newsListMoBan from './components/newsListMoBan.vue'
let router=new VueRouter({
    routes:[
        {path:'/home',component:home},
        {path:'/',redirect:'/home'},
        {path:'/vip',component:vip},
        {path:'/shopping',component:shopping},
        {path:'/list',component:list},
        {path:'/search',component:search},
        {path:'/news',component:news,redirect:'/news/hot',
            children:[
                {path:'hot',component:newsListMoBan},
                {path:'toutiao',component:newsListMoBan},
                {path:'motion',component:newsListMoBan},
                {path:'yule',component:newsListMoBan}
            ]
        },

    ],
    linkActiveClass:'mui-active'
});
export default router