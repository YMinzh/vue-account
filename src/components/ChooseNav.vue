<template>
    <div class="ChooseNav">
        <div class="top">
            <div><myDatepicker :date="time1" @change="getStartVal" myPlaceholder="起始时间"></myDatepicker></div>
            <div><myDatepicker :date="time2" @change="getEndVal" myPlaceholder="截止时间"></myDatepicker></div>
        </div>
        <div class="down">
            <select name="" v-model="chaType" @change="getVal" id="type">
                <option value="0" disabled selected hidden>收入/支出</option>
                <option value="3">全部</option>
                <option value='1'>收入</option>
                <option value='2'>支出</option>
            </select>
            <select name="" id="" @change="getVal" v-model="id">
                <option value="0" disabled selected hidden>收入/支出类别</option>
                <option value="3">全部</option>
                <option v-show="chaType!='2'" v-for="(item, index) in CaptchaArr[0]" :key="index" :value="item.id" >{{item.name}}</option>
                <option v-show="chaType!='1'" v-for="(item, index) in CaptchaArr[1]" :key="'t'+index" :value="item.id" >{{item.name}}</option>
            </select>
            <select name="" id="" @change="getVal" v-model="dealType">
                <option value="0" disabled selected hidden>交易情况</option>
                <option value="all">账面</option>
                <option value="did">已收已付</option>
                <option value="wait">待收待付</option>
            </select>
        </div>
    </div>
</template>

<script>
import myDatepicker from 'vue-datepicker/vue-datepicker-es6.vue'
export default {
    components: { myDatepicker },
    props: ["CaptchaArr"],
    data() {
        return {
            chaType: '0',
            id: '0',
            time1: {time: new Date()},
            time2: {time: new Date()},
            startTime: '',
            endTime: '',
            dealType: '0'
        }
    },
    methods: {
        getStartVal(val){
            this.startTime=val
            this.getVal()
        },
        getEndVal(val){
            this.endTime=val
            this.getVal()
        },
        getVal(){
            this.$emit("callback",{startTime: this.startTime, endTime: this.endTime, chaType: this.chaType, id: this.id, dealType: this.dealType})   
        },

    },
    mounted() {
        console.log(this.chaType!=1,this.chaType!=2,this.chaType!=undefined)
        this.time1 = new Date()
        this.time2 = new Date()
        // setTimeout(()=>{
        //     this.chaType = ''
        // },100)
    },
    watch: {
        CaptchaArr(n,o){
            this.CaptchaArr
        },
        chaType(){
            this.id = 0
        }
    }
}
</script>

<style lang="scss" scoped>
    .ChooseNav{
        padding-bottom: 10px;
        margin: 0 auto;
        width: 100%;
        .top{
            margin-top: 10px;
            width: 100;
            display: flex;
            justify-content: space-around;
            font-size: 0.7rem;
            & > div{
                flex: 0 0 45%;
                display: flex;
                justify-content: center;
            }
        }
        .down{
            margin-top: 10px;
            width: 100%;
            display: flex;
            justify-content: space-around;
            select{
                flex-grow: 1;
                background-color: transparent;
                border: none;
                outline: none;
                appearance:none;
                text-align: center;
                text-align-last: center;
                color: rgb(95,95,95);
                option{
                    color: rgb(95,95,95);
                }
            }
        }
    }
</style>
