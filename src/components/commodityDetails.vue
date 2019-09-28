<template>
    <div>
        <div class="nav">
            <a :style="'fontSize:'+this.screenWidth*0.1+'px'" @click.prevent="backGo" class="mui-icon mui-icon-back"></a>
            <router-link :style="'fontSize:'+this.screenWidth*0.1+'px'" class="mui-icon-extra mui-icon-extra-cart" to="/shopping"></router-link>
        </div>
        <mt-swipe :auto="0" :style="'height:'+this.screenWidth+'px'" class="LunBo">
            <mt-swipe-item :key="id" class="LunBo_first" v-for="(item,id) in showCommodity.imgArr">
                    <img :src="item.url"  alt="获取失败">
            </mt-swipe-item>
        </mt-swipe>
        <div :style="'height:'+this.screenWidth*0.375+'px'" class="tit">
            <p :style="'fontSize:'+this.screenWidth*0.06+'px;lineHeight:'+this.screenWidth*0.088+'px'">￥{{showCommodity.jiaGe}}</p>
            <p :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.06+'px'">{{showCommodity.title}}</p>
            <p :style="'fontSize:'+this.screenWidth*0.035+'px;lineHeight:'+this.screenWidth*0.035+'px'">价格:￥<span>{{showCommodity.yuanJia}}</span></p>
            <div>
                <span :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.04+'px;margin-right:23%'">物流:{{showCommodity.yunFei==="true"?'免运费':'不免运费'}}</span>
                <span :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.04+'px;margin-right:23%'">月销:{{showCommodity.yueXiao}}</span>
                <span :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.04+'px'">{{showCommodity.diQu}}</span>
            </div>
        </div>
        <div :style="'height:'+this.screenWidth*0.11+'px'" @click="fuWuFlag=!fuWuFlag" class="fuWu">
            <span :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.11+'px'">服务</span>
            <span :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.11+'px'">{{showCommodity.fuWuArr.title}}</span>
            <span :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.11+'px'" class="mui-icon mui-icon-arrowright"></span>
        </div>
        <div :style="'height:'+this.screenWidth*0.11+'px;marginTop:2%;'" @click="GouWuFlag=!GouWuFlag" class="fuWu">
            <span :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.11+'px'">规格</span>
            <span :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.11+'px'">已选:{{guiGeXuanZhong===null?"无":guiGeXuanZhong}}</span>
            <span :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.11+'px'" class="mui-icon mui-icon-arrowright"></span>
        </div>
        <transition name="fuWu">
            <div :style="'height:'+this.screenHeight*0.8+'px'" class="fuWuFlag" v-show="fuWuFlag">
                <div class="fuWuFlag_title">基础服务</div>
                <div :style="'height:'+this.screenHeight*0.65+'px'" class="fuWuFlag_main">
                    <div class="fuWuFlag_main_jiChu" v-for="item in showCommodity.fuWuArr.jiChu">
                        <p ><span class="mui-icon mui-icon-checkmarkempty"></span>{{item.title}}</p>
                        <p >{{item.main}}</p>
                    </div>
                    <div class="fuWuFlag_main_qiTa">
                        <h3>其他</h3>
                        <p v-for="item in showCommodity.fuWuArr.qiTa"><span class="mui-icon mui-icon-checkmarkempty"></span>{{item}}</p>
                    </div>
                </div>
                <div :style="'height:'+this.screenHeight*0.08+'px'" class="fuWuFlag_bottom">
                    <button @click="fuWuFlag=!fuWuFlag">完成</button>
                </div>
            </div>
        </transition>
        <transition name="fuWu">
            <div :style="'height:'+this.screenHeight*0.8+'px'" class="GouWuFlag" v-show="GouWuFlag">
                <div class="GouWuFlag_nav">
                    <img :src="GouWuFlag_nav_imgSrc===null?'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=f0dc53b759b5c9ea62a60be5e5099a38/8601a18b87d6277f5a6857842a381f30e924fc10.jpg':GouWuFlag_nav_imgSrc" alt="无法显示" v-image-preview>
                    <span>￥{{GouWuFlag_nav_JiaGe===null?0:GouWuFlag_nav_JiaGe}}</span>
                    <span>已选：{{guiGeXuanZhong===null?"无":guiGeXuanZhong}}</span>
                    <span @click="GouWuFlag=!GouWuFlag" class="mui-icon mui-icon-closeempty"></span>
                </div>
                <div class="GouWuFlag_main">
                    <div :key="item.title" v-for="(item,i) in showCommodity.JiaRuGouWuChe">
                        <p>{{item.title}}</p>
                        <button :class="{active:child.txt===JiaRuGouWuCheActive[i]}" :key="child.txt"  @click="JiaRuGouWuChe(i,child.txt,child.imgUrl,child.JiaGe)" v-for="child in item.classTitle">{{child.txt}}</button>
                    </div>
                    <div class="gouMaiShuLiang">
                        <p>购买数量</p>
                        <div>
                            <input @click="GouMaiShuLiang<=1?GouMaiShuLiang=1:--GouMaiShuLiang" type="button" value="-">
                            <input @keyup="GouMaiShuLiang<=1?GouMaiShuLiang=1:null" type="text" v-model="GouMaiShuLiang">
                            <input @click="GouMaiShuLiang++" type="button" value="+">
                        </div>
                    </div>
                </div>
                <div class="GouWuFlag_bottom">
                    <div>
                        <button>加入购物车</button>
                        <button>立刻购买</button>
                    </div>
                </div>
            </div>
        </transition>
        <div :style="'height:'+this.screenWidth*0.35+'px;marginTop:2%;'" class="pingJia">
            <p class="pingjia_header">
                <span :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.11+'px'">宝贝评价({{showCommodity.pingJia.length}})</span>
                <span :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.11+'px'" class="mui-icon mui-icon-arrowright"></span>
                <span :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.11+'px'" @click="XiangXipingJia=!XiangXipingJia">查看全部</span>
            </p>
            <div>
                <img :src="showCommodity.pingJia[0].userImage" :style="'width:'+this.screenWidth*0.04+'px;'" alt="">
                <span :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.05+'px'">{{showCommodity.pingJia[0].userName}}</span>
                <p :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.055+'px;height:'+this.screenWidth*0.1+'px;'">{{showCommodity.pingJia[0].txt}}</p>
            </div>
        </div>
        <div :style="'height:'+this.screenWidth*0.3+'px;marginTop:2%;'" class="dianPu">
            <div class="dianPu_one">
                <div class="dianPu_one_left">
                    <img :src="showCommodity.touXiang" alt="无法显示" class="touXiang">
                    <span :style="'fontSize:'+this.screenWidth*0.035+'px'">{{showCommodity.dianPuMing}}</span>
                    <div class="dianPu_one_left_dengJi">
                        <img  :src="item" alt=""  class="dengJi" v-for="item in showCommodity.dengJi">
                    </div>
                </div>
                <div class="dianPu_one_right">
                    <button :style="'fontSize:'+this.screenWidth*0.035+'px'">进店逛逛</button>
                    <button :style="'fontSize:'+this.screenWidth*0.035+'px'">全部宝贝</button>
                </div>
            </div>
            <div class="dianPu_two">
                <span :style="'fontSize:'+this.screenWidth*0.035+'px'" class="dianPu_two_span">宝贝描述:<span>{{showCommodity.pingFen[0]}}    {{showCommodity.pingFen[0]>=4?'高':'低'}}</span>    </span>
                <span :style="'fontSize:'+this.screenWidth*0.035+'px'" class="dianPu_two_span">宝贝描述:<span>{{showCommodity.pingFen[1]}}    {{showCommodity.pingFen[1]>=4?'高':'低'}}</span>    </span>
                <span :style="'fontSize:'+this.screenWidth*0.035+'px'" class="dianPu_two_span">宝贝描述:<span>{{showCommodity.pingFen[2]}}    {{showCommodity.pingFen[2]>=4?'高':'低'}}</span>    </span>
            </div>
        </div>
        <div class="xiangQing">
            <div :style="'height:'+this.screenWidth*0.12+'px;'" class="xiangQing_p">
                <span :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.11+'px'" class="mui-icon mui-icon-image"> 详情</span>
                <div class="borderBottom"></div>
            </div>
            <img :src="item" alt="" v-for="item in showCommodity.XiangQing">
            <div :style="'height:'+this.screenWidth*0.12+'px;'" class="xiangQing_p">
                <span :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.11+'px'" class="mui-icon-extra mui-icon-extra-heart"> 推荐</span>
                <div class="borderBottom"></div>
            </div>
            <caiNiXiHuan></caiNiXiHuan>
        </div>
        <div class="MaiGou">
            <div>
                <button @click="GouWuFlag=!GouWuFlag">加入购物车</button>
                <button @click="GouWuFlag=!GouWuFlag">立刻购买</button>
            </div>
        </div>
        <transition name="pingJia">
            <div class="XiangXipingJia" v-show="XiangXipingJia">
                <div class="XiangXipingJia_header">
                    <i :style="'fontSize:'+this.screenWidth*0.1+'px;lineHeight:'+this.screenWidth*0.15+'px'" @click="XiangXipingJia=!XiangXipingJia" class="mui-icon mui-icon-arrowleft"></i>
                    <span :style="'fontSize:'+this.screenWidth*0.05+'px;lineHeight:'+this.screenWidth*0.15+'px'">评价</span>
                </div>
                <div class="XiangXipingJia_loadMore" >
                    <div class="XiangXipingJia_loadMore_list" v-for="(item,i) in showCommodity.pingJia">
                        <div class="XiangXipingJia_loadMore_list_header">
                            <img :src="item.userImage" alt="">
                            <span>{{item.userName}}</span>
                            <i>{{item.time}}</i>
                        </div>
                        <p>{{item.txt}}</p>
                        <div class="XiangXipingJia_loadMore_list_img">
                            <div class="chaKanDaTu" v-for="imgArrs in item.imgArr">
                                <img  :src="imgArrs" alt=""  v-image-preview>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import vueSeamless from 'vue-seamless-scroll'
    import caiNiXiHuan from './caiNiXiHuan.vue'

    export default {
        name: "commodityDetails",
        data(){
            return{
                screenWidth: window.innerWidth,
                showCommodity: {
                    "id": "1",
                    "imgArr": [
                        {"url": "https://img.alicdn.com/imgextra/i1/O1CN01SBPuJQ1PgxaP5BbI5_!!0-item_pic.jpg"},
                        {"url": "https://img.alicdn.com/imgextra/i1/O1CN01mFkBHo1PgxaMBVhIw_!!0-item_pic.jpg"}
                    ],
                    "title": "慕斯优佳居椰棕床垫偏硬护脊床垫棕垫乳胶棕榈薄榻榻米床垫定制",
                    "yunFei": "true",
                    "yueXiao": "191",
                    "jiaGe": "707-1081",
                    "diQu": "上海",
                    "fuWuArr": {
                        "title": "10天内发货 · 15天退货 · 1次破损补寄 · 免费送装",
                        "jiChu":[
                            "15天退货","15天退货，退货邮费买家承担",
                            "1次破损补寄","商品在运输途中出现破损的，消费者可向卖家提出补寄申请，可补寄1次，补寄邮费由买家承担",
                            "免费送装","在指定的393个主城区内享受“长途运费＋同城配送＋搬楼（电梯免费入户，步梯 <＝7楼免费入户）＋安装（拆包/拼装等）”服务"
                        ],
                        "qiTa": [
                            "集分宝","支付宝支付"
                        ]
                    },
                    "JiaRuGouWuChe": [
                        {
                            "title": "颜色分类",
                            "classTitle": [
                                {
                                    "txt": "10CM厚(针织面料+3环保椰棕)",
                                    "imgUrl": "https://img.alicdn.com/imgextra/i1/O1CN01SBPuJQ1PgxaP5BbI5_!!0-item_pic.jpg",
                                    "JiaGe": 736
                                },{
                                    "txt": "10CM厚(织面料+3E棕+2CM乳胶)",
                                    "imgUrl": "https://img.alicdn.com/imgextra/i1/O1CN01SBPuJQ1PgxaP5BbI5_!!0-item_pic.jpg",
                                    "JiaGe": 716
                                },{
                                    "txt": "12CM厚(针织面料+3E环保椰棕)",
                                    "imgUrl": "https://img.alicdn.com/imgextra/i1/O1CN01SBPuJQ1PgxaP5BbI5_!!0-item_pic.jpg",
                                    "JiaGe": 878
                                }
                            ]
                        },
                        {
                            "title": "是否含花瓶",
                            "classTitle": [
                                {
                                    "txt": "不含花瓶",
                                    "imgUrl": "https://img.alicdn.com/imgextra/i1/O1CN01SBPuJQ1PgxaP5BbI5_!!0-item_pic.jpg",
                                    "JiaGe": 0
                                },{
                                    "txt": "含花瓶",
                                    "imgUrl": "https://img.alicdn.com/imgextra/i1/O1CN01SBPuJQ1PgxaP5BbI5_!!0-item_pic.jpg",
                                    "JiaGe": 10
                                }
                            ]
                        }
                    ],
                    "pingJia": [
                        {
                            "txt":"上色持久，吃一顿饭还不掉色，淡涂浓抹都非常好看，包装特别高大上，老婆很喜欢，而且我选对了。淡涂浓抹都非常好看，包装特别高大上，下面也很有感觉，有点蠢蠢欲动一支口红都包装的很好看适合秋天。" ,
                            "imgArr": ["https://img.alicdn.com/bao/uploaded/i4/O1CN017wMxBu1p2othsZ90P_!!0-rate.jpg","https://img.alicdn.com/bao/uploaded/i1/O1CN01xugAMO1p2oti1425p_!!0-rate.jpg","https://img.alicdn.com/bao/uploaded/i3/O1CN01LE1UmP1ZVdyA03NwB_!!0-rate.jpg"]
                        },{
                            "txt":"上色持久，吃一顿饭还不掉色，淡涂浓抹都非常好看，包装特别高大上，老婆很喜欢，而且我选对了。淡涂浓抹都非常好看，包装特别高大上，下面也很有感觉，有点蠢蠢欲动一支口红都包装的很好看适合秋天。" ,
                            "imgArr": ["https://img.alicdn.com/bao/uploaded/i4/O1CN017wMxBu1p2othsZ90P_!!0-rate.jpg","https://img.alicdn.com/bao/uploaded/i1/O1CN01xugAMO1p2oti1425p_!!0-rate.jpg","https://img.alicdn.com/bao/uploaded/i3/O1CN01LE1UmP1ZVdyA03NwB_!!0-rate.jpg"]
                        },{
                            "txt":"上色持久，吃一顿饭还不掉色，淡涂浓抹都非常好看，包装特别高大上，老婆很喜欢，而且我选对了。淡涂浓抹都非常好看，包装特别高大上，下面也很有感觉，有点蠢蠢欲动一支口红都包装的很好看适合秋天。" ,
                            "imgArr": ["https://img.alicdn.com/bao/uploaded/i4/O1CN017wMxBu1p2othsZ90P_!!0-rate.jpg","https://img.alicdn.com/bao/uploaded/i1/O1CN01xugAMO1p2oti1425p_!!0-rate.jpg","https://img.alicdn.com/bao/uploaded/i3/O1CN01LE1UmP1ZVdyA03NwB_!!0-rate.jpg"]
                        },{
                            "txt":"上色持久，吃一顿饭还不掉色，淡涂浓抹都非常好看，包装特别高大上，老婆很喜欢，而且我选对了。淡涂浓抹都非常好看，包装特别高大上，下面也很有感觉，有点蠢蠢欲动一支口红都包装的很好看适合秋天。" ,
                            "imgArr": ["https://img.alicdn.com/bao/uploaded/i4/O1CN017wMxBu1p2othsZ90P_!!0-rate.jpg","https://img.alicdn.com/bao/uploaded/i1/O1CN01xugAMO1p2oti1425p_!!0-rate.jpg","https://img.alicdn.com/bao/uploaded/i3/O1CN01LE1UmP1ZVdyA03NwB_!!0-rate.jpg"]
                        }
                    ],
                    "dianPuMing": "慕斯优",
                    "touXiang": "https://img.alicdn.com/imgextra//i1/2200676153815/O1CN01SeC5Tx1e3JUW3V5vo_!!2200676153815.jpg",
                    "pingFen": ["4.9","4.9","4.9"],
                    "XiangQing": ["https://img.alicdn.com/imgextra/i2/1121673872/O1CN01dHpts21eTQ80AFhcR_!!1121673872.jpg",
                        "https://img.alicdn.com/imgextra/i2/1121673872/O1CN01wfAaka1eTQ7ujJiuK_!!1121673872.jpg",
                        "https://img.alicdn.com/imgextra/i4/1121673872/O1CN01PNd59k1eTQ7KZ8GVC_!!1121673872.jpg",
                        "https://img.alicdn.com/imgextra/i4/1121673872/O1CN011eTQ1wJMW56LpF2_!!1121673872.jpg",
                        "https://img.alicdn.com/imgextra/i4/1121673872/O1CN019bdA901eTQ4NbAGfm_!!1121673872.jpg",
                        "https://img.alicdn.com/imgextra/i1/1121673872/O1CN011eTQ1xO5MREdldC_!!1121673872.jpg",
                        "https://img.alicdn.com/imgextra/i4/1121673872/O1CN011eTQ1xn2gFgvHXm_!!1121673872.jpg",
                        "https://gw.alicdn.com/tfs/TB1d0h2qVYqK1RjSZLeXXbXppXa-1125-960.png"
                    ]
                },
                screenHeight:window.innerHeight,
                fuWuFlag:false,
                guiGeXuanZhong:null,
                GouWuFlag:false,
                GouWuFlag_nav_imgSrc:null,
                GouWuFlag_nav_JiaGeJiCu:[],
                GouWuFlag_nav_JiaGe:null,
                GouMaiShuLiang:1,
                JiaRuGouWuCheActive: [''],
                XiangXipingJia:false
            }
        },
        methods:{
            getJson(){
              this.$http.get("../json/commodityDetails.json").then(
                  function (res,err) {
                      if (res.status === 200) {
                           for (let i = 0; i < res.body.length; i++) {
                               if (this.$route.params.id===res.body[i].id){
                                   console.log(this.$route.params.id,res.body[i].id);
                                   this.showCommodity=res.body[i];
                                   for(let j =0 ;j<this.showCommodity.JiaRuGouWuChe.length;j++){
                                       this.GouWuFlag_nav_JiaGeJiCu[j]=this.showCommodity.JiaRuGouWuChe[j].classTitle[0].JiaGe;
                                   }
                              }
                          }
                      }else {
                          console.log(err)
                      }
                  }
              );
          },
            backGo(){
                this.$router.go(-1)
            },
            JiaRuGouWuChe(i,txt,imgUrl,jiaGe){
                this.GouMaiShuLiang=1;
                let arr=this.JiaRuGouWuCheActive.slice();
                arr[i]=txt;
                this.JiaRuGouWuCheActive=arr;
                if (i===0){
                    this.GouWuFlag_nav_imgSrc=imgUrl;
                }
                this.GouWuFlag_nav_JiaGeJiCu[i]=jiaGe;
                let num=0;
                for(let j =0;j<this.GouWuFlag_nav_JiaGeJiCu.length;j++){
                   num+=this.GouWuFlag_nav_JiaGeJiCu[j]
                }
                this.GouWuFlag_nav_JiaGe=num;
                let str='';
                let arr1=this.JiaRuGouWuCheActive.slice();
                for (let o = 0; o < arr1.length; o++) {
                    str+=" "+arr1[o];
                }
                this.guiGeXuanZhong=str;
            },
            loadMore() {
                this.loading = true;
                setTimeout(() => {
                    let last = this.list[this.list.length - 1];
                    for (let i = 1; i <= 10; i++) {
                        this.list.push(last + i);
                    }
                    this.loading = false;
                }, 2500);
            }
        },
        created() {
            this.getJson();
            window.onresize = () => {
                return (() => {
                    window.screenWidth = window.innerWidth;
                    this.screenWidth = window.screenWidth;
                    this.screenHeight = window.innerHeight;
                })()
            };
        },
        components:{vueSeamless,caiNiXiHuan},
        watch:{
            "GouMaiShuLiang":function(val,old){
                let num=0;
                for(let j =0;j<this.GouWuFlag_nav_JiaGeJiCu.length;j++){
                    num+=this.GouWuFlag_nav_JiaGeJiCu[j]
                }
                this.GouWuFlag_nav_JiaGe=val*num;
            }
        }
    }
