<template>
    <div class="song-list">
        <div class="top">
            <img :src="info.coverImgUrl+`?param=200y200`" class="bg">
            <div class="header">
                <span @click="back" class="iconfont icon-guanbi"></span>
                <p>歌单</p>
                <span class="iconfont icon-icon-"></span>
            </div>
            <div class="content">
                <img :src="info.coverImgUrl+`?param=140y140`" class="pic">
                <div class="text">
                    <p class="title" v-text="info.name"></p>
                    <router-link to="/" class="user">
                        <img :src="info.creator.avatarUrl+`?param=30y30`">
                        <p class="uname" v-text="info.creator.nickname"></p>
                        <span class="iconfont icon-qianjin"></span>
                    </router-link >
                    <router-link to="/" class="des">
                        <p>开拓者独辟蹊径,保守者因循守旧,探索者勇攀高峰,执着者勇往无前</p>
                        <span class="iconfont icon-qianjin"></span>
                    </router-link>
                </div>
            </div>
            <div class="icons">
                <router-link to="/" class="item">
                    <span class="iconfont icon-pinglun"></span>
                    <p v-text="info.commentCount"></p>
                </router-link>
                <router-link to="/" class="item">
                    <span class="iconfont icon-icon-"></span>
                    <p v-text="info.shareCount"></p>
                </router-link><router-link to="/" class="item">
                    <span class="iconfont icon-xiazai"></span>
                    <p>下载</p>
                </router-link>
            </div>
        </div>
        <div class="songs">
            <div class="header">
                <span class="iconfont icon-bofang1"></span>
                <p class="playall">播放全部</p>
                <p class="play-count" v-text="`（共${info.trackCount}首）`"></p>
                <span class="collect">
                    <span class="iconfont icon-jia"></span>
                    <p>收藏</p>
                    <p class="col-count" v-text="`(${subscribedCount})`"></p>
                </span>
            </div>
            <ul class="list">
                <li class="song" v-for="item,i of songs" :key="i">
                    <p class="no" v-text="i<9?'0'+(i+1):i+1"></p>
                    <router-link :to="`/play/${item.id}`" class="info">
                        <p class="sname" v-text="item.name"></p>
                        <span class="song-info">
                            <p class="artist" v-text="item.ar[0].name"></p>
                            <p class="split">-</p>
                            <p class="album" v-text="item.al.name">123</p>
                        </span>
                    </router-link>
                    <span class="iconfont icon-gengduo"></span>
                </li>
                <div class="tips">
                    已经到底了~
                </div>
            </ul>
        </div>
    </div>
</template>
<script>
import {
  getList
} from "../assets/js/APIs/songlist";
export default {
    data(){
        return{
            id:this.$route.params.id,
            info:{creator:{}},
            songs:[],
            subscribedCount:0,
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        }
    },
    created(){
        getList(this.id).then(result=>{
            this.info = result.playlist;
            this.songs = result.playlist.tracks;
            this.subscribedCount = parseInt(this.info.subscribedCount)>10000?(this.info.subscribedCount/10000).toFixed(1) + '万':parseInt(this.info.subscribedCount)
        })
    }
}
</script>
<style lang="scss" scoped>
@import "../../public/scss/base.scss";
    div.song-list{   
        position: relative;  
       div.top{
            position: relative;
            width: 100%;
            height: 3.2rem;
            overflow: hidden;
            img.bg{
                position: absolute;
                width: 100%;
                filter: blur(.4rem);
                transform: scale(1.5);
            }
            div.header{
                width: 100%;
                padding: .2rem .2rem;
                box-sizing: border-box;
                position: absolute;
                z-index: 55;
                color: $font-alpha-white;
                @include flex-between;
                .iconfont{
                    color: $font-alpha-white;
                    font-size: .2rem;
                }
                p{
                    font-size: .16rem;
                    line-height: .2rem;
                }
            }
            div.content{
                width: 100%;
                position: absolute;
                z-index: 55;
                top: .8rem;
                @include flex-between;
                img.pic{
                    border-radius: .1rem;
                    width: 40%;
                    margin: 0 .2rem;
                }
                div.text{
                    width: 60%;
                    padding-right: .15rem;
                    box-sizing: border-box;
                    @include flex-between;
                    flex-direction: column;
                    p.title{
                        font-size: .16rem;
                        color: $font-alpha-white;
                        line-height: .2rem;
                    }
                    a.user{
                        @include flex-between;
                        line-height: .3rem;
                        img{
                            border-radius: 50%;
                        }
                        p.uname{
                            font-size: .15rem;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            color: $font-alpha-grey;
                            width: 60%;
                        }
                        span.iconfont{
                            color: $font-alpha-grey;
                        }
                    }
                    a.des{
                        font-size: 0;
                        @include flex-between;
                        p{
                            font-size: .14rem;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            color: $font-alpha-grey;
                            line-height: .2rem;
                        }
                        span{
                            line-height: .4rem;
                            color: $font-alpha-grey;
                        }
                    }
                }
            }
            div.icons{
                width: 100%;
                position: absolute;
                z-index: 55;
                top: 2.35rem;
                @include flex-around;
                box-sizing: border-box;
                font-size: 0;
                a.item{
                    text-align: center;
                    span{
                        font-size: .25rem;
                        color: $font-alpha-white;
                    }
                    p{
                        font-size: .15rem;
                        color: $font-alpha-white;
                        margin-top: .1rem;
                    }
                }
            }
       }
       div.songs{
            position: absolute;
            width: 100%;
            background: #fff;
            border-top-right-radius: .2rem;
            border-top-left-radius: .2rem;
            z-index: 100;
            top: 3rem;
            padding: .2rem .1rem .2rem .2rem;
            div.header{
                display: flex;
                height: .4rem;
                line-height: .4rem;
                span.icon-bofang1{
                    color: $font-main;
                    font-size: .25rem;
                }
                p.playall{
                    color: $font-main;
                    font-size: .18rem;
                    margin-left: .1rem;
                }
                p.play-count{
                    color: $font-alpha-grey;
                    font-size: .14rem;
                    margin-right: .12rem;
                }
                span.collect{
                    @include flex-between;
                    
                    padding: .12rem .12rem;
                    background: -webkit-linear-gradient(left,#fe554c,#fd2316);
                    align-items: center;
                    border-radius: .2rem;
                    box-shadow: -.01rem .01rem .04rem -.01rem #fd2316;
                    
                    span.icon-jia{
                        color: #fff;
                    }
                    p{
                        font-size: .14rem;
                        color: #fff;
                        margin-left: .05rem;
                    }
                }
            }
            ul.list{
                margin: .2rem 0 .6rem 0;
                li.song{
                    display: flex;
                    font-size: 0;
                    height: .4rem;
                    align-items: center;
                    margin-bottom: .2rem;
                    p.no{
                        color: $font-introduce;
                        font-size: .18rem;
                    }
                    a.info{
                        margin-left: .15rem;
                        width: 100%;
                        p.sname{
                            color: $font-main;
                            font-size: .16rem;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 1;
                            overflow: hidden;
                        }
                        span.song-info{
                            display: flex;                      
                            p{
                                color: $font-introduce;
                                font-size: .13rem;
                                margin-top: .05rem;
                                letter-spacing: .01rem;
                                font-weight: lighter;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 1;
                                overflow: hidden;
                                    
                            }
                        } 
                    }
                    span.iconfont{
                        font-size: .25rem;
                        color: $font-introduce;
                    }
                }
                div.tips{
                    margin-top: .4rem;
                    font-size: .16rem;
                    color:$font-introduce;
                    text-align: center;
                }
            }
       }
    }
</style>
