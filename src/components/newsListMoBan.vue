<template>
    <div ref="newsListMoBan" style="margin-bottom: 50px">
        <a class="list" :href="item.url" v-get-height="0.4" ref="newsListMoBan_div" v-for="item in newsListMoBan">
            <div class="left">
                <div class="h1">{{item.title}}</div>
                <div class="h2">{{item.digest||item.dkeys}}</div>
                <div class="h3"><span>{{item.source}}</span> <i>{{item.ptime}}</i></div>
            </div>
            <div class="right" ref="img_div">
                <img :src="item.imgsrc?item.imgsrc:item.recImgsrc" alt="图片加载失败" ref="img">
            </div>
        </a>
    </div>
</template>

<script>
    export default {
        name: "newsListMoBan",
        data(){
            return{
                newsListMoBan: [],
                docid1:'EP79A80Q0001899N',
                docid2:"EP7B0HMR0001875N"
            }
        },
        props:['width'],
        created(){
            this.docid1=this.$route.query.docid1;
            this.docid2=this.$route.query.docid2;
            this.zhiXing();
        },
        mounted(){
            this.getNewsActive(this.docid2);
            this.getNewsActive(this.docid1);
            this.getFZ()
        },updated(){
            this.getFZ()
        },
        methods:{
            getNewsActive(docid){
                this.$http.get("https://api.xiaohuwei.cn/memeda.php?id="+docid).then(function (res,err) {
                    if (typeof res.body==='object'){
                        this.newsListMoBan.unshift(res.body);
                    }else {
                        this.getNewsActive(docid)
                    }
                })
            },
            getNewTypeBase(type){
                this.$http.get("https://api.xiaohuwei.cn/news.php?type="+type).then(function (res,err) {
                    if (typeof res.body=='object'){
                        this.newsListMoBan=res.body;
                        this.newsListMoBan.splice(0,1);
                        console.log(this.newsListMoBan)

                    }else {
                        this.getNewTypeBase(type)
                    }
                })
            },
            getFZ(){
                let newsArr=this.$refs.newsListMoBan.children;
                console.log(newsArr);
                for(let i =0;i<newsArr.length;i++){
                    newsArr[i].style.height=window.innerWidth*0.4+'px';
                    newsArr[i].firstElementChild.children[0].style.fontSize=window.innerWidth*0.0625+'px';
                    newsArr[i].firstElementChild.children[0].style.lineHeight=(newsArr[i].firstElementChild.children[0].clientHeight/2)+'px';
                    newsArr[i].firstElementChild.children[1].style.fontSize=window.innerWidth*0.0437+'px';
                    newsArr[i].firstElementChild.children[2].firstElementChild.style.fontSize=window.innerWidth*0.032+'px';
                    newsArr[i].firstElementChild.children[2].lastElementChild.style.fontSize=window.innerWidth*0.032+'px';
                }
            },
            zhiXing(){
                let str=this.$route.path.slice(6);
                if(str==='hot'){
                    this.getNewTypeBase(str);
                    this.getNewsActive(this.docid2);
                    this.getNewsActive(this.docid1);
                }else {
                    this.getNewTypeBase(str);
                }
            }
        },
        watch:{
            "$route.path":function (val) {
                this.zhiXing()
            },
            "width":function (val) {
                this.getFZ()
            }
        }
    }
</script>

<style scoped lang="less">
    .list{
        display: block;
        margin: 0 2% 0 2%;
        padding: 2% 0 2% 0;
        border-bottom: 1px solid rgb(231, 231, 231);
        .left{
            float: left;
            width: 70%;
            height: 100%;
            position: relative;
            .h1{
                width: 100%;
                height: 50%;
                text-align: justify;
                text-justify: newspaper;
                word-break: break-all;
                line-height: 30px;
                overflow: hidden;
                font-size: 20px;
                color: rgb(51, 51, 51);
            }
            .h2{
                padding-top: 5%;
                width: 100%;
                height: 30%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 14px;
                color: rgb(102, 102, 102);
            }
            .h3{
                span{
                    border-radius: 5px;
                    color: #007aff;
                    border: 1px solid #007aff;
                    font-size: 10px;
                }
                i{
                    color: rgb(153, 153, 153);
                    font-size: 10px;
                }
            }
        }
        .right{
            float: right;
            width: 30%;
            height: 100%;
            position: relative;
            img{
                width: 100%;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 5px;
            }
        }
    }
</style>