import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from "../assets/js/APIs/login";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songID:0,//歌曲id
    isLogin:window.localStorage.isLogin?JSON.parse(window.localStorage.isLogin):false,//登录状态
    profile:null,//用户信息
    isPlay:false,//播放状态
    url:undefined,//歌曲url
    info:null,//歌曲信息
    duration:0,//歌曲时长
    durationFmt:0,//歌曲时长（格式化）
    current:0,//当前播放时长
    current_1:0,//触摸点所在的时长
    currentFmt:"00:00",//当前播放时长（格式化）
    flag:false,//watch的开关变量
    canPlay:false,//可播放状态
    isPayed:true,//付费状态
    userInfo:null,
  },
  mutations: {
    getsongID(state,value){
      state.songID = value
    },
    changePlay(state,value){
      state.isPlay = value
    },
    getUrl(state,value){
      state.url = value
    },
    getInfo(state,value){
      state.info = value
    },
    getDuration(state,value){
      state.duration = value
    },
    getDurationFmt(state,value){
      state.durationFmt = value
    },
    getCurrent(state,value){
      state.current = value
    },
    getCurrentFmt(state,value){
      state.currentFmt = value
    },
    getCurrent_1(state,value){
      state.current_1 = value
    },
    changeFlag(state,value){
      state.flag = value
    },
    changeCanplay(state,value){
      state.canPlay = value
    },
    changeisPayed(state,value){
      state.isPayed = value
    },
    changeisLogin(state,value){
      state.isLogin = value
    },
    getProfile(state,value){
      state.profile = value
    },
    _getUserInfo(state,value){
      state.userInfo = value
    }
  },
  actions: {
    _getUserInfo(content,uid){
      getUserInfo(uid).then(result=>{
        content.commit('_getUserInfo',result)
      })
    }
  },
  modules: {
  }
})
