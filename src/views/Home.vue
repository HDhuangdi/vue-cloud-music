<template>
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
            <li class="songList" v-for="item,i of reommendList" :key="i">
              <div>
                <span
                  class="iconfont icon-bofangsanjiaoxing"
                  v-text="parseInt(item.playCount/10000)+'万'"
                ></span>
              </div>
              <img :src="item.picUrl+'?param=200y200'" />
              <p v-text="item.name"></p>
            </li>
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
                <router-link :to="`/play/${elem.id}`" v-for="elem,i of item" :key="i" >
                  <song-card :name="elem.song.name" :artists="elem.song.artists[0].name" :intr="elem.song.album.company" :img="elem.picUrl"></song-card>
                </router-link>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </van-tab>
    <van-tab title="排行">排行</van-tab>
    <van-tab title="歌手">歌手</van-tab>
  </van-tabs>
</template>
<script>
import {
  getBanner,
  getReommendList,
  getReommendSongs
} from "../assets/js/APIs/home";
import songCard from "../components/SongCard";
export default {
  data() {
    return {
      active: 0,
      images: [],
      reommendList: [],
      reommendSongs: []
    };
  },
  mounted() {
    getBanner().then(result => {
      for (var banner of result.banners) {
        this.images.push(banner.pic);
      }
    }),
    getReommendList().then(result => {
      this.reommendList = result.result;
    }),
    getReommendSongs().then(result => {
      var arr = result.result;
      var length = arr.length
      for (var i = 0; i < Math.ceil(length / 3); i++) {
        this.reommendSongs[i] = arr.splice(0,3)
      }
      console.log(this.reommendSongs)
      this.$forceUpdate();
    });
  },
  components: { songCard }
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
  padding: 8px 8px 0 8px;
  .my-swipe {
    .van-swipe-item {
      color: $head-color;
      font-size: 20px;
      line-height: 150px;
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
  padding: 0 15px;
  margin-top: 20px;
}
.content {
  margin-bottom: 55px;
  ul.channels {
    @include flex-between;
    li {
      text-align: center;
      font-size: 12px;
      a {
        margin: 0 auto;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        line-height: 40px;
        @include iconBg;
        span {
          font-size: 25px;
          color: white;
        }
      }
      p {
        margin-top: 10px;
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
      height: 140px;
      margin-top: 10px;
      overflow-x: scroll;
      display: flex;
      li.songList {
        &:not(:first-child) {
          margin-left: 10px;
        }
        position: relative;
        width: 100px;
        height: 100px;
        flex-shrink: 0;
        div {
          display: block;
          width: 100%;
          position: absolute;
          top: 5px;
          z-index: 10;
          color: white;
          span {
            font-size: 12px;
            font-weight: lighter;
            float: right;
            margin-right: 5px;
          }
        }
        img {
          width: 100%;
          border-radius: 10px;
        }
        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          max-height: 30px;
          margin-top: 5px;
          line-height: 15px;
          color: $font-main;
        }
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
              margin-top: 17px;
            }
            &:not(:first-child) {
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}
</style>