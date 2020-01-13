<template>
    <div :class="{active:active,inputBox:'true',error:!error}" :style="{height:height}">
        <div class="left"><span>{{name}}</span><span class="must" v-show="isMust">*</span></div>
        <div class="right">
            <input  :type="type" :class="{input:true,isRtl: isRtl}" @focus="focus()" @blur="blur" v-model="content" @input="returnVal">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            active : false,
            error : true,
            content: '',
        }
    },
    props: [
        "name","type","height","isError","isRtl","isMust","value"
    ],
    computed: {

    },
    methods: {
        focus(){
            this.active=true
        },
        blur(){
            this.active=false
            this.$emit("callback")
        },
        returnVal(){
            this.$emit("getVal",{content: this.content})
        },
    },
    mounted() {
        this.active = false 
        if(this.isError!=undefined){
            this.error=this.isError
        }
        if(this.type=="date"){
            var date = new Date()
            var g="g"
            var arr = date.toLocaleString().split(" ")[0].split("/")
            if(arr[1]<10){
                arr[1]="0"+arr[1]
            }
            if(arr[2]<10){
                arr[2]="0"+arr[2]
            }
            this.content=arr[0]+"-"+arr[1]+"-"+arr[2]
            this.returnVal()
        }
    },
    watch: {
        isError(n,o){
            this.error=n
        },
        value(n,o){
            this.content = n;
        }
    }
}
</script>

<style lang="scss" scoped> 
    .inputBox{
        width: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        height: 100%;
        border-bottom: 1px solid #999999;
        .left{
            min-width: 70px;
            height: 66.7%;
            font-size: 1.2rem;
            flex-shrink: 0;
            line-height: 40px;
            display: flex;
            align-items: center;
            .must{
                color: red;
            }
        }
        .right{
            flex-grow: 1;
            height: 66.7%;
            align-items: baseline;
            .input{
                border: none;
                outline: none;
                height: 100%;
                font-size: 1.2rem;
                width: calc(100% - 40px);
                padding:0 20px;
                background-color: transparent;
            }
            .isRtl{
                text-align: right;
            }
        }
    }
    .error{
        border-color: red;
    }
    .active{
        border-color: #39b54a;
    }
</style>