<template>
    <div class="top">
        <div class="left" @click="go">
            <span class="iconfont" v-html="left"></span>
        </div>
        <div class="center">
            <span class="cText">{{center}}</span>
        </div>
        <div class="right" @click="goRight">
            <span class="cText">{{right}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        "left","center","right"
    ],
    methods: {
        go(){
            this.$emit('leftclick')
        },
        goRight(){
            this.$emit('rightclick')
        }
    }
}
</script>

<style lang="scss" scoped>
    .top{
        background-color: #39b54a;
        display: flex;
        justify-content: center;
        color: white;
        height: 40px;
        padding-top:15px;
        align-items: center;
        position: relative;
        .left{
            position: absolute;
            left: 16px;

            
        }
        .right{
            position: absolute;
            right: 16px;
        }
    }
</style>