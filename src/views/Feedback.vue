<template>
    <div class="Feedback">
        <Top @leftclick="goback" left="返回"  center="问题反馈"></Top>
        <div class="main">
            <textarea name="" id="" cols="30" rows="10" v-model="data" ></textarea>
            <div class="but"><MyButton height="30px" bText="提交" bType="highLight" @callback="commit"></MyButton></div>
            
        </div>   
            <div class="phone">
                    <div class="phoneBox"><MyInput name="电话号码" type="text" height="40px" @getVal="getPhone"></MyInput></div>
            </div>
        <Alert :errorNews="errorNews" v-show="errorFlag" @callback="errorBack"></Alert>
        <loading :isLoading="isLoading"/>     
    </div>
</template>

<script>
import Top from '@/components/Top.vue'
import MyInput from '@/components/Input.vue'
import MyButton from '@/components/MyButton.vue'

import axios from 'axios'
import Alert from '@/components/Alert.vue'
import loading from '@/components/loading.vue'

export default {
    data(){
        return {
            errorNews: "",
            errorFlag: false,
            isLoading: false,
            isGo: false,
            succussGo:"",

            phone: "",
            data: "",
        }
    },
    components: {
        Top,MyInput,MyButton,Alert,loading
    },
    methods: {
        goback(){
            this.$router.push("/admin")
        },
        getPhone(val){
            this.phone = val.content
        },
        errorBack(){
            this.errorFlag=false;
            clearTimeout(this.timeId)
            if(this.isGo){
                this.$router.push(this.succussGo)
            }
        },
        autoErrorBack(){
          var timeId = setTimeout(this.errorBack,2000)
        },
        commit(){
            console.log(this.$route)
            if(this.data==undefined||this.data.length==0){
                this.errorNews = "内容不能为空"
                this.errorFlag = true
                this.isGo = false
                this.autoErrorBack()
                return
            }
            this.isLoading = true
            axios.request({
                url:  'api/feedback/add?token='+localStorage.usermsg,
                method: 'POST',
                baseURL: "http://jizhang-api-dev.it266.com/",
                params: {content: this.data,contact: this.phone}
            }).then((res)=>{
                this.isLoading = false
                if(res.data.code==0){
                    let myToken = res.data.data.token
                    this.errorNews="反馈成功"
                    this.errorFlag = true;
                    this.succussGo="/admin"
                    this.isGo=true
                    this.autoErrorBack()
                }else{
                    this.errorNews=res.data.data
                    this.errorFlag = true
                    this.isGo=false
                    this.autoErrorBack()
                }
            }).catch(()=>{
                this.isLoading = false
                this.errorNews=res.data.data
                this.errorFlag = true
                this.isGo=false
                this.autoErrorBack()
            })

        },
        mounted() {
            if(localStorage.usermsg == undefined ||localStorage.usermsg == ""){
            this.$router.push("/login")
        }
        },
    }
}
</script>
<style lang="scss" scoped>
    .Feedback{
        background: #eeeeee;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        .main{
            padding: 16px 0;
            background-color: #fff;
            flex-grow: 0;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            textarea{
                width: calc(100% - 32px);
                height: 96px;
                padding: 0 16px;
                overflow: auto;
                outline: none;
                border: none;
            }
            .but{
                width: 80px;
                margin-right: 16px;
            }
        }
        .phone{
            background-color: #fff;
            margin-top: 16px;
            height: 50px;
            .phoneBox{
                width: calc(100% - 32px);
                margin: 0 auto;
            }
        }
    }
    
</style>