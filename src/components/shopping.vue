<template>
    <div>
        <div class="shopping">
            <input type="text" v-model="$store.state.count">
            <h1>{{this.$store.state.count}}</h1>
            <cai></cai>
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
                loginFlag:false
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

<style scoped lang="less">
    .login-enter,.login-leave{
        top: 100%;
        opacity: 0;
    }
    .login-enter-active,.login-leave-active{
        transition: all 0.3s;
    }
</style>