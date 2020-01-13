<template>
    <div class="Foot">
        <div :class="{boxs: true,active: active==1}" @click="goHome">
            <span class="iconfont">&#xe60a;</span>    
            <span class="text">明细</span>
        </div>        
        <div class="boxs" @click="goAdd">
            <div class="addBox"><span class="iconfont">&#xe61a;</span></div>    
            <span class="text">记账</span>
        </div>        
        <div :class="{boxs: true,active: active==2}" @click="goAdmin">
            <span class="iconfont">&#xe636;</span>    
            <span class="text">我的</span>
        </div>        
    </div>
</template>

<script>
export default {
    props: ["active"],
    methods: {
        goAdd(){
            this.$emit("createAcc")
        },
        goAdmin(){
            if(this.active==2){
                return
            }
            this.$router.push("/admin")
        },
        goHome(){
            if(this.active==1){
                return
            }
            this.$router.push("/")
        }
    }
}
</script>

<style lang="scss" scoped>
    .Foot{
        background-color: #fff;
        height: 50px;
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        .boxs{
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            color: #999999;
            align-items: center;
            .text{
                font-size: 0.6rem;
                margin-bottom: 6px;
            }
            .iconfont{
                font-size: 1.2rem;
            }
            .addBox{
                position: absolute;
                color: #39b54a;
                bottom: 18px;
                width: 50px;
                height: 50px;
                border-radius: 100px;
                background-color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: none;
                .iconfont{
                    font-size: 2.2rem;
                }
            }

        }
        .active{
            color: #39b54a;
        }
    }
</style>