<template>
  <div class="search">
    <my-header></my-header>
    <div class="main" @scroll="infinite">
      <ul class="list">
        <router-link :to="'/play/'+item.id" class="song" v-for="item,i in songs" :key="i">
          <div class="info">
            <p class="sname" v-text="item.name"></p>
            <div class="foot">
              <p class="artist" v-text="item.artists[0].name"></p>
              <p class="split">-</p>
              <p class="album" v-text="item.album.name"></p>
            </div>
          </div>
          <span class="iconfont icon-gengduo"></span>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import { searchSongs } from "../assets/js/APIs/search";
export default {
  data() {
    return {
      keywords: "",
      songs: [
        {
          name: "",
          artists: [
            {
              name: ""
            }
          ],
          album: {
            name: ""
          }
        }
      ],
      page: 1,
      timer:''
    };
  },
  methods: {
    infinite(e) {
      var scrollTop = e.target.scrollTop;
      var list = document.getElementsByClassName("list")[0];
      var totalHeight = list.scrollHeight;
      var viewHeight = e.target.offsetHeight;
      //当ul可滚动长度不足10px时，请求更多数据
      if (totalHeight - (viewHeight + scrollTop) < 30) {
        //请求更多数据
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          searchSongs({
            keywords: this.keywords,
            offset: (this.page - 1) * 20
          }).then(result => {
            this.songs = this.songs.concat(result.result.songs)
            this.$forceUpdate()
            this.page++;
          });
        }, 200);
      }
    }
  },
  created() {
    this.keywords = this.$route.params.keywords;
    searchSongs({ keywords: this.keywords }).then(result => {
      this.songs = result.result.songs;
    });
  },
  watch:{
    $route(){
      this.keywords = this.$route.params.keywords;
      searchSongs({ keywords: this.keywords }).then(result => {
      this.songs = result.result.songs;
    });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../public/scss/base.scss";
div.search {
  font-size: 0;
  div.main {
    height: 5.69rem;
    overflow: scroll;
    padding-bottom: 0.5rem;
    ul {
      padding: 0.1rem 0.2rem 0 0.2rem;
      a.song {
        @include flex-between;
        padding: 0.1rem 0;
        border-bottom: 0.01rem solid rgb(243, 243, 243);
        box-sizing: border-box;
        div.info {
          p.sname {
            font-size: 0.16rem;
            color: $font-main;
          }
          div.foot {
            @include flex-between;
            color: $head-color;
            font-size: 0.12rem;
            font-weight: lighter;
            margin-top: 0.07rem;
            p.split {
              margin: 0 0.05rem;
            }
          }
        }
        span.iconfont {
          color: $head-color;
          line-height: 0.35rem;
          font-size: 0.2rem;
        }
      }
    }
  }
}
</style>