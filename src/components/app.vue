<template>
    <div>
        <transition mode="out-in">
            <router-view></router-view>
        </transition>
        <nav class="mui-bar mui-bar-tab" v-if="flag">
            <router-link class="mui-tab-item " to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopping">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/list">
                <span class="mui-icon mui-icon-list"></span>
                <span class="mui-tab-label">订单列表</span>
            </router-link>
            <router-link class="mui-tab-item" to="/vip">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">个人中心</span>
            </router-link>
            <router-link class="mui-tab-item" to="/More">
                <span class="mui-icon mui-icon-more-filled"></span>
                <span class="mui-tab-label">更多</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "app",
        data(){
            return {
                flag:true
            }
        },
        mounted(){
            this.$route.path==='/search'?this.flag=false:this.flag=true;
        },
        watch:{
            "$route.path":function (newData) {
                newData==='/search'?this.flag=false:this.flag=true;
            }
        }
    }
</script>

<style scoped lang="less">
    .mui-bar{
        box-shadow: 0 0 10px 0 hsla(0,6%,58%,.6);
    }
    .v-enter,.v-leave-to{
        opacity: 0;
    }
    .v-enter-active,.v-leave-active{
        transition: all 250ms ease;
    }
</style>