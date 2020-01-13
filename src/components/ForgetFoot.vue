<template>
    <div class="ForgetFoot">
        <span class="left" @click="lClick">{{lText}}</span>
        <span class="mid">|</span>
        <span class="right" @click="rClick">{{rText}}</span>
    </div>
</template>
<script>
export default {
    props: ["lText","rText"],
    methods: {
        lClick(){
            this.$emit("lclick");
        },
        rClick(){
            this.$emit("rclick")
        }
    }
}
</script>

<style lang="scss" scoped>
    .ForgetFoot{
        margin-bottom: 10px;
        width: 100%;
        display: flex;
        justify-content: center;
        color: #39b54a;
        .mid{
            margin: 0 10px;
        }
        .left{
            cursor: pointer;
        }
        .right{
            cursor: pointer;
        }
    }
</style>