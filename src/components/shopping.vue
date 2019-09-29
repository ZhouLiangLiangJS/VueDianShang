<template>
    <div>
        <input type="text" v-model="$store.state.count">
        <h1>{{this.$store.state.count}}</h1>
        <cai></cai>
    </div>
</template>

<script>
    import cai from './caiNiXiHuan.vue'

    export default {
        name: "shopping",
        methods:{

        },
        components:{
            cai
        }
    }
</script>

<style scoped lang="less">

</style>