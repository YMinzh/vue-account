<template>
    <div class="CateMain">
        <div class="mainTitle">
            <div class="in" :class="{active: flag}" >
                <span @click="chooseTrue">支出</span>
            </div>
            <div class="out" :class="{active: !flag}">
                <span @click="chooseFalse">收入</span>
            </div>
        </div>
        <div class="maincontent">
            <Categories html="&#xe60b;" v-show="flag" @choosed="changeActive" :active="active" :index="index" :text="item.name" :id="item.id" :type="item.type" v-for="(item, index) in outArray" :key="index"></Categories>
            
        </div>
        <div class="maincontent">
            <Categories html="&#xe60b;" v-show="!flag" @choosed="changeActive" :active="active" :index="index" :text="item.name" :id="item.id" :type="item.type" v-for="(item, index) in inArray" :key="index"></Categories>
        </div>

    </div>
</template>

<script>
import Categories from '@/components/Categories.vue'

export default {
    data(){
        return{
            flag: true,
            active: 0,
        }
    },
    props: ["inArray","outArray"],
    components: {
        Categories
    },
    methods: {
        chooseTrue(){
            this.flag=true
            this.active = 0
        },
        chooseFalse(){
            this.flag=false
            this.active = 0
        },
        changeActive(val){
            if(val.flag){
                this.$router.push({path: "create",query: {id: val.id,type: val.type}})
            }else{
                this.active=val.index
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .CateMain{
        flex-grow: 1;
        .mainTitle{
            height: 40px;
            border-bottom: 1px solid #999999;
            display: flex;
            align-items: center;
            justify-content: center;
            div{
                height: 40px;
                padding: 0 20px;
                color: #222222;
                span{
                    line-height: 40px;
                }

            }
            .active{
                color: #39b54a;
                border-bottom: 2px solid #39b54a;
            }

        }
        .maincontent{
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>