<template>
    <div>
        <VuePicker :data="pickData" :showToolbar="true" @cancel="cancel" @confirm="confirm" :visible.sync="pickerVisible"/> 
    </div>
</template>
<script>
    import VuePicker from 'vue-pickers'
  
    var tdata = []
    var tdata2 = [] 
    var tdata3 = [] 

    for(let i = 2010;i<=2025;i++){
        tdata.push({label: i,value: i})
    }
    for(let j = 1;j<=12;j++){
        tdata2.push({label: j,value: j})
    }
    for(let k = 1;k<=31;k++){
        tdata3.push({label: k,value: k})
    }
    

export default { 
    components: { VuePicker },
    data () {
        return{
            pickerVisible: false,
            pickData: [tdata,tdata2,tdata3],
            result: ''
        }
    },
    props: ["flag"],
    methods:{
        cancel () {
            this.$emit("cannel")
        },
        confirm (res) {
            this.$emit("callback",[res[0].value,res[1].value,res[2].value])
        },

    },
    mounted() {

    },
    computed: {
            change(){
            this.pickerVisible = this.flag
        }
    },
    watch: {
        
        "flag": function(n){
            this.pickerVisible = n;
        }
        
    },
} 
</script> 