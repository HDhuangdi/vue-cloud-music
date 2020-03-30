<template>
    <div class="login">
       <div class="header"><span class="iconfont icon-guanbi1" @click="goback"></span></div>
       <div class="logo"><img src="../../public/images/logo.png" alt=""></div>
       <div class="footer">
           <router-link to="/login" class="login-btn">手机号登录</router-link>
           <div class="icons">
               <span class="iconfont icon-weixin"></span>
               <span class="iconfont icon-qq"></span>
               <span class="iconfont icon-weibo"></span>
           </div>
       </div>
    </div>
</template>
<script>
export default {
    methods:{
        goback(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../public/scss/base.scss";
    div.login{
        position: relative;
        height: 100%;
        width: 100%;
        background-color: #dd2c1e;
        font-size: 0;
        padding-top:.4rem;
        div.header{
            span.iconfont{
                font-size: .35rem;
                color: #fff;
                margin-left: .2rem;
            }
        }
        div.logo{
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%,-50%);
            img{
                width:.7rem
            }
        }
        div.footer{
            width: 100%;
            position: absolute;
            top: 82%;
            left: 50%;
            transform: translate(-50%,-50%);
            text-align: center;
            a.login-btn{
                width: 80%;
                padding: .13rem 1rem;
                margin: 0 auto;
                background: rgba($color: #ffffff, $alpha: .9);
                color: #dd2c1e;
                font-size: .16rem;
                font-weight: bold;
                border-radius: .3rem;
            }
            div.icons{
                @include flex-between;
                margin-top: .3rem;
                box-sizing: border-box;
                padding: 0 .7rem;
                span.iconfont{
                    padding: .07rem;
                    border: 1px solid rgba($color: #ffffff, $alpha: .3);
                    border-radius: 50%;
                    font-size: .2rem;
                    color:$font-alpha-white;
                }
            }
        }
    }
</style>