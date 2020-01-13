<template>
    <div class="Books">
        <Top :left = "isSetting?'取消':'返回'" center ="账簿管理" @leftclick="back"></Top>
        <div class="main">
            <div class="items" v-for="(item, index) in array" :key="index">
                <Categories html="&#xe645;" @choosed="changeActive" :active="active" :index="index" :text="item.name" :id="item.id"></Categories>
                <div class="delete" v-show="isSetting" @click="remove(item)"></div>
            </div>
            <div v-show="!isSetting" class="items"><Categories html="&#xe604;" @choosed="goSet" active="false"  text="管理账簿"></Categories></div>
            <div v-show="isSetting" class="items"><Categories html="&#xe612;" @choosed="goAdd" active="false"  text="添加账簿"></Categories></div>
        </div>        
        <Alert :errorNews="errorNews" v-show="errorFlag" @callback="errorBack"></Alert>
        <BooksDetal :dataList="dataList" v-show="detalFlag" @back="function(){detalFlag=false}" @success="success"></BooksDetal>
        <BooksAdd v-show="addFlag" @back="function(){addFlag=false}" @success="addSuccess" @error="nameError"></BooksAdd>
        <loading :isLoading="isLoading"/>

    </div>
</template>

<script>
import Top from '@/components/Top.vue'
import Alert from '@/components/Alert.vue'
import Categories from '@/components/Categories.vue'
import BooksDetal from '@/components/BooksDetal.vue'
import BooksAdd from '@/components/BooksAdd.vue'
import loading from '@/components/loading.vue'
import axios from 'axios'

export default {
    components: {
        Top,Alert,Categories,BooksDetal,BooksAdd,loading
    },
    data(){
        return {
            errorNews: "",
            errorFlag: false,
            array:[],
            flag: true,
            active: -1,
            dataList:{},

            isSetting: false,
            detalFlag: false,
            addFlag: false,

            isLoading: false,
        }
    },
    mounted() {
        if(localStorage.usermsg == undefined ||localStorage.usermsg == ""){
            this.$router.push("/login")
        }
        this.require()
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
            if(!this.isSetting){
                this.$router.push("/admin")
            }else{
                this.isSetting=false
            }
        },
        require(){
            this.isLoading = true
            axios.request({
                url: 'api/book?token='+localStorage.usermsg,
                method: 'get',
                baseURL: "http://jizhang-api-dev.it266.com/",
            }).then((res)=>{
                this.isLoading = false
                if(res.data.code==0){
                    this.array = res.data.data;
                    console.log(res)
                    this.dataList = this.array[0]
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
         chooseTrue(){
            this.flag=true
            this.active = 0
        },
        chooseFalse(){
            this.flag=false
            this.active = 0
        },
        changeActive(val){
            console.log(val)
            if(val.flag){
                this.detalFlag = true;
                this.dataList = this.array[val.index]

                // =====================================
            }else{
                this.active=val.index
            }
        },
        success(){
            this.detalFlag = false;
            this.errorNews = "设置成功";
            this.errorFlag = true
        },
        goSet(){
            this.isSetting = true;
        },
        goAdd(){
            this.addFlag = true;
        },
        addSuccess(){
            this.addFlag = false;
            this.errorNews = "添加成功";
            this.require()
            this.errorFlag = true
            this.autoErrorBack()

        },
        nameError(val){
            this.errorNews= val;
            this.errorFlag = true
            this.autoErrorBack()
        },
        remove(item){
            this.$dialog.confirm({
                    title: '确认框',
                    message: '你确定要删除吗?'
                }).then(() => {
                    
                    this.isLoading = true
                    axios.request({
                        url: 'api/book/delete?token='+localStorage.usermsg,
                        method: 'POST',
                        baseURL: "http://jizhang-api-dev.it266.com/",
                        params: {
                            book_id: item.id
                        }
                    }).then((res)=>{
                        this.isLoading = false
                        if(res.data.code==0){
                            this.errorNews = "删除成功";
                            this.require()
                            this.errorFlag = true
                            this.autoErrorBack()
                            this.require()
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


                }).catch(() =>{

                })
        }
    }
}
</script>
<style lang="scss" scoped>
    .Books{
        width: 100%;
        .main{
            display: flex;
            flex-wrap: wrap;
            .items{
                flex: 0 0 25%;
                position: relative;
                .delete{
                    width: 15px;
                    height: 15px;
                    border-radius: 10px;
                    background-color: red;
                    position: absolute;
                    right: 10px;
                    top: 10px;
                }
            }
        }
    }
</style>