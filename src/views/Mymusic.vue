<template>
  <div class="my-music">
    <img :src="isLogin && userInfo ? userInfo.profile.backgroundUrl : bg" class="bg" />
    <div class="header">
      <span class="iconfont icon-B"></span>
      <div class="sign">
        <img :src="isLogin && userInfo ? userInfo.profile.avatarUrl : sign" class="sign" />
        <span class="text" v-text="isLogin && userInfo ? userInfo.profile.nickname : '登录立享多端同步'"></span>
        <router-link to="/welcome" class="button" v-if="!isLogin">立即登录</router-link>
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
        <router-link :to="mySonglist?`/songlist/${mySonglist[0].id}`:'/welcome'" class="like">
          <img
            :src="mySonglist[0].coverImgUrl?`${mySonglist[0].coverImgUrl}?param=140y140`:'https://p1.music.126.net/GxeQTvY2Q1n-vZJO55XpFQ==/109951164739395621.jpg?param=200y200'"
          />
          <div class="content">
            <span class="iconfont icon-xihuan"></span>
            <p>我喜欢的音乐</p>
          </div>
        </router-link>
        <router-link
          v-show="uid"
          v-for="item,i of mySonglist.slice(1)"
          :key="i"
          :to="mySonglist?`/songlist/${item.id}`:'/welcome'"
          class="like"
        >
          <img :src="item.coverImgUrl+'?param=140y140'" alt />
          <div class="content">
            <p v-text="item.name"></p>
          </div>
        </router-link>
        <router-link to="/" class="personal-fm">
          <img
            src="http://p1.music.126.net/dQL9KZXbmGZGE2iwiCbrOw==/109951164800334633.jpg?param=200y200"
            alt
          />
          <div class="content">
            <span class="iconfont icon-fm"></span>
            <p>私人FM</p>
          </div>
        </router-link>
        <router-link to="/" class="drive-mode">
          <div class="content">
            <span class="iconfont icon-hangshijiashi"></span>
            <p>驾驶模式</p>
          </div>
        </router-link>
      </div>
      <p class="title">推荐歌单</p>
      <div class="recommend-list">
        <ul>
          <router-link to="/">
            <img
              src="http://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=200y200"
              alt
            />
            <div>
              <p class="title_sm">云音乐热歌榜</p>
              <p class="des">本周最热的歌曲</p>
            </div>
          </router-link>
          <router-link :to="`/songlist/${item.id}`" v-for="item,i of reommendList_1">
            <img :src="item.picUrl+'?param=200y200'" alt />
            <div>
              <p class="title_sm" v-text="item.name"></p>
              <p class="des" v-text="item.copywriter"></p>
            </div>
          </router-link>
        </ul>
        <ul>
          <router-link to="/">
            <img
              src="http://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=200y200"
              alt
            />
            <div>
              <p class="title_sm">云音乐热歌榜</p>
              <p class="des">本周最热的歌曲</p>
            </div>
          </router-link>
          <router-link :to="`/songlist/${item.id}`" v-for="item,i of reommendList_2">
            <img :src="item.picUrl+'?param=200y200'" alt />
            <div>
              <p class="title_sm" v-text="item.name"></p>
              <p class="des" v-text="item.copywriter"></p>
            </div>
          </router-link>
        </ul>
      </div>
      <div class="foot">已经到底了~</div>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import { getReommendList, getLikeList } from "../assets/js/APIs/mymusic";
