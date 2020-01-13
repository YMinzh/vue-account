<template>
    <div class="Add">
        <Top right = "管理" left = "返回" center ="记一笔" @leftclick="back" @rightclick="goChange"></Top>
        <Alert :errorNews="errorNews" v-show="errorFlag" @callback="errorBack"></Alert>
        <CateMain :inArray="inArray" :outArray="outArray"></CateMain>
        <loading :isLoading="isLoading"/>

    </div>
</template>

<script>
import Top from '@/components/Top.vue'
import Alert from '@/components/Alert.vue'
import CateMain from '@/components/CateMain.vue'
import loading from '@/components/loading.vue'
import axios from 'axios'

export default {
    components: {
        Top,Alert,CateMain,loading
    },
    data(){
        return {
            errorNews: "",
            errorFlag: false,
            inArray:[],
            outArray:[],
            isLoading: false,
        }
    },
    mounted() {
        if(localStorage.usermsg == undefined ||localStorage.usermsg == ""){
            this.$router.push("/login")
        }
        this.require("1")
        this.require("2")
    },
    methods: {
        errorBack(){
            this.errorFlag=false;
            clearTimeout(this.timeId)
        },
        autoErrorBack(){
            var timeId = setTimeout(()=>{
                this.errorFlag=false;
            },2000)
        },
        back(){
            this.$router.push("/")
        },
        goChange(){
            this.$router.push({path: "/catchange",query: {inArray: this.inArray, outArray: this.outArray}})
        },
        require(type){
            this.isLoading = true
            axios.request({
                url: 'api/category?token='+localStorage.usermsg,
                method: 'get',
                baseURL: "http://jizhang-api-dev.it266.com/",
                params: {
                    type: type,
                    dataType: "1" 
                }
            }).then((res)=>{
                this.isLoading = false
                if(res.data.code==0){
                    var array = [];
                    for(let index in res.data.data){
                        array[index] = {name :res.data.data[index].name,id :res.data.data[index].id,type :res.data.data[index].type}
                    }
                    if(type==1){
                        this.inArray = array
                    }else if(type==2){
                        this.outArray = array
                    }
                    
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
    }
}
</script>
<style lang="scss" scoped>
    .Add{
        width: 100%;
    }
</style>