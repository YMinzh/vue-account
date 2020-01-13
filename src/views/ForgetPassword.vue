<template>
    <div class="ForgetPassword">
        <Top @leftclick="goback" :left="left" :center="center"></Top>
        <div class="main">
            <div><MyInput name="手机号" type="text" @getVal="getPhone" @callback="checkPhone" height="45px" :isError="phoneCheck"></MyInput></div>
            <div><Captcha :cUrl="cUrl" height="45px" @getVal="getCaptcha" @callback="checkCap" @reCaptcha="askCaptcha" :isError="captchaCheck"></Captcha></div>
            <div><PhoneCaptcha height="45px" @forGet="getCha" @getVal="getPhoneCap" @callback="function(){}"></PhoneCaptcha></div>
            <div><MyInput name="新的密码" type="password" @getVal="getPassword" @callback="checkPassword" height="45px" :isError="passwordCheck"></MyInput></div>
            <div class="buttons">
                <div><MyButton @callback="goback" height="45px" bText="取消"></MyButton></div>
                <div><MyButton @callback="register" height="45px" bText="找回" bType="highLight"></MyButton></div>
            </div>    
        </div>
        <Alert :errorNews="errorNews" v-show="errorFlag" @callback="errorBack"></Alert>
        <loading :isLoading="isLoading"/>
    </div>
            
    
</template>

<script>
import Top from '@/components/Top.vue'
import MyInput from '@/components/Input.vue'
import Captcha from '@/components/Captcha.vue'
import MyButton from '@/components/MyButton.vue'
import ForgetFoot from '@/components/ForgetFoot.vue'
import PhoneCaptcha from '@/components/PhoneCaptcha.vue'
import Alert from '@/components/Alert.vue'
import loading from '@/components/loading.vue'
import axios from 'axios'

export default {
    data(){
        return {
            isLoading: false,
            left: "返回",
            center: "找回密码",
            cUrl:"",
            key: "",
            phoneCheck:true,
            passwordCheck: true,
            captchaCheck: true,
            errorNews: "",
            errorFlag: false,

            phone: "",
            password: "",
            captcha: "",
            phoneCap: "",

            successGo:"",
            isGo: false
        }
    },
    components: {
        Top,MyInput,MyButton,ForgetFoot,Captcha,PhoneCaptcha,Alert,loading
    },
    methods: {
        goback(){
            this.$router.push("/login")
        },
        getPhone(val){
            this.phone = val.content
        },
        getPassword(val){
            this.password = val.content
        },
        getCaptcha(val){
            this.captcha = val.content
        },
        getPhoneCap(val){
            this.phoneCap = val.content
        },
        askCaptcha(){
            axios.request({
                url:  'api/captcha',
                method: 'get',
                baseURL: "http://jizhang-api-dev.it266.com/",
            }).then((res)=>{
                this.key = res.data.data.key
                this.cUrl = res.data.data.url
                //console.log(res,this.cUrl,this.key)

            }).catch(function(error){
                console.log(error)
            })
        },
        checkCap(){
            if(this.captcha.length==0){
                this.errorNews ="验证码不能为空"
                this.errorFlag = true;
                this.autoErrorBack();
                this.captchaCheck = false;
                return false;
            }else{
                this.captchaCheck = true;
                return true
            }
        },
        checkPhone(){
            if(this.phone.length!=11){
                this.errorNews ="请输入正确的手机号"
                this.errorFlag = true;
                this.autoErrorBack();
                this.phoneCheck = false;
                return false;
            }else{
                this.phoneCheck = true
                return true
            }
            
        },
        checkPassword(){
            if(this.password.length==0){
                this.errorNews ="密码不为空"
                this.errorFlag = true;
                this.autoErrorBack();
                this.passwordCheck = false;
                return false;
            }else{
                this.passwordCheck = true
                return true
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
        getCha(){
            if(!this.checkPhone){
                return
            }
            if(!this.checkPassword){
                return
            }
            if(!this.checkCap){
                return
            }
            this.isLoading = true;
            axios.request({
                url:   'api/sms/verify',
                method: 'POST',
                baseURL: "http://jizhang-api-dev.it266.com/",
                params: {
                    mobile: this.phone,
                    captcha_code: this.captcha,
                    captcha_key: this.key
                }
            }).then((res)=>{
                this.isLoading = false
                if(res.data.code == "0"){
                    alert(res.data.data)
                }else{
                    this.errorNews = "验证码不正确"
                    this.errorFlag = true
                    this.isGo = false
                    this.autoErrorBack()
                    this.askCaptcha()
                }

            }).catch(function(error){
                console.log(error)
                this.askCaptcha()
            })
        },
        register(){
            
            if(!this.checkPhone){
                return
            }
                if(this.phoneCap.length==0){
                    this.errorNews ="手机验证码不能为空"
                    this.errorFlag = true;
                    this.autoErrorBack();
                    return
                }
            if(!this.checkPassword){
                return
            }
            this.isLoading = true
            axios.request({
                url:   'api/user/token/sms',
                method: 'POST',
                baseURL: "http://jizhang-api-dev.it266.com/",
                params: {
                    mobile: this.phone,
                    verify: this.phoneCap,
                    password: this.password
                }
            }).then((res)=>{
                console.log(res)
                this.isLoading = false

                if(res.data.code==0){
                    this.isLoading = false
                    let myToken = res.data.data.token
                    localStorage.setItem("usermsg",myToken)
                    this.errorNews="修改成功"
                    this.errorFlag = true;
                    this.autoErrorBack();
                    this.isGo=true
                    this.successGo="/"
                }else{
                    this.isLoading = false
                    this.errorNews=res.data.data
                    this.errorFlag = true;
                    this.autoErrorBack();
                }

            }).catch(function(error){
                this.isLoading = false
                console.log(error)
            })
        }
    },
    mounted() {
        this.askCaptcha()
    },
}
</script>

<style lang="scss" scoped>
    .ForgetPassword{
        min-height: 500px;
        overflow: hidden;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .main{
            width: 90%;
            margin: 0 auto;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-bottom: 30px;
           div{
               width: 100%;
               margin: 3px;
           }
           .buttons{
               margin: 20px 0 30px;
               display: flex;
               justify-content: space-around;
               div{
                   flex-shrink: 1;
                   flex-grow: 1;
                   margin: 0 12px;
                   display: flex;
                   justify-content: center;
               }
           }
        }
    }
</style>