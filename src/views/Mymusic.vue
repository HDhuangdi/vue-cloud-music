<template>
    <div class="my-music">
       <img :src="bg" alt="" class="bg">
       <div class="header">
           <span class="iconfont icon-B"></span>
           <div class="sign">
               <img :src="sign" class="sign">
               <span class="text" v-show="!isLogin">登录立享多端同步</span>
               <router-link to="/signin" class="button" v-show="!isLogin">立即登录</router-link>
           </div>
           <div class="icons">
               <div>
                   <span class="iconfont icon-xiazai1"></span>
                   <p>本地音乐</p>
               </div>
               <div>
                   <span class="iconfont icon-zhuanji"></span>
                   <p>我的电台</p>
               </div>
               <div>
                   <span class="iconfont icon-shoucang"></span>
                   <p>我的收藏</p>
               </div>
               <div>
                   <span class="iconfont icon-music"></span>
                   <p>关注新歌</p>
               </div>
           </div>
       </div>
       <div class="container">
           <p class="title">我的音乐</p>
           <div class="info">
               <div class="like">
                   <img src="http://p1.music.126.net/rfl3Z7qf8hDtWaISEwWacQ==/109951164774977412.jpg?param=50y50" alt="">
                   <div class="content">
                       <span class="iconfont icon-xihuan"></span>
                       <p>我喜欢的音乐</p>
                   </div>
               </div>
               <div class="personal-fm">
                   <img src="http://p1.music.126.net/dQL9KZXbmGZGE2iwiCbrOw==/109951164800334633.jpg?param=50y50" alt="">
                   <div class="content">
                       <span class="iconfont icon-fm"></span>
                       <p>私人FM</p>
                   </div>
               </div>
               <div class="drive-mode">
                   <div class="content">
                       <span class="iconfont icon-hangshijiashi"></span>
                       <p>驾驶模式</p>
                   </div>
               </div>
           </div>
           <p class="title">推荐歌单</p>
           <div class="recommend-list">
               <ul>
                   <router-link to="/">
                        <img src="http://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=50y50" alt="">
                        <div>
                            <p class="title_sm">
                                云音乐热歌榜
                            </p>
                            <p class="des">
                                本周最热的歌曲
                            </p>
                        </div>
                   </router-link>
                   <router-link :to="`/songlist/${item.id}`" v-for="item,i of reommendList_1">
                        <img :src="item.picUrl" alt="">
                        <div>
                            <p class="title_sm" v-text="item.name">
                            </p>
                            <p class="des" v-text="item.copywriter">
                            </p>
                        </div>
                   </router-link>
               </ul>
               <ul>
                   <router-link to="/">
                        <img src="http://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=50y50" alt="">
                        <div>
                            <p class="title_sm">
                                云音乐热歌榜
                            </p>
                            <p class="des">
                                本周最热的歌曲
                            </p>
                        </div>
                   </router-link>
                   <router-link :to="`/songlist/${item.id}`" v-for="item,i of reommendList_2">
                        <img :src="item.picUrl" alt="">
                        <div>
                            <p class="title_sm" v-text="item.name">
                            </p>
                            <p class="des" v-text="item.copywriter">
                            </p>
                        </div>
                   </router-link>
               </ul>
           </div>
           <div class="foot">
               已经到底了~
           </div>
       </div>
    </div>
