<template>
    <div class="Alert" @click="goBack">
        <div class="msg">
            <span>
                {{errorNews}}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["errorNews"],
    methods: {
        goBack(){
            this.$emit("callback");
        }
    }
}
</script>

<style lang="scss" scoped>
    .Alert{
        z-index: 300;
        height: 100%;
        width: 100%;
        background-color: rgba(255,255,255,0.5);
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        .msg{
            display: flex;
            justify-content: center;
            background-color: black;
            position: fixed;
            color: white;
            width: 200px;
            min-height: 30px;
            font-size: 1rem;
            padding: 10px;
        }
    }
</style>