<template>
    <div class="my-footer">
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
<style lang="scss" scoped>
    div.my-footer{
        &>div{
            z-index: 999;
        }
    }
</style>