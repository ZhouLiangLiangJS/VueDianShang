import './index.html';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueJsonp from 'vue-jsonp';
Vue.use(VueJsonp);
Vue.use(VueResource);
import app from './components/app.vue'
import router from './router.js';
import './css/index.less';
import { Header,Swipe,SwipeItem } from 'mint-ui';
import './lib/dist/css/mui.min.css';
import './lib/css/icons-extra.css';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name,Header);
Vue.use(VueRouter);
let vm=new Vue({
    el:'#dv',
    render:(c)=>c(app),
    router
});