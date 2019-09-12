import './index.html';
import Vue from 'vue';
import VueRouter from 'vue-router';
import app from './components/app.vue'
import router from './router.js';
import './css/index.less';
import { Header } from 'mint-ui';
import './lib/dist/css/mui.min.css'
Vue.component(Header.name,Header);
Vue.use(VueRouter);

let vm=new Vue({
    el:'#dv',
    render:(c)=>c(app),
    router
});