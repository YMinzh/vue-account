<template>
    <div class="Catchange">
        <Top left = "返回" center ="管理分类" @leftclick="back" @rightclick="goAdd" right= "添加"></Top>
        <div class="main">
            <div class="mainTitle">
                <div class="in" :class="{active: flag}" >
                    <span @click="chooseTrue">支出</span>
                </div>
                <div class="out" :class="{active: !flag}">
                    <span @click="chooseFalse">收入</span>
                </div>
            </div>
            <div class="maincontent"  v-show="flag">
                <!-- <Categories html="&#xe60b;" @choosed="changeActive" :active="active" :index="index" :text="item.name" :id="item.id" :type="item.type" v-for="(item, index) in outArray" :key="index"></Categories> -->
                <van-swipe-cell v-for="(item, index) in outArray" :key="index">
                    <van-cell  :title="item.name" />

                    <template slot="right">
                        <van-button square type="danger" text="删除" @click="remove(item)"/>
                        <van-button square type="primary" text="更改" @click="change(item)"/>
                    </template>
                    </van-swipe-cell>
            </div>
            <div class="maincontent"  v-show="!flag">
                <!-- <Categories html="&#xe60b;" @choosed="changeActive" :active="active" :index="index" :text="item.name" :id="item.id" :type="item.type" v-for="(item, index) in inArray" :key="index"></Categories> -->
                    <van-swipe-cell v-for="(item, index) in inArray" :key="index">
                        <van-cell  :title="item.name" />

                        <template slot="right">
                            <van-button square type="danger" text="删除"  @click="remove(item)"/>
                            <van-button square type="primary" text="更改" @click="change(item)"/>
                        </template>
                    </van-swipe-cell>
            </div>
        </div>


        <Alert :errorNews="errorNews" v-show="errorFlag" @callback="errorBack"></Alert>
        <loading :isLoading="isLoading"/>
        <CatAdd v-show="addFlag" @back="function(){addFlag=false}" @success="addSuccess" @error="nameError"></CatAdd>
        <CatChangeM :dataList="dataList" v-show="detalFlag" @back="function(){detalFlag=false}" @success="success"></CatChangeM>

    </div>
</template>

<script>
import Top from '@/components/Top.vue'
import Alert from '@/components/Alert.vue'
import loading from '@/components/loading.vue'
import axios from 'axios'
import Categories from '@/components/Categories.vue'
import CatAdd from '@/components/CatAdd.vue'
import CatChangeM from '@/components/CatChangeM.vue'

export default {
    components: {
        Top,Alert,loading,Categories,CatAdd,CatChangeM
    },
    data(){
        return {
            errorNews: "",
            errorFlag: false,
            inArray:[],
            outArray:[],
            isLoading: false,

            flag: true,
            active: 0,

            isSetting: false,
            detalFlag: false,
            addFlag: false,
            dataList: {}
        }
    },
    mounted() {
        if(localStorage.usermsg == undefined ||localStorage.usermsg == ""){
            this.$router.push("/login")
        }
        // this.inArray = this.$route.query.inArray
        this.require(1)
        this.require(2)
        // this.outArray = this.$route.query.outArray
        // console.log(this.inArray)
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
            this.$router.push("/add")
        },
        chooseTrue(){
            this.flag=true
            this.active = 0
        },
        chooseFalse(){
            this.flag=false
            this.active = 0
        },
        changeActive(val){
            // if(val.flag){
                console.log(1)
            //     this.$router.push({path: "create",query: {id: val.id,type: val.type}})
            // }else{
            //     this.active=val.index
            // }
        },
        goAdd(){
            this.addFlag = true;
        },
        addSuccess(){
            this.addFlag = false;
            this.errorNews = "添加成功";
            this.require(1)
            this.require(2)
            this.errorFlag = true
            this.autoErrorBack()

        },
        nameError(val){
            this.errorNews= val;
            this.errorFlag = true
            this.autoErrorBack()
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
        },
        remove(item){
            this.isLoading = true
            axios.request({
                url: 'api/category/delete?id='+item.id+'&token='+localStorage.usermsg,
                method: 'get',
                baseURL: "http://jizhang-api-dev.it266.com/",
            }).then((res)=>{
                this.isLoading = false
                if(res.data.code==0){
                    this.errorNews = "删除成功"
                    this.errorFlag = true
                    this.autoErrorBack()
                    this.require(1)
                    this.require(2)
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


        },
        change(item){
            this.dataList = item
            this.detalFlag = true;

        },
        success(){
            this.detalFlag = false;
            this.errorNews = "设置成功";
            this.errorFlag = true
            this.require(1)
            this.require(2)
            // this.autoErrorBack()
        },

        
    }
}
</script>
<style lang="scss" scoped>
    .Catchange{
        width: 100%;
        .main{
        flex-grow: 1;
        .mainTitle{
            height: 40px;
            border-bottom: 1px solid #999999;
            display: flex;
            align-items: center;
            justify-content: center;
            div{
                height: 40px;
                padding: 0 20px;
                color: #222222;
                span{
                    line-height: 40px;
                }

            }
            .active{
                color: #39b54a;
                border-bottom: 2px solid #39b54a;
            }

        }
        .maincontent{
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
        }
    }
    }
</style>