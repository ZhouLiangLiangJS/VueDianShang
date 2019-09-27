<template>
    <div>
        <div class="nav">
            <a :style="'fontSize:'+this.screenWidth*0.1+'px'" @click.prevent="backGo" class="mui-icon-extra mui-icon-extra-arrowleftcricle"></a>
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
            <span :style="'fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.11+'px'">已选:{{guiGeXuanZhong===null?showCommodity.JiaRuGouWuChe[0].classTitle[0].txt:guiGeXuanZhong}}</span>
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
                    <img :src="GouWuFlag_nav_imgSrc===null?showCommodity.JiaRuGouWuChe[0].classTitle[0].imgUrl:GouWuFlag_nav_imgSrc" alt="无法显示">
                    <span>￥{{GouWuFlag_nav_JiaGe===null?showCommodity.JiaRuGouWuChe[0].classTitle[0].JiaGe:GouWuFlag_nav_JiaGe}}</span>
                    <span>已选：{{guiGeXuanZhong===null?showCommodity.JiaRuGouWuChe[0].classTitle[0].txt:guiGeXuanZhong}}</span>
                    <span @click="GouWuFlag=!GouWuFlag" class="mui-icon mui-icon-closeempty"></span>
                </div>
                <div class="GouWuFlag_main">
                    <div :key="item.title" v-for="(item,i) in showCommodity.JiaRuGouWuChe">
                        <p>{{item.title}}</p>
                        <button :class="{active:child.txt===JiaRuGouWuCheActive}" :key="child.txt"  @click="JiaRuGouWuChe(i,child.txt)" v-for="child in item.classTitle">{{child.txt}}</button>
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
    </div>
</template>

<script>
    import vueSeamless from 'vue-seamless-scroll'

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
                GouWuFlag_nav_JiaGe:null,
                GouMaiShuLiang:1,
                JiaRuGouWuCheActive: "12CM厚(针织面料+3E环保椰棕)"
            }
        },
        methods:{
            getJson(){
              this.$http.get("../json/commodityDetails.json").then(
                  function (res,err) {
                      if (res.status === 200) {
                           for (let i = 0; i < res.body.length; i++) {
                               if (this.$route.params.id===res.body[i].id){
                                   this.showCommodity=res.body[i];
                                   // for(let j = 0;j<res.body[i].JiaRuGouWuChe.length;j++){
                                   //     this.JiaRuGouWuCheActive[j]={title:res.body[i].JiaRuGouWuChe[j].title,active:null}
                                   // }
                              }
                          }
                      }else {
                          console.log(err)
                      }
                  }
              )
              console.log(this.JiaRuGouWuCheActive)
          },
            backGo(){
                this.$router.go(-1)
            },
            JiaRuGouWuChe(i,txt,imgUrl,jiaGe){
                this.JiaRuGouWuCheActive=txt;
                console.log(this.JiaRuGouWuCheActive);
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
        components:{vueSeamless}
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
        z-index: 99;
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
        z-index: 99;
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
        background-image: linear-gradient(to right, #FF7A00 100%, #FE560A 100%) ;
        color: #ffffff;
        border: 0;
    }
</style>