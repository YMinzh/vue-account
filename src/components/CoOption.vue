<template>
    <ChooseNav :CaptchaArr="captchaArr" @callback="getVal" @click="go"></ChooseNav>
</template>
<script>
import axios from 'axios'
import ChooseNav from '@/components/ChooseNav.vue'

export default {
    data(){
        return{
            captchaArr: [[],[]],
        }
    },
    components: {
        ChooseNav
    },
    mounted() {
    this.require(1)
    this.require(2)

    },
    methods: {
        go(){
            this.$emit("clicked")
        },
        getVal(val){
            console.log(val)
            this.$emit("goback",val)
        },
        require(type){
            axios.request({
                url: 'api/category?token='+localStorage.usermsg,
                method: 'get',
                baseURL: "http://jizhang-api-dev.it266.com/",
                params: {
                    type: type,
                    dataType: "1" 
                }
            }).then((res)=>{
                if(res.data.code==0){
                    var array = [];

                    if(type==1){
                        for(let index in res.data.data){
                            this.captchaArr[0].push({name :res.data.data[index].name,id :res.data.data[index].id,type :res.data.data[index].type})
                        } 
                    }else if(type==2){
                        for(let index in res.data.data){
                            this.captchaArr[1].push({name :res.data.data[index].name,id :res.data.data[index].id,type :res.data.data[index].type})
                        }
                    }
                    
                
                }
            }).catch(function(error){
                console.log(error)
                
            })
        },
    },
 
}
</script>
<style lang="scss">
    
</style>