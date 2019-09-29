<template>
        <div class="login">
            <div class="main">
                <img alt="" src="../json/img/Vuelogo.jpg">
                <label>
                    <input @blur="blurUserName()" @focus="fousUserName()" type="text" v-model="$store.state.userName">
                </label>
                <label>
                    <input @blur="blurUserPassword()" @focus="focusUserPassword()" type="text" v-model="$store.state.userPassword">
                </label>
                <span @click="flag=!flag">免费注册</span>
                <span @click="login">登陆</span>
            </div>
            <transition>
                <register @setFlag="setFlag()" v-show="flag"></register>
            </transition>
        </div>
</template>

<script>
    import register from './register.vue';
    import {Toast} from 'mint-ui';

    export default {
        name: "login",
        data(){
            return{
                flag:false
            }
        },
        methods:{
            al(txt){
                Toast({
                    message: txt,
                    position: 'center',
                    duration: 3000
                })
            },
            fousUserName(){
                if (this.$store.state.userName==='请输入用户名') {
                    this.$store.commit('setUserName','')
                }
            },
            blurUserName(){
                if (this.$store.state.userName==='') {
                    this.$store.commit('setUserName','请输入用户名')
                }
            },
            focusUserPassword(){
                if(this.$store.state.userPassword==='请输入密码'){
                    this.$store.commit('setUserPassword','')
                }
            },
            blurUserPassword(){
                if(this.$store.state.userPassword===''){
                    this.$store.commit('setUserPassword','请输入密码')
                }
            },
            setFlag(){
                this.flag=false
            },
            login(){
                let arr=JSON.parse(localStorage.getItem("user"))||[];
                let userPasswordFlag=false;
                let userNameFlag=false;
                for(let i =0;i<arr.length;i++){
                    if(arr[i].userName===this.$store.state.userName){
                        userNameFlag=true
                    }
                    if(arr[i].userPassword===this.$store.state.userPassword){
                        userPasswordFlag=true
                    }
                }
                if (userPasswordFlag&&userNameFlag){
                    this.al('登陆成功');
                    this.$store.commit('setLogin',false)
                } else {
                    this.al('账号或者密码错误登陆失败')
                }
            }
        },
        components:{
            register
        }
    }
</script>

<style lang="less" scoped>
    .login{
        z-index: 999999999999999;
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: #fff;
        top: 0;
        .main{
            height: 80%;
            width: 90%;
            text-align: center;
            margin: 10% auto;
            background-color: #fff;
            img{
                width: 50%;
            }
            input{
                border:0;
                border-bottom: 1px solid rgb(61,182,129);
                border-radius: 0;
                color: #999999;
                margin-top: 5%;
                font-size: 14px;
            }
            span{
                display: inline-block;
                font-size: 14px;
                background-color: rgb(61,182,129);
                width: 50%;
                height: 40px;
                color: #ffffff;
                border-radius: 20px;
                margin-top: 2%;
                text-align: center;
                line-height: 40px;
            }
        }
    }
    .v-enter,.v-leave{
        transform: translateY(100%);
        opacity: 0;
    }
    .v-enter-active{
        transition: all 1s;
    }
</style>