<template>
    <div>
        <div class="shopping">
            <div class="shopping_main">
                <div :style="'height:'+this.screenWidth*0.5+'px'" class="shopping_main_top">
                    <span :style="'fontSize:'+this.screenWidth*0.06+'px;lineHeight:'+this.screenWidth*0.07+'px'">购物车</span>
                    <i :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.07+'px'" @click="del=!del">管理</i>
                    <p :style="'fontSize:'+this.screenWidth*0.03+'px;lineHeight:'+this.screenWidth*0.07+'px'">共{{num}}件宝贝</p>
                </div>
                <div :style="'marginTop:-'+this.screenWidth*0.27+'px'" class="shopping_main_list">
                    <div :key="index" class="shopping_main_list_div" v-for="(item,index) in shoppingArr">
                        <div class="shopping_main_list_header">
                            <i>
                                <label :for="'checkbox'+index">
                                    <input :id="'checkbox'+index" :value="index" type="checkbox" v-model="inputList">
                                </label>
                            </i>
                            <img alt="" src="https://gw.alicdn.com/tfs/TB1mByhAxTpK1RjSZFMXXbG_VXa-200-200.png">
                            <span >{{item.dianPu}}</span>
                        </div>
                        <div class="shopping_main_list_main">
                            <img :src="item.img" alt="">
                            <router-link :to="'commodityDetails/'+item.id" tag="span">{{item.title}}</router-link>
                            <i>已选:{{item.yanSe}}</i>
                            <div>
                                <button @click="reduce(index)">-</button>
                                <input :value="item.num" type="text">
                                <button @click="add(index)">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <transition name="login">
                <div class="shopping_bottom" v-show="shopping_bottom_right_Flag">
                    <div class="shopping_bottom_left">
                        <label for="QuanXuan">
                            <input @click="checkboxActive()" id="QuanXuan" type="checkbox" v-model="checkbox">
                            <span>全选</span>
                        </label>
                    </div>
                    <div class="shopping_bottom_right" v-show="!del">
                    <span>
                        合计:
                    </span>
                        <i>
                            ￥{{heJi}}
                        </i>
                        <button @click="al('想买啊?去淘宝呗')">结算({{inputList.length}})</button>
                    </div>
                    <div class="shopping_bottom_right" v-show="del">
                        <button @click="dele">删除({{inputList.length}})</button>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="login">
            <login :width="screenWidth" v-show="loginFlag"></login>
        </transition>
    </div>
</template>

<script>
    import login from './login.vue'
    import {Toast} from 'mint-ui';

    export default {
        name: "shopping",
        data(){
            return{
                loginFlag:false,
                screenWidth: window.innerWidth,
                shoppingArr:[],
                num:0,
                txt:'',
                inputList:[],
                heJi:0,
                checkbox:false,
                del:false,
                shopping_bottom_right_Flag:false
            }
        },
        created(){
            let arr=JSON.parse(localStorage.getItem('user'));
            for (let i=0;i<arr.length;i++){
                if (arr[i].userName===this.$store.state.userName){
                    this.shoppingArr=arr[i].shopping;
                    this.num=this.shoppingArr.length;
                }
            }
        },
        mounted(){
            this.loginShow();
            window.onresize = () => {
                return (() => {
                    window.screenWidth = window.innerWidth;
                    this.screenWidth = window.screenWidth;
                })()
            };
            setTimeout(()=>{this.shopping_bottom_right_Flag=true},300);

        },
        beforeDestroy(){
            let arr=JSON.parse(localStorage.getItem('user'));
            for (let i=0;i<arr.length;i++){
                if (arr[i].userName===this.$store.state.userName){
                    arr[i].shopping=this.shoppingArr
                }
            }
            localStorage.setItem('user',JSON.stringify(arr))
        },
        methods:{
            al(txt){
                Toast({
                    message: txt,
                    position: 'center',
                    duration: 1000
                });
            },
            loginShow(){
                if (this.$store.state.login){
                    setTimeout(()=>{
                        this.loginFlag=true
                    },300)
                }
            },
            dele(){
                let arr=this.shoppingArr.slice();
                for(let i =0;i<this.inputList.length;i++){
                    arr[this.inputList[i]]=''
                }
                for(let j =0;j<arr.length;j++){
                    if (arr[j]===''){
                        arr.splice(j,1);
                        j--
                    }

                }
                this.inputList.splice(0);
                this.shoppingArr=arr;
            },
            checkboxActive(){
                if (!this.checkbox){
                    let arr=[];
                    for(let i =0 ;i<this.shoppingArr.length;i++){
                        arr[i]=i;
                    }
                    this.inputList=arr;
                } else {
                    this.inputList=[];
                }
            },
            reduce(index){
                let jiaGe=this.shoppingArr[index].jiaGe/this.shoppingArr[index].num;
                this.shoppingArr[index].num<=1?this.shoppingArr[index].num=1:this.shoppingArr[index].num--;
                this.shoppingArr[index].jiaGe=(jiaGe*this.shoppingArr[index].num);
                let num=0;
                for(let i =0;i<this.inputList.length;i++){
                    num+=this.shoppingArr[this.inputList[i]].jiaGe
                }
                this.heJi=num.toFixed(1);
            },
            add(index){
                let jiaGe=this.shoppingArr[index].jiaGe/this.shoppingArr[index].num;
                this.shoppingArr[index].num++;
                this.shoppingArr[index].jiaGe=(jiaGe*this.shoppingArr[index].num);
                let num=0;
                for(let i =0;i<this.inputList.length;i++){
                    num+=this.shoppingArr[this.inputList[i]].jiaGe
                }
                this.heJi=num.toFixed(1);
            }
        },
        components:{
            login
        },
        watch:{
            '$store.state.login'(val){
                let arr=JSON.parse(localStorage.getItem('user'));
                this.loginFlag=val;
                for (let i=0;i<arr.length;i++){
                    if (arr[i].userName===this.$store.state.userName){
                        this.shoppingArr=arr[i].shopping;
                        this.num=this.shoppingArr.length;
                    }
                }
            },
            inputList(val){
                let num=0;
                for(let i =0;i<val.length;i++){
                    num+=this.shoppingArr[val[i]].jiaGe
                }
                this.heJi=num.toFixed(1);
            }
        }
    }