export default {
  data() {
    return {
      bg: require("../../public/images/bg.jpg"),
      sign: require("../../public/images/sign.png"),
      reommendList_1: [],
      reommendList_2: [],
      uid: window.localStorage.uid || "",
      mySonglist: [{}, {}]
    };
  },
  methods: {},
  created() {
    if (this.uid) {
      this.$store.dispatch("_getUserInfo", this.uid);
      getLikeList(this.uid).then(result => {
        this.mySonglist = result.playlist;
      });
    }
    getReommendList().then(result => {
      this.reommendList_1 = result.result.slice(0, 2);
      this.reommendList_2 = result.result.slice(2, 4);
    });
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
div.my-music {
  background: #000;
  position: relative;
  img.bg {
    width: 100%;
    opacity: 0.2;
  }
  div.header {
    width: 100%;
    position: absolute;
    left: 0rem;
    top: 0rem;
    background-color: transparent;
    color: $head-color;
    font-size: 0;
    span {
      display: block;
    }
    span.iconfont.icon-B {
      font-size: 0.3rem;
      margin: 0.3rem 0 0 0.1rem;
    }
    div.sign {
      display: flex;
      height: 0.56rem;
      line-height: 0.56rem;
      margin-top: 0.2rem;
      font-size: 0;
      img.sign {
        width: 15%;
        margin-left: 0.3rem;
        border-radius: 50%;
      }
      span.text {
        font-size: 0.15rem;
        font-weight: lighter;
        margin-left: 0.1rem;
      }
      a.button {
        display: block;
        color: $head-color;
        font-size: 0.13rem;
        margin: 0.13rem 0 0.13rem 0.4rem;
        line-height: 0.28rem;
        border: 0.01rem solid #e4e4e4;
        border-radius: 0.3rem;
        padding: 0;
        width: 0.9rem;
        text-align: center;
      }
    }
    div.icons {
      @include flex-around;
      margin-top: 0.3rem;
      div {
        text-align: center;
        span.iconfont {
          -webkit-font-smoothing: antialiased;
          font-size: 0.3rem;
          font-weight: lighter;
        }
        p {
          margin-top: 0.1rem;
          font-size: 0.13rem;
        }
      }
    }
  }
  div.container {
    width: 100%;
    position: absolute;
    left: 0rem;
    top: 2.5rem;
    background: #fff;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    padding: 0rem 0.1rem;
    box-sizing: border-box;
    p.title {
      margin-top: 0.3rem;
      color: $font-main;
      font-size: 0.16rem;
      font-weight: bold;
      color: $font-title !important;
    }
    div.info {
      @include flex-between;
      overflow: scroll;
      margin-top: 0.2rem;
      &::-webkit-scrollbar {
        width: 0;
      }
      & > a.like {
        background: rgb(22, 22, 22);
      }
      & > a.personal-fm {
        background: #000;
      }
      & > a.drive-mode {
        background: #e8e8e8;
        div.content {
          span,
          p {
            color: $font-title !important;
            font-weight: bold;
          }
        }
      }
      & > a {
        height: 1.4rem;
        width: 1.1rem;
        border-radius: 0.08rem;
        overflow: hidden;
        position: relative;
        font-size: 0;
        flex-shrink: 0;
        img {
          position: absolute;
          left: -0.2rem;
          opacity: 0.2;
        }
        div.content {
          width: 100%;
          position: absolute;
          z-index: 555;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: transparent;
          text-align: center;
          span.iconfont {
            font-size: 0.35rem;
            color: $head-color;
          }
          span.iconfont.icon-xihuan {
            color: #ff614d;
          }
          p {
            font-size: 0.13rem;
            color: $head-color;
            font-weight: lighter;
            margin-top: 0.05rem;
          }
        }
      }
      & > a:not(:first-child) {
        margin-left: 0.1rem;
      }
    }
    div.recommend-list {
      margin-top: 0.2rem;
      width: 100%;
      @include flex-between;
      ul {
        width: 50%;
        flex-grow: 0;
        flex-shrink: 0;
        a {
          @include flex-between;
          box-sizing: border-box;
          margin-bottom: 0.1rem;
          padding-right: 0.1rem;
          flex-grow: 0;
          flex-shrink: 0;
          width: 100%;
          img {
            width: 40%;
            height: 100%;
            border-radius: 0.08rem;
          }
          div {
            @include flex-between;
            flex-direction: column;
            justify-content: center;
            width: 60%;
            padding-left: 0.1rem;
            p.title_sm {
              color: #6e6e6e;
              font-size: 0.14rem;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            p.des {
              font-weight: lighter;
              margin-top: 0.1rem;
              color: #bdbdbd;
              font-size: 0.13rem;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }
          }
        }
      }
    }
    div.foot {
      color: #bdbdbd;
      padding: 0.3rem 0;
      text-align: center;
      font-size: 0.13rem;
      margin-bottom: 0.5rem;
    }
  }
}
</style>