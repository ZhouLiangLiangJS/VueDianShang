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
            <p :style="'fontSize:'+this.screenWidth*0.08+'px;lineHeight:'+this.screenWidth*0.088+'px'">￥{{showCommodity.jiaGe}}</p>
            <p :style="'fontSize:'+this.screenWidth*0.05+'px;lineHeight:'+this.screenWidth*0.06+'px'">{{showCommodity.title}}</p>
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
        <transition name="fuWu">
            <div :style="'height:'+this.screenHidth*0.8+'px'" class="fuWuFlag" v-show="fuWuFlag">
                <div :style="'height:'+this.screenHidth*0.05+'px;fontSize:'+this.screenWidth*0.04+'px;lineHeight:'+this.screenWidth*0.1+'px'" class="fuWuFlag_title">基础服务</div>
                <div :style="'height:'+this.screenHidth*0.65+'px'" class="fuWuFlag_main">

                </div>
                <div :style="'height:'+this.screenHidth*0.08+'px'" class="fuWuFlag_bottom">
                    <button @click="fuWuFlag=!fuWuFlag">完成</button>
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
                screenHidth:window.innerHeight,
                fuWuFlag:false
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
                                   console.log(this.showCommodity)
                              }
                          }
                      }else {
                          console.log(err)
                      }
                  }
              )
          },
          backGo(){
              this.$router.go(-1)
          }
        },
        created(){
            this.getJson();
            window.onresize = () => {
                return (() => {
                    window.screenWidth = window.innerWidth;
                    this.screenWidth = window.screenWidth;
                    this.screenHidth = window.innerHeight;
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
            text-align: center;
            z-index: 9;
        }
        .fuWuFlag_main{
            overflow:scroll;
            background-color: darkblue;
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
</style>