<template>
    <div class="PhoneCaptcha">
        <div class="pleft">
            <MyInput :value="value" name="手机验证码" @getVal="getVal" type="text" :height="height" @callback="emitMsg"></MyInput>
        </div>
        <div class="pright">
            <MyButton :height="newHeight" bText="获取" @callback="forGet"></MyButton>
        </div>
    </div>
</template>

<script>
import MyInput from '@/components/Input.vue'
import MyButton from '@/components/MyButton.vue'



export default {
    props: [
        "height","value"
    ],
    components: {
        MyInput,MyButton
    },
      methods: {
        emitMsg(val){
            this.$emit("callback",val)
        },
        newHeight(){
            return this.height/2;
        },
        getVal(val){
            this.$emit("getVal",val)
        },
        forGet(){
            this.$emit("forGet")
        }
    },
    
}
</script>

<style lang="scss" scoped>
    .PhoneCaptcha{
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        width: 100%;
        .pright{
            flex-shrink: 0; 
            width: 85px;
        }
        .pleft{
            flex-grow: 1;
        }

    }
</style>