</template>
<script>
import {getReommendList} from '../assets/js/APIs/mymusic'
export default {
    data(){
        return {
            bg:require('../../public/images/bg.jpg'),
            sign:require('../../public/images/sign.png'),
            reommendList_1:[],
            reommendList_2:[],
        }
    },
    methods:{

    },
    created(){
        getReommendList().then(result=>{
            this.reommendList_1 = result.result.slice(0,2)
            this.reommendList_2 = result.result.slice(2,4)
        })
    },
    computed:{
        isLogin(){
            return this.$store.state.isLogin
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../public/scss/base.scss";
    div.my-music{
        background: #000;
        position: relative;
        img.bg{
            width: 100%;
            opacity: .2;
        }
        div.header{
            position: absolute;
            left: 0rem;
            top: 0rem;
            background-color: transparent;
            color: $head-color;
            font-size: 0;
            span{
                display: block;
            }
            span.iconfont.icon-B{
                font-size: .3rem;
                margin: .3rem 0 0 .1rem;
            }
            div.sign{
                display: flex;
                height:.56rem;
                line-height: .56rem;
                margin-top: .2rem;
                font-size: 0;
                img.sign{
                    width: 15%;
                    margin-left: .3rem;
                }
                span.text{
                    font-size: .15rem;
                    font-weight: lighter;
                    margin-left: .1rem;
                }
                a.button{
                    display: block;
                    color: $head-color;
                    font-size: .13rem;
                    margin: .13rem 0 .13rem .4rem;
                    line-height: .28rem;
                    border: .01rem solid #e4e4e4;
                    border-radius: 0.3rem;
                    padding: 0;
                    width: .9rem;
                    text-align: center;
                }
            }
            div.icons{
                @include flex-around;
                margin-top: .3rem;
                div{
                    text-align: center;
                    span.iconfont{
                        -webkit-font-smoothing: antialiased;
                        font-size: .3rem;
                        font-weight: lighter;
                    }
                    p{
                        margin-top: .1rem ;
                        font-size: .13rem;
                    }
                }
            }
        }
        div.container{
            width: 100%;
            position: absolute;
            left: 0rem;
            top: 2.5rem;
            background: #fff;
            border-top-left-radius:.2rem;
            border-top-right-radius:.2rem;
            padding:0rem .10rem;
            box-sizing: border-box;
            p.title{
                margin-top: .3rem;
                color: $font-main;
                font-size:.16rem;
                font-weight: bold;
                color: $font-title !important;
            }
            div.info{
                @include flex-between;
                margin-top: .2rem;
                &>div.like{
                        background: rgb(22, 22, 22);
                    }
                &>div.personal-fm{
                    background: #000;
                }
                &>div.drive-mode{
                    background: #e8e8e8;
                    div.content{
                        span,p{
                            color: $font-title !important;
                            font-weight: bold;
                        }
                    }
                }
                &>div{
                    height:1.4rem;
                    width: 1.1rem;
                    border-radius: .08rem;
                    overflow: hidden;
                    position: relative;
                    font-size: 0;
                    img{
                        position: absolute;
                        left: -.2rem;
                        opacity: .2;
                    }
                    div.content{
                        width: 100%;
                        position: absolute;
                        z-index:555;
                        left: 50%;
                        top:50%;
                        transform: translate(-50%,-50%);
                        background: transparent;
                        text-align: center;
                        span.iconfont{
                            font-size: .35rem;
                            color: $head-color;
                        }
                        span.iconfont.icon-xihuan{                      
                            color: #ff614d;
                        }
                        p{
                            font-size: .13rem;
                            color: $head-color;
                            font-weight: lighter;
                            margin-top: .05rem;
                        }
                    }
                    
                }
            }
            div.recommend-list{
                margin-top: .2rem;
                width: 100%;
                @include flex-between;
                ul{
                    width: 50%;
                    flex-grow: 0;
                    flex-shrink: 0;
                    a{
                        @include flex-between;
                        box-sizing: border-box;
                        margin-bottom: .1rem;
                        padding-right: .1rem;
                        flex-grow: 0;
                        flex-shrink: 0;
                        width: 100%;
                        img{
                            width: 40%;
                            border-radius: .08rem;
                        }
                        div{
                            @include flex-between;
                            flex-direction: column;
                            justify-content: center;
                            width: 60%;
                            padding-left: .1rem;
                            p.title_sm{
                                color: #6e6e6e;
                                font-size: .14rem;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                overflow: hidden;
                            }
                            p.des{
                                font-weight: lighter;
                                margin-top: .1rem;
                                color: #bdbdbd;
                                font-size: .13rem;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 1;
                                overflow: hidden;
                            }
                        }
                    }    
                }
            }
            div.foot{
                color:#bdbdbd;
                padding: .3rem 0;
                text-align: center;
                font-size:.13rem;
                margin-bottom:.5rem;
            }
        }
    }
</style>