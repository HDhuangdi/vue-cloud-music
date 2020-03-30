<template>
  <div id="app">
    <keep-alive>
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 标签栏 -->
    <audio
      autoplay="autoplay"
      ref="audio"
      :src="url"
      id="audio"
      v-on:canplaythrough="canPlay"
      v-on:ended="end"
      v-on:timeupdate="progress"
    ></audio>
  </div>
</template>
<script>
export default {
  data() {
    return {
      audio: null,
      duration: 0,
      durationFmt:0,
      current:0,
      currentFmt:0,
    };
  },
  methods: {
    canPlay() {
      this.audio = document.getElementById("audio");
      this.duration = audio.duration;
      this.$store.commit("getDuration", this.duration);
      this.durationFmt = this.timeFormat(this.duration)
      this.$store.commit("getDurationFmt", this.durationFmt);
      this.$store.commit("changeCanplay", true);
      this.$store.commit("changePlay", true);
      this.audio.play()
    },
    end() {
      //音乐结束事件触发后，修改vuex中isPlay变量为false
      this.$store.commit("changePlay", false);
    },
    progress() {
      this.current = this.audio.currentTime;
      this.currentFmt = this.timeFormat(this.current)
      this.$store.commit("getCurrent", this.current);
      this.$store.commit("getCurrentFmt", this.currentFmt);
    },
    timeFormat(time) {
      var m, s;
      time = parseInt(time);
      m = Math.floor(time / 60);
      s = time % 60;
      if (m < 10) {
        m = `0${m}`;
      }
      if (s < 10) {
        s = `0${s}`;
      }
      return `${m}:${s}`;
    }
  },
  mounted(){
   // 阻止双击放大
    var lastTouchEnd = 0;
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    });
    document.addEventListener('touchend', function(event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
 
    // 阻止双指放大
    document.addEventListener('gesturestart', function(event) {
        event.preventDefault();
    });
  },
  computed: {
    url() {
      return this.$store.state.url;
    },
    isPlay() {
      return this.$store.state.isPlay;
    },
    current_1(){
      return this.$store.state.current_1;
    },
    flag(){
      return this.$store.state.flag;
    },
    isPayed(){
      return this.$store.state.isPayed;
    }
  },
  watch: {
    //切换歌曲时，调整可播放状态为false，当前播放时间为0
    url(){
      this.$store.commit('changeCanplay',false)
      this.$store.commit('getCurrent',0)
    },
    //当付费条件变化后，调整播放状态
    isPayed(){
      if(!this.isPayed){
        this.$store.commit("changePlay",false)
      }else{
        this.$store.commit("changePlay",true)
      }
    },
    isPlay() {
      if (this.isPlay) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    },
    //根据用户的拖动的小圆点位置来制定播放时间
    current_1(){
      this.current = this.current_1;
      this.audio.currentTime = this.current
    },
    //keepalive，跳转路由时，关闭wathch
    "$route": {
      handler(to,from){
        this.$nextTick(()=>{
            this.flag && this.init && this.init();
        })
      }
    },
    deep: true
  },
  activated(){
    this.$store.commit("changeFlag", true);
  },
  deactivated(){
    this.$store.commit("changeFlag", false);
  }
};
</script>
<style lang="scss" scoped>
#app{
  height: 100%;
  width: 100%;
}
</style>
