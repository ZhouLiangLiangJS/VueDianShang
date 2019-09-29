<template>
    <div>
        <transition name="login">
            <login v-show="flag"></login>
        </transition>
    </div>
</template>

<script>
    import login from './login.vue'

    export default {
        name: "vip",
        data(){
            return{
                flag:false
            }
        },
        components:{
            login
        },
        mounted(){
            this.loginFlag()
        },
        methods:{
            loginFlag(){
                if (this.$store.state.login){
                    setTimeout(()=>{this.flag=this.$store.state.login},300)
                }
            }
        },
        watch:{
            "$store.state.login"(val){
                this.flag=val;
            }
        }
    }
</script>

<style lang="less" scoped>
    .login-enter,.login-leave{
        top: 100%;
        opacity: 0;
    }
    .login-enter-active,.login-leave-active{
        transition: all 0.3s;
    }
</style>