<template>
  <div>
    <my-header></my-header>
    <van-tabs v-model="active">
      <van-tab title="推荐">
        <!-- 轮播开始 -->
        <div class="banner">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#fff">
            <van-swipe-item v-for="img,i in images" :key="i">
              <img :src="img" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 轮播结束 -->
        <div class="content">
          <!-- 频道按钮 -->
          <ul class="channels">
            <li>
              <router-link to="/">
                <span class="iconfont icon-tuijian"></span>
              </router-link>
              <p>每日推荐</p>
            </li>
            <li>
              <router-link to="/">
                <span class="iconfont icon-gedan"></span>
              </router-link>
              <p>歌单</p>
            </li>
            <li>
              <router-link to="/">
                <span class="iconfont icon-paixingbang"></span>
              </router-link>
              <p>排行榜</p>
            </li>
            <li>
              <router-link to="/">
                <span class="iconfont icon-diantai"></span>
              </router-link>
              <p>电台</p>
            </li>
          </ul>
          <!-- 推荐歌单 -->
          <div class="songList-recommend">
            <p>推荐歌单</p>
            <div class="title">
              <h3>为你精挑细选</h3>
              <router-link to="/">查看更多</router-link>
            </div>
            <ul class="list">
              <router-link :to="`/songlist/${item.id}`" class="songList" v-for="item,i of reommendList" :key="i">
                <songlist-info :item="item"></songlist-info>
              </router-link>
            </ul>
          </div>
          <!-- 推荐歌曲 -->
          <div class="songs-recommend">
            <p>新歌速递</p>
            <div class="title">
              <h3>精选新音乐</h3>
              <router-link to="/" class="iconfont icon-bofang">播放全部</router-link>
            </div>
            <ul class="list">
              <li v-for="item,index of reommendSongs" :key="index">
                <ul class="row">
                  <router-link :to="`/play/${elem.id}`" v-for="elem,i of item" :key="i">
                    <song-card
                      :name="elem.song.name"
                      :artists="elem.song.artists[0].name"
                      :intr="elem.song.album.company"
                      :img="elem.picUrl+'?param=200y200'"
                    ></song-card>
                  </router-link>
                </ul>
              </li>
            </ul>
          </div>
          <!-- 热歌风向标 -->
          <div class="rank">
            <p>排行榜</p>
            <div class="title">
              <h3>热歌风向标</h3>
              <router-link to="/">查看更多</router-link>
            </div>
            <ul class="list">
              <li class="list-item">
                <ul class="col">
                  <li class="col-item">
                    <p>云音乐飙升榜</p>
                  </li>
                  <router-link :to="`/play/${item.id}`" class="col-item" v-for="item,i of ranklist_1" :key="i">
                    <img :src="item.al.picUrl+'?param=100y100'" />
                    <p class="count" v-text="i+1"></p>
                    <p class="sname" v-text="item.name"></p>
                    <p class="split">-</p>
                    <p class="artists" v-text="item.ar[0].name"></p>
                  </router-link>
                </ul>
              </li>
              <li class="list-item">
                <ul class="col">
                  <li class="col-item">
                    <p>云音乐新歌榜</p>
                  </li>
                  <router-link :to="`/play/${item.id}`" class="col-item" v-for="item,i of ranklist_2" :key="i">
                    <img :src="item.al.picUrl+'?param=100y100'" />
                    <p class="count" v-text="i+1"></p>
                    <p class="sname" v-text="item.name"></p>
                    <p class="split">-</p>
                    <p class="artists" v-text="item.ar[0].name"></p>
                  </router-link>
                </ul>
              </li>
              <li class="list-item">
                <ul class="col">
                  <li class="col-item">
                    <p>云音乐热歌榜</p>
                  </li>
                  <router-link :to="`/play/${item.id}`" class="col-item" v-for="item,i of ranklist_3" :key="i">
                    <img :src="item.al.picUrl+'?param=100y100'" />
                    <p class="count" v-text="i+1"></p>
                    <p class="sname" v-text="item.name"></p>
                    <p class="split">-</p>
                    <p class="artists" v-text="item.ar[0].name"></p>
                  </router-link>
                </ul>
              </li>
            </ul>
          </div>
          <!-- 电台推荐 -->
          <div class="fm-recommend">
            <p>电台推荐</p>
            <div class="title">
              <h3>我用此声伴你心</h3>
              <router-link to="/">查看更多</router-link>
            </div>
            <ul class="list">
              <router-link to="/" class="fmList" v-for="item,i of reommendFMs" :key="i">
                <fmlist-info :item="item"></fmlist-info>
              </router-link>
            </ul>
          </div>
        </div>
      </van-tab>
      <van-tab title="排行">排行</van-tab>
      <van-tab title="歌手">歌手</van-tab>
    </van-tabs>
    <my-footer></my-footer>
  </div>
</template>
<script>
import {
  getBanner,
  getReommendList,
  getReommendSongs,
  getRankList,
  getReommendFM
} from "../assets/js/APIs/home";
import songCard from "../components/SongCard";
import songlistInfo from "../components/SongListInfo";
import fmlistInfo from "../components/FMListInfo";
export default {
  data() {
    return {
      active: 0,
      images: [],
      reommendList: [],
      reommendSongs: [],
      reommendFMs: [],
      ranklist_1: [],
      ranklist_2: [],
      ranklist_3: []
    };
  },
  mounted() {
    getBanner().then(result => {
      for (var banner of result.banners) {
        this.images.push(banner.pic);
      }
    });
    getReommendList().then(result => {
      this.reommendList = result.result;
    });
    getReommendSongs().then(result => {
      var arr = result.result;
      var length = arr.length;
      for (var i = 0; i < Math.ceil(length / 3); i++) {
        this.reommendSongs[i] = arr.splice(0, 3);
      }
      this.$forceUpdate();
    });
    //云音乐飙升榜
    getRankList(3).then(result => {
      result.splice(3);
      this.ranklist_1 = result;
    });
    //云音乐新歌榜
    getRankList(0).then(result => {
      result.splice(3);
      this.ranklist_2 = result;
    });
    //云音乐热歌榜
    getRankList(1).then(result => {
      result.splice(3);
      this.ranklist_3 = result;
    });
    getReommendFM().then(result => {
      this.reommendFMs = result.result;
    });
  },
  components: { songCard, songlistInfo, fmlistInfo }
};
</script>
<style lang="scss" scoped>
@import "../../public/scss/base.scss";
/deep/ .van-hairline--top-bottom::after {
  border-width: 0 !important;
}
/deep/ .van-tabs__nav.van-tabs__nav--line {
  background: $cm-red;
  .van-tabs__line {
    background-color: $head-color;
  }
  span {
    color: $head-color;
  }
}
.banner {
  background-color: $cm-red;
  padding: 0.08rem 0.08rem 0 0.08rem;
  .my-swipe {
    .van-swipe-item {
      color: $head-color;
      font-size: 0.2rem;
      line-height: 1.5rem;
      text-align: center;
      img {
        width: 100%;
      }
    }
  }
  /deep/ .van-swipe__indicators {
    i {
      background-color: #fff;
    }
  }
}
.content > * {
  padding: 0 0.15rem;
  margin-top: 0.3rem;
}
.content {
  margin-bottom: 1rem;
  ul.channels {
    @include flex-between;
    li {
      text-align: center;
      font-size: 0.12rem;
      a {
        margin: 0 auto;
        height: 0.4rem;
        width: 0.4rem;
        border-radius: 50%;
        line-height: 0.4rem;
        @include iconBg;
        span {
          font-size: 0.25rem;
          color: white;
        }
      }
      p {
        margin-top: 0.1rem;
        color: #808080;
      }
    }
  }
  div.songList-recommend {
    @include title;
    ul.list {
      &::-webkit-scrollbar {
        display: none;
      }
      width: 100%;
      height: 1.4rem;
      margin-top: 0.1rem;
      overflow-x: scroll;
      display: flex;
      a.songList {
        &:not(:first-child) {
          margin-left: 0.1rem;
        }
        position: relative;
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }
    }
  }
  div.songs-recommend {
    @include title;
    ul.list {
      @include flex-between;
      width: 100%;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      li {
        flex-shrink: 0;
        width: 95%;
        ul.row {
          a {
            display: block;
            width: 100%;
            &:first-child {
              margin-top: 0.17rem;
            }
            &:not(:first-child) {
              margin-top: 0.1rem;
            }
          }
        }
      }
    }
  }
  div.rank {
    @include title;
    ul.list {
      &::-webkit-scrollbar {
        display: none;
      }
      width: 100%;
      height: 2.3rem;
      margin-top: 0.1rem;
      overflow-x: scroll;
      display: flex;
      li.list-item:not(:first-child) {
        margin-left: 0.2rem;
      }
      li.list-item {
        flex-shrink: 0;
        width: 80%;
        background: #f8f8f8;
        padding: 0 0.1rem;
        ul.col {
          width: 100%;
          border-radius: 0.05rem;
          .col-item {
            margin-left: 0;
          }
          li.col-item:first-child {
            p {
              color: $font-main;
              font-weight: bold;
              font-size: 0.16rem;
              padding: 0.15rem 0;
            }
          }
          a.col-item:not(:first-child) {
            display: flex;
            align-items: center;
            margin-top: 0.1rem;
            img {
              width: 18%;
              border-radius: 0.1rem;
            }
            p {
              margin-top: 0;
              margin-bottom: 0;
            }
            p.count {
              color: $font-main;
              font-weight: bold;
              font-size: 0.14rem;
              margin: 0 0.15rem;
            }
            p.sname {
              width: 1.2rem;
              color: $font-main;
              font-size: 0.16rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            p.split,
            p.artists {
              margin: 0 0.05rem;
              font-size: 0.13rem;
              color: $font-introduce;
              line-height: 0.16rem;
              font-weight: lighter;
            }
            p.artists {
              width: 0.48rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            p.change {
              font-size: 0.14rem;
              color: red;
              margin-left: 0.1rem;
            }
          }
        }
      }
    }
  }
  div.fm-recommend {
    @include title;
    ul.list {
      padding-left: 0.05rem;
      &::-webkit-scrollbar {
        display: none;
      }
      width: 100%;
      margin-top: 0.1rem;
      overflow-x: scroll;
      overflow-y: visible;
      display: flex;
      a.fmList {
        &:not(:first-child) {
          margin-left: 0.1rem;
        }
        position: relative;
        width: 1rem;
        flex-shrink: 0;
      }
    }
  }
}
</style>