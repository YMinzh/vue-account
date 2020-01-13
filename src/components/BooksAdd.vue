<template>
    <div class="BooksAdd" @click="back">
        <div class="theMain">
            <div class="center" @click.stop>
                <div><MyInput isRtl=true name="账簿名字:" type="text" @getVal="getName" :value="name" @callback="changeName" height="30px" :isError="nameCheck"></MyInput></div>
            </div>
            <div class="button">
                <button @click.stop="set">创建账簿</button>
            </div>
        </div>   
        <loading :isLoading="isLoading"/>

    </div>
</template>

<script>
import MyInput from '@/components/Input.vue'
import loading from '@/components/loading.vue'
import axios from 'axios'


export default {
    data(){
        return {
            name: '',
            nameCheck:true,
            isLoading: false,
        }
    },
    components: {
        MyInput,loading
    },
    methods: {
        getName(val){
            this.name = val.content
        },
        changeName(){
            if(this.name.length==0){
                this.$emit("error","名字不能为空")
                this.nameCheck = false
            }else{
                this.nameCheck = true;
                return true
            }
        },
        back(){
            this.$emit("back")
        },
        set(){
            this.isLoading = true
            axios.request({
                url: 'api/book/create?token='+localStorage.usermsg,
                method: 'POST',
                params: {
                    name: this.name,
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
                console.log(res)
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
    .BooksAdd{
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
            height: 160px;
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
                    margin: 15px 0;
                    display: flex;
                    justify-content: space-between;
                    .default{
                        padding-right: 20px;
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