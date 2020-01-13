<template>
    <div class="CreateAcc">
        <Top left = "返回" :center ="isAble?'记账详情':'修改记账'" @leftclick="back"></Top>

        <div class="main">

            <div class="accMoney"><MyInput :value="accMoney" isRtl=true name="记账金额" type="text" height="30px" @getVal="getAccMoney"></MyInput><div class="disable"></div></div>
            <div><MyInput :value="money" :isMust="noIsAble" isRtl=true  name="实付金额" type="text" height="30px" @getVal="getMoney" @callback="checkMoney" :isError="moneyCheck"></MyInput></div>
            <div><MyInput :value="date" :isMust="noIsAble" isRtl=true  name="日期" type="date" height="30px" @getVal="getDate" @callback="checkDate" :isError="dateCheck"></MyInput></div>

            <div class="opp"><div :isfinish="isfinish" class="tit">账户类型:</div><div class="typeOption"><MySelect @callback="getAccType" defaultKey="账户类型" :listArr="dataList" :dvalue="dvalue"></MySelect></div></div>
            <div><MyUpload :value="pictureArr" :maxnum="isAble?0:5" @callback="getPictureArr"></MyUpload></div>
            <div class="isAbled" v-show="isAble"></div>
        </div>
       
        <div class="but">
            <MyButton v-show="noIsAble" :bText="isAble?'删除':'取消'" height="30px" @callback="leftBtn"></MyButton>
            <MyButton :bText="isAble?'修改':'确定'" height="30px" @callback="rightBtn"></MyButton>
        </div>
        <Alert :errorNews="errorNews" v-show="errorFlag" @callback="errorBack"></Alert>
        <loading :isLoading="isLoading"/>

    </div>
</template>
<script>
import Top from '@/components/Top.vue'
import axios from 'axios'
import Alert from '@/components/Alert.vue'
import MyInput from '@/components/Input.vue'
import MyUpload from '@/components/MyUpload'
import MyButton from '@/components/MyButton'
import TitleItem from '@/components/TitleItem.vue'
import homeList from '@/components/homeList'
import MySelect from '@/components/MySelect'
import loading from '@/components/loading'


export default {
    data(){
        return {
            isfinish: false,
            //自定义下拉框
            firstOp: false,

            isAble:true,
            errorNews: "",
            errorFlag: false,

            accMoney: "",//记账金额
            money: "",//实付金额

            items: [],
            backUrl: '',
            date: '',
            // listData: {},
            record_id: '',
            moneyCheck: true,
            dateCheck: true,

            successGo:"",
            isGo: false,

            accId:'',
            total_money:'',

            pictureArr:[],
            pictureArrStr: '',

            dataList: [],
            dvalue:'',
            accType:0,

            isLoading: false,
        }
    },
    computed: {
        noIsAble(){
            return (!this.isAble)
        },
    },
    components: {
        Top,Alert,MyInput,MyUpload,MyButton,TitleItem,homeList,MySelect,loading
    },
    methods: {
        //自定义下拉款
        firstShow(){
            this.firstOp=!this.firstOp
        },

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
            this.$router.push(""+this.backUrl)
        },
        getAccType(val){
            console.log(val)
            this.accType = val
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
                if(val[item]==undefined){
                    continue
                }else{
                    pic+=val[item].fileKey
                    pic+=","
                }
            }
            pic = pic.substring(0,pic.length-1)
            this.pictureArrStr=pic
            console.log(this.pictureArr,this.pictureArrStr)
        },
//        提交
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
            this.isLoading = true
            axios.request({
                url:   'api/record/item/update?itemId='+this.record_id+'&token='+localStorage.usermsg,
                method: 'POST',
                baseURL: "http://jizhang-api-dev.it266.com/",
                params: {
                    // total_money: this.accMoney,    //记帐金额
                    money: parseFloat(this.money),          //实付金额
                    account_id: this.accType,     //帐户id
                    //category_id: this.id,    //类别id
                    date: this.date,           //日期 例如 "2016-10-13"
                    // company_name: this.deal,   //交易对象 允许为空
                    // remark: this.ps,         //备注 允许为空
                    image_keys: this.pictureArrStr,     //图片key,如果有多个,用逗号分隔 (使用图片上传接口得到key) 允许为空
                }
            }).then((res)=>{
                this.isLoading = false
                if(res.data.code==0){
                    this.errorNews=res.data.data
                    this.errorFlag = true;
                    this.successGo = this.backUrl
                    this.isGo = true
                    this.autoErrorBack();
                }else{
                    this.isGo=false
                    this.errorNews=res.data.data
                    this.errorFlag = true;
                    this.autoErrorBack();
                }

            }).catch(function(error){
                this.isLoading = false
                console.log(error)
            })


        },
        leftBtn(){
            console.log(1,this.isAble)
            if(!this.isAble){
                this.isAble=!this.isAble
            }else{
                this.$dialog.confirm({
                    title: '确认框',
                    message: '你确定要删除吗?'
                }).then(() => {
                    this.isLoading = true
                    axios.request({
                        url: 'api/record/delete?id='+this.accId+'&token='+localStorage.usermsg,
                        method: 'POST',
                        baseURL: "http://jizhang-api-dev.it266.com/",
                    }).then((res)=>{
                        this.isLoading =false
                        if(res.data.code==0){
                            this.errorNews="删除成功"
                            this.errorFlag = true;
                            this.succussGo=this.backUrl
                            this.isGo=true
                            this.autoErrorBack()
                        }else{
                            console.log(res.data.data)
                        }
                    }).catch(function(error){
                        this.isLoading = false
                        console.log(error)
                        
                
                    })


                }).catch(() =>{

                })
            }
        },
        rightBtn(){
            console.log(2,this.isAble)
            if(this.isAble){
                this.isAble=!this.isAble
            }else{
                this.commit()
            }
        },
        
        
    },

            //     id: "",//类别
            // type: "",//收入支出
            // accMoney: "",//记账金额
            // money: "",//实付金额
            // date: "",//日期
            // deal: "",//交易对象
            // ps: "",//备注
            // pictureArr: [],//图片数组
    mounted() {
        if(localStorage.usermsg == undefined ||localStorage.usermsg == ""){
            this.$router.push("/login")
        }
        this.isLoading = true

        this.items = this.$route.query  
        this.backUrl = this.$route.query.backUrl;
        this.accMoney = this.items.total_money
        this.money = this.items.money
        this.record_id = this.$route.query.id
        this.date = this.items.date
        this.dvalue = this.items.account_id
        this.accType = this.items.account_id
        if(this.$route.query.images!=undefined){
            if(typeof(this.$route.query.images[0])=="string"){
                this.back()
                return
            }
            for(let i in this.items.images){
                var item ={url: this.items.images[i].original}
                this.pictureArr.push(item)
            }
        }
        axios.request({
            url:   'api/account?token='+localStorage.usermsg,
            method: 'get',
            baseURL: "http://jizhang-api-dev.it266.com/",
        }).then((res)=>{
            this.isLoading = false
            if(res.data.code==0){
                var list = res.data.data
                for (const key in list) {
                    var item = {key: list[key].name, value: list[key].id}
                    this.dataList.push(item)
                }
                this.isfinish=!this.isfinish
                console.log(this.dataList)
            }else{
                this.isGo=false
                this.errorNews=res.data.data
                this.errorFlag = true;
                this.autoErrorBack();
            }

        }).catch(function(error){
            this.isLoading = false
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
        .nav{
            padding: 16px 0;
            width: 100%;
            background-color: #39b54a;
            display: flex;
            justify-content: space-around;
            position: relative;
            div{
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .isAbled{
               position: absolute;
               left: 0;
               top: 0;
               width: 100%;
               height: 100%;
               z-index: 1;
           }
        }
        .main{
            width: 90%;
            margin: 20px auto 0;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            position: relative;
           div{
               width: 100%;
               margin-bottom: 10px;

           }
           .date{
               height: 30px;
           }
           .isAbled{
               position: absolute;
               left: 0;
               top: 0;
               width: 100%;
               height: 100%;
               z-index: 1;
           }
           .area{
                position: relative;
                textarea{
                width: 100%;
                font-size: 20px;
                word-wrap: break-word;
                text-indent:100px;
                min-height: 70px;
                border: none;
                border-bottom: 1px solid #999999;
                resize:none;
                }
                .tit{
                    position: absolute;
                    left: 0px;
                    top: 2px;
                        font-size: 20px;
                }
            }
            .accMoney{
                position: relative;
                .disable{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
               }
           }
           .opp{
               display: flex;
               justify-content: space-between;
               align-items: baseline;
               font-size: 1.2rem;
           }
        }
        .but{
            width: 90%;
            margin: 10px auto;
            display: flex;
            justify-content: space-around;

            div{
                width: 40%;
            }
        }
    }
</style>