<template>
    <div class="AccountAdd" @click="back">
        <div class="theMain">
            <div class="center" @click.stop>
                <div><MyInput isRtl=true name="账户名字:" type="text" @getVal="getName" :value="name" @callback="changeName" height="40px" :isError="nameCheck"></MyInput></div>
                <div><div class="tit">账户类型:</div><div class="typeOption"><MySelect @callback="getType" defaultKey="账户类型" :listArr="listArr"></MySelect></div></div>
                <div><MyInput isRtl=true name="期初余额:" type="text" @getVal="getBalance" :value="balance" height="40px"></MyInput></div>
                <div><MyInput isRtl=true name="备注:" type="text" @getVal="getPs" :value="ps" height="40px"></MyInput></div>

            </div>
            <div class="button">
                <button @click.stop="set">添加账户</button>
            </div>
        </div>  
        <loading :isLoading="isLoading"/>

    </div>
</template>

<script>
import MyInput from '@/components/Input.vue'
import MySelect from '@/components/MySelect.vue'
import loading from '@/components/loading.vue'
import axios from 'axios'


export default {
    data(){
        return {
            name: '',
            nameCheck:true,
            ps: '',
            balance: '',
            type: 0,
            isLoading: false,
            listArr: [
                {key: "现金", value: 1},
                {key: "银行", value: 2},
                {key: "支付平台", value: 3},
                {key: "其他", value: 4},
            ]
        }
    },
    components: {
        MyInput,MySelect,loading
    },
    methods: {
        getName(val){
            this.name = val.content
        },
        getPs(val){
            this.ps = val.content
        },
        getBalance(val){
            this.balance = val.content
        },
        getType(val){
            this.type = val
        },
        changeName(){
            if(this.name.length==0){
                this.$emit("error","名字不能为空")
                this.nameCheck = false
                return false
            }else{
                this.nameCheck = true;
                return true
            }
        },
        back(){
            this.$emit("back")
        },
        set(){
            if(!this.changeName()){
                return
            }
            if(this.type==0){
                this.$emit("error","请选择类型")
                return
            }
            this.isLoading = true
            axios.request({
                url: 'api/account/create?token='+localStorage.usermsg,
                method: 'POST',
                params: {
                    name: this.name,
                    type: this.type,
                    initial_balance: this.balance,
                    remark: this.ps
                },
                baseURL: "http://jizhang-api-dev.it266.com/",
            }).then((res)=>{
                this.isLoading = false
                if(res.data.code==0){
                    this.$emit("success")
                }else{
                    this.$emit("error",res.data.data)
                    if(/TOKEN/.test(res.data.data)){
                        setTimeout(()=>{
                            this.$router.push("/login")
                        },2000)
                        
                    }
                }
            }).catch(function(error){
                this.isLoading = false
                console.log(error)
                
            })
        }
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
    .AccountAdd{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        background-color: rgba(255,255,255,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .theMain{
            height: 330px;
            width: 80%;
            background-color: #eeeeee;
            display: flex;
            flex-direction: column;
            .center{
                width: 90%;
                height: 100%;
                margin: 0 auto;
                display: flex;
                justify-content: center;
                flex-direction: column;
                &>div{
                    width: 100%;
                    font-size: 1.2rem;
                    margin: 15px 0;
                    display: flex;
                    justify-content: space-between;
                    .default{
                        padding-right: 20px;
                    }
                    .tit{
                        flex-shrink: 0;
                        flex-grow: 0;
                        font-size: 1.2rem;
                    }
                    .typeOption{
                        flex-grow: 1;
                    }

                }
            }
            .button{
                width: 100%;
                height: 50px;
                button{
                    width: 100%;
                    height: 100%;
                    outline: none;
                    border:none;
                    border-top: 1px solid #cccccc;
                    background-color: transparent;
                }
            }
        }

    }
</style>