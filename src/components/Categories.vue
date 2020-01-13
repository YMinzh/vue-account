<template>
    <div class="Categories" :class=" {active: isActive}" @click="changed">
        <span class="iconfont" v-html="html"></span>
        <span class="text">{{text}}</span>
    </div>
</template>

<script>
export default {
    props: ["text","active","index","id","type","html"],
    computed: {
        isActive(){
            return this.active==this.index
        }
    },
    methods: {
        changed(){
            this.$emit("choosed",{index: this.index,flag: this.index==this.active,id: this.id,type: this.type})
        }
    }
}
</script>

<style lang="scss" scoped>
    .Categories{
        margin: 16px 0px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        flex: 0 0 25%;
        span{
            font-size: 0.8rem;
            color: #999999;
        }
        .iconfont{
            font-size: 1.6rem;
        }
    }
    .active span{
        color: #39b54a;
    }
</style>