<template>
    <div>
        <VuePicker :data="pickData" :showToolbar="true" @cancel="cancel" @confirm="confirm"  :defaultIndex="defaultIndex" :visible.sync="pickerVisible"/> 
    </div>
</template>
<script>
    import VuePicker from 'vue-pickers'
  
    var tdata = []
    var tdata2 = [] 

    for(let i = 2010;i<=2025;i++){
        tdata.push({label: i,value: i})
    }
    for(let j = 1;j<=12;j++){
        tdata2.push({label: j,value: j})
    }
    

export default { 
    components: { VuePicker },
    data () {
        return{
            pickerVisible: false,
            pickData: [tdata,tdata2],
            result: '',
            defaultIndex: [1,2],
        }
    },
    props: ["flag"],
    methods:{
        cancel () {
            this.$emit("cannel")
        },
        confirm (res) {
            this.$emit("callback",[res[0].value,res[1].value])
        },

    },
    mounted() {
        // var Nyear = new Date().getFullYear();
        // var Nmonth = new Date().getMonth();
        // this.defaultIndex = [Nyear - 2010,Nmonth]
        // console.log(this.defaultIndex)
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