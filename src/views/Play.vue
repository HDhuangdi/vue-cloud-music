<template>
    <div class="play">
        <img :src="info.al.picUrl+'?param=240y240'" class="bg">
        <div class="header">
            <span @click="back" class="iconfont icon-guanbi"></span>
            <div>
                <pre class="sname" v-text="info.name"></pre>
                <pre class="artist" v-text="info.ar[0].name"></pre>
            </div>
            <span class="iconfont icon-icon-"></span>
        </div>
        <div class="pic">
            <img :src="info.al.picUrl+'?param=240y240'" class="cover" :class="isPlay?'':'paused'">
        </div>
        <div class="icons">
            <span class="iconfont icon-xihuan1"></span>
            <span class="iconfont icon-xiazai"></span>
            <span class="iconfont icon-cailing"></span>
            <span class="iconfont icon-pinglun"></span>
            <span class="iconfont icon-gengduo"></span>
        </div>
        <div class="info">
            <span class="current" v-text="currentFmt" v-show="canPlay"></span>
            <van-loading type="spinner" size="16" v-show="!canPlay"/>
            <div class="progress">
                <span class="icon" :style="{'left':left}" v-on:touchmove="jump"></span>
            </div>
            <span class="total" v-text="durationFmt"></span>
        </div>
        <div class="controls">
            <span class="iconfont icon-shangyishoushangyige"></span>
            <span class="iconfont icon-bofang2" v-show="!isPlay" @click="changeState"></span>
            <span class="iconfont icon-plus-pause" v-show="isPlay" @click="changeState"></span>
            <span class="iconfont icon-xiayigexiayishou"></span>
        </div>
    </div>
