<template>
    <div class="CatChange" @click="back">
        <div class="theMain">
            <div class="center" @click.stop>
                <div><MyInput isRtl=true name="账户名字:" type="text" @getVal="getName" :value="name" @callback="changeName" height="30px" isError=false></MyInput></div>
            </div>
            <div class="button">
                <button @click.stop="set">修改</button>
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
            date: '   ',
            name: '',
            nameCheck:true,

  
            isLoading:false,

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
            this.name = val.content
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
            console.log(this.dataList)
            this.isLoading = true
            axios.request({
                url: 'api/category/update?id='+this.dataList.id+'&token='+localStorage.usermsg,
                method: 'POST',
                params: {
                    name: this.name,
                    sort : 10

                },
                baseURL: "http://jizhang-api-dev.it266.com/",
            }).then((res)=>{
                console.log(res)
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
            }).catch((error)=>{
                this.isLoading = false
                console.log(error)
                
            })
        }
    },
    mounted() {
        // this.name = this.dataList.name
        // this.ps = this.dataList.remark
        // this.type = this.dataList.type
        // this.date = this.dataList.created_at
    },
    watch: {
        dataList(){
            this.name = this.dataList.name
        }
    },
}
</script>

<style lang="scss" scoped>
    .CatChange{
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
            height: 120px;
            width: 80%;
            background-color: #eeeeee;
            display: flex;
            flex-direction: column;
            .center{
                font-size: 1.2rem;
                width: 90%;
                height: 100%;
                margin: 0 auto;
                display: flex;
                justify-content: center;
                flex-direction: column;
                overflow: hidden;
                &>div{
                    margin: 15px 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    div{
                        flex-shrink: 0;
                    }
                    .default{
                        padding-right: 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        overflow: hidden;
                        flex-wrap: wrap;
                        font-size: 1rem;
                        word-break: break-all;
                    }
                    .typeOption{
                        flex-grow: 1;
                        display: flex;

                        justify-content: flex-end;
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