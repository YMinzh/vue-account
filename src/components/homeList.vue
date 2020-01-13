<template>
    <div class="homeList">
        <div class="date" v-show="isShowDate">{{listData.date}}</div>
        <div :class="{data: true, red: listData.type==1, green: listData.type==2}" @click="goDetals">
            <div class="left realLeft">{{listData.type==1?"收入":"支出"}}</div>
            <div class="right realRight" v-show="type=='real'">
                <div>{{listData.money}}</div>
            </div>
            <div class="right accRight" v-show="type=='acc'">
                <div>应{{font}}: {{listData.accMoney}}</div>
                <div>已{{font}}: {{listData.money}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            font: ''
        }
    },
    props: ["listData","type","isShowDate","path"],
    mounted() {
        if(this.listData.type==1){
            this.font="收"
        }else{
            this.font = "付"
        }
    },
    methods: {
        goDetals(){
            this.$router.push({path: this.path,query: this.listData.id})
        }
    }
}
</script>

<style lang="scss" scoped>
    .homeList{
        width: 100%;
        background-color: #fff;
        .date{
            padding-left: 10%;
            line-height: 20px;
            height: 20px;
            font-size: 12px;
            background-color: #e2dfdf;
            color: #222222;
        }
        .data{
            height: 45px;
            width: 80%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e6dbdb;
            .left{
                font-size: 1.4rem;
                display: flex;
                align-items: center;
                flex-grow: 0;
            }
            .right{
                flex-grow: 1;
                font-size: 1.4rem;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: center;
            }
            .accRight{
                font-size: 0.8rem;

            }    
        }
        .red{
            color: red;
        }
        .green{
            color: green;
        }
    }
</style>