<template>
  <div class="register_phone">
    <div class="header">
      <span class="iconfont icon-guanbi" @click="back"></span>
      <p class="title">注册</p>
    </div>
    <p class="msg">输入验证码后将自动登录</p>
    <div class="msgTest" :class="msgTest?'':'wrong'">
      <input type="tel" pattern="[0-9]*" placeholder="请输入验证码" v-model="msg" @keydown.13="next" />
      <a href="javascript:;" v-text="restTimeMsg" class="restTime" :class="canGet?'canGet':''" @click="getMsgAgain"></a>
    </div>
    <p class="wrongMsg" :class="msgTest?'':'active'">验证码错误</p>
    <button class="next" :class="bool?'':'disabled'" @click="next">立即登录</button>
  </div>
</template>
<script>
import { testMsg,getMsg } from "../assets/js/APIs/register";
export default {
  data() {
    return {
      msgTest: true,
      msg: "",
      bool: false,
      restTimeMsg:'60秒后重新发送',
      restTime:60,
      timer:null,
      canGet:false,
      phone:null
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    next() {
      //验证验证码的有效性，并跳转路由至登录
      testMsg(this.phone, this.msg).then(result => {
        if(result.code == 200){
          this.msgTest = true
          console.log(result)
          this.$router.push('/login')
        }
      }).catch(err=>{
        this.msgTest = false
      });
    },
    //验证码重新发送时间递减的函数
    countDown(){
      this.timer = setInterval(()=>{
        this.restTime--
        if(this.restTime > 0){
          this.canGet = false;
          this.restTimeMsg = `${this.restTime}秒后重新发送`;
        }else{
          this.canGet = true;
          this.restTimeMsg = `重新发送`;
          clearInterval(this.timer)
        }
      },1000)
    },
    //重新发送验证码的函数
    getMsgAgain(){
      if(this.canGet){
        getMsg(this.phone).then(result=>{
          this.restTime = 5
          console.log(result)
        })
      }
    }
  },
  created(){
    this.phone = this.$route.params.phone;
    this.countDown()
  },
  watch: {
    msg() {
      this.bool = this.msg ? true : false;
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
  div.msgTest {
    text-align: center;
    border-bottom: 1px solid lightgrey;
    padding: 0 0.1rem;
    margin-top: 0.4rem;
    transition: all 1s;
    position: relative;
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
    a.restTime{
      font-size: .15rem;
      position: absolute;
      left: 2.2rem;
      top: .07rem;
      color: $font-introduce;
      font-weight: lighter;
      width: 1.2rem;
      text-align: center;
      &.canGet{
        color: $cm-red;
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