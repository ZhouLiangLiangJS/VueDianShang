<template>
    <div class="com_div">
        <div :style="'height:'+screenWidth*0.15+'px'" class="shaiXuan">
            <span @click="activeflagfn(1)" :class="['mui-icon mui-icon-arrowdown',{'active':activeflag1}]"
                  :style="'font-size: '+screenWidth*0.045+'px;lineHeight:'+screenWidth*0.1+'px' ">{{zhongheTxt}}</span>
            <span @click="activeflagfn(2)" :class="{'active':activeflag2}"
                  :style="'font-size: '+screenWidth*0.045+'px;lineHeight:'+screenWidth*0.1+'px' ">销量优先</span>
        </div>
        <transition>
            <div class="zhonghe" ref="zhonghe" v-show="activeflag4">
                <p :class="{'active':activeflagZhongHe1}" @click="ZhongHe1()" :style="'font-size: '+screenWidth*0.045+'px;lineHeight:'+screenWidth*0.1+'px' ">综合排序</p>
                <p :class="{'active':activeflagZhongHe2}" @click="ZhongHe2()" :style="'font-size: '+screenWidth*0.045+'px;lineHeight:'+screenWidth*0.1+'px' ">价格从高到低</p>
                <p :class="{'active':activeflagZhongHe3}" @click="ZhongHe3()" :style="'font-size: '+screenWidth*0.045+'px;lineHeight:'+screenWidth*0.1+'px' ">价格从低到高</p>
            </div>
        </transition>
        <div class="list">
            <div class="list_com" ref="list_com" v-get-height="0.6875" :style="'height: '+screenWidth*0.6875+'px'" v-for="item in searchList">
                <img :src="item.imgUrl" alt="无法显示">
                <span :style="'font-size: '+screenWidth*0.04+'px; lineHeight:'+screenWidth*0.05+'px;height:'+screenWidth*0.1+'px'">{{item.title}}</span>
                <p :style="'font-size: '+screenWidth*0.04+'px;lineHeight:'+screenWidth*0.04+'px'">￥{{item.Price}}</p>
                <i :style="'font-size: '+screenWidth*0.035+'px;lineHeight:'+screenWidth*0.04+'px'">{{item.NumberPeople}}人付款</i>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "commodity",
        data() {
            return {
                activeflag1: true,
                activeflag2: false,
                activeflag3: false,
                activeflag4: false,
                activeflagZhongHe1:true,
                activeflagZhongHe2:false,
                activeflagZhongHe3:false,
                searchList:[],
                zhongheTxt:'综合排序'
            }
        },
        created(){
            this.type==='commodity'?this.searchCom():this.searchShop();
        },
        updated(){

        },
        methods: {
            al(txt){
                Toast({
                    message: txt,
                    position: 'center',
                    duration: 500
                });
            },
            activeflagfn(i) {
                i === 1 ? this.f1() : i === 2 ? this.f2() : this.f3();
            },
            f1() {
                this.activeflag1 = true;
                this.activeflag2 = false;
                this.activeflag3 = false;
                this.activeflag4 = true;
            },
            f2() {
                this.activeflag1 = false;
                this.activeflag2 = true;
                this.activeflag3 = false;
                let arr=this.searchList.slice();
                for(let i=0;i<arr.length;i++){
                    for(let j=i+1;j<arr.length;j++){
                        if(arr[i].NumberPeople<arr[j].NumberPeople){
                            let newArr=null;
                            newArr=arr[i];
                            arr[i]=arr[j];
                            arr[j]=newArr;
                        }
                    }
                };
                this.searchList=arr;
            },
            f3() {
                this.activeflag1 = false;
                this.activeflag2 = false;
                this.activeflag3 = true
            },
            ZhongHe1(){
                this.activeflagZhongHe1=true ;
                this.activeflagZhongHe2=false;
                this.activeflagZhongHe3=false;
                this.searchCom();
                this.zhongheTxt="综合排序";
                this.activeflag4=false;
            },
            ZhongHe2(){
                this.activeflagZhongHe1=false ;
                this.activeflagZhongHe2=true;
                this.activeflagZhongHe3=false;
                let arr=this.searchList.slice();
                for(let i=0;i<arr.length;i++){
                    for(let j=i+1;j<arr.length;j++){
                        if(arr[i].Price<arr[j].Price){
                            let newArr=null;
                            newArr=arr[i];
                            arr[i]=arr[j];
                            arr[j]=newArr;
                        }
                    }
                };
                this.searchList=arr;
                this.zhongheTxt="价格从高到底";
                this.activeflag4=false;
            },
            ZhongHe3(){
                let arr=this.searchList.slice();
                for(let i=0;i<arr.length;i++){
                    for(let j=i+1;j<arr.length;j++){
                        if(arr[i].Price>arr[j].Price){
                            let newArr=null;
                            newArr=arr[i];
                            arr[i]=arr[j];
                            arr[j]=newArr;
                        }
                    }
                };
                this.searchList=arr;
                this.activeflagZhongHe1=false ;
                this.activeflagZhongHe2=false;
                this.activeflagZhongHe3=true;
                this.zhongheTxt="价格从低到高";
                this.activeflag4=false;
            },
            searchCom(){
                this.$http.get('../json/commodityList.json').then(function (res) {
                    let str=this.querySearch;
                    let arr1=res.body;
                    let arr2=[];
                    for(let i=0;i<arr1.length;i++){
                        if(arr1[i].title.match(str)){
                            arr2.push(arr1[i]);
                        }
                    }
                    this.searchList=arr2;
                    console.log(this.searchList)
                });
            },
            searchShop(){
                this.al('未制作')
            }
        },
        watch:{
            querySearch(){
                this.type==='commodity'?this.searchCom():this.searchShop();
            }
        },
        props:['querySearch', 'screenWidth','type']
    }
</script>

<style scoped lang="less">
    .active {
        color: #007aff;
    }

    .com_div {
        position: relative;
        width: 100%;
        background-color: #eeeeee;;
        z-index: 9;

        .shaiXuan {
            background-color: #fff;
            border-bottom: solid 1px #ccc;
            padding-top: 3%;

            span {
                float: left;
                width: 50%;
                text-align: center;
            }

            :nth-child(2) {
                border-left: 1px solid #ccc;
            }

            :nth-child(3) {
                width: 24%;
            }
        }
        .zhonghe{
            position: absolute;
            width: 100%;
            z-index: 999;
            background-color: #fff;
            border-bottom: 1px solid #ccc;
            p{
                margin: 0 0 0 7%;
            }
            :nth-child(2){
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
            }
        }
        .list{
            overflow:hidden;
            .list_com{
                width: 49%;
                float: left;
                position: relative;
                background-color: #fff;
                margin-bottom: 2%;
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
                    margin-bottom: 3px;
                    padding: 0 4px;
                }
                p{
                    margin: 0;
                    padding: 0;
                    color: #f23030;
                    position: absolute;
                    bottom: 2%;
                    left: 2%;
                }
                i{
                    position: absolute;
                    font-style: normal ;
                    bottom: 2%;
                    color: #cccccc;
                    font-size: 12px;
                    right: 4%;
                }
            }
            :nth-child(even){
                margin-left: 2%;
            }
        }
    }
    .v-enter,.v-leave-to{
        transform: translateX(-200%);
        opacity: 0;
    }
    .v-enter-active,.v-leave-active{
        transition:all 0.3s ease;
    }
</style>