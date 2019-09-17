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
        <mt-swipe :auto="4000" :show-indicators="false" class="swipe" v-getHeight="0.312" ref="swipe">
            <mt-swipe-item class="swipe_a" v-for="(item,i) in imgUrl" :key="i">
                <img :src="item.url" alt='图片获取失败' style="height: 100%; width: 100%;">
            </mt-swipe-item>
        </mt-swipe>
        <mt-swipe :auto="0" class="navList" v-getHeight="0.5" ref="navList">
            <mt-swipe-item class="navList_first" v-for="(item,id) in navList" :key="id">
                <div v-for="i in item" :key="i.url">
                    <img :src="i.url" alt="获取失败">
                    <p>{{i.name}}</p>
                </div>
            </mt-swipe-item>
        </mt-swipe>
        <div class="news" v-getHeight="0.16" ref="News">
            <router-link to="/news" class="news_logo" >
                <img src="../image/hotNews.jpg" alt="获取失败" style="height: 100%;">
            </router-link>
            <div class="news_li" ref="news_box" >
                <router-link :to="'/news?'+'docid1='+item.main[0].docid+'&'+'docid2='+item.main[1].docid"  v-for="(item,i) in newsList" :key="item.id" >
                    <div ref="news_txt">
                        <p>
                            <span class="hot">热门</span>
                            <span class="text">{{item.main[0].title}}</span>
                        </p>
                        <p>
                            <span class="hot">热门</span>
                            <span class="text">{{item.main[1].title}}</span>
                        </p>
                        <img :src="item.main[1].imgsrc" alt="无法显示" >
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    Vue.directive("getHeight",{
        bind: function (el,binding) {
            el.style.height = window.innerWidth * binding.value + "px";
        }
    });
    export default {
        name: "home",
        data: function () {
            return {
                imgUrl: null,
                screenWidth: null,
                navList:null,
                newsList:[
                    {
                        "id": 1,
                        "main": [
                            {
                                "docid": "EP79A80Q0001899N",
                                "title": "所罗门群岛被曝即将驱逐台\"大使\" 台当局回应",
                                "url": "http://3g.163.com/news/19/0916/17/EP79A80Q0001899N.html",
                                "imgsrc": "http://cms-bucket.ws.126.net/2019/09/16/64bd2adbe28a483c9a6217cf6ce1704d.png"
                            },
                            {
                                "docid": "EP7B0HMR0001875N",
                                "title": "\"光头警长\"开微博给内地网友问好 简介:我是中国人",
                                "url": "http://3g.163.com/news/19/0916/17/EP7B0HMR0001875N.html",
                                "imgsrc": "http://cms-bucket.ws.126.net/2019/09/16/58e25283cef04b3194a4da0d5100f3ee.png"
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "main": [
                            {
                                "docid": "EP7B73360001899N",
                                "title": "男子骑电动车剐遮阳棚部件弹出 路人左眼被刺失明",
                                "url": "http://3g.163.com/news/19/0916/17/EP7B73360001899N.html",
                                "imgsrc": "http://cms-bucket.ws.126.net/2019/09/16/e8551cb430e6449d88e9ce95404d551a.png"
                            },
                            {
                                "docid": "EP7F8B7Q00019D51",
                                "imgsrc": "http://cms-bucket.ws.126.net/2019/09/16/cd1027c49b44483a917dd9f95454fc4a.png",
                                "title": "惊掉下巴的大神之作，离我们究竟有多远",
                                "url": "http://3g.163.com/news/19/0916/18/EP7F8B7Q00019D51.html"
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "main": [
                            {
                                "docid": "EP6IA5BO0001875P",
                                "title": "女子相亲被骗失身：已婚男在世纪佳缘也能通过注册",
                                "imgsrc": "http://cms-bucket.ws.126.net/2019/09/16/4ed7164495cc44d89a71145ba9a5ff3a.png",
                                "url": "http://3g.163.com/news/19/0916/10/EP6IA5BO0001875P.html"
                            },
                            {
                                "docid": "EP73UCLI0001899O",
                                "title": "CNN终于承认:香港的示威者变得更加暴力和丑陋",
                                "imgsrc": "http://cms-bucket.ws.126.net/2019/09/16/13e3caf0b61d47fc9c66e2def8d58b2e.png",
                                "url": "http://3g.163.com/news/19/0916/15/EP73UCLI0001899O.html"
                            }
                        ]
                    }
                ]
            }
        },
        created() {
            this.getImg();
            this.getNavList();
            this.getNewsList();
        },
        mounted() {
            window.onresize = () => {
                return (() => {
                    window.screenWidth = window.innerWidth;
                    this.screenWidth = window.screenWidth;
                })()
            };
            this.setNewsListInterval();
            this.getNewsFZ();
        },
        updated(){
            this.getNavListFZ();
            // this.getNewsFZ();
        },
        methods: {
            getImg() {
                this.$http.get(
                    "../json/img.json"
                ).then(function (res,err) {
                    if(res.status===200){
                        this.imgUrl = res.body
                    }else {
                        alert(err)
                    }
                })
            },
            getNavListFZ(){
                let arrList=this.$refs.navList.$el.children[0].children;
                for (let i = 0;i<arrList.length;i++) {
                    for(let j=0;j<arrList[i].children.length;j++){
                        arrList[i].children[j].children[1].style.fontSize=window.innerWidth*0.029+'px';
                    }
                }
            },
            getNewsFZ(){
                let newsTxt=this.$refs.news_txt;
                for (let i = 0;i<newsTxt.length;i++) {
                    newsTxt[i].style.height=this.$refs.News.clientHeight+"px";
                    for(let j=0;j<newsTxt[i].children.length;j++){
                        newsTxt[i].children[0].firstElementChild.style.fontSize=window.innerWidth*0.029+'px';
                        newsTxt[i].children[0].firstElementChild.style.lineHeight=window.innerWidth*0.03+'px';
                        newsTxt[i].children[1].firstElementChild.style.fontSize=window.innerWidth*0.029+'px';
                        newsTxt[i].children[1].firstElementChild.style.lineHeight=window.innerWidth*0.03+'px';
                        newsTxt[i].children[0].children[1].style.fontSize=window.innerWidth*0.029+'px';
                        newsTxt[i].children[0].children[1].style.lineHeight=window.innerWidth*0.03+'px';
                        newsTxt[i].children[1].children[1].style.fontSize=window.innerWidth*0.029+'px';
                        newsTxt[i].children[1].children[1].style.lineHeight=window.innerWidth*0.03+'px';
                    }
                }

            },
            getNavList(){
                this.$http.get('../json/navList.json').then(
                    function (res,err) {
                        if(res.status===200){
                            this.navList=res.body
                        }else {
                            alert(err)
                        }
                    }
                )
            },
            getNewsList(){
                this.$http.get('../json/newsLunBo.json').then(function (res, err) {
                    if(res.status===200){
                        if (typeof res.body=="object") {
                            this.newsList=res.body;
                        }
                    }else {
                        alert(err)
                    }
                })
            },
            setNewsListInterval(){
                setInterval(()=>{
                    let re=this.newsList.splice(0,1);
                    this.newsList.push(re[0])
                },2000)
            },

        },
        watch: {
            screenWidth(val) {
                this.$refs.swipe.$el.style.height = val * 0.312 + 'px';
                this.$refs.navList.$el.style.height = val * 0.5 + 'px';
                this.$refs.News.style.height=val*0.16+'px';
                let arrList = this.$refs.navList.$el.children[0].children;
                for (let i = 0;i<arrList.length;i++) {
                    for(let j=0;j<arrList[i].children.length;j++){
                        arrList[i].children[j].children[1].style.fontSize=val*0.029+'px';
                    }
                }
                let newsTxt=this.$refs.news_txt;
                for (let i = 0;i<newsTxt.length;i++) {
                    newsTxt[i].style.height=this.$refs.News.clientHeight+"px";
                    for(let j=0;j<newsTxt[i].children.length;j++){
                        newsTxt[i].children[0].firstElementChild.style.fontSize=window.innerWidth*0.029+'px';
                        newsTxt[i].children[0].firstElementChild.style.lineHeight=window.innerWidth*0.03+'px';
                        newsTxt[i].children[1].firstElementChild.style.fontSize=window.innerWidth*0.029+'px';
                        newsTxt[i].children[1].firstElementChild.style.lineHeight=window.innerWidth*0.03+'px';
                        newsTxt[i].children[0].children[1].style.fontSize=window.innerWidth*0.029+'px';
                        newsTxt[i].children[0].children[1].style.lineHeight=window.innerWidth*0.03+'px';
                        newsTxt[i].children[1].children[1].style.fontSize=window.innerWidth*0.029+'px';
                        newsTxt[i].children[1].children[1].style.lineHeight=window.innerWidth*0.03+'px';
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .swipe {
        margin-top: 30px;
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

    .news{
        padding-top: 1%;
        width: 100%;
        background-color: #fff;
        position: relative;
        overflow: hidden;
        .news_logo{
            margin-left: 3%;
            vertical-align:top;
            img{
                vertical-align:top;
            }
        }
        .news_li{
            width: 100%;
            position: absolute;
            top:0;
            left: 20%;
            div{
                width: 80%;
                display: inline-block;
                position: relative;
                p{
                    height: 50%;
                    margin: 0;
                    padding: 0;
                    position: relative;
                    .hot{
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        border: 1px solid red;
                        color: red;
                        border-radius: 5px;
                    }
                    .text{
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        left: 10%;
                        width: 60%;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
                img{
                    position: absolute;
                    width: 25%;
                    height: 100%;
                    right: 0;
                    top: 0;
                }
            }
        }
    }

</style>