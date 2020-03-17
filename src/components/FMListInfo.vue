<template>
    <div class="info-item">
        <span class="iconfont icon-bofang1"></span>
        <img :src="item.picUrl+'?param=200y200'" />
        <p v-text="item.name" class="fname"></p>
        <p v-text="item.program.description" class="des"></p>
    </div>
</template>
<script>
export default {
    props:["item","des"]
}
</script>
<style lang="scss" scoped>
@import "../../public/scss/base.scss";
    .info-item {
        font-size: 12px;
        letter-spacing: 1.5px;
        position: relative;
        span {
            position: absolute;
            top:74px;
            left:74px;
            z-index: 10;
            color: white;
            font-size: 22px;
            font-weight: lighter;
            float: right;
            margin-right: 5px;
        }
        img {
            width: 100%;
            border-radius: 10px;
        }
        p.fname {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-height: 30px;
            margin-top: 5px;
            line-height: 15px;
            color: $font-main;
            font-size: 13px;

        }
        p.des{
            font-size: 12px;
            font-weight: lighter;
            color:$font-introduce;
            margin-top: 5px;
        }
    }
</style>