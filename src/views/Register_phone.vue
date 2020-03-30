<template>
  <div class="register_phone">
    <div class="header">
      <span class="iconfont icon-guanbi" @click="back"></span>
      <p class="title">注册</p>
    </div>
    <p class="msg">输入手机号后将获得验证码信息</p>
    <div class="phone" :class="phoneTest?'':'wrong'">
      <input
        type="tel"
        pattern="[0-9]*"
        placeholder="请输入手机号"
        v-model="phone"
        @keydown.13="next"
        @input="test"
      />
    </div>
    <p class="wrongMsg" :class="phoneTest?'':'active'">手机号格式错误</p>
    <button class="next" :class="bool && phoneTest?'':'disabled'" @click="next">获取验证码</button>
  </div>
</template>
<script>
import { getMsg, existence } from "../assets/js/APIs/register";
import { Dialog } from "vant";
export default {
  data() {
    return {
      phoneTest: true,
      phone: "",
      bool: false,
      isInput: true,
      timer_1: null,
      timer_2: null
    };
  },
  methods: {
    //监听input事件并添加防抖函数，验证手机号码格式
    test() {
     this.debounce(this.timer_1,this.isInput,()=>{
        var reg = /^1[3-9]\d{9}$/;
        this.phoneTest = reg.test(this.phone);
     })
    },
    back() {
      this.$router.go(-1);
    },
    //点击获取验证码按钮时，验证用户是否存在，若不存在，跳转路由至验证验证码路由
    next() {
      if (this.phoneTest) {
        existence(this.phone).then(result => {
          if (result.exist == 1) {
            Dialog.confirm({
            message: '手机号已存在，是否跳转至登录页面？'
          }).then(() => {
            this.$router.push('/login')
          }).catch(() => {
            
          });
          } else if (result.exist == -1) {
            getMsg(this.phone).then(result => {
              this.$router.push({name:"Register_msg",params:{phone:this.phone}});
            });
          }
        });
      }
    },
    //封装防抖函数
    debounce(timer,bool,cb){
      bool = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        bool = false;
        cb()
      }, 500);
    }
  },
  watch: {
    //保持控制按钮的class="disable"的布尔值，与手机格式验证结果的布尔值一致，并添加防抖函数
    phone() {
      if (this.phone) {
        this.debounce(this.timer_2,this.isInput,()=>this.bool = this.phoneTest)
      }
    }
  }
};

</script>
<style lang="scss" scoped>
@import "../../public/scss/base.scss";
div.register_phone {
  font-size: 0;
  box-sizing: border-box;
  padding: 0 0.2rem;
  div.header {
    margin-top: 0.3rem;
    display: flex;
    align-items: center;
    color: $font-main;
    font-weight: bold;
    span.iconfont {
      font-size: 0.25rem;
    }
    p.title {
      margin-left: 1.3rem;
      font-size: 0.16rem;
    }
  }
  p.msg {
    font-size: 0.14rem;
    margin-top: 0.6rem;
    padding: 0 0.1rem;
    color: $font-introduce;
    font-weight: lighter;
  }
  div.phone {
    text-align: center;
    border-bottom: 1px solid lightgrey;
    padding: 0 0.1rem;
    margin-top: 0.4rem;
    transition: all 1s;
    &.wrong {
      border-bottom: 1px solid red !important;
      input {
        &::placeholder {
          color: red;
        }
      }
    }
    input {
      width: 100%;
      height: 0.3rem;
      border: 0;
      font-size: 0.15rem;
      &::placeholder {
        color: $font-introduce;
        font-weight: lighter;
      }
    }
  }
  p.wrongMsg {
    font-size: 0.15rem;
    color: red;
    margin: 0.1rem 0 0 0.1rem;
    opacity: 0;
    transition: all 1s;
    &.active {
      opacity: 1;
    }
  }
  button.next {
    font-size: 0.15rem;
    font-weight: lighter;
    margin: 0.2rem auto 0 auto;
    text-align: center;
    background-image: linear-gradient(left, #ff584b, #fe1e14);
    color: white;
    padding: 0.12rem 0;
    border-radius: 0.3rem;
    width: 100%;
    border: 0;
    &.disabled {
      background-image: linear-gradient(left, #ffd3d0, #ff8680) !important;
    }
  }
}
</style>