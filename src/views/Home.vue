<template>
  <div class="home">
    <div class="top"><Top left = "&#xe60c; 筛选" center ="一起来记账" @leftclick="showCoOption"></Top></div>
    <div class="Title">
        <div class="center">
          <TitleItem :leftText="allInt" :rightText="allFloat" upText="总收支" action=false></TitleItem>
          <TitleItem :leftText="inInt" :rightText="inFloat" :upText="upTextIn" action=false></TitleItem>
          <TitleItem :leftText="outInt" :rightText="outFloat" :upText="upTextOut" action=false></TitleItem>
        </div>
    </div>
    <div class="CoOption" v-show="CoOptionFlag"><CoOption @goback="getSetting"></CoOption></div>
    <div class="main"><HomeMain :mySetting="setting" @homedata="getHomeData" @errornews="error"></HomeMain></div>
    <div class="foot"><Foot active="1" @createAcc="createAcc"></Foot></div>
    <Alert :errorNews="errorNews" v-show="errorFlag" @callback="errorBack"></Alert>
    <!-- <MyDate :flag="showOp" @callback="changeTitle" @cannel="cannel"></MyDate> -->
  </div>
</template>

<script>
import Top from '@/components/Top.vue'
import Foot from '@/components/Foot.vue'
import TitleItem from '@/components/TitleItem.vue'
import axios from 'axios'
import Alert from '@/components/Alert.vue'
import MyDate from '@/components/MyDate.vue'
import CoOption from '@/components/CoOption.vue'
import HomeMain from '@/components/HomeMain.vue'
import moment from 'moment'

export default {
    data(){
      return{
          //头信息
          inInt: 0,
          inFloat: "00",
          outInt: 0,
          outFloat: "00",
          // year: "2019年",
          // month: 1,
          allInt:0,
          allFloat: "00",
          showOp: false,
          //操作成功自动跳转
          errorNews: "",
          errorFlag: false,
          isGo: false,
          successGo: "",
          //筛选框信息
          CoOptionFlag: false,
          //列表信息
          setting: {}
      }
    },
    computed: {
      upTextIn(){
        if(this.setting.dealType=="did"){
          return "已收入"
        }else if(this.setting.dealType=="wait"){
          return "待收入"
        }else{
          return "总收入"
        }
      },
      upTextOut(){
        if(this.setting.dealType=="did"){
          return "已支出"
        }else if(this.setting.dealType=="wait"){
          return "待支出"
        }else{
          return "总支出"
        }
      }
    },
    components: {
        Top,Foot,TitleItem,Alert,MyDate,CoOption,HomeMain
    },
    //请求首页信息
    mounted() {
      // axios.request({
      //     url: 'api/view/home?token='+localStorage.usermsg,
      //     method: 'get',
      //     baseURL: "http://jizhang-api-dev.it266.com/",
      // }).then((res)=>{
      //     if(res.data.code==0){
      //       this.year=(res.data.data.cash.month.split("-")[0]+"年")
            
      //       this.month=(res.data.data.cash.month.split("-")[1])
      //       if(this.month<10){
      //         this.month="0"+this.month
      //       }
      //       this.inInt=parseInt(res.data.data.cash.in)
      //       this.inFloat=(res.data.data.cash.in*100)%100
      //       this.outInt=parseInt(res.data.data.cash.in)
      //       this.outFloat=(res.data.data.cash.in*100)%100
      //       if(this.inFloat<10){
      //         this.inFloat="0"+this.inFloat
      //       }
      //       if(this.outFloat<10){
      //         this.outFloat="0"+this.outFloat
      //       }
      //     }else{
      //       this.errorNews = "登录失效  请重新登录"
      //       this.errorFlag = true

      //       this.isGo=true
      //       this.successGo="/login"
      //       this.autoErrorBack()
      //     }

      // }).catch(function(error){
      //     console.log(error)
          
      // })
    },
    methods: {
        getSetting(val){
          this.setting = val
        },
        getHomeData(val){
          console.log(val)
            this.inInt=parseInt(val.in)
            this.inFloat=(val.in*100)%100
            this.outInt=parseInt(val.out)
            this.outFloat=(val.out*100)%100
            if(this.inFloat<10){
              this.inFloat="0"+this.inFloat
            }
            if(this.outFloat<10){
              this.outFloat="0"+this.outFloat
            }
            var all = parseFloat(val.in)-parseFloat(val.out)
            this.allInt=parseInt(all)
            this.allFloat=(all*100)%100

            if(this.allFloat<10){
              this.allFloat="0"+this.allFloat
            }
        },
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
        //改变主页信息
        // changeTitle(val){
        //   console.log(val)
        //   this.year = val[0]
        //   this.month = val[1]
        //   this.showOp=false
        //   var d = moment(val[0]+"-"+val[1],"YYYY-MM")
        //   var ed = d.endOf("month").format("YYYY-MM-DD")
        //   var sd = d.startOf("month").format("YYYY-MM-DD")
        //   var a = this.setting

        //   a.startTime = sd
        //   a.endTime = ed
        //   this.setting = a
        //   console.log(a,this.setting)
        // },
        showOption(){
          this.showOp=true
        },
        cannel(){
          this.showOp=false
        },
        //去记账
        createAcc(){
          this.$router.push("/add")
        },
        // 显示筛选框
        showCoOption(){
          this.CoOptionFlag=!this.CoOptionFlag
        },
        error(){
          this.errorNews = "登录失效  请重新登录"
          this.errorFlag = true

          this.isGo=true
          this.successGo="/login"
          this.autoErrorBack()
        },
    }
}
</script>

<style lang="scss" scoped>
  .home{
    background-color: #eeeeee;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .Title{
      padding: 16px 0;
      border-top: #39b54a 1px solid;
      flex-grow: 0;
      background-color: #39b54a;
      .center{
        width: calc(100% - 32px);
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
      }

    }
    .main{
      flex-grow: 1;
      overflow: auto;
    }
  }
</style>