</script>

<style lang="less" scoped>
    .LunBo{
        .LunBo_first{
            img{
                width: 100%;
            }
        }
    }
    .mint-swipe-indicator{
        opacity: 0.7 !important;
    }
    .nav{
        position: absolute;
        top: 0;
        z-index: 10;
        width: 100%;
        padding: 3% 3%;
        a{
            background-color: black;
            opacity: 0.5;
            color: #fff;
            border-radius: 100%;
            overflow: hidden;
        }
        :nth-child(1){
            float: left;
        }
        :nth-child(2){
            float: right;
        }
    }
    .tit{
        background-color: #fff;
        padding-left: 2%;
        position: relative;
        margin-bottom: 2%;
        p{
            padding: 0;
            margin: 0;
            position: absolute;
        }
        :nth-child(2){
            bottom: 45%;
            transform: translateY(50%);
            color: black;
            font-weight: 600;
        }
        :nth-child(1){
            top: 10%;
            color: #ff5000;
        }
        :nth-child(3){
            top: 29%;
            color: #999;
            span{
                text-decoration:line-through;
                color: #999;
            }
        }
        div{
            width: 98%;
            position: absolute;
            bottom: 3%;
            span{
                color: rgb(153, 153, 153) !important;
                font-weight: 400 !important;
            }
        }
    }
    .fuWu{
        width: 100%;
        padding-left: 2%;
        background-color: #fff;
        position:relative;
        :nth-child(1){
            color:#999999 ;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            display: inline-block;
            margin-right: 3%;
        }
        :nth-child(2){
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 15%;
            width: 60%;
            overflow: hidden;
            display: inline-block;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right: 3%;
        }
        :nth-child(3){
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 2%;
            font-weight: 600;
            color: #999;
        }
    }
    .fuWuFlag{
        position: fixed;
        width: 100%;
        background-color: #fff;
        bottom: 0;
        z-index: 999999999999;
        border-radius: 3% 3% 0 0;
        .fuWuFlag_title{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            text-align: center;
            z-index: 9;
        }
        .fuWuFlag_main{
            overflow:scroll;
            overflow-x: hidden;
            padding-left:3%;
            .fuWuFlag_main_jiChu{
                margin-bottom: 10%;
                p{
                    margin: 0 0 2% 0;
                    padding-right:3%;
                    font-size: 12px;
                }
                :nth-child(1){
                    span{
                        font-size: 15px;
                        border: 1px solid #ff5000;
                        border-radius: 100%;
                        color: #ff5000;
                        margin-right: 3%;
                    }
                }
                :nth-child(2){
                    padding-left: 10%;
                }
            }
            .fuWuFlag_main_qiTa{
                h3{
                    font-weight: 400;
                    font-size: 12px;
                    text-align: center;
                    margin-bottom: 10%;
                }
                p{
                    font-size: 12px;
                    margin-bottom: 10%;
                    span{
                        font-size: 15px;
                        border: 1px solid #ff5000;
                        border-radius: 100%;
                        color: #ff5000;
                        margin-right: 3%;
                    }
                }
            }
        }
        .fuWuFlag_bottom{
            text-align: center;
            button{
                transform: translateY(50%);
                width: 80%;
                border-radius: 10px;
                background-image: linear-gradient(to right, #FF9000 0%, #FF5000 100%);
                border: 0;
                color: #ffffff;
            }
        }
    }
    .GouWuFlag{
        position: fixed;
        width: 100%;
        background-color: #fff;
        bottom: 0;
        z-index: 9999999999;
        border-radius: 3% 3% 0 0;
        .GouWuFlag_nav{
            width: 94%;
            height: 120px;
            margin: 0 auto;
            padding: 10px 3% 10px 0;
            border-bottom: 1px solid #cccccc;
            position: relative;
            img{
                height: 100%;
            }
            :nth-child(2){
                font-size: 14px;
                position: absolute;
                bottom: 20%;
                color: #ff5000;
                padding-left: 2%;
            }
            :nth-child(3){
                padding-left: 2%;
                width: 65%;
                height: 20px;
                font-size: 12px;
                position: absolute;
                bottom: 5%;
                color: #333;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            :nth-child(4){
                color: #333333;
                border: 1px solid #333333;
                border-radius: 100%;
                position: absolute;
                right: 0;
                top: 4%;
            }
        }
        .GouWuFlag_main{
            overflow:scroll;
            overflow-x: hidden;
            margin: 3%;
            padding-bottom: 3%;
            height: 60%;
            div{
                border-bottom: 1px solid #ccc;
                padding-bottom: 20px;
                margin-bottom: 20px;
                p{
                    font-size: 14px;
                    color: #333;
                }
                button{
                    margin: 5px;
                    font-size: 12px;
                    border-radius: 20px;
                }
            }
            .gouMaiShuLiang{
                position: relative;
                div{
                    width: 90px;
                    position: absolute;
                    border: 0;
                    right: 0;
                    top: 0;
                    input{
                        padding: 5px;
                        height: 30px;
                        font-size: 15px;
                        margin: 0 0 0 3.3%;
                        width: 30%;
                        float: left;
                        border: 0;
                        background-color: #f6f6f6;
                    }
                }
            }
        }
        .GouWuFlag_bottom{
            height: 8%;
            div{
                width: 90%;
                margin: 0 auto;
                height: 90%;
                button{
                    float: left;
                    margin: 0;
                    padding: 0;
                    width: 50%;
                    height: 100%;
                    border: 0;
                    font-size: 12px;
                    color: #ffffff;
                }
                :nth-child(1){
                    background-image: linear-gradient(to right, #FFC500, #FF9402);
                    border-radius: 15px 0 0 15px;
                }
                :nth-child(2){
                    border-radius: 0 15px 15px 0;
                    background-image: linear-gradient(to right, #FF7A00, #FE560A);
                }
            }
        }
    }
    .fuWu-enter,.fuWu-leave-to{
        transform: translateY(100%);
        opacity: 0;
    }
    .fuWu-enter-active,.fuWu-leave-active{
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
    }
    .active{
        background-color: #FF7A00;
        color: #ffffff;
        border: 1px solid #FF7A00 ;
    }
    .pingJia{
        width: 100%;
        background-color: #fff;
        .pingjia_header{
            padding: 0;
            margin: 0;
            :nth-child(1){
                margin-left: 2%;
            }
            :nth-child(3){
                float: right;
                margin-right: 2%;
            }
            :nth-child(2){
                float: right;
                margin-right: 2%;
                font-weight: 600;
            }
            :nth-child(3),:nth-child(2){
                color: rgb(255, 80, 0);
            }
        }
        div{
            position: relative;
            width: 94%;
            margin: 0 auto 10%;
            img{
                border-radius: 100%;
            }
            span{
                color: #999999;
            }
            p{
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
        }
    }
    .dianPu{
        background-color: #fff;
        .dianPu_one{
            height: 50%;
            .dianPu_one_left{
                float: left;
                width: 50%;
                height: 100%;
                position: relative;
                .touXiang{
                    left: 10%;
                    top: 20%;
                    position: absolute;
                    height: 80%;
                }
                span{
                    left: 42%;
                    top: 20%;
                    position: absolute;

                }
                .dianPu_one_left_dengJi{
                    position: absolute;
                    left: 42%;
                    height: 100%;
                    padding-top: 20%;
                    .dengJi{
                        height: 60%;
                        float: left;
                    }
                }
            }
            .dianPu_one_right{
                float: left;
                width: 50%;
                position: relative;
                padding-right: 2%;
                button{
                    float: right;
                    margin: 10%  3%;
                    padding:2% ;
                    border-radius: 20px;
                }
                :nth-child(2){
                    color: rgb(255, 80, 0);
                    border: 1px solid rgb(255, 80, 0);
                    background-color: #fff;
                }
                :nth-child(1){
                    background-color: rgb(255, 80, 0);
                    color: #ffffff;
                    border: 0;
                }
            }
        }
        .dianPu_two{
            height: 50%;
            padding: 3% 2% 2% 0;
            .dianPu_two_span{
                margin: 4%;
                color: #999999;
                span{
                    color: rgb(255, 80, 0);;
                }
            }
        }
    }
    .xiangQing{
        position: relative;
        .xiangQing_p{
            text-align: center;
            position: relative;
            span{
                position: absolute;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                top: 50%;
                background-color: #efeff4;
                z-index: 99;
                padding: 0 10px;
                color: #999;
            }
            .borderBottom{
                position: absolute;
                width: 50%;
                height: 1px;
                border-bottom: 1px solid #999999;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                top: 50%;
            }
        }
        img{
            width: 100%;
            vertical-align:bottom
        }
    }
    .MaiGou{
        width: 100%;
        height: 10%;
        min-height: 50px;
        position: fixed;
        z-index: 99999999;
        bottom: 0;
        background-color: #fff;
        box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, 0.6);
        div{
            width: 90%;
            height: 30px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            top: 50%;
            button{
                float: left;
                margin: 0;
                padding: 0;
                width: 50%;
                height: 100%;
                border: 0;
                font-size: 12px;
                color: #ffffff;
            }
            :nth-child(1){
                background-image: linear-gradient(to right, #FFC500, #FF9402);
                border-radius: 15px 0 0 15px;
            }
            :nth-child(2){
                border-radius: 0 15px 15px 0;
                background-image: linear-gradient(to right, #FF7A00, #FE560A);
            }
        }
    }
    .XiangXipingJia{
        position: fixed;
        z-index: 99999999999999;
        height: 100%;
        width: 100%;
        background-color: #fff;
        top: 0;
        .XiangXipingJia_header{
            position: absolute;
            width: 100%;
            height: 10%;
            left: 50%;
            transform: translateX(-50%);
            top: 0;
            background-color: #ffffff;
            border-bottom:1px solid #ccc ;
            box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, 0.6);
            i,span{
                color: #666;
            }
            span{
                margin-left:33%;
                font-weight: 600;
            }
        }
        .XiangXipingJia_loadMore{
            position: absolute;
            overflow:scroll;
            overflow-x: hidden;
            height: 90%;
            width: 95%;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
            .XiangXipingJia_loadMore_list{
                border-bottom: 1px solid #cccccc;
                .XiangXipingJia_loadMore_list_header{
                    height: 50px;
                    width: 100%;
                    line-height: 50px;
                    img{
                        width: 20px;
                        border-radius: 100%;
                    }
                    span{
                        font-size: 14px;
                        color: #999999;
                    }
                    i{
                        font-style: normal;
                        float: right;
                        font-size: 12px;
                        color: #999999;
                    }
                }
                p{
                    color: black;
                }
                .XiangXipingJia_loadMore_list_img{
                    div{
                        width: 20%;
                        display: inline-block;
                        padding: 10px;
                        img{
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
    .pingJia-enter,.pingJia-leave-to{
        opacity: 0;
        transform: translateX(100%);
    }
    .pingJia-enter-active,.pingJia-leave-active{
        transition: all 0.3s;
    }
</style>