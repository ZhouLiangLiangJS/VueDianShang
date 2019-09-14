<template>
    <div>
        <nav>
            <div>
                <span class="baby mui-icon mui-icon-arrowdown">宝贝</span>
                <input type="text" v-model="value">
                <span class="mui-icon mui-icon-search search"></span>
            </div>
            <router-link to="/home" class="cancel">取消</router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "search",
        data(){
            return{
                value:''
            }
        }
    }
</script>

<style scoped lang="less">
    div{
        nav{
            background-color: #fff;
            height: 30px;
            padding-top: 3px;
            width: 100%;
            position: fixed;
            top: 0;
            div{
                margin-left: 3%;
                height: 24px;
                display: inline-block;
                width: 80%;
                background-color: #dbdbdb;
                text-align: center;
                border-radius: 5px;
                position: relative;
                .baby{
                    display: inline-block;
                    height: 100%;
                    color: #999;
                    background-color: #dbdbdb;
                    font-size: 14px;
                    text-align: center;
                    line-height: 28px;
                    margin-left: 10px;
                    position: absolute;
                    left: 0;
                }
                input{
                    border: 0;
                    width: 65%;
                    height: 100%;
                    background-color: #dbdbdb;
                    padding: 0;
                    color: #555555;
                    font-size: 14px;
                    position: absolute;
                    left: 62px;
                }
                .search{
                    display: inline-block;
                    text-align: center;
                    height: 24px;
                    color: #6d6d72;
                    background-color: #dbdbdb;
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
                position: relative;
                top: -6px;
            }
        }
    }
</style>