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
    path: '/play/:id',
    name: 'Play',
    props:true,
    meta:{
      keepAlive:true
    },
    component: () => import(/* webpackChunkName: "play" */ '../views/Play.vue')
  },
  {
    path: '/songlist/:id',
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
    path: '/signin',
    name: 'Signin',
    component: () => import(/* webpackChunkName: "signin" */ '../views/SignIn.vue')
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
