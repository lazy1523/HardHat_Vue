<template>
  <div class="qa">
    <!-- <a class="github" target="_blank" @click="navToGithub" title="源码" src="https://github.com/Couy69/vue-idle-game"></a> -->
    <div class="update-info" @click="drawerOpen" type="primary">
      <img src="../../assets/icons/menu/Q&A.png" alt="">
      <span>Q&A</span>
      <i class="new" v-if="!checkedUpdateInfo"></i>
    </div>
    <transition name="fade">
      <div class="drawer-update" v-if="showExtrasInfo">
        <i class="close" @click="closePanel"></i>
        <h1>Q&A</h1>

      </div>
    </transition>

  </div>
</template>
<script>
import { assist } from '../../assets/js/assist';
export default {
  name: "qa",
  mixins: [assist],
  data() {
    return {
      checkedUpdateInfo: false,
      showExtrasInfo: false,
      // TODO: 
      update:[]
    };
  },
  mounted() {
    this.checkedUpdateInfo = localStorage.getItem('checkedUpdateInfo')
    this.update = this.update.reverse()
    
  },
  methods: {
    eastereEgg1(e) {
      setTimeout(() => {
        this.reKeyCode = []
      }, 3000)
      this.reKeyCode.push(e.keyCode)
      if (JSON.stringify(this.reKeyCode) == JSON.stringify(this.keyCode)) {
        var p = this.findComponentUpward(this, 'index')
        if (!p.GMmodel) {
          p.GMmodel = true
          this.$store.commit("set_sys_info", {
            msg: `
              你发现了彩蛋，想必你也是个游戏热爱者。
            `,
            type: 'win'
          });
          this.$store.commit("set_sys_info", {
            msg: `
              开启了GM模式，如果你是玩家的话，请不要滥用GM模式哦。
            `,
            type: 'win'
          });
        }
      }
    },
    drawerOpen() {
      this.showExtrasInfo = true
      this.checkedUpdateInfo = true
      localStorage.setItem('checkedUpdateInfo', true)
    },
    closePanel() {
      localStorage.setItem('checkedUpdateInfo', true)
      this.showExtrasInfo = false
    },
    GMTToStr(time) {
      let date = new Date(time)
      let Str = date.getFullYear() + '-' +
        (date.getMonth() + 1) + '-' +
        date.getDate() + ' ' +
        date.getHours() + ':' +
        date.getMinutes() + ':' +
        date.getSeconds()
      return Str
    }
  }
};


</script>
<style lang="scss" scoped>
.qa {
  position: fixed;
  width: 0.5rem;
  height: 0.55rem;
  display: flex;
  bottom: 0.1rem;
  right: 1.5rem;
  z-index: 1;
  cursor: pointer;
  .update-info {
    margin-right: 0.2rem;
    cursor: pointer;
    width: 0.5rem;
    height: 0.55rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 0.35rem;
      height: 0.35rem;
    }
    span {
      white-space: nowrap;
      font-size: 0.12rem;
    }
    .new {
      display: flex;
      width: 0.3rem;
      height: 0.16rem;
      position: absolute;
      top: 0rem;
      right: 0px;
      transform: translate(50%, -50%);
      background-image: url("../../assets/icons/menu/NEW.png");
      background-size: contain;
      background-repeat: no-repeat;
      animation: tipsMove 1s infinite;
    }
  }
}
@keyframes tipsMove {
  0% {
    transform: translate(50%, -50%);
  }
  25% {
    transform: translate(50%, -70%);
  }
  50% {
    transform: translate(50%, -50%);
  }
  75% {
    transform: translate(50%, -80%);
  }
  100% {
    transform: translate(50%, -50%);
  }
}
.drawer-update {
  position: fixed;
  width: 30%;
  height: 100%;
  background: #111;
  top: 0;
  right: 0;
  padding: 0.2rem;
  z-index: 10;
  .scroll {
    height: calc(100% - 0.5rem);
    overflow-y: auto;
  }
  .close {
    cursor: pointer;
    position: absolute;
    top: 0.13rem;
    right: 0.15rem;
    display: block;
    width: 0.3rem;
    height: 0.3rem;
    background-image: url(../../assets/icons/close.png);
    background-size: cover;
  }
  .info {
    padding: 0.2rem;
    text-align: left;
    user-select:text;
    h1 {
      margin: 0.06rem 0;
      font-size: 0.23rem;
      letter-spacing: 1px;
    }
    span {
      margin: 0.06rem;
      font-size: 0.13rem;
      letter-spacing: 1px;
    }
    h2 {
      padding-left: 0.2rem;
      line-height: 0.3rem;
      margin: 0.1rem 0;
      font-size: 0.18rem;
      letter-spacing: 1px;
    }
    p {
      margin: 0.1rem;
      padding-left: 0.25rem;
      line-height: 0.2rem;
      color: #fafafa;
      font-size: 0.14rem;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      img {
        margin-right: 0.1rem;
        border-radius: 50%;
        width: 0.25rem;
        height: 0.25rem;
      }
    }
  }
}
</style>
