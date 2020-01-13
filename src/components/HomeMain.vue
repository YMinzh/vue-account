<template>
    <div class="HomeMain">
        <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishText"
        loading-text=''
        @load="onLoad"
        :offset= "offset"
        :immediate-check ="immediateCheck"
        >
            <homeList :isShowDate="isShow(index)" :path="'/detals?id='+item.id" :listData="item" :type="type" v-for="(item, index) in listDataArr" :key="index"></homeList>
        </van-list>
        <loading :isLoading="isLoading"/>

    </div>
</template>
<script>
import axios from 'axios'
import homeList from '@/components/homeList'
import loading from '@/components/loading'


export default {
    components: {
        homeList,loading
    },
    data(){
        return{
            isLoading: false,
            loading: false,
            finished: false,
            immediateCheck: false,
            page: 1,
            pageCount: 1,
            type: "acc",
            listDataArr:[],
            homeIn:0,
            homeOut:0 ,
            maxPage:1,
            offset: 0,
            finishText :"没有更多啦"
                // {type: 1, money: 100,captcha: "aha", accMoney: 180,date:"2019-11-12"},
        }
    },
    props: ["mySetting"],
    computed: {
       
    },
    methods: {
        myRequire(){
            var myUrl;
            if(this.mySetting.dealType==0){
                this.mySetting.dealType="all"
            }
            if(this.mySetting.dealType=="did"){
                myUrl = "real"
                this.type = "real"
            }else if(this.mySetting.dealType=="all"){
                myUrl = "account"
                this.type = "acc"
            }else{
                myUrl = "account/waiting"
                this.type = "acc"
            }
            if(this.mySetting.chaType==0){
                this.mySetting.chaType=3
            }
            if(this.mySetting.id==0||this.mySetting.id==3){
                this.mySetting.id=""
            }
            if(this.mySetting.dealType!="acc"&&(this.mySetting.chaType==3)){
                this.mySetting.chaType=1
                this.page--
                this.myRequire()
                this.mySetting.chaType=2
            }
            this.isLoading = true
            axios.request({
                url:  'api/record/'+myUrl+'?token='+localStorage.usermsg,
                method: 'get',
                baseURL: "http://jizhang-api-dev.it266.com/",
                params: {
                    begin_date: this.mySetting.startTime,              //开始日期 例如 "2016-11-01" 可选参数 默认为当前月1日
                    end_date: this.mySetting.endTime,                //结束日期 例如 "2016-11-30" 可选参数 默认为当前月最后一日
                    type: this.mySetting.chaType,                    //类型  1收入 2支付 3全部   可选参数 默认为全部
                    category_id: this.mySetting.id,          //类别ID  可选参数 默认为不限制
                    // account_id: 2220,              //帐户ID  可选参数 默认为不限制
                    // company_name            //交易对象 可选参数 默认不限制 精确匹配
                    page: this.page                    //页码  可选参数 默认为1
                }
            }).then((res)=>{
                // if(res.data.data.code==0){
                //     this.listDataArr = res.data.data.list
                // }

                this.pageCount=res.data.data.page.pageCount
                var list = res.data.data.list
                if(this.mySetting.dealType=="all"||this.mySetting.dealType=="wait"){
                    for(let index in list){
                        var item = {date: list[index].date, type : list[index].type, money: list[index].paid_money, accMoney: list[index].total_money, id: list[index].id}
                        this.listDataArr.push(item)
                        if(list[index].type==1&&this.mySetting.dealType=="all"){
                            this.homeIn+=parseFloat(list[index].total_money)
                        }else if(list[index].type==2&&this.mySetting.dealType=="all"){
                            this.homeOut+=parseFloat(list[index].total_money)
                        }else if(list[index].type==1&&this.mySetting.dealType=="wait"){
                            this.homeIn+=parseFloat(list[index].total_money - list[index].paid_money)
                        }else if(list[index].type==2&&this.mySetting.dealType=="wait"){
                            this.homeOut+=parseFloat(list[index].total_money - list[index].paid_money)
                        }
                    }
                }else{
                    for(let index in list){
                        var item = {date: list[index].date, type: list[index].type, money: list[index].money, id: list[index].record_id}
                        this.listDataArr.push(item)
                        if(list[index].type==1){
                            this.homeIn+= parseFloat(list[index].money)
                        }else{
                            this.homeOut+= parseFloat(list[index].money)
                        }

                    }
                }
                this.isLoading = false
                this.$emit("homedata",{in: this.homeIn, out: this.homeOut})
                this.sort()
                this.loading = false
                this.finished = false
                this.loadingUp = false;
                if(res.data.data.list.length<20){
                    this.finished = true
                    this.loading = false

                }
                this.page = this.page+1
                if(this.page>this.pageCount){
                    this.finished = true
                    this.loading = false
                }
                if(this.listDataArr.length==0){
                    this.finishText = "还么有记录  快去记一笔吧"
                }else{
                    this.finishText = "没有更多了"
                }
            }).catch(function(error){
                this.isLoading = false
                console.log(error)
                
            })
        },
        defaultRequire(){
            if(localStorage.usermsg==undefined){
                this.$router.push("/login")
            }
            if(this.mySetting.dealType=="did"){
                this.type = "real"
            }else{
                this.type = "acc"
            }
            this.isLoading = true
            axios.request({
                url:  'api/record/account?token='+localStorage.usermsg,
                method: 'get',
                baseURL: "http://jizhang-api-dev.it266.com/",
                params: {
                    page: this.page                    //页码  可选参数 默认为1

                }
            }).then((res)=>{
                this.isLoading = false
                if(res.data.code!=0){
                    this.$emit("errornews")
                }
                this.page = this.page+1
                this.pageCount=res.data.data.page.pageCount
                var list = res.data.data.list
                for(let index in list){
                    var item = {date: list[index].date, type : list[index].type, money: list[index].paid_money, accMoney: list[index].total_money, id: list[index].id}
                    this.listDataArr.push(item)
                    if(list[index].type==1){
                        this.homeIn+=parseFloat(list[index].total_money)
                    }else if(list[index].type==2){
                        this.homeOut+=parseFloat(list[index].total_money)
                    }
                }
                console.log(res.data.data.page)
                this.$emit("homedata",{in: this.homeIn, out: this.homeOut})
                this.loading = false
                this.finished = false
                this.loadingUp = false;
                if(res.data.data.list.length<20){
                    this.finished = true
                }
                if(this.listDataArr.length==0){
                    this.finishText = "还么有记录  快去记一笔吧"
                }else{
                    this.finishText = "没有更多了"
                }
            }).catch((error)=>{
                this.isLoading = false
                console.log(error)
                
            })
            if(this.mySetting.startTime==undefined||this.mySetting.startTime.length!=10){
                this.mySetting.startTime=this.getCurrentMonthFirst()
            }
            if(this.mySetting.startTime==undefined||this.mySetting.startTime.length!=10){
                this.mySetting.endTime=this.getCurrentMonthLast()
            }
        },
        getCurrentMonthFirst(){
            var date=new Date();
            date.setDate(1);
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.toString().split(" ")[2]
            if(month<10){
                month = "0"+month
            }
            return year+"-"+month+"-"+day;
        },
        getCurrentMonthLast(){
            var date=new Date();
            var currentMonth=date.getMonth();
            var nextMonth=++currentMonth;
            var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
            var oneDay=1000*60*60*24;
            var nDate = new Date(nextMonthFirstDay-oneDay).toLocaleDateString()
            var arr = nDate.split("/")
            var str = ""
            for(let i = 0; i<arr.length;i++){
                str+=arr[i]
                str+="-"
            }
            str = str.substring(0,str.length-1)
            return str;
        },
         isShow(index){
            if(index==0||index==undefined){
                return true
            }else if(this.listDataArr[index].date==this.listDataArr[index-1].date){
                return false
            }
            return true    
        },
        sort(){
            var d1,d2,dArr1,dArr2,a
            for(var i = 0 ;i<this.listDataArr.length;i++){
                for(var j = 0 ;j<this.listDataArr.length-i-1;j++){
                    dArr1 = this.listDataArr[j].date.split("-")
                    dArr2 = this.listDataArr[j+1].date.split("-")
                    d1 = ""+dArr1[0]+dArr1[1]+dArr1[2]
                    d2 = ""+dArr2[0]+dArr2[1]+dArr2[2]
           

                    if(d1<d2){
                        a=this.listDataArr[j]
                        this.listDataArr[j] = this.listDataArr[j+1]
                        this.listDataArr[j+1] = a
                    }
                }
            }

        },
        onLoad(){
            if(this.flag){
                // this.finished = true
                console.log(this.page,this.pageCount)
                if(this.page>this.pageCount){
                    this.finished = true
                    this.loading = false
                    return
                }
                this.myRequire()
                return
            }
            // this.finished = true
            console.log(this.page,this.pageCount)
            if(this.page>this.pageCount){
                this.finished = true
                this.loading = false
                return
            }
            this.loading = true
            this.finished = false
            this.defaultRequire()

            
        }
       

    },
    mounted() {
            this.defaultRequire()
        
    },
    created() {

    },
    watch: {
        mySetting(){
            this.pageCount = 1
            this.page = 1
            this.flag = true
            this.homeOut = 0
            this.homeIn = 0
            this.listDataArr = []

            if(this.mySetting.startTime==undefined||this.mySetting.startTime.length!=10){
                this.mySetting.startTime=this.getCurrentMonthFirst()
            }
            if(this.mySetting.endTime==undefined||this.mySetting.endTime.length!=10){
                this.mySetting.endTime=this.getCurrentMonthLast()
            }

            this.myRequire()
        },
        listDataArr(n,o){
            if(n==undefined||n.length==0){
                this.finishText = "还么有记录  快去记一笔吧"
            }else{
                this.finishText = "没有更多了"
            }
        }
    },

}
</script>
<style lang="scss" scoped>
    .HomeMain{
        height: 100%;
        overflow: scroll;
        // .van-loading__spinner,.van-loading__spinner--circular{
        //     display: flex;
        //     flex-direction: column;
        //     align-items: center;
        //     .van-loading__text{
        //         padding-left: calc(50%-36px);
        //         display:none;
        //     }
        // }

        // .van-loading__circular{
        //     display: none;
        // }
        // .van-list__finished-text{
        //     text-align: center;
        //     padding-bottom: 10px;
        // }
        // .van-list__placeholder{
        //     height: 10px;
        //     content: " "
        // }
        // .van-loading__text{
        //     display: none;
        // }
        
    }
    .HomeMain::-webkit-scrollbar-track-piece {
  background-color: rgba(0, 0, 0, 0);
  border-left: 1px solid rgba(0, 0, 0, 0);
}
.HomeMain::-webkit-scrollbar {
  width: 5px;
  height: 13px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.HomeMain::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5);
  background-clip: padding-box;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  min-height: 28px;
}
.HomeMain::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

</style>