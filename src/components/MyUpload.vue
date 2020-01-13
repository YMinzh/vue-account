<template>
    <div class="MyUpload">
        <div class="picture" v-for="(item, index) in imgArr" :key="index" @click="goImg(item)">
            <img :src="item.url" alt="">
            <div v-show="isShowDelete(index)" class="delete" @click.stop="remove(index)"></div>
        </div>
        <div class="add" v-show="isShow">
            <label>
                <div class="addImg"><img src="@/assets/img/plus.jpg" alt=""></div>
                <input type="file" id="avatar" accept="image/gif,image/jpeg,image/jpg,image/png"  @change="uploadImg">
            </label>            
        </div>
        <LookPicture :flag="flag" :imgUrl="url" @callback="goBack"></LookPicture>
        <loading :isLoading="isLoading"/>
    </div>
</template>

<script>
import axios from 'axios'
import LookPicture from '@/components/LookPicture.vue'
import loading from '@/components/loading.vue'

export default {
    props: ["maxnum","value"],
    computed: {
        isShow(){
            if(this.imgArr.length<this.maxnum){
                return true
            }else{
                return false
            }
        }
    },
    components: {
        LookPicture,loading
    },
    data(){
        return{
            imgArr: [],
            fileKey: "",
            isLoading: false,
            flag: false,
            url: ""
        }
    },
    methods: {
        uploadImg(e){
            var file = e.target.files[0]
            var myFile = new FormData()
            myFile.append("file",file)
            this.isLoading = true
            axios.request({
                url: 'api/upload/image?token='+localStorage.usermsg,
                method: 'POST',
                data: myFile,
                baseURL: "http://jizhang-api-dev.it266.com/",
            }).then((res)=>{
                this.isLoading = false
                if(res.data.data.status){
                    this.imgArr.push({url:res.data.data.file.url ,fileKey:res.data.data.file.fileKey})
                    this.$emit("callback",this.imgArr)
                }else{
                    this.$emit("error",res.data.data)
                }

            }).catch(function(error){
                console.log(error)
            
            })
        },
        goImg(item){
            this.url = item.url;
            this.flag = true;
        },
        goBack(){
            this.flag = false
        },
        remove(index){
            this.imgArr.splice(index,1)
            this.$emit("callback",this.imgArr)
            return false
        },
        isShowDelete(index){

            if(this.imgArr[index].fileKey!=undefined){
                return true
            }else{
                return false
            }
        }

    },
    watch: {
        value(n,o){
            this.imgArr = n;
        },
        // imgArr(n,o){
        //     console.log(n,o)
        // }
    },
    mounted() {
        this.imgArr = this.value
        if(this.imgArr==undefined){
            this.imgArr=[]
        }
    },
}
</script>

<style lang="scss" scoped>
    .MyUpload{
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;
        .add{
            height: 90px;
            width: 90px;
            .addImg{
                width: 100%;
                height: 90px;
                display: flex;
                img{
                    width: 100%;
                }
            }
            input{
                display: none;
            }
            
        }
        .picture{
            height: 90px;
            flex: 0 0 33%;
            position: relative;
            padding-bottom: 20px;
            img{
                width: 80%;
                height: 100%;
            }
            .delete{
                width: 20px;
                height: 20px;
                border-radius: 10px;
                position: absolute;
                right: 10px;
                top: -10px;
                background-color: red;
                z-index: 1;
            }
        }
    }
</style>