<template>
    <div>
        <div class="header">
            <img alt="" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3583433020,118316633&fm=26&gp=0.jpg">
            <p>昵称：{{userName}}</p>
            <p>用户名：{{niCheng}}</p>
        </div>
        <div class="main">
            <router-link class="main_div" tag="div" to="/list">
                <img alt="" src="https://img11.360buyimg.com/jdphoto/s40x40_jfs/t14911/113/1615678148/168/7734f24f/5a53578eN0e2811b6.png">
                <p>待付款</p>
            </router-link >
            <router-link class="main_div" tag="div" to="/list">
                <img alt="" src="https://img11.360buyimg.com/jdphoto/s40x40_jfs/t14608/2/1636876268/266/b4ebb3f2/5a535791N627c296c.png">
                <p>待收货</p>
            </router-link>
            <router-link class="main_div" tag="div" to="/list">
                <img alt="" src="https://img11.360buyimg.com/jdphoto/s40x40_jfs/t15049/345/1573771240/492/7ef15694/5a5357eaNab882dcb.png">
                <p>退换/售后</p>
            </router-link>
            <router-link class="main_div" tag="div" to="/list">
                <img alt="" src="https://img30.360buyimg.com/jdphoto/jfs/t14953/346/2113764063/185/1a1dcd24/5a6d7b8bN8431ea1a.png">
                <p>全部订单</p>
            </router-link>
        </div>
        <transition name="login">
            <login v-show="flag"></login>
        </transition>
        <cai ></cai>
    </div>
</template>

<script>
    import login from './login.vue'
    import cai from './caiNiXiHuan.vue'

    export default {
        name: "vip",
        data(){
            return{
                flag:false,
                userName:'',
                niCheng: ''
            }
        },
        components:{
            login,
            cai
        },
        mounted(){
            this.loginFlag()
        },
        methods:{
            loginFlag(){
                if (this.$store.state.login){
                    setTimeout(()=>{this.flag=this.$store.state.login},300)
                }
            },
            users(){
                let userArr=JSON.parse(localStorage.getItem('user'));

                for(let i=0;i<userArr.length;i++){
                    if(userArr[i].userName===this.$store.state.userName){
                        this.userName=userArr[i].userName;
                        this.niCheng=userArr[i].niCheng;
                    }
                }
            }
        },
        watch:{
            "$store.state.login"(val){
                this.flag=val;
                this.users()
            }
        }
    }
</script>

<style lang="less" scoped>
    .header{
        width: 100%;
        height: 200px;
        background: linear-gradient(90deg, rgb(61,182,129), rgb(61,130,120));
        text-align: center;
        padding-top: 10px;
        img{
            border-radius: 100%;
            width:  100px;
            height: 100px;
        }
        p{
            color: #ffffff;
            font-size: 13px;
        }
    }
    .main{
        width: 100%;
        background-color: #fff;
        margin-top: 7px;
        height: 70px;
        .main_div{
            float: left;
            width: 25%;
            height: 100%;
            text-align: center;
            padding-top: 10px;
            img{
                width: 30px;
            }
            p{
                font-size: 12px;
            }
        }
    }
    .login-enter,.login-leave{
        top: 100%;
        opacity: 0;
    }
    .login-enter-active,.login-leave-active{
        transition: all 0.3s;
    }
</style>