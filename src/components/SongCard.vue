<template>
    <div class="song-card">
        <img :src="img">
        <div class="content">
            <div class="header">
                <p class="songName" v-text="name"></p>
                <p class="split">-</p>
                <p class="artists" v-text="artists"></p>
            </div>
            <p class="intro" v-text="intr"></p>
        </div>
        <span class="play"></span>
    </div>
</template>
<script>
export default {
    props:["name","artists","intr","img"]
}
</script>
<style lang="scss" scoped>
@import "../../public/scss/base.scss";
div.song-card{
    @include flex-between;
    img{
        width: 18%;
        height: 100%;
        border-radius: .10rem;
    }
    div.content{
        @include flex-around;
        flex-direction: column;
        width: 75%;
        padding: .05rem 0 .05rem .1rem;
        div.header{
            display: flex;
            & p:not(:first-child){
                margin-left: .05rem;
            }
            p.songName{
                color:$font-main;
                font-size: .16rem;
            }
            p.split,p.artists{
                font-size: .13rem;
                color:$font-introduce;
                line-height: .16rem;
                font-weight: lighter;
            }
        }
        p.intro{
            font-size: .12rem;
            color:$font-introduce;
            font-weight: lighter;
        }
    }
}

</style>