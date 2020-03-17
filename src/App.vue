<template>
  <div id="app">
    <my-header></my-header>
    <keep-alive>
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 标签栏 -->
    <van-tabbar route fixed safe-area-inset-bottom active-color="#d44439">
      <van-tabbar-item replace to="/" icon="wap-home-o">
        发现
      </van-tabbar-item>
      <van-tabbar-item replace to="/mymusic" icon="music-o">
        我的
      </van-tabbar-item>
      <van-tabbar-item replace to="/me" icon="friends-o">
        账号
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

