<template>
    <div class="header">
        <div>
            <span class="iconfont icon-liebiao"></span>
            <p>CloudMusic</p>
            <span class="iconfont icon-sousuo"></span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import "../../public/scss/base.scss";
    
    .header{
        padding: 10px 0;
        background-color: $cm-red;
        div{
            color: white;
            display:flex;
            justify-content:space-between;
            align-items:center;
            font-weight: 400;
            p{
                font-size:18px;
            }
            span.icon-liebiao{
                margin-left:13px;
            }
            span.icon-sousuo{
                margin-right:13px;
            }
        }
    }
</style>