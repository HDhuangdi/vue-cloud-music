<template>
    <div class="info-item">
        <div>
            <span class="iconfont icon-bofangsanjiaoxing" v-text="parseInt(item.playCount/10000)+'万'"></span>
        </div>
        <img :src="item.picUrl+'?param=200y200'" />
        <p v-text="item.name"></p>
    </div>
</template>
<script>
export default {
    props:["item"]
}
</script>
<style lang="scss" scoped>
@import "../../public/scss/base.scss";
    .info-item {
        font-size: 12px;
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
</style>