<template>
    <div class="NavList">
        <div class="block" v-for="(item, index) in dataArr" :key="index">
            <div class="division"></div>
            <div class="list" v-for="(item2, index2) in item" :key="index2" @click="go(item2)">
                <div class="left">{{item2.left}}</div>
                <div class="right iconfont">&#xe74b;</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:["dataArr"],
    methods: {
        go(item){
            if(item.left=="退出登录"){
                localStorage.clear()
            }
            this.$router.push(item.path)
        }
    }

}
</script>
<style lang="scss" scoped>
    .NavList{
        width: 100%;
        .block{
            width: 100%;
            background-color: #fff;
            .list{
                width: 80%;
                margin: 0 auto;
                border-bottom: 1px solid #eeeeee;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 1rem;
                height: 44px;
            }
            & .list:last-of-type{
                border: none;
            }
            .division{
                height: 16px;
                width: 100%;
                background-color: #eeeeee;
            }
        }
        // & .block:last-of-type {
        //     .division{
        //         display: none;
        //     }
        // }
    }
</style>