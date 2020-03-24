<template>
    <div class="header">
        <div class="main">
            <div class="control" v-on:touchstart="change">
                <label class="iconfont icon-sousuo" :class="active?'active':''" for="search"></label>
                <label class="text" for="search" :class="active?'active':''">搜索</label>
                <input type="text" id="search" :class="active?'active':''" @keydown.13="search" v-model="keywords">
                <span class="cancel" :class="active?'active':''">取消</span>
            </div>
            <router-link :to="`/play/${id}`" class="player">
                <img :src="info.al.picUrl+'?param=50y50'" :class="isPlay?'':'paused'" v-if="canPlay">
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            active:false,
            keywords:""
        }
    },
    methods:{
        //设置一些元素的active class的切换
        change(e){
            if(e.target.className == 'cancel active'){
                this.active = false
                this.keywords = ""
                return
            }
            this.active = true
        },
        search(){
            this.$router.push({name:'search',params:{keywords:this.keywords}})
        } 
    },
    computed:{
        isPlay(){
            return this.$store.state.isPlay
        },
        info(){
            return this.$store.state.info
        },
        id(){
            return this.$store.state.id
        },
        canPlay(){
            return this.$store.state.canPlay
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "../../public/scss/base.scss";
    .header{
        padding: .1rem 0;
        background-color: $cm-red;
        div.main{
            color: white;
            display:flex;
            align-items:center;
            font-weight: 400;
            div.control{
                align-items:center;
                display:flex;
                position: relative;
                p{
                    font-size:.18rem;
                }
                label{
                    position: absolute;
                    color:$font-introduce;
                    font-size: .13rem;
                }
                label.iconfont{
                    left: 1.5rem;
                    top: .1rem;
                    transition: all .3s;
                    &.active{
                        left: .3rem;
                        top: .09rem;
                    }
                }
                label.text{
                    left: 1.7rem;
                    top: .09rem;
                    &.active{
                        display: none;
                    }
                }   
                input{
                    width: 2.75rem;
                    height: .28rem;
                    border: 0;
                    border-radius: .16rem;
                    padding-left:.3rem;
                    margin-left: .2rem;
                    color: #000;
                    font-size: .12rem;
                    background: #f7f7f7;
                    transition: width .3s;
                    &.active{
                        width: 2.35rem;
                    }
                }
                span.icon-sousuo{
                    margin-right:.13rem;
                }
                span.cancel{
                    font-size: .15rem;
                    color:$head-color;
                    margin-left: .1rem;
                    display: none;
                    &.active{
                        display: inline;
                    }
                }
               
            }
            a.player{
                position: absolute;
                left: 3.35rem;
                display: block;
                width: 30px;
                height: 30px;
                font-size: 0;
                float: right;
                img{
                    width: 100%;
                    border-radius: 50%;
                    animation:turn 5s linear infinite;
                    &.paused{
                        animation-play-state: paused;
                    }
                }
            }
        }
    }

</style>