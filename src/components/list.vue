<template>
    <div>
        <div class="shopping">
            <nav>
                <span :class="{'active':active==='全部'}" @click='active="全部"'>全部</span>
                <span :class="{'active':active==='待付款'}" @click='active="待付款"'>待付款</span>
                <span :class="{'active':active==='待发货'}" @click='active="待发货"'>待发货</span>
                <span :class="{'active':active==='待收货'}" @click='active="待收货"'>待收货</span>
                <span :class="{'active':active==='待评价'}" @click='active="待评价"'>待评价</span>
            </nav>
            <div class="dingDan">
                <img alt="无法显示" src="../json/img/timg.jpg">
                <p>您还没有订单!!</p>
                <router-link tag="button" to="/home">去逛逛哟！</router-link>
            </div>
        </div>
        <transition name="login">
            <login v-show="loginFlag"></login>
        </transition>
    </div>
</template>

<script>
    import cai from './caiNiXiHuan.vue'
    import login from './login.vue'

    export default {
        name: "shopping",
        data(){
            return{
                loginFlag:false,
                active:'全部'
            }
        },
        mounted(){
            this.loginShow();
        },
        methods:{
            loginShow(){
                if (this.$store.state.login){
                    setTimeout(()=>{
                        this.loginFlag=true
                    },300)
                }
            }
        },
        components:{
            cai,
            login
        },
        watch:{
            '$store.state.login'(val){
                this.loginFlag=val;
            }
        }
    }
</script>

<style lang="less" scoped>
    nav{
        width: 100%;
        background-color: #fff;
        height: 30px;
        position: fixed;
        top: 0;
        box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, 0.6);
        z-index: 999;
        span{
            float: left;
            width: 20%;
            line-height: 30px;
            font-size: 12px;
            text-align: center;
            border-bottom: 1px solid #ffffff;
        }
    }
    .dingDan{
        position: fixed;
        height: 100%;
        top: 30px;
        width: 100%;
        background-color: rgb(246,246,246);
        text-align: center;
        padding-top: 30px;
        img{
            width: 50%;
        }
        p{
            margin: 30px;
            font-size: 20px;
        }
        button{
            width: 80%;
            font-size: 20px;
            background-color: #007aff;
            border-radius: 20px;
            border: 0;
            color: #ffffff;
        }
    }
    .active{
        color: #007aff;;
        border-bottom:1px solid #007aff;
    }
    .login-enter,.login-leave{
        top: 100%;
        opacity: 0;
    }
    .login-enter-active,.login-leave-active{
        transition: all 0.3s;
    }
</style>