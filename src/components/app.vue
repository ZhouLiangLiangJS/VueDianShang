<template>
    <div>
        <transition>
            <router-view class="MoKuai"></router-view>
        </transition>
            <nav class="mui-bar mui-bar-tab" v-show="flag">
                <router-link class="mui-tab-item " to="/home">
                    <span class="mui-icon mui-icon-home"></span>
                    <span class="mui-tab-label">首页</span>
                </router-link>
                <router-link class="mui-tab-item" to="/shopping">
                    <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{$store.state.num}}</span></span>
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
            },
            "$store.state.login":function(val){
                if(!val){
                    let arr=JSON.parse(localStorage.getItem('user'));
                    for (let i=0;i<arr.length;i++){
                        if(arr[i].userName===this.$store.state.userName){
                            this.$store.commit('setNum',arr[i].shopping.length);
                            console.log(arr[i].shopping.length)
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .mui-bar{
        box-shadow: 0 0 10px 0 hsla(0,6%,58%,.6);
        position: fixed !important;
        bottom: 0 !important;
        top: auto !important;
        z-index: 9999999;
    }
    .MoKuai{
        margin-bottom: 51px;
    }
    .v-enter{
        opacity: 0;
        transform: translateX(100%);
    }
    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }
    .v-enter-active{
        top: 0;
        position: fixed;
    }
    .v-enter-active,.v-leave-active{
        width: 100%;
        transition: transform .3s ease,opacity .3s ease;
    }
</style>