<template>
    <div class="MySelect">
        <select name="" id="" v-model="value" @change="callback()">
            <option value=0 disabled selected hidden>{{defaultKey}}</option>
            <option value=-1 v-show="hasAll">全部</option>
            <option v-for="(item, index) in dataArr" :key="index" :value="item.value" >{{item.key}}</option>
        </select>
    </div>
</template>

<script>
export default {
    data(){
        return{
            value: 0,
            dataArr: []
        }
    },
    props: ["defaultKey","hasAll","listArr","dvalue","isfinish"],
    methods: {
        callback(){
            this.$emit("callback",this.value)
        }
    },
    watch: {
        dvalue(){
            this.value = this.dvalue
        },
        listArr(n,o){
        console.log(this.dataArr)

            this.listArr = n
        console.log(this.dataArr)

        },
        isfinish(){
            this.dataArr =this.listArr
        }
    },
    mounted() {
        console.log(this.dataArr,"111")
        this.dataArr = this.listArr
    },
}
</script>

<style lang="scss" scoped>
    .MySelect{
        width: 100%;
        height: 100%;
        select{
            font-size: 1.2rem;
            height: 100%;
            width: 100%;
            background-color: transparent;
            border: none;
            outline: none;
            appearance:none;
            text-align: start;
            text-align-last: center;
            color: rgb(0,0,0);
            option{
                color: rgb(95,95,95);
            }
        }
    }
</style>