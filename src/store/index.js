import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id:0,
    isLogin:false,
    isPlay:false,
    url:undefined,
    info:null,
    duration:0,
    durationFmt:0,
    current:0,
    current_1:0,
    currentFmt:0,
    flag:false,
    canPlay:false,
    isPayed:true
  },
  mutations: {
    getId(state,id){
      state.id = id
    },
    changePlay(state,bool){
      state.isPlay = bool
    },
    getUrl(state,url){
      state.url = url
    },
    getInfo(state,info){
      state.info = info
    },
    getDuration(state,duration){
      state.duration = duration
    },
    getDurationFmt(state,durationFmt){
      state.durationFmt = durationFmt
    },
    getCurrent(state,current){
      state.current = current
    },
    getCurrentFmt(state,currentFmt){
      state.currentFmt = currentFmt
    },
    getCurrent_1(state,current_1){
      state.current_1 = current_1
    },
    changeFlag(state,bool){
      state.flag = bool
    },
    changeCanplay(state,bool){
      state.canPlay = bool
    },
    changeisPayed(state,bool){
      state.isPayed = bool
    }
  },
  actions: {
  },
  modules: {
  }
})
