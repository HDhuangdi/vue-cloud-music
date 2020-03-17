<template>
    <div class="song-card">
        <img :src="img+'?param=100y100'">
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
        border-radius: 10px;
    }
    div.content{
        @include flex-around;
        flex-direction: column;
        width: 75%;
        padding: 5px 0 5px 10px;
        div.header{
            display: flex;
            & p:not(:first-child){
                margin-left: 5px;
            }
            p.songName{
                color:$font-main;
                font-size: 16px;
            }
            p.split,p.artists{
                font-size: 12px;
                color:$font-introduce;
                line-height: 16px;
                font-weight: lighter;
            }
        }
        p.intro{
            font-size: 12px;
            color:$font-introduce;
            font-weight: lighter;
        }
    }
}

</style>