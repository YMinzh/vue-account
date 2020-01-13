<template>
    <div class="LookPicture" v-show="flag" @click="change">
        <div class="picture">
            <img :src="imgUrl" alt="">
        </div>
    </div>
</template>

<script>
export default {
    props: [
        "imgUrl","flag"
    ],
    methods: {
        change(){
            this.$emit("callback")
        }
    }
}
</script>

<style lang="scss" scoped>
    .LookPicture{
        z-index: 2;
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: black;
        display: flex;
        align-items: center;
        left: 0;
        top: 0;
        .picture{
            width: 100%;
            flex-shrink: 0;
            flex-grow: 0;
            img{
                width: 100%;
            }
        }
    }
</style>