<template>
    <div class="BooksDetal" @click="back">
        <div class="theMain">
            <div class="center" @click.stop>
                <div><MyInput isRtl=true name="账簿名字:" type="text" @getVal="getName" :value="dataList.name" @callback="changeName" height="30px" isError=false></MyInput></div>
                <div>
                    <div>创建者:</div>    
                    <div class="default">{{dataList.user_name}}</div>
                </div>        
                <div>
                    <div>创建时间:</div>
                    <div class="default">{{dataList.created_at}}</div>
                </div> 
            </div>
            <div class="button">
                <button @click="set">设置为当前账簿</button>
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
            isLoading: false,
        }
    },
    components: {
        MyInput,loading
    },
    props:[
        "dataList"
    ],
    methods: {
        getName(val){
            this.dataList.name = val.content
        },
        changeName(){
            if(this.dataList.name!=this.name){
                axios.request({
                    url: 'api/book/update?token='+localStorage.usermsg,
                    method: 'POST',
                    params: {
                        book_id: this.dataList.id,
                        book_name: this.dataList.name
                    },
                    baseURL: "http://jizhang-api-dev.it266.com/",
                }).then((res)=>{
                    if(res.data.code==0){
                        this.name = this.dataList.name;
                    }else{
                        this.errorNews = res.data.data
                        this.errorFlag = true
                        this.autoErrorBack()
                        if(/TOKEN/.test(res.data.data)){
                            setTimeout(()=>{
                                this.$router.push("/login")
                            },2000)
                            
                        }
                    }
                    console.log(res)
                }).catch(function(error){
                    console.log(error)
                    
                })
            }
        },
        back(){
            this.$emit("back")
        },
        set(){
            this.isLoading = true
            axios.request({
                url: 'api/book/set-default?token='+localStorage.usermsg,
                method: 'POST',
                params: {
                    book_id: this.dataList.id,
                },
                baseURL: "http://jizhang-api-dev.it266.com/",
            }).then((res)=>{
                this.isLoading = false
                if(res.data.code==0){
                    this.$emit("success")


                }else{
                    this.errorNews = res.data.data
                    this.errorFlag = true
                    this.autoErrorBack()
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
        setTimeout(()=>{
            this.name = this.dataList.name
        },500)
    },
}
</script>

<style lang="scss" scoped>
    .BooksDetal{
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
            height: 260px;
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