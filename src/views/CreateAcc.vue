<template>
    <div class="CreateAcc">
        <Top left = "返回" center ="记一笔" @leftclick="back"></Top>
        <div class="main">
            <div><MyInput isMust=true isRtl=true name="记账金额" type="text" height="45px" @getVal="getAccMoney" @callback="checkAccMoney" :isError="accMoneyCheck"></MyInput></div>
            <div><MyInput isMust=true isRtl=true  name="实付金额" type="text" height="45px" @getVal="getMoney" @callback="checkMoney" :isError="moneyCheck"></MyInput></div>

            <div><MyInput isMust=true isRtl=true  name="日期" type="date" height="45px" @getVal="getDate" @callback="checkDate" :isError="dateCheck"></MyInput></div>
            <div class="opp"><div class="tit">账户类型:</div><div class="typeOption"><MySelect @callback="getAccType" defaultKey="账户类型" :listArr="dataList"></MySelect></div></div>
            <div><MyInput isRtl=true name="交易对象" type="text" height="45px" @getVal="getDeal" @callback="autoErrorBack"></MyInput></div>
            <div><MyInput isRtl=true name="备注" type="text" height="45px" @getVal="getPs" @callback="autoErrorBack"></MyInput></div>
            <div><MyUpload :value="pictureArr" maxnum=5 @callback="getPictureArr"></MyUpload></div>
            <div><MyButton bText="提交" bType="highLight" height="45px" @callback="commit"></MyButton></div>
        </div>
        <Alert :errorNews="errorNews" v-show="errorFlag" @callback="errorBack"></Alert>
        <loading :isLoading="isLoading"/>
    </div>
</template>
<script>
import Top from '@/components/Top.vue'
import axios from 'axios'
import Alert from '@/components/Alert.vue'
import loading from '@/components/loading.vue'
import MyInput from '@/components/Input.vue'
import MyUpload from '@/components/MyUpload'
import MyButton from '@/components/MyButton'
import MySelect from '@/components/MySelect'

