<template>
    <div class="ChangePhone">
        <div class="top"><Top left = "" center ="修改手机号"></Top></div>

        <div class="main">
            <div><MyInput isMust=true name="老密码" type="text" @getVal="getPhone" @callback="checkPhone" height="45px" :isError="phoneCheck"></MyInput></div>
            <div><MyInput isMust=true name="新密码" type="password" @getVal="getPassword" @callback="checkPassword" height="45px" :isError="passwordCheck"></MyInput></div>
        </div>
        <div class="buttons">
            <div class="butt"><MyButton height="30px" bText="取消" @callback="back"></MyButton></div>
            <div class="butt"><MyButton @callback="commit" height="30px" bText="修改" bType="highLight"></MyButton></div>
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
import MyButton from '@/components/MyButton'
import loading from '@/components/loading'

export default {
        data(){
            return {
                errorNews: "",
                errorFlag: false,
                successGo:"",
                isGo: false,
                phone: "",
                password: "",
                phoneCheck:true,
                passwordCheck: true,
                isLoading: false,
            }
    },
    components: {
        Top,MyInput,MyButton,Alert,loading
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
        getPhone(val){
            this.phone = val.content
        },
        getPassword(val){
            this.password = val.content
        },
        checkPhone(){
            if(this.phone.length==0){
                this.errorNews ="老密码不为空"
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
        commit(){
            if(!this.checkPhone){
                return
            }
            if(!this.checkPassword){
                return
            }
            this.isLoading = true
            axios.request({
                url:   'api/user/password?token='+localStorage.usermsg,
                method: 'POST',
                baseURL: "http://jizhang-api-dev.it266.com/",
                params: {
                    password: this.phone,
                    new_password: this.password,
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