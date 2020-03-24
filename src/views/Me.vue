<template>
    <div class="me">
        <my-header></my-header>
        <div class="top">
            <p>手机电脑多端同步，尽享海量高品质音乐</p>
            <router-link to="/signin" class="signin">立即登录</router-link>
            <div class="icons">
                <router-link to="/" class="item">
                    <span class="iconfont icon-xinxi"></span>
                    <p>我的消息</p>
                </router-link>
                <router-link to="/" class="item">
                    <span class="iconfont icon-haoyou"></span>
                    <p>我的好友</p>
                </router-link>
                <router-link to="/" class="item">
                    <span class="iconfont icon-zhuye"></span>
                    <p>个人主页</p>
                </router-link>
                <router-link to="/" class="item">
                    <span class="iconfont icon-pifu"></span>
                    <p>个性装扮</p>
                </router-link>
            </div>
        </div>
        <ul class="list">
            <li>音乐服务</li>
            <li>
                <router-link to="/">
                    <span class="iconfont icon-piaoju"></span>
                    <p>演出</p>
                    <span class="iconfont icon-qianjin"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="iconfont icon-shangcheng"></span>
                    <p>商城</p>
                    <span class="iconfont icon-qianjin"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="iconfont icon-cailing"></span>
                    <p>彩铃</p>
                    <span class="iconfont icon-qianjin"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="iconfont icon-liuliang"></span>
                    <p>在线听歌免流量</p>
                    <span class="iconfont icon-qianjin"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="iconfont icon-about"></span>
                    <p>关于</p>
                    <span class="iconfont icon-qianjin"></span>
                </router-link>
            </li>
        </ul>
        <div class="cancellation" v-show="isLogin">
            退出登录
        </div>
    </div>
</template>
<script>
export default {
    computed:{
        isLogin(){
            return this.$store.state.isLogin
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "../../public/scss/base.scss";
    div.me{
        div.header{
            padding:.15rem 0 ;
        }
        background: #f7f7f7;
        padding-bottom: .58rem;
        div.top{
            padding:.4rem 0 .3rem 0;
            text-align: center;
            color: $font-main;
            font-size: .15rem;
            background: #fff;
            a.signin{
                color: #fff;
                font-size: .16rem;
                background: -webkit-linear-gradient(left,#fd5a49,#fe2017);
                width: 1.5rem;
                padding: .1rem .2rem;
                border-radius: .3rem;
                margin: .15rem auto 0 auto;
            }
            div.icons{
                margin-top: .4rem;
                @include flex-around;
                a.item{
                    span{
                        color: #e6615d;
                        font-size: .3rem;
                    }
                    p{
                        color: $font-main;
                        margin-top: .1rem;
                    }
                }
            }
        }
        ul.list{
            background: #fff;
            margin-top: .1rem;
            li{
                padding: .15rem .1rem .15rem .2rem;
                border-bottom: 1px solid #ececec;
                a{
                    display: flex;
                    color: $font-main;
                    span{
                        font-size: .2rem;
                    }
                    p{
                        font-size: .16rem;
                        margin-left: .15rem;
                        width: 90%;
                        line-height: .2rem;
                    }
                }         
            }
            li:first-child{
                font-size: .14rem;
                font-weight: bold;
            }
        }
        div.cancellation{
            margin-top: .1rem;
            font-size: .18rem;
            text-align: center;
            color: #e6615d;
            background: #fff;
            padding: .1rem 0 .1rem 0;
        }
    }
</style>