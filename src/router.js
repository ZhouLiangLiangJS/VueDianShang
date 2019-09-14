import VueRouter from 'vue-router';
import home from './components/home.vue'
import vip from './components/vip.vue'
import shopping from './components/shopping.vue'
import search from './components/search.vue'
import more from './components/more.vue'
import list from './components/list.vue'
let router=new VueRouter({
    routes:[
        {path:'/home',component:home},
        {path:'/',redirect:'/home'},
        {path:'/vip',component:vip},
        {path:'/shopping',component:shopping},
        {path:'/list',component:list},
        {path:'/more',component:more},
        {path:'/search',component:search}
    ],
    linkActiveClass:'mui-active'
});
export default router