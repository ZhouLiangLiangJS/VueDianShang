<template>
    <div>
        <ul v-infinite-scroll="loadMore" class="loadMore">
            <img src="../image/88174b36f85283b6.png" alt="">
            <li v-for="item in list">
                <router-link :key="comList.id" :style="'height: '+width*0.6875+'px'" :to="'/commodityDetails/'+comList.id" tag="div" v-for="comList in item" v-get-height="0.6875">
                    <img :src="comList.imgUrl" alt="无法显示">
                    <span :style="'font-size: '+width*0.04+'px; lineHeight:'+width*0.05+'px;height:'+width*0.1+'px'">{{comList.title}}</span>
                    <p :style="'font-size: '+width*0.04+'px;lineHeight:'+width*0.04+'px'">￥{{comList.Price}}</p>
                    <i :style="'font-size: '+width*0.035+'px;lineHeight:'+width*0.04+'px'">{{comList.NumberPeople}}人付款</i>
                </router-link>
            </li>
            <div v-get-height="0.2" class="spinner">
                <div class="my_spinner_div" v-show="flag" >
                    <span :style="'font-size: '+width*0.04+'px'">正在加载中</span>
                    <mt-spinner id="mt-spinner" type="fading-circle" color="#ccc" :size="width*0.0875"></mt-spinner>
                </div>
                <div class="my_spinner_div" v-show="daodile" >
                    <span :style="'font-size: '+width*0.04+'px'">已经到底啦！！！</span>
                </div>
            </div>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "caiNiXiHuan",
        data(){
            return{
                list:[],
                loading:false,
                flag:false,
                daodile:false
            }
        },
        props:['width'],
        methods:{
            loadMore() {
                this.flag = true;
                if(this.list.length<4){
                    this.$http.get("../json/commodityList.json").then(function (res) {
                        if (res.status === 200) {
                            this.list.push(res.body);
                            this.flag = false;
                        }
                    })
                }else {
                    this.flag = false;
                    this.daodile = true;
                }
            }
        },
        watch:{
            width(val){
                console.log(val)
            }
        }
    }
</script>

<style scoped lang="less">
    .loadMore{
        margin: 2% 0 0 0;
        padding: 0;
        list-style: none;
        img{
            vertical-align:bottom;
            width: 100%;
        }
        li{
            width: 100%;
            overflow: hidden;
            div{
                width: 49%;
                display: inline-block;
                background-color: #fff;
                margin-bottom: 2%;
                position: relative;
                float: left;
                img{
                    width: 100%;
                }
                span{
                    box-sizing: border-box;
                    height: 31px;
                    font-size: 13px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-break: break-word;
                    color: #232326;
                    margin-top: 5px;
                    line-height: 16px;
                    padding: 0 4px;
                }
                p{
                    margin: 0;
                    padding: 0;
                    position: absolute;
                    /*transform: translateX(2%) translateY(2%);*/
                    left: 2%;
                    bottom: 2%;
                    color: #f23030;
                }
                i{
                    font-style: normal ;
                    position: absolute;
                    bottom: 2%;
                    color: #cccccc;
                    right: 5%;
                    font-size: 12px;
                }
            }
            :nth-child(even){
                margin-left: 2%;
            }
        }
    }
    .spinner{
        width: 100%;
        margin-top: 5%;
        .my_spinner_div{
            position: relative;
            margin: 0 auto;
            width: 35%;
            span{
                position: absolute;
                float: left;
                color: #cccccc;
            }
            #mt-spinner{
                position: absolute;
                left: 80%;
                float: left;
            }
        }
    }
</style>