<template>
    <div class="TitleItem" @click="tryDo">
        <div class="up">
            <span>{{upText}}</span>
        </div>
        <div class="down">
            <div class="left"><span>{{leftText}}</span></div>
            <div class="right">
                <span class="text">{{rightText}}</span>
                <span class="text iconfont" v-if="theAction">&#xe616;</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            theAction: ''
        }
    },
    props: ["action","upText","leftText","rightText"],
    mounted() {
        this.theAction = (this.action=="true")   
    },
    methods: {
        tryDo(){
            if(!this.theAction){
                return
            }
            this.$emit("callback")
        }
    },
    watch: {
        action(n,o){
            console.log(n,o)
            this.theAction = (n)   
            
        }
    },
}
</script>
<style lang="scss" scoped>
    .TitleItem{
        display:flex;
        align-items: center;
        flex-direction: column;
        flex-grow: 1;
        color: white;
        .up{
            font-size: 0.6rem;
        }
        .down{
            display: flex;
            align-items: baseline;
            .left{
                font-size: 1.6rem;
            }
            .right{
                font-size: 0.6rem;
                .iconfont{
                    margin-left: 2px
                }
            }
        }
    }
</style>