</script>

<style scoped lang="less">
    .shopping{
        .shopping_main{
            .shopping_main_top{
                width: 100%;
                background-color: rgb(61,182,129);
                padding:5% 2%;
                span{
                    color: #ffffff;
                    font-weight: 600;
                }
                i{
                    color: #ffffff;
                    font-style: normal;
                    float: right;
                }
                p{
                    color: #ffffff;
                }
            }
            .shopping_main_list{
                width: 100%;
                min-height: 200px;
                .shopping_main_list_div{
                    height: 140px;
                    width: 90%;
                    background-color: #fff;
                    margin: 2% auto;
                    border-radius: 10px;
                    position: relative;
                    .shopping_main_list_header{
                        width: 100%;
                        height: 25%;
                        transform: translateY(10%);
                        padding-left: 5%;
                        img{
                            width: 5%;
                        }
                        span{
                            font-size: 12px;
                        }
                    }
                    .shopping_main_list_main{
                        width: 100%;
                        height: 75%;
                        border-top: 1px solid #ccc;
                        position: absolute;
                        padding-left: 5%;
                        bottom:0;
                        img{
                            height: 100%;
                        }
                        span{
                            top: 0;
                            width: 55%;
                            left: 45%;
                            position: absolute;
                            box-sizing: border-box;
                            font-size: 13px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            word-break: break-word;
                            color: #232326;
                        }
                        i{
                            font-style: normal;
                            bottom: 30%;
                            width: 40%;
                            left: 45%;
                            position: absolute;
                            box-sizing: border-box;
                            font-size: 13px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            word-break: break-word;
                            color: rgb(153, 153, 153);
                        }
                        div{
                            position: absolute;
                            width: 60px;
                            right: 4px;
                            bottom: 7px;
                            input,button{
                                float: left;
                                width: 20px;
                                height: 20px;
                                text-align: center;
                                margin: 0;
                                padding: 0;
                            }
                        }
                    }
                }
            }
        }
        .shopping_bottom{
            position: fixed;
            z-index: 99999999;
            width: 100%;
            height: 50px;
            bottom: 50px;
            line-height: 50px;
            background-color: #fff;
            padding: 0 10px;
            .shopping_bottom_left{
                float: left;
                span{
                    font-size: 14px;
                }
            }
            .shopping_bottom_right{
                float: right;
                span{
                    font-size: 12px;
                }
                i{
                    font-size: 14px;
                    font-style: normal;
                    color: orangered;
                }
                button{
                    background-color: #3db681;
                    border: 0;
                    color: #ffffff;
                    margin-top: 8px;
                    border-radius: 20px;
                    font-size: 13px;
                }
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