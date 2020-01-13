<template>
    <div class="MyButton">
        <button :class="type" @click="btnGo" :style="{height:height}"><span>{{bText}}</span></button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            type: "default"
        }
    },
    props: ["bText","bType","height"],
    methods:{
        btnGo(){
            this.$emit("callback")
        }
    },
    mounted() {
        if(this.bType!=undefined){
            this.type = this.bType;
        }
    },
}
</script>

<style lang="scss" scoped>
    .MyButton{
        width: 100%;
        .default{
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            border-radius: 100px;
            color: #39b54a;
            font-size: 1.2rem;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bolder;
            border: #39b54a 1px solid;
        }
        .highLight{
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            border-radius: 100px;
            color: white;
            font-size: 1.2rem;
            background-color: #39b54a;
            display: flex;
            justify-content: center;
            font-weight: bolder;
            align-items: center;
            border: #39b54a 1px solid;
        }
    }
</style>