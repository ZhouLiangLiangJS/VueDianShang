<template>
    <div style="width: 100%">
        <nav ref="news_nav" v-get-height="0.1">
            <div class="news_nav_p">
                <router-link class="news_nav_routerLink mui-active" :ref="item.type" v-for="item in NewsType" :to="item.type" :key="item.type">
                    {{item.typeC}}
                </router-link>
            </div>
        </nav>
        <newsListMoBan :width="screenWidth" ref="newsListMoBan"></newsListMoBan>
    </div>
</template>

<script>
    import newsListMoBan from './newsListMoBan.vue';
    export default {
        name: "news.vue",
        data(){
            return{
                queryNewList:[],
                NewsTypeBase:null,
                screenWidth:window.innerWidth,
                NewsType:[]
            }
        },
        created(){
            this.getNewListGet();
            this.getNewType()
        },
        mounted() {
            window.onresize = () => {
                return (() => {
                    window.screenWidth = window.innerWidth;
                    this.screenWidth = window.screenWidth;
                })()
            };
        },
        updated(){
            this.getFz()
        },
        methods:{
            getNewListGet(){
                this.$http.get('https://api.xiaohuwei.cn/memeda.php?id='+this.$route.query.docid1).then(
                    function (res,err) {
                        if (res.status === 200) {
                            if(typeof res.body==="object"){
                                this.queryNewList.push(res.body)
                            }
                        }else {
                            alert('连接服务器失败请检查网络');
                            console.log(err)
                        }
                    }
                );
                this.$http.get('https://api.xiaohuwei.cn/memeda.php?id='+this.$route.query.docid2).then(
                    function (res,err) {
                        if (res.status === 200) {
                            if(typeof res.body==="object"){
                                this.queryNewList.push(res.body)
                            }
                        }else {
                            alert('连接服务器失败请检查网络');
                            console.log(err)
                        }
                    }
                )
                console.log(this.queryNewList)
            },
            getNewType(){
                this.$http.get("../json/newsNav.json").then(function (res) {
                        this.NewsType=res.body;
                })
            },
            getFz(){
                this.$refs.news_nav.style.lineHeight=this.$refs.news_nav.style.height;
                this.$refs.newsListMoBan.$el.style.paddingTop=this.$refs.news_nav.style.height;
                let fz=this.$refs.news_nav.firstElementChild.children;
                for (let k=0;k<fz.length;k++){
                    fz[k].style.fontSize=window.innerWidth*0.05+'px'
                }
            },
            f1(hot,motion,toutiao,yule) {
                this.$refs.hot[0].$el.style.fontWeight=hot;
                this.$refs.motion[0].$el.style.fontWeight=motion;
                this.$refs.toutiao[0].$el.style.fontWeight=toutiao;
                this.$refs.yule[0].$el.style.fontWeight=yule;
            }
        },
        watch:{
            screenWidth(val) {
                this.$refs.news_nav.style.height=val*0.1+'px';
                this.getFz();
                this.$refs.newsListMoBan.$el.style.paddingTop=this.$refs.news_nav.style.height
            },
            "$route.path":function (val) {
                let str=val.slice(6);
                if (str==='hot'){
                    this.f1(600,400,400,400)
                } else if(str==='motion'){
                    this.f1(400,600,400,400)
                }else if(str==='toutiao'){
                    this.f1(400,400,600,400)
                }else if(str==='yule'){
                    this.f1(400,400,400,600)
                }
            }
        },
        components:{
            newsListMoBan
        }
    }
</script>

<style scoped lang="less">
    nav{
        background-color: #009aff;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 999;
        .news_nav_p{
            height: 100%;
            .news_nav_routerLink{
                color: white;
                margin-left: 10%;
            }
            .news_nav_routerLink:nth-child(1){
                font-weight: 600;
            }
        }
    }

</style>