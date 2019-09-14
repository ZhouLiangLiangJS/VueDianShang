<template>
    <div>
        <router-link to="/search">
            <header class="search">
                <nav class="search_main">
                    <span class="mui-icon mui-icon-search"></span>
                    <span class="search_baby">寻找宝贝店铺</span>
                </nav>
            </header>
        </router-link>
        <mt-swipe :auto="4000" :show-indicators="false" class="swipe" v-getSwipeHeight ref="swipe">
            <mt-swipe-item class="swipe_a" v-for="(item,i) in imgUrl" :key="item.url">
                <img :src="item.url" alt='图片获取失败' style="height: 100%; width: 100%;">
            </mt-swipe-item>
        </mt-swipe>
        <mt-swipe :auto="0" class="navList" v-getNavListHeight ref="navList">
            <mt-swipe-item class="navList_first">
                <div>
                    <img src="../image/01e0e818a7505267.png" alt="">
                    <p>京东超市</p>
                </div>
                <div>
                    <img src="../image/28cda0a571b4a576.png" alt="">
                    <p>数码电器</p>
                </div>
                <div>
                    <img src="../image/65c0cdc1362635fc.png" alt="">
                    <p>潮牌服饰</p>
                </div>
                <div>
                    <img src="../image/5ad87bf0N66c5db7c.png" alt="">
                    <p>生鲜水果</p>
                </div>
                <div>
                    <img src="../image/5ae01befN2494769f.png" alt="">
                    <p>京东到家</p>
                </div>
                <div>
                    <img src="../image/5b03b74eN3541598d.png" alt="">
                    <p>海囤全球</p>
                </div>
                <div>
                    <img src="../image/5b03fae3N67f78fe3.png" alt="">
                    <p>充值缴费</p>
                </div>
                <div>
                    <img src="../image/016033c7ef3e0c6c.png" alt="">
                    <p>9.9元拼</p>
                </div>
                <div>
                    <img src="../image/5b03b779N5c0b196f.png" alt="">
                    <p>领券</p>
                </div>
                <div>
                    <img src="../image/4792ec307a853e9f.png" alt="">
                    <p>PLUS会员</p>
                </div>

            </mt-swipe-item>
            <mt-swipe-item class="navList_first">
                <div>
                    <img src="../image/d6ab6a0f64fee068.png" alt="">
                    <p>拍拍二手</p>
                </div>
                <div>
                    <img src="../image/591d94edNc42fb94d.png" alt="">
                    <p>物流查询</p>
                </div>
                <div>
                    <img src="../image/cdbad904f61e1fb7.png" alt="">
                    <p>海囤全球</p>
                </div>
                <div>
                    <img src="../image/9f4cd68276f4e971.png" alt="">
                    <p>商城拍卖</p>
                </div>
                <div>
                    <img src="../image/3a1735f6a79d0721.png" alt="">
                    <p>唯品会</p>
                </div>
                <div>
                    <img src="../image/5cdd0be3Nfce1ba98.jpg" alt="">
                    <p>手机缴费</p>
                </div>
                <div>
                    <img src="../image/f9d57f39e55c7321.png" alt="">
                    <p>沃尔玛</p>
                </div>
                <div>
                    <img src="../image/4d19bf58d42fc9c4.png" alt="">
                    <p>美妆管馆</p>
                </div>
                <div>
                    <img src="../image/3c2b78a40edc97b2.png" alt="">
                    <p>京东旅行</p>
                </div>
                <div>
                    <img src="../image/29d349f92aeb6eaf.png" alt="">
                    <p>查看全部</p>
                </div>
            </mt-swipe-item>
        </mt-swipe>
        <div>

        </div>
    </div>
</template>

<script>

    export default {
        name: "home",
        data: function () {
            return {
                imgUrl: null,
                screenWidth: null
            }
        },
        created() {
            this.getImg()
        },
        mounted() {
            window.onresize = () => {
                return (() => {
                    window.screenWidth = window.innerWidth;
                    this.screenWidth = window.screenWidth;
                })()
            };
            this.getFZ()
        },
        methods: {
            getImg() {
                this.$http.get(
                    "https://raw.githubusercontent.com/ZhouLiangLiangJS/dataBase/master/img.json"
                ).then(function (res) {
                    this.imgUrl = res.body
                })
            },
            getFZ(){
                let arrList = this.$refs.navList.$el.children[0].children;
                for (let i = 0;i<arrList.length;i++) {
                    for(let j=0;j<arrList[i].children.length;j++){
                        arrList[i].children[j].children[1].style.fontSize=window.innerWidth*0.029+'px';
                    }
                }
            }
        },
        directives: {
            getSwipeHeight: {
                bind: function (el) {
                    el.style.height = window.innerWidth * 0.312 + "px";
                }
            },
            getNavListHeight: {
                bind: function (el) {
                    el.style.height = window.innerWidth * 0.5 + "px";
                }
            }
        },
        watch: {
            screenWidth(val) {
                this.$refs.swipe.$el.style.height = val * 0.312 + 'px';
                this.$refs.navList.$el.style.height = val * 0.5 + 'px';
                let arrList = this.$refs.navList.$el.children[0].children;
                for (let i = 0;i<arrList.length;i++) {
                    for(let j=0;j<arrList[i].children.length;j++){
                        arrList[i].children[j].children[1].style.fontSize=val*0.029+'px';
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .swipe {
        .swipe_a {
            overflow: hidden;
        }
    }

    .search {
        width: 100%;
        height: 30px;
        position: fixed;
        top: 0;
        z-index: 999;
        background-color: #009aff;
        line-height: 30px;

        .search_main {
            margin: 5px auto;
            width: 95%;
            height: 20px;
            border-radius: 5px;
            background-color: #200aff;
            text-align: center;
            line-height: 20px;
            font-size: 13px;
            color: white;
        }

        .search_baby {
            font-size: 12px;
        }

        .mui-icon-search {
            font-size: 18px;
        }
    }

    .navList {
        background-color: #fff;

        .navList_first {
            div {
                width: 20%;
                height: 45%;
                float: left;
                text-align: center;
                position: relative;

                img {
                    width: 50%;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translateX(-50%) translateY(-50%);

                }

                p {
                    width: 100%;
                    text-align: center;
                    position: absolute;
                    bottom: -15%;
                }
            }
        }
    }
</style>