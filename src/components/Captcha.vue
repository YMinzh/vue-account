<template>
    <div class="Captcha">
        <div class="left">
            <MyInput :value="value" name="验证码" type="text" @getVal="getVal" :height="height" @callback="emitCaptcha" :isError="isError"></MyInput>
        </div>
        <div class="right">
            <img :src="cUrl" @click="reCaptcha">
        </div>
    </div>
</template>

<script>
import MyInput from '@/components/Input.vue'

export default {
    data(){
        return{
            captcha: ''
        }
    },
    props: [
        "cUrl","height","isError","value"
    ],
    components: {
        MyInput
    },
    methods: {
        emitCaptcha(val){
            this.$emit("callback",val)
        },
        reCaptcha(){
            this.$emit("reCaptcha")
        },
        getVal(val){
            this.$emit("getVal",val)
        }
    },
    mounted() {
        console.log(this.cUrl)
    },
}
</script>

<style lang="scss" scoped>
    .Captcha{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .right{
            height: 100%;
            width: 120px;
        }
        .left{
            flex-grow: 1;
        }
    }
</style>