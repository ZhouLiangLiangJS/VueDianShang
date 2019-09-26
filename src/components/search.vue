<template>
    <div class="search">
        <nav :style="'height:'+screenWidth*0.1+'px'">
            <div class="search_nav">
                <span class="baby mui-icon mui-icon-arrowdown" @click="flag=!flag" :style="'font-size: '+screenWidth*0.04+'px;lineHeight:'+screenWidth*0.08+'px' ">{{type|typeFilter}}</span>
                <input type="text" v-model="value" @keyup.enter="search()" :style="'font-size: '+screenWidth*0.04+'px;lineHeight:'+screenWidth*0.08+'px' ">
                <span class="mui-icon mui-icon-search search" @click="search()" :style="'font-size: '+screenWidth*0.08+'px;lineHeight:'+screenWidth*0.08+'px' "></span>
            </div>
            <transition name="searchType">
                <div class="search_type" v-show="flag" @click="flag=!flag">
                    <i></i>
                    <div class="mui-icon-extra mui-icon-extra-gift"  @click="type='commodity'" >  宝贝</div>
                    <div class="mui-icon-extra mui-icon-extra-hotel" @click="type='shop'" > 店铺</div>
                </div>
            </transition>
            <router-link to="/home" class="cancel" :style="'font-size: '+screenWidth*0.04+'px;lineHeight:'+screenWidth*0.08+'px' ">取消</router-link>
        </nav>
        <transition name="searchType">
            <div v-show="this.value !== ''?true:false" class="guanjianci" :style="'top:'+screenWidth*0.12+'px'">
                <p @click="SelectComponents(item)" v-for="item in showArr" :style="'font-size: '+screenWidth*0.04+'px;lineHeight:'+screenWidth*0.1+'px'">{{item}}</p>
            </div>
        </transition>
        <div v-show="this.value !== ''?false:true">
                <div class="RecentSearch" ref="RecentSearch" :style="'top:'+screenWidth*0.2+'px'">
                    <span v-for="item in localBaseArr" :style="'font-size: '+screenWidth*0.04+'px;lineHeight:'+screenWidth*0.08+'px' " @click="value=item">{{item}}</span>
                </div>
                <p class="label_RecentSearch"  :style="'font-size: '+screenWidth*0.04+'px;lineHeight:'+screenWidth*0.08+'px;top:'+screenWidth*0.13+'px'">近期搜索</p>
            </div>
        <transition name="searchType">
            <commodityList v-show="commodityListFlag" :type='type' :querySearch="comprops" :style="'top:'+screenWidth*0.1+'px'" :screenWidth="screenWidth"></commodityList>
        </transition>
        <transition name="searchType">
            <caiNiXiHuan :width="screenWidth" v-show="commodityListFlag" class="caiNiXiHuan"></caiNiXiHuan>
        </transition>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import commodityList from './commodityList.vue';
    import caiNiXiHuan from './caiNiXiHuan.vue'

    export default {
        name: "search",
        data(){
            return{
                value:'',
                type:'commodity',
                flag:false,
                localBaseArr:null,
                screenWidth:window.innerWidth,
                commodityArr:[],
                shopArr:[],
                showArr:[],
                commodityListFlag:false,
                comprops:null
            }
        },
        created(){
            this.localBaseArr=JSON.parse(window.localStorage.getItem("RecentSearch")===null?"[]":window.localStorage.getItem("RecentSearch"));
            this.localBaseArr.splice(10);
            this.searchMyApi()
        },
        mounted(){
            window.onresize = () => {
                return (() => {
                    window.screenWidth = window.innerWidth;
                    this.screenWidth = window.screenWidth;
                })()
            };
            this.br();
        },
        methods:{
            al(txt){
                Toast({
                    message: txt,
                    position: 'center',
                    duration: 500
                });
            },
            search(){
               if(this.value!==''){
                   let arr=JSON.parse(window.localStorage.getItem("RecentSearch")===null?"[]":window.localStorage.getItem("RecentSearch"));
                   arr.unshift(this.value);
                   arr.splice(10);
                   window.localStorage.setItem("RecentSearch", JSON.stringify(arr));
                   this.comprops=this.value;
                   this.commodityListFlag=true;
                   this.value='';
               }else{
                   this.al('请输入查找内容')
               }
            },
            br(){
                let el=this.$refs.RecentSearch.children;
                let num=0;
                for(let i = 0;i<el.length;i++){
                    num+=el[i].offsetWidth+10;
                    if(num>this.$refs.RecentSearch.offsetWidth){
                        num=0;
                        this.$refs.RecentSearch.insertBefore(document.createElement("BR"),el[i])
                    }
                }
            },
            searchMyApi(){
                this.$http.get('../json/commodityList.json').then(function (res) {
                    let arr1=[];
                    let arr2=[];
                    for (let i = 0; i < res.body.length; i++) {
                        arr1.push(res.body[i].title);
                        arr2.push(res.body[i].shop);
                    }
                    this.commodityArr=arr1;
                    this.shopArr=arr2;
                })

            },
            SelectComponents(item){
                this.value=item;
            }
        },
        filters:{
            typeFilter:val=> val==='commodity'?"宝贝":"店铺"

        },
        watch:{
            value(val){
                if (val!==''){
                    let showArr=[];
                    let type=this.type==='commodity'?this.commodityArr:this.shopArr;
                    for (let i = 0; i < type.length; i++) {
                        if(type[i].match(val)){
                            showArr.push(type[i]);
                        }
                    }
                    showArr.splice(10);
                    this.showArr=showArr;
                }
            }
        },
        components:{
            commodityList,
            caiNiXiHuan
        }
    }
</script>

<style scoped lang="less">
    .search{
        nav{
            background-color: #f6f6f6;
            height: 30px;
            padding-top: 3px;
            width: 100%;
            position: fixed;
            top: 0;
            z-index: 99999;
            border-bottom: 1px solid #dbdbdb;
            .search_nav{
                margin-left: 3%;
                height: 80%;
                display: inline-block;
                width: 80%;
                background-color: #e3e3e5;
                text-align: center;
                border-radius: 5px;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                .baby{
                    display: inline-block;
                    height: 100%;
                    color: #999;
                    background-color: #e3e3e5;
                    font-size: 14px;
                    text-align: center;
                    line-height: 28px;
                    margin-left: 10px;
                    position: absolute;
                    left: 0;
                    z-index: 99;
                }
                input{
                    border: 0;
                    width: 65%;
                    height: 100%;
                    background-color: #e3e3e5;
                    padding: 0;
                    color: #555555;
                    font-size: 14px;
                    position: absolute;
                    left: 20%;

                }
                .search{
                    display: inline-block;
                    text-align: center;
                    height: 24px;
                    color: #6d6d72;
                    background-color: #e3e3e5;
                    margin-right: 2%;
                    position: absolute;
                    right: 0px;
                }
            }
            .cancel{
                display: inline-block;
                font-size: 13px;
                width: 15%;
                text-align: center;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 2%;
            }
            .search_type{
                position: absolute;
                top: 40px;
                left: 8%;
                width: 150px;
                height: 60px;
                background-color: #212121;
                opacity: 0.7;
                border-radius: 10px;
                :nth-child(2){
                    border-bottom: 1px solid rgb(199, 200, 201);
                }
                i{
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    transform: rotate(45deg);
                    background-color: #212121;
                    top: -5px;
                    left: 20px;
                }
                div{
                    width: 100%;
                    padding-left: 15px;
                    font-size: 14px;
                    height: 50%;
                    color: rgb(199, 200, 201);
                    line-height: 30px;
                }
            }
        }
        .RecentSearch{
            position: absolute;
            width: 100%;
            span{
                border: 1px solid #aaa;
                color: #aaa;
                border-radius: 8px;
                margin-left: 10px;
            }
        }
        .label_RecentSearch{
            position: absolute;
            left: 2%;
            width: 98%;
        }
        .guanjianci{
            border-radius: 10px;
            left: 3%;
            width: 80%;
            position: fixed;
            background-color: #f9f9f9;
            z-index: 999;
            top: 40px;
            p{
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                width: 100%;
                line-height: 30px;
                border-bottom:1px solid #cccccc ;
                padding-left: 10%;
            }
        }
        .caiNiXiHuan{
            position: relative;
            margin-top: 10%;
        }
    }
    .searchType-enter,.searchType-leave-to{
        transform: translateX(-200%);
        opacity: 0;
    }
    .searchType-enter-active,.searchType-leave-active{
        transition:all 0.3s ease;
    }
</style>