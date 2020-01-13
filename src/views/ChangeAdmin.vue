<template>
    <div class="ChangeAdmin">
        <div class="top"><Top left = "" center ="更改个人信息"></Top></div>
        <div class="main">
            <div><MyUpload maxnum=1 @callback="getPictureArr"></MyUpload></div>
            <div><MyInput isRtl=true name="新的昵称" type="text" height="45px" @getVal="getName" @callback="checkName" :isError="nameCheck"></MyInput></div>
                
        </div>  
            <div class="btn">
                <div class="butt"><MyButton bText="取消" height="45px" @callback="back"></MyButton></div>
                <div class="butt"><MyButton bText="提交" bType="highLight" height="45px" @callback="commit"></MyButton></div>
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
import loading from '@/components/loading'

export default {
    data(){
        return {
            errorNews: "",
            errorFlag: false,
            successGo:"",
            isGo: false,
            pictureArrStr: '',
            name: '',
            nameCheck: true,
            isLoading: false,
        }
    },
    components: {
        Top,Alert,MyInput,MyUpload,MyButton,loading
    },
    mounted() {
        if(localStorage.usermsg == undefined ||localStorage.usermsg == ""){
            this.$router.push("/login")
        }
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
        checkName(){

            if(this.name.length>11){
                this.errorNews ="名字不能超过11位"
                this.errorFlag = true;
                this.autoErrorBack();
                this.nameCheck = false;
                return false;
            }else{
                this.accMoneyCheck = true;
                return true
            }
        },
        getName(val){
            this.name=val.content
        },
        getPictureArr(val){
            this.pictureArrStr=val[0].fileKey
        },
        commit(){
            if(!this.checkName){
                return
            }
            this.isLoading = true
            axios.request({
                url:   'api/user/profile/update?token='+localStorage.usermsg,
                method: 'POST',
                baseURL: "http://jizhang-api-dev.it266.com/",
                params: {
                    nickname: this.name,
                    avatar: this.pictureArrStr
                }
            }).then((res)=>{
                this.isLoading = false
                if(res.data.code==0){
                        this.errorNews=res.data.data
                        this.errorFlag = true;
                        this.successGo = "/admin"
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


        }
     }
}
</script>

<style lang="scss" scoped>
    .ChangeAdmin{
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
            div{
                width: 80%;
                margin: 20px auto;
                display: flex;
                justify-content: center;
            }
        }
        .btn{
            display: flex;
            justify-content: center;
            .butt{
                width: 30%;
                margin: 10px 5%;
            }
        }
    }
</style>