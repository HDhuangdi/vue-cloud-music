<template>
  <div class="login">
    <div class="header">
      <span class="iconfont icon-guanbi" @click="back"></span>
      <p class="title">手机号登录</p>
    </div>
    <div class="phone" :class="phoneTest?'':'wrong'">
      <input
        type="tel"
        pattern="[0-9]*"
        placeholder="请输入手机号"
        v-model="phone"
        @keydown.13="singin"
        @input="test"
      />
    </div>
    <p class="wrongMsg" :class="phoneTest?'':'active'">手机号格式错误</p>
    <div class="password" :class="phoneTest?'':'wrong'">
      <input type="password" placeholder="请输入密码" v-model="password" @keydown.13="singin" />
    </div>
    <router-link to="/register_phone" class="reg">没有账号？点击注册</router-link>
    <button class="login-btn" :class="bool && phoneTest?'':'disabled'" @click="singin">立即登录</button>
  </div>
</template>
<script>
import { login } from "../assets/js/APIs/login";
import { Dialog } from 'vant';
export default {
  data() {
    return {
      phone: null,
      password: null,
      bool: false,
      phoneTest: true
    };
  },
  methods: {
    changeBool() {
      this.bool = this.phone && this.password ? true : false;
    },
    test() {
      this.debounce(this.timer_1,this.isInput,()=>{
        var reg = /^1[3-9]\d{9}$/;
        this.phoneTest = reg.test(this.phone);
     })
    },
    singin(e) {
      if (
        e.target.className != "login-btn disabled" ||
        e.target.nodeName == "INPUT"
      ) {
        if (!this.phoneWrong) {
          login(this.phone, this.password).then(result => {
            console.log(result)
            if(result.code == 502){
              Dialog.alert({
                message: '账号密码错误'
              })
            }else{
              window.localStorage.setItem("token", result.token);
              window.localStorage.setItem("uid", result.account.id);
              window.localStorage.setItem("isLogin", true);
              this.$store.commit("changeisLogin", true);
              this.$store.commit("getProfile", result.profile);
              this.$router.push("/");
            }
          });
        }
      }
    },
    back() {
      this.$router.go(-1);
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
    phone() {
       if (this.phone && this.password) {
        this.debounce(this.timer_2,this.isInput,()=>this.bool = this.phoneTest)
      }
    },
    password() {
      this.changeBool()
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../public/scss/base.scss";
div.login {
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
      margin-left: 1.1rem;
      font-size: 0.16rem;
    }
  }
  div.phone,
  div.password {
    text-align: center;
    border-bottom: 1px solid lightgrey;
    padding: 0 0.1rem;
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
  div.phone {
    margin-top: 0.7rem;
    transition: all 1s;
    &.wrong {
      border-bottom: 1px solid red !important;
      input {
        &::placeholder {
          color: red;
        }
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
  div.password {
    margin-top: 0.1rem;
    transition: margin 0.2s;
    &.wrong {
      margin-top: 0.4rem;
    }
  }
  a.reg {
    font-size: 0.14rem;
    color: rgb(170, 170, 170);
    font-weight: lighter;
    margin: 0.2rem 0 0 0.1rem;
  }
  button.login-btn {
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