</template>
<script>
import {
  getURL,
  getInfo
} from "../assets/js/APIs/play";
import { Dialog } from 'vant';
export default {
    data(){
        return{
            songID:0,
            url:null,
            info:{al:{},ar:[{}]},
            left:0,
            totalWidth:0,
        }
    },
    methods:{
        init(){
            this.songID = this.$route.params.songID
            this.$store.commit('getsongID',this.songID)
            getURL(this.songID).then(result=>{
                //付费歌曲判断
                if(result.data[0].code == -110 && result.data[0].payed == 0){
                    Dialog.alert({
                        message: '此歌曲为付费歌曲，请付费后使用'
                    }).then(() => {
                    this.$store.commit("changeisPayed",false)
                    this.$router.go(-1)
                    });
                }
                this.url = result.data[0].url
                this.$store.commit("getUrl",this.url)
            })
            getInfo(this.songID).then(result=>{
                this.info = result.songs[0]
                this.$store.commit("getInfo",this.info)
            })
        },
        back(){
            this.$router.go(-1)
        },
        //按下播放/暂停按钮时，修改vuex中的isPlay属性值
        changeState(){
            if(this.isPlay){
                this.$store.commit("changePlay",false)
            }else{
                this.$store.commit("changePlay",true)
            }
        },
        //时间格式化
        timeFormat(time){
            var m,s;
            time = parseInt(time)
            m = Math.floor(time/60)
            s = time%60
            if(m<10){
                m = `0${m}`
            }
            if(s<10){
                s = `0${s}`
            }
            return `${m}:${s}`
        },
        jump(e){
            //获取进度条距离窗口左边的距离
            var box = document.getElementsByClassName("progress")[0]; 
            this.totalWidth = box.offsetWidth;
            var pos = box.getBoundingClientRect(); 
            var x = pos.left
            if (event.targetTouches.length == 1) {
                var touch = event.targetTouches[0];
                //小圆点的mleft边界条件判断
                if(touch.pageX - x < 0){
                    this.left = 0
                }else if(touch.pageX - x > this.totalWidth){
                    this.left = (this.totalWidth/100)+'rem'
                }else{
                    this.left = (touch.pageX - x)/100 + 'rem'
                }
                //计算音乐的此时播放时间 = （( 触摸点距离页面左边的距离 - 进度条距离页面左边的距离 )/ 进度条的宽度 )* 总时长
                this.$store.commit("getCurrent_1",((touch.pageX - x)/this.totalWidth)*this.duration)
            }
        },
    },
    mounted(){
        this.init()
    },
    computed:{
        isPlay(){
            return this.$store.state.isPlay
        },
        duration(){
            return this.$store.state.duration
        },
        durationFmt(){
            return this.$store.state.durationFmt
        },
        current(){
            return this.$store.state.current
        },
        currentFmt(){
            return this.$store.state.currentFmt
        },
        isPayed(){
            return this.$store.state.isPayed
        },
        flag(){
            return this.$store.state.flag
        },
        canPlay(){
            return this.$store.state.canPlay
        }
    },
    watch:{
        //当时间发生改变时，调整进度条小圆点的位置
        current(){
            //当全局变量flag为true才执行（避免被keep-alive缓存的路由在离开时继续进行watch）
            if(this.flag){
                var distance = this.current/this.duration;
                //获得进度条的宽度
                this.totalWidth = document.getElementsByClassName('progress')[0].offsetWidth
                //小圆点的margin-left = totalWidth * distance
                this.left = parseInt(this.totalWidth * distance)/100 + 'rem'
            }
        },
    },
    //激活路由时，改变全局变量flag为true
    activated(){
        this.init()
        this.$store.commit("changeFlag",true)
    },
    //路由未激活时，改变全局变量flag为false
    deactivated(){
        this.$store.commit("changeFlag",false)
    }
}
</script>
<style lang="scss" scoped>
@import "../../public/scss/base.scss";
    div.play{
        height: 100%;
        overflow: hidden;
        position: relative;
        background: rgb(29, 29, 29);
        img.bg{
            position: absolute;
            width: 300%;
            height: 300%;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            z-index: 1;
            filter: blur(.24rem);
            opacity: .2;
        }
        div.pic{
            position: absolute;
            left: 50%;
            top: 40%;
            transform: translate(-50%,-50%);
            img.cover{
                border-radius: 50%;
                animation:turn 20s linear infinite;
                    &.paused{
                        animation-play-state: paused;
                    }
            }
        }
        div.header{
            width: 100%;
            position: relative;
            z-index: 10;
            @include flex-between;
            font-size: 0;
            padding: .2rem;
            color: $font-alpha-white;
            span{
                line-height: .3rem;
                font-size: .2rem;
            }
            div{
                width: 70%;
                text-align: center;
                pre.sname{
                    font-size: .14rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    margin: 0 auto;
                }
                pre.artist{
                    font-size: .12rem;
                    margin-top: .05rem;
                    color: $font-alpha-grey;
                    font-weight: lighter;
                }
            }
            
        }
        div.icons{
            position: relative;
            top: 52%;
            z-index: 10;
            @include flex-around;
            font-size: 0;
            padding: .2rem;
            color: $font-alpha-grey;
            span{
                font-size: .25rem;
            }
        }
        div.info{
            position: relative;
            top: 52%;
            z-index: 10;
            @include flex-around;
            font-size: 0;
            padding: .2rem;
            color: $font-alpha-grey;
            align-items: center;
            span.current{
                font-size: .12rem;
            }
            div.progress{
                width: 2rem;
                height: .02rem;
                background: $font-alpha-grey;
                position: relative;
                span.icon{
                    display: block;
                    width: .1rem;
                    height: .1rem;
                    background: #fff;
                    border-radius: 50%;
                    position: absolute;
                    top: -.04rem;
                    left: 0;
                }
            }
            span.total{
                font-size: .12rem;
            }
        }
        div.controls{
            position: relative;
            top: 52%;
            z-index: 10;
            @include flex-around;
            font-size: 0;
            margin-top: .1rem;
            color: $font-alpha-grey;
            align-items: center;
            span.icon-shangyishoushangyige,span.icon-xiayigexiayishou{
                font-size: .3rem;
            }
            span.icon-bofang2,span.icon-plus-pause{
                font-size: .5rem;
            }
        }
    }
</style>