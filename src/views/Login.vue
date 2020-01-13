<template>
    <div class="Login">
        <Top @leftclick="goback"  :center="center"></Top>
        <div class="main">
            <div><MyInput name="用户名" type="text" height="45px" @getVal="getPhone" @callback="checkPhone"></MyInput></div>
            <div><MyInput name="密码" type="password" height="45px" @getVal="getPassword" @callback="checkPassword"></MyInput></div>
            <div><MyButton height="45px" bText="确定" bType="highLight" @callback="goHome"></MyButton></div>
            <div><MyButton height="45px" bText="前往注册" @callback="goRegister"></MyButton></div>
        </div>
        <ForgetFoot lText="忘记密码" rText="关于与帮助" @lclick="goForget"></ForgetFoot>
        <Alert :errorNews="errorNews" v-show="errorFlag" @callback="errorBack"></Alert>
        <loading :isLoading="isLoading"/>
    </div>
            
    
</template>

<script>
import Top from '@/components/Top.vue'
import MyInput from '@/components/Input.vue'
import MyButton from '@/components/MyButton.vue'
import ForgetFoot from '@/components/ForgetFoot.vue'
import axios from 'axios'
import Alert from '@/components/Alert.vue'
import loading from '@/components/loading.vue'



export default {
    data(){
        return {
            center: "登录",
            errorNews: "",
            errorFlag: false,
            phone: "",
            password: "",
            isLoading: false,
            //成功后跳转
            isGo: false,
            succussGo:""
        }
    },
    components: {
        Top,MyInput,MyButton,ForgetFoot,Alert,loading
    },
    methods: {
        goback(){

        },
        getPhone(val){
            this.phone = val.content
        },
        getPassword(val){
            this.password = val.content
        },
        goForget(){
            this.$router.push("forget")
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
        goHome(){
            if(!this.checkPhone){
                return
            }
            if(!this.checkPassword){
                return
            }
            this.isLoading = true
            axios.request({
                url:  'api/user/token/mobile',
                method: 'POST',
                baseURL: "http://jizhang-api-dev.it266.com/",
                params: {mobile: this.phone,password: this.password, captcha_code: "", captcha_key: ""}
            }).then((res)=>{
                this.isLoading = false
                if(res.data.code==0){
                    let myToken = res.data.data.token
                    localStorage.setItem("usermsg",myToken)
                    this.errorNews="登录成功"
                    this.errorFlag = true;
                    this.succussGo="/"
                    this.isGo=true
                    this.autoErrorBack()
                }else{
                    this.errorNews=res.data.data
                    this.errorFlag = true
                    this.isGo=false
                    this.autoErrorBack()
                }
                //console.log(res,this.cUrl,this.key)

            }).catch(function(error){
                this.errorNews=error.data.data
                this.errorFlag = true
                this.isGo=false
                this.autoErrorBack()
            })
        },
        goRegister(){
            this.$router.push("/register")
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
    },
    comments(){

    }
}
</script>

<style lang="scss" scoped>
    .Login{
        min-height: 500px;
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
           div{
               width: 100%;
               margin-bottom: 10px;
           }
        }
    }
</style>