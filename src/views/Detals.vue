<template>
    <div class="CreateAcc">
        <Top left = "返回" :center ="isAble?'记账详情':'修改记账'" @leftclick="back"></Top>
        <div class="nav">
            <div>
                <TitleItem :leftText="capName" rightText="" upText="" action=false></TitleItem>
            </div>
        </div>
        <div class="forFlex">
        <div class="main">

            <div><MyInput :value="accMoney" :isMust="noIsAble" isRtl=true name="记账金额" type="text" height="40px" @getVal="getAccMoney" @callback="checkAccMoney" :isError="accMoneyCheck"></MyInput></div>
            <div><MyInput :value="money" :isMust="noIsAble" isRtl=true  name="实付金额" type="text" height="40px" @getVal="getMoney" @callback="checkMoney" :isError="moneyCheck"></MyInput></div>
            <div><MyInput :value="date" :isMust="noIsAble" isRtl=true  name="日期" type="date" height="40px" @getVal="getDate" @callback="checkDate" :isError="dateCheck"></MyInput></div>
            <div><MyInput :value="deal" isRtl=true name="交易对象" type="text" height="40px" @getVal="getDeal" @callback="autoErrorBack"></MyInput></div>
            <div class="area"><div class="tit">备注</div><textarea name="" v-model="ps" id=""></textarea></div>
            <!-- <div><MyUpload :value="pictureArr" :maxnum="isAble?0:5" @callback="getPictureArr"></MyUpload></div> -->
            <div class="isAbled" v-show="isAble"></div>
        </div>
        <div class="record">
            <!-- <div class="title" :style="{color: type==1?'red':'green'}">{{type==1?'收入':'支出'}}记录</div> -->
            <homeList path="/record" isShowDate=true :listData="listData(item)" type="real" v-for="(item, index) in items" :key="index"></homeList>
            <homeList v-show="accMoney>money" path="/appened" :listData="{type: type,money: '追加一笔',id: {backUrl: '/detals?id='+accId, id: accId, accMoney:(accMoney - money)}}" type="real"></homeList>

        </div>
        </div>
        <div class="but">
            <MyButton :bText="isAble?'删除':'取消'" height="30px" @callback="leftBtn"></MyButton>
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
import loading from '@/components/loading'

export default {
    data(){
        return {
            //自定义下拉框
            firstOp: false,

            isAble:true,
            errorNews: "",
            errorFlag: false,
            id: "",//类别
            type: "",//收入支出
            accMoney: "",//记账金额
            money: "",//实付金额
            date: "",//日期
            deal: "",//交易对象
            ps: "",//备注
            items: [],
            capName: '',
            // listData: {},

            accMoneyCheck: true,
            moneyCheck: true,
            dateCheck: true,

            successGo:"",
            isGo: false,
            isLoading: false,

            accId:'',
        }
    },
    computed: {
        noIsAble(){
            return (!this.isAble)
        },
    },
    components: {
        Top,Alert,MyInput,MyUpload,MyButton,TitleItem,homeList,loading
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
            this.$router.push("/")
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
        // getPictureArr(val){
        //     var pic="";
        //     for(let item in val){
        //         if(val[item]==undefined){
        //             continue
        //         }else{
        //             pic+=val[item].fileKey
        //             pic+=","
        //         }
        //     }
        //     pic = pic.substring(0,pic.length-1)
        //     this.pictureArrStr=pic
        // },
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
                url:   'api/record/update?id='+this.accId+'&token='+localStorage.usermsg,
                method: 'POST',
                baseURL: "http://jizhang-api-dev.it266.com/",
                params: {
                    total_money: this.accMoney,    //记帐金额
                    //money: this.money,          //实付金额
                    //account_id: 2220,     //帐户id
                    //category_id: this.id,    //类别id
                    //date: this.date,           //日期 例如 "2016-10-13"
                    company_name: this.deal,   //交易对象 允许为空
                    remark: this.ps,         //备注 允许为空
                    //image_keys: this.pictureArr,     //图片key,如果有多个,用逗号分隔 (使用图片上传接口得到key) 允许为空
                }
            }).then((res)=>{
                this.isLoading = false
                if(res.data.code==0){
                    this.errorNews=res.data.data
                    this.errorFlag = true;
                    this.successGo = "/"
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
                        this.isLoading = false
                        if(res.data.code==0){
                            this.errorNews=res.data.data
                            this.errorFlag = true;
                            this.successGo = "/"
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



                }).catch(() => {

                });


                
            }
        },
        rightBtn(){
            console.log(2,this.isAble)
            if(this.isAble){
                this.isAble=!this.isAble
            }else{
                this.$dialog.confirm({
                    title: '确认框',
                    message: '你确定要修改吗?'
                }).then(() => {
                    this.commit()
                }).catch(() =>{

                })
            }
        },
        listData(item){
            console.log({date: item.date, money: item.money, type: this.type})
            item.total_money = this.accMoney
            item.backUrl = "/detals?id="+this.accId
            console.log(item)
            return {date: item.date, money: item.money, type: this.type, id: item}
        }
        
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
        this.accId = this.$route.query.id
        this.isLoading = true
        axios.request({
            url: 'api/record/detail?id='+this.accId+'&token='+localStorage.usermsg,
            method: 'GET',
            baseURL: "http://jizhang-api-dev.it266.com/",
        }).then((res)=>{
            this.isLoading = false
            if(res.data.code==0){
                this.id = res.data.data.category_id
                this.type = res.data.data.type
                this.accMoney = res.data.data.total_money
                this.money = res.data.data.paid_money
                this.date = res.data.data.date
                this.deal = res.data.data.company_name
                this.ps = res.data.data.remark
                this.capName = res.data.data.category_name
                this.items = res.data.data.items
                // this.pictureArr = res.data.data.
                // if(res.data.data.items[0].images!=undefined){
                //     for(let i in res.data.data.items[0].images){
                //         var item = {url: res.data.data.items[0].images[i].original}
                //         this.pictureArr.push(item)
                //     }
                // }
                // console.log(this.pictureArr)
                console.log(res.data.data)
                
            }else{
                console.log(res)
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
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .forFlex{
            flex-grow: 1;
            flex-shrink: 1;
            overflow: auto;
        }
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
            flex-grow: 0;
            flex-shrink: 1;
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
                z-index: 1;
               }
               .tit{
                   width: 60px;
                   position: absolute;
                   left: 0px;
                   top: 2px;
                    font-size: 20px;
                    z-index: 0;
               }
           }
        }
        .record{
            flex-grow: 1;

            overflow: auto;
            .title{
                margin-left: 10%;
                font-size: 20px;
                margin-bottom: 5px;
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
textarea{
	-webkit-user-select:auto;
	-moz-user-select:auto;
	user-select:auto;
}
</style>