<template>
    <div class="login">
        <div class="main">
            <i @click="$emit('setFlag')" class="mui-icon mui-icon-closeempty"></i>
            <img alt="" src="../json/img/Vuelogo.jpg">
            <label>
                <input @blur="blurUserName()" @focus="fousUserName()" type="text" v-model="userName">
            </label>
            <label>
                <input @blur="blurUserPassword()" @focus="focusUserPassword()" type="text" v-model="userPassword">
            </label>
            <span @click="register">免费注册</span>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "login",
        data(){
            return{
                userName:'请输入用户名',
                userPassword:'请输入密码'
            }
        },
        methods:{
            fousUserName(){
                if (this.userName==='请输入用户名') {
                    this.userName=''
                }
            },
            blurUserName(){
                if (this.userName==='') {
                    this.userName='请输入用户名'
                }
            },
            focusUserPassword(){
                if(this.userPassword==='请输入密码'){
                    this.userPassword=''
                }
            },
            blurUserPassword(){
                if(this.userPassword===''){
                    this.userPassword='请输入密码'
                }
            },
            al(txt){
                Toast({
                    message: txt,
                    position: 'center',
                    duration: 3000
                })
            },
            register(){
                if(this.userName.length>=6&&this.userPassword.length>=6&&this.userName!=='请输入用户名'&&this.userPassword!=='请输入密码'){
                    let arr=JSON.parse(localStorage.getItem("user"))||[];
                    let arrFlag=false;
                    let arrNum=0;
                    for(let i =0;i<arr.length;i++){
                        if(arr[i].userName===this.userName){
                            this.al('已存在此用户名');
                            this.userName='请输入用户名';
                            arrNum++
                        }
                    }
                    if(arrNum===0){
                        arr.unshift({
                            userName:this.userName,
                            userPassword:this.userPassword
                        });
                        arr.splice(10);
                        console.log(arr);
                        localStorage.setItem("user", JSON.stringify(arr));
                        this.$emit('setFlag');
                        this.al('注册成功请登录');
                    }
                }else {
                    this.al('用户名和密码必须大于等于6')
                }
            }
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
            i{
                position: absolute;
                right: 1%;
                top: 0;
                font-size: 40px;
            }
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
</style>