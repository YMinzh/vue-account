<template>
    <div class="loading" v-show="isLoading">
        <img src="@/assets/img/12.jpg" alt="">
    </div>
</template>
<script>
export default {
    props: ["isLoading"]
}
</script>
<style lang="scss" scoped>
    .loading{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(255,255,255,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 200;
        img{
            width: 80px;
        }
    }
    
</style>