export default {
    data(){
        return {
            accType: '',
            dataList :[],
            errorNews: "",
            errorFlag: false,
            id: "",//类别
            type: "",//收入支出
            accMoney: "",//记账金额
            money: "",//实付金额
            date: "",//日期
            deal: "",//交易对象
            ps: "",//备注
            pictureArr: [],//图片数组
            pictureArrStr: '',//图片字符串
            isLoading: false,
            accMoneyCheck: true,
            moneyCheck: true,
            dateCheck: true,

            successGo:"",
            isGo: false
        }
    },
    components: {
        Top,Alert,MyInput,MyUpload,MyButton,MySelect,loading
    },
    methods: {
        //提示语 专用方法
        errorBack(){
            this.errorFlag=false;
            clearTimeout(this.timeId)
            if(this.isGo){
                this.$router.push(this.successGo)
            }
        },
        autoErrorBack(){
            var timeId = setTimeout(this.errorBack,2000)
        },
        back(){
            this.$router.push("/add")
        },
        //获取记账金额
        getAccMoney(val){
            this.accMoney=val.content
        },
        //校验记账金额
        checkAccMoney(){
            if(this.accMoney.length==0){
                this.errorNews ="记账金额不能为空"
                this.errorFlag = true;
                this.autoErrorBack();
                this.accMoneyCheck = false;
                return false;
            }else if(this.accMoney.length>8){
                this.errorNews ="记账金额超出上限"
                this.errorFlag = true;
                this.autoErrorBack();
                this.accMoneyCheck = false;
                return false;
            }else{
                this.accMoneyCheck = true;
                return true
            }
        },
        //获取实付金额
        getMoney(val){
            this.money=val.content
        },
        //校验实付金额
        checkMoney(){
            if(this.money.length==0){
                this.errorNews ="实付金额不能为空"
                this.errorFlag = true;
                this.autoErrorBack();
                this.moneyCheck = false;
                return false;
            }else if(this.money.length>8){
                this.errorNews ="实付金额超出上限"
                this.errorFlag = true;
                this.autoErrorBack();
                this.moneyCheck = false;
                return false;
            }else{
                this.moneyCheck = true;
                return true
            }
        },
        getAccType(val){
            console.log(val)
            this.accType = val
        },
        //获取日期
        getDate(val){
            this.date=val.content
        },
        //校验日期
        checkDate(){
            if(this.date.length==0){
                this.errorNews ="日期不能为空"
                this.errorFlag = true;
                this.autoErrorBack();
                this.dateCheck = false;
                return false;
            }else{
                this.dateCheck = true;
                return true
            }
        },
        //获取交易对象
        getDeal(val){
            this.deal=val.content
        },
        //获取备注
        getPs(val){
            this.ps=val.content
        },
        //获取图片数组
        getPictureArr(val){
            var pic="";
            for(let item in val){
                pic+=val[item].fileKey
                pic+=","
            }
            pic = pic.substring(0,pic.length-1)
            this.pictureArrStr=pic
        },
        //提交
        commit(){
            if(!this.checkAccMoney){
                return
            }
            if(!this.checkMoney){
                return
            }
            if(!this.checkDate){
                return
            }
            if(this.accType == 0){
                this.errorNews="请选择类型"
                this.errorFlag = true;
                this.isGo = false
                this.autoErrorBack();
                return
            }
            this.isLoading = true
            axios.request({
                url:   'api/record/create?token='+localStorage.usermsg,
                method: 'POST',
                baseURL: "http://jizhang-api-dev.it266.com/",
                params: {
                    total_money: this.accMoney,    //记帐金额
                    money: this.money,          //实付金额
                    account_id: this.accType,     //帐户id
                    category_id: this.id,    //类别id
                    date: this.date,           //日期 例如 "2016-10-13"
                    company_name: this.deal,   //交易对象 允许为空
                    remark: this.ps,         //备注 允许为空
                    image_keys: this.pictureArrStr,     //图片key,如果有多个,用逗号分隔 (使用图片上传接口得到key) 允许为空
                }
            }).then((res)=>{
                this.isLoading = false
                if(res.data.code==0){
                    this.errorNews=res.data.data
                    this.errorFlag = true;
                    this.successGo = "/add"
                    this.isGo = true
                    this.autoErrorBack();
                }else{
                    this.isGo=false
                    this.errorNews=res.data.data
                    this.errorFlag = true;
                    this.autoErrorBack();
                }

            }).catch(function(error){
                console.log(error)
            })


        }
        
    },
    mounted() {
        if(localStorage.usermsg == undefined ||localStorage.usermsg == ""){
            this.$router.push("/login")
        }
        this.id = this.$route.query.id
        this.type = this.$route.query.type
        axios.request({
            url:   'api/account?token='+localStorage.usermsg,
            method: 'get',
            baseURL: "http://jizhang-api-dev.it266.com/",
        }).then((res)=>{
            if(res.data.code==0){
                var list = res.data.data
                for (const key in list) {
                    var item = {key: list[key].name, value: list[key].id}
                    this.dataList.push(item)
                }
                console.log(this.dataList)
            }else{
                this.isGo=false
                this.errorNews=res.data.data
                this.errorFlag = true;
                this.autoErrorBack();
            }

        }).catch(function(error){
            console.log(error)
        })

    },
}
</script>

<style lang="scss" scoped>
    .CreateAcc{
        min-height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .main{
            width: 90%;
            margin: 20px auto 0;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            div{
                width: 100%;
                margin-bottom: 10px;

                .tit{
                    flex-shrink: 1;
                    font-size: 1.2rem;
                }
                .typeOption{
                    flex-grow: 1;
                }
           }
           .opp{
                display: flex;
                justify-content: space-between;
                align-items: baseline;
           }

           .date{
               height: 30px;
           }
        }
    }
</style>