<template>
    <div class="Admin">
        <div class="top"><Top left = "" center ="个人中心"></Top></div>
        <div class="adminMain">
            <div class="up" @click="goChangeAvactar">
                <div class="avatarBox">
                    <img :src="avatar_url" alt="">
                </div>
                <div class="nickname">{{nickname}}</div>
            </div>
            <div class="down">
                <NavList :dataArr="dataArr"></NavList>
            </div>
        </div>
        <div class="foot"><Foot active="2" @createAcc="createAcc"></Foot></div>
        <loading :isLoading="isLoading"/>

    </div>
</template>

<script>
import Top from '@/components/Top.vue'
import Foot from '@/components/Foot.vue'
import axios from 'axios'
import NavList from '@/components/NavList.vue'
import loading from '@/components/loading.vue'

export default {
    data(){
        return{
            avatar_url:'',
            nickname:'',
            mobile:'',
            isLoading: false,
            dataArr: [
                [
                    {left: "修改手机号", path: "/changephone"},
                    {left: "修改密码" ,path: "/changepassword"},
                ],
                [
                    {left: "账簿管理", path: "/book"},
                    {left: "账户管理", path: "/account"},
                ],
                [
                    {left: "问题反馈", path: "/feedback"},
                    {left: "退出登录", path: "/login"},
                ]
            ]
        }
    },
    components: {
        Top,Foot,NavList,loading
    },
    methods: {
        createAcc(){
          this.$router.push("/add")            
        },
        require(){
            this.isLoading = true
            axios.request({
                url: 'api/user/profile?token='+localStorage.usermsg,
                method: 'get',
                baseURL: "http://jizhang-api-dev.it266.com/",
            }).then((res)=>{
                this.isLoading = false
                if(res.data.code==0){
                    this.avatar_url = res.data.data.avatar_url;
                    this.nickname = res.data.data.nickname;
                    this.mobile = res.data.data.mobile;
                }else{
                    this.errorNews = "登录失效  请重新登录"
                    this.errorFlag = true

                    this.isGo=true
                    this.successGo="/login"
                    this.autoErrorBack()
                }

            }).catch(function(error){
                this.isLoading = false
                console.log(error)
                
            })
        },
        goChangeAvactar(){
            this.$router.push("/changeAdmin")
        }
    },
    mounted() {
        if(localStorage.usermsg == undefined ||localStorage.usermsg == ""){
            this.$router.push("/login")
        }
        this.require()


            axios.request({
                url: 'api/book/get-default?token='+localStorage.usermsg,
                method: 'get',
                baseURL: "http://jizhang-api-dev.it266.com/",
            }).then((res)=>{
                    console.log(res)
            

            }).catch(function(error){
                console.log(error)
                
            })
    },

}
</script>

<style lang="scss" scoped>
    .Admin{
        width: 100%;
        background-color: #eeeeee;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .top{
            width: 100%;
        }
        .adminMain{
            width: 100%;
            flex-grow: 1;
            flex-shrink: 1;
            overflow: auto;
            .up{
                background-color: #39b54a;
                height: 200px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                .avatarBox{
                    border-radius: 80px;
                    width: 80px;
                    height: 80px;
                    background-color: #fff;
                    overflow: hidden;
                    img{
                        width: 80px;
                        height: 80px;
                    }
                }
                .nickname{
                    margin-top: 12px;
                    font-size: 1.4rem;
                }
            }
        }
        .foot{
            width: 100%;
        }
    }
</style>