<template>
  <div class="extras">
    <!-- <a class="github" target="_blank" @click="navToGithub" title="源码" src="https://github.com/Couy69/vue-idle-game"></a> -->
    <div class="update-info" @click="drawerOpen" type="primary">
      <img src="../../assets/icons/menu/extras.png" alt="">
      <span>更新日志</span>
      <i class="new" v-if="!checkedUpdateInfo"></i>
    </div>
    <transition name="fade">
      <div class="drawer-update" v-if="showExtrasInfo">
        <i class="close" @click="closePanel"></i>
        <div class="scroll">
          <div class="info" v-for="(item,index) in update" :key="index">
            <h1> {{item.title}}</h1>
            <span v-if="item.desc"> {{item.desc}}</span>
            <h2 class="vision" v-for="(v) in item.vision" :key="v.id" v-if="item.vision">{{v.vision}}:<a :href="v.href" target="_blank"> {{v.href}}</a></h2>
            <h2 v-if="item.adjust">功能调整</h2>
            <p v-for="(v) in item.adjust" :key="v.id">{{v}}</p>
            <h2 v-if="item.majorization">优化</h2>
            <p v-for="(v) in item.majorization" :key="v.id">{{v}}</p>
            <h2 v-if="item.bug">bug修复</h2>
            <p v-for="(v) in item.bug" :key="v.id">{{v}}</p>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>
<script>
import { assist } from '../../assets/js/assist';
export default {
  name: "extras",
  mixins: [assist],
  data() {
    return {
      checkedUpdateInfo: false,
      showExtrasInfo: false,
      name: '',
      suggest: '',
      disabled: false,
      keyCode: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 66, 65],
      reKeyCode: [],
      update: []
    };
  },
  mounted() {
    this.checkedUpdateInfo = localStorage.getItem('version') == "1.2.2" ? true : false
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
      localStorage.setItem('version', '1.2.2')
    },
    closePanel() {
      localStorage.setItem('version', '1.2.2')
      this.showExtrasInfo = false
    },
    navToGithub() {
     
    },
    async submitSuggest() {
      if (this.disabled) {
        return
      }
      try {
        let data = await this.$api.post(
          "v1/Suggest/add",
          {
            name: this.name,
            suggest: this.suggest,
          }
        );
        console.log(data)
        if (data.data.error_code == 20000) {
          this.$store.commit("set_sys_info", {
            msg: `
              你的建议已经提交了哦，十分感谢😘
            `,
            type: 'win'
          });
          this.name = ''
          this.suggest = ''
        } else {
          this.$store.commit("set_sys_info", {
            msg: `
              提交失败：${data.data.msg}
            `,
            type: 'win'
          });
        }
      } catch (error) {
        console.log(error);
      }
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
      }, 1000)
    }
  }
};


</script>
<style lang="scss" scoped>
.extras {
  position: fixed;
  width: 0.5rem;
  height: 0.55rem;
  display: flex;
  bottom: 0.1rem;
  right: 0.8rem;
  z-index: 2;
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
    height: calc(100% - 2rem);
    overflow-y: auto;
    .vision {
      font-size: 0.16rem;
    }
    a {
      color: #fff;
      text-decoration: underline;
      font-size: 0.14rem;
      user-select: initial;
    }
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
      padding-left: 0.25rem;
      line-height: 0.2rem;
      color: #fafafa;
      font-size: 0.13rem;
      letter-spacing: 1px;
    }
  }
}
.footer {
  border-top: 1px solid #444;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #111;
  width: 100%;
  height: 2rem;
  padding: 0.1rem 0.3rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .github {
    margin-bottom: 0.1rem;
    margin-left: 0.1rem;
    background: #fafafa;
    display: block;
    width: 0.32rem;
    height: 0.32rem;
    border-radius: 50%;
    background-image: url(../../assets/icons/github.svg);
    background-size: cover;
  }
  .footer-suggest {
    flex: 1;
    padding: 0 0.2rem;
    & > div {
      width: 100%;
      display: flex;
      margin: 0.1rem;
      justify-content: space-between;
    }
    textarea {
      width: 90%;
      height: 1rem;
      max-width: 4rem;
      max-height: 1.5rem;
    }
  }
  .footer-github {
    width: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    & > div {
      display: flex;
      margin: 0.1rem;
      justify-content: space-between;
    }
    span {
      text-align: center;
    }
  }
}
</style>
