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
              <songlist-info :item="item"></songlist-info>
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
                <li class="col-item"><p>云音乐飙升榜</p></li>
                <li class="col-item" v-for="item,i of ranklist_1" :key="i">
                  <img :src="item.al.picUrl+'?param=100y100'">
                  <p class="count" v-text="i+1"></p>
                  <p class="sname" v-text="item.name"></p>
                  <p class="split"> - </p>
                  <p class="artists" v-text="item.ar[0].name"></p>
                </li>
              </ul>
            </li>
            <li class="list-item">
              <ul class="col">
                <li class="col-item"><p>云音乐新歌榜</p></li>
                <li class="col-item" v-for="item,i of ranklist_2" :key="i">
                  <img :src="item.al.picUrl+'?param=100y100'">
                  <p class="count" v-text="i+1"></p>
                  <p class="sname" v-text="item.name"></p>
                  <p class="split"> - </p>
                  <p class="artists" v-text="item.ar[0].name"></p>
                </li>
              </ul>
            </li>
            <li class="list-item">
              <ul class="col">
                <li class="col-item"><p>云音乐热歌榜</p></li>
                <li class="col-item" v-for="item,i of ranklist_3" :key="i">
                  <img :src="item.al.picUrl+'?param=100y100'">
                  <p class="count" v-text="i+1"></p>
                  <p class="sname" v-text="item.name"></p>
                  <p class="split"> - </p>
                  <p class="artists" v-text="item.ar[0].name"></p>
                </li>
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
            <li class="fmList" v-for="item,i of reommendFMs" :key="i">
              <fmlist-info :item="item"></fmlist-info>
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
      ranklist_1:[],
      ranklist_2:[],
      ranklist_3:[],
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
      var length = arr.length
      for (var i = 0; i < Math.ceil(length / 3); i++) {
        this.reommendSongs[i] = arr.splice(0,3)
      }
      this.$forceUpdate();
    });
    //云音乐飙升榜
    getRankList(3).then(result=>{
      result.splice(3)
      this.ranklist_1 = result
    });
    //云音乐新歌榜
    getRankList(0).then(result=>{
      result.splice(3)
      this.ranklist_2 = result
    });
    //云音乐热歌榜
    getRankList(1).then(result=>{
      result.splice(3)
      this.ranklist_3 = result
    });
    getReommendFM().then(result=>{
      this.reommendFMs = result.result
      console.log(this.reommendFMs)
    })
  },
  components: { songCard,songlistInfo,fmlistInfo }
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
  margin-top: 30px;
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
  div.rank{
     @include title;
     ul.list {
      &::-webkit-scrollbar {
        display: none;
      }
      width: 100%;
      height: 230px;
      margin-top: 10px;
      overflow-x: scroll;
      display: flex;
      li.list-item:not(:first-child){
        margin-left: 20px;
      }
      li.list-item{
        flex-shrink: 0;
        width: 80%;
        background: #f8f8f8;
        padding: 0px 10px;
        ul.col{
          width: 100%;
          border-radius: 5px;
          
          li.col-item{
            margin-left: 0;
          }
          li.col-item:first-child{
            p{
              color: $font-main;
              font-weight: bold;
              font-size: 16px;
              padding: 15px 0;
            }
          }
          li.col-item:not(:first-child){
            display: flex;
            align-items: center;
            margin-top: 10px;
            img{
              width: 18%;
              border-radius: 10px;
            }
            p{
              margin-top: 0;
              margin-bottom: 0;
            }
            p.count{
              color:$font-main;
              font-weight: bold;
              font-size: 14px;
              margin: 0 15px;
            }
            p.sname{
              width: 120px;
              color:$font-main;
              font-size: 16px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            p.split,p.artists{
              margin: 0 5px;
              font-size: 13px;
              color:$font-introduce;
              line-height: 16px;
              font-weight: lighter;
            }
            p.artists{
              width: 48px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            p.change{
              font-size: 14px;
              color: red;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
  div.fm-recommend{
    @include title;
    ul.list {
      padding-left: 5px;
      &::-webkit-scrollbar {
        display: none;
      }
      width: 100%;
      margin-top: 10px;
      overflow-x: scroll;
      overflow-y: visible;
      display: flex;
      li.fmList {
        &:not(:first-child) {
            margin-left: 10px;
        }
        position: relative;
        width: 100px;
        flex-shrink: 0;
      }
    }
  }
}
</style>