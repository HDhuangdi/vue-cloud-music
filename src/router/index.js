import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue' 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      keepAlive:true
    }
  },
  {
    path: '/play/:songID',
    name: 'Play',
    props:true,
    meta:{
      keepAlive:true
    },
    component: () => import(/* webpackChunkName: "play" */ '../views/Play.vue')
  },
  {
    path: '/songlist/:listID',
    name: 'Songlist',
    props:true,
    component: () => import(/* webpackChunkName: "songlist" */ '../views/Songlist.vue')
  },
  {
    path: '/mymusic',
    name: 'Mymusic',
    component: () => import(/* webpackChunkName: "mymusic" */ '../views/Mymusic.vue')
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import(/* webpackChunkName: "me" */ '../views/Me.vue')
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import(/* webpackChunkName: "welcome" */ '../views/Welcome.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register_phone',
    name: 'Register_phone',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register_phone.vue')
  },
  {
    path: '/register_msg/:phone',
    name: 'Register_msg',
    props:true,
    component: () => import(/* webpackChunkName: "register" */ '../views/Register_msg.vue')
  },
  {
    path: '/search/:keywords',
    name: 'search',
    props:true,
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
