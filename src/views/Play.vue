<template>
    <div class="play">
        <audio controls="controls" autoplay="autoplay" ref="audio" :src="url"></audio>
    </div>
</template>
<script>
import {
  getURL
} from "../assets/js/APIs/play";
export default {
    data(){
        return{
            id:this.$route.params.id,
            url:null
        }
    },
    methods:{
       
    },
    mounted(){
        getURL(this.id).then(result=>{
            console.log(result)
            this.url = result.data[0].url
        })
    }
}
</script>