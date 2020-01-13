<template>
    <div class="ChangePhone">
        <div class="top"><Top left = "" center ="修改手机号"></Top></div>

        <div class="main">
            <div><MyInput isMust=true name="密码" type="password" @getVal="getPassword" @callback="checkPassword" height="45px" :isError="passwordCheck"></MyInput></div>
            <div><MyInput isMust=true name="新的手机号" type="text" @getVal="getPhone" @callback="checkPhone" height="45px" :isError="phoneCheck"></MyInput></div>
            <div><Captcha :value="captcha" :cUrl="cUrl" height="45px" @getVal="getCaptcha" @callback="checkCap" @reCaptcha="askCaptcha" :isError="captchaCheck"></Captcha></div>

            <div><PhoneCaptcha :value="phoneCap" height="45px" @forGet="getCha" @getVal="getPhoneCap" @callback="function(){}"></PhoneCaptcha></div>    
        </div>
        <div class="buttons">
            <div class="butt"><MyButton height="30px" bText="取消" @callback="back"></MyButton></div>
            <div class="butt"><MyButton @callback="commit" height="30px" bText="修改" bType="highLight"></MyButton></div>
        </div>   
        <Alert :errorNews="errorNews" v-show="errorFlag" @callback="errorBack"></Alert>
        <loading :isLoading="isLoading"/>
zz
    </div>
</template>

<script>
import Top from '@/components/Top.vue'
import axios from 'axios'
import Alert from '@/components/Alert.vue'
import MyInput from '@/components/Input.vue'
import MyButton from '@/components/MyButton'
import PhoneCaptcha from '@/components/PhoneCaptcha'
import Captcha from '@/components/Captcha.vue'
import loading from '@/components/loading.vue'

export default {
        data(){
            return {
                errorNews: "",
                errorFlag: false,
                successGo:"",
                isGo: false,
                phone: "",
                password: "",
                phoneCap: "",
                captchaCheck: true,
                phoneCheck:true,
                passwordCheck: true,
                captcha: "",
                key: "",
                cUrl:"",
                isLoading: false,
            }
    },
    components: {
        Top,MyInput,MyButton,PhoneCaptcha,Alert,Captcha,loading
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
            this.$router.push("/admin")
        },
        getCaptcha(val){
            this.captcha = val.content
        },
        getPhone(val){
            this.phone = val.content
        },
        getPassword(val){
            this.password = val.content
        },
        getPhoneCap(val){
            this.phoneCap = val.content
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
        getCha(){
            if(!this.checkPhone){
                return
            }
            if(!this.checkCap){
                return
            }
            this.isLoading = true
            axios.request({
                url:   'api/sms/verify',
                method: 'POST',
                baseURL: "http://jizhang-api-dev.it266.com/",
                params: {
                    mobile: this.phone,
                    captcha_code:this.captcha,
                    captcha_key: this.key,
                }
            }).then((res)=>{
                this.isLoading = false
                alert(res.data.data)
                //console.log(res)
                this.askCaptcha
            }).catch(function(error){
                this.isLoading = false
                console.log(error)
                
            })
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
        commit(){
            if(!this.checkPhone){
                return
            }
            if(!this.checkPassword){
                return
            }
            if(this.phoneCap.length==0){
                this.errorNews ="手机验证码不能为空"
                this.errorFlag = true;
                this.autoErrorBack();
                return
            }
            this.isLoading = true
            axios.request({
                url:   'api/user/mobile?token='+localStorage.usermsg,
                method: 'POST',
                baseURL: "http://jizhang-api-dev.it266.com/",
                params: {
                    mobile: this.phone,
                    verify: this.phoneCap,
                    password: this.password
                }
            }).then((res)=>{
                this.isLoading = false
                if(res.data.code==0){
                    this.errorNews="修改成功"
                    this.errorFlag = true;
                    this.autoErrorBack();
                    this.isGo=true
                    this.successGo="/admin"
                }else{
                    this.errorNews=res.data.data
                    this.errorFlag = true;
                    this.autoErrorBack();
                    this.askCaptcha();
                    this.phoneCap=""
                    this.captcha=""
                }

            }).catch(function(error){
                this.isLoading = false
                console.log(error)
            })
        }
    },
    mounted() {
        if(localStorage.usermsg == undefined ||localStorage.usermsg == ""){
            this.$router.push("/login")
        }
        this.askCaptcha()
    },
}
</script>

<style lang="scss" scoped>
    .ChangePhone{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .main{
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding-bottom: 200px;
            div{
                width: 90%;
                margin: 10px auto 0;
                display: flex;
                justify-content: center;
            }
        }
        .buttons{
            width: 100%;
            display: flex;
            justify-content: center;
            .butt{
                width: 30%;
                margin: 10px 5%;
            }
        }
    }
</style>