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
        font-size: .12rem;
        position: relative;
        span {
            position: absolute;
            top:.74rem;
            left:.74rem;
            z-index: 10;
            color: white;
            font-size: .22rem;
            font-weight: lighter;
            float: right;
            margin-right: .05rem;
        }
        img {
            width: 100%;
            border-radius: .1rem;
        }
        p.fname {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-height: .3rem;
            margin-top: .05rem;
            line-height: .15rem;
            color: $font-main;
            font-size: .12rem;
        }
        p.des{
            font-size: .12rem;
            font-weight: lighter;
            color:$font-introduce;
            margin-top: .05rem;
            display:-webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
    }
</style>