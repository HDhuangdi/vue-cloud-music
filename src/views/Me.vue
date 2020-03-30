<template>
  <div class="me">
    <my-header></my-header>
    <div class="top">
      <p v-if="!isLogin">手机电脑多端同步，尽享海量高品质音乐</p>
      <router-link to="/welcome" class="signin" v-if="!isLogin">立即登录</router-link>
      <img :src="userInfo?userInfo.profile.avatarUrl:''" class="avatar" v-if="isLogin" />
      <p class="nickname" v-if="isLogin" v-text="userInfo?userInfo.profile.nickname:''"></p>
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
    <div class="cancellation" v-show="isLogin" @click="signout">退出登录</div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  methods: {
    signout() {
      Dialog.confirm({
        message: "是否要退出登录？"
      })
        .then(() => {
          this.$store.commit('changeisLogin',false),
          window.localStorage.setItem('isLogin',false)
          window.localStorage.setItem('uid','')
          window.localStorage.setItem('token','')
        })
        .catch(() => {
        });
    }
  },
  mounted(){
    this.$forceUpdate()
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../public/scss/base.scss";
div.me {
  div.header {
    padding: 0.15rem 0;
  }
  background: #f7f7f7;
  padding-bottom: 0.58rem;
  div.top {
    padding: 0.3rem 0 0.3rem 0;
    text-align: center;
    color: $font-main;
    font-size: 0.15rem;
    background: #fff;
    a.signin {
      color: #fff;
      font-size: 0.16rem;
      background: -webkit-linear-gradient(left, #fd5a49, #fe2017);
      width: 1.5rem;
      padding: 0.1rem 0.2rem;
      border-radius: 0.3rem;
      margin: 0.15rem auto 0 auto;
    }
    img.avatar {
      width: 15%;
      float: left;
      margin: 0 0 0.2rem 0.2rem;
      border-radius: 50%;
    }
    p.nickname {
      float: left;
      line-height: 0.56rem;
      margin-left: 0.2rem;
    }
    div.icons {
      clear: both;
      margin-top: 0.4rem;
      @include flex-around;
      a.item {
        span {
          color: #e6615d;
          font-size: 0.3rem;
        }
        p {
          color: $font-main;
          margin-top: 0.1rem;
        }
      }
    }
  }
  ul.list {
    background: #fff;
    margin-top: 0.1rem;
    li {
      padding: 0.15rem 0.1rem 0.15rem 0.2rem;
      border-bottom: 0.01rem solid #ececec;
      a {
        display: flex;
        color: $font-main;
        span {
          font-size: 0.2rem;
        }
        p {
          font-size: 0.16rem;
          margin-left: 0.15rem;
          width: 90%;
          line-height: 0.2rem;
        }
      }
    }
    li:first-child {
      font-size: 0.14rem;
      font-weight: bold;
    }
  }
  div.cancellation {
    margin-top: 0.1rem;
    font-size: 0.18rem;
    text-align: center;
    color: #e6615d;
    background: #fff;
    padding: 0.1rem 0 0.1rem 0;
  }
}
</style>