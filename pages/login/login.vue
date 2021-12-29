<template>
  <view class="content">
    <view class="login-center">
      <view class="logo">
        <img src="../../static/wx_logo.png" alt="" />
      </view>
      <view class="app-name">至简集运司机端</view>
      <view class="userinfo">
        <block>
          <button
            class="wx-btn"
            open-type="getPhoneNumber"
            @getphonenumber="getPhoneNumber"
          >
            微信授权
          </button>
          <!-- <button class="wx-btn" style="display: none" @click="getUserProfile">
            微信授权
          </button> -->
        </block>
      </view>
      <!-- 服务号预留 -->
      <!-- 协议 -->
      <div class="protocol">
        授权即代表您已同意 <span @click="toProtocol">《服务协议》 </span>及<span
          @click="toPrivacy"
        >
          《隐私政策》
        </span>
      </div>
      
    </view>
  </view>
</template>

<script>
// import showToast from "../../components/popup/showToast.vue";
import urlConfig from "../../config/urlConfig.js";
import { mapState, mapMutations } from "vuex";
import { uniRequest } from "../../config/request.js";
export default {
  data() {
    return {
      title: "login",
      // userInfo: {},
      hasUserInfo: false,
      canIUseGetUserProfile: false,
      isGetTel: false,
      code: "",
      data: {},
    };
  },
  computed: {
    ...mapState({
      headerInfo: (state) => state.user.headerInfo,
    }),
  },
  components: {
    // showToast,
  },
  onLoad() {
    console.log(this.headerInfo);
  },

  onShow() {
    console.log("login show");
    this.wxLogin();
  },
  methods: {
    wxLogin() {
      let that = this;
      wx.login({
        success(res) {
          console.log(res);
          if (res.code) {
            that.code = res.code;
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        },
      });
      if (wx.getUserProfile) {
        this.canIUseGetUserProfile = true;
      }
    },
    getPhoneNumber(e) {
      console.log('授权获取手机号', e);
      let that = this;

      // encryptedData: res.encryptedData,
      // ivStr: res.iv,
      if (!e.detail.encryptedData) {
        return;
      }

      that.data.encryptedData = e.detail.encryptedData;
      that.data.ivStr = e.detail.iv;
      that.data.code = that.code;
      that.data.appId = "wx2b8c78933f4a9aa5";
      console.log("微信iv、encrypted ==>>", that.data);
      // const baseUrl = urlConfig.BASE_URL;
      const config = {
        url: "login",
        method: "POST",
        data: that.data,
        noToken: true,
      };
      //测试用
      // uni.showModal({
      //   title: "提示",
      //   content: "是否允许使用微信头像?",
      //   // showCancel: false,
      //   success: (res) => {
      //     if (res.confirm) {
      //       this.getUserProfile();
      //     } else {
      //       uni.redirectTo({
      //         url: "../index/index",
      //       });
      //     }
      //   },
      // });

      // return;
      console.log(config, "config");
      uniRequest(config)
        .then((res) => {
          console.log("微信授权-->", res);
          if (res.data.code === 200) {
            let token = res.data.data.access_token;
            let appType = res.data.data.appType;
            console.log('token', token)
            uni.setStorageSync("token", token);
            uni.setStorageSync("appType", appType);
            uni.setStorageSync('phone',res.data.data.phone);
            // if (appType === 5) {
            //   uni.setStorageSync('nickName',res.data.data.nickName);
            // }
            this.judgeToJump(appType);
            // const avatar = uni.getStorageSync("avatar");
            // if (avatar) {
            //   this.judgeToJump(appType);
            // } else {
              
            //   uni.showModal({
            //     title: "提示",
            //     content: "是否使用微信头像?",
            //     // showCancel: false,
            //     success: (res) => {
            //       if (res.confirm) {
            //         this.getUserProfile(appType);
            //       } else {
            //         this.judgeToJump(appType);
            //       }
            //     },
            //   });
            // }
          } else {
            console.log("===============================>>", res);
            uni.showModal({
              title: "提示",
              content: res.data.msg || '系统异常',
              showCancel: false,
              success: (res) => {
                that.wxLogin();
              },
            });
          }
        })
        .catch((error) => {
          console.log("error", error);

          that.wxLogin();
        });
    },
    judgeToJump(appType) {
      if (appType === 4 || appType === 5) {
        uni.redirectTo({
          url: "../index/choose",
        });
      } else {
        uni.redirectTo({
          url: "../index/index",
        });
      }
    },
    getUserProfile(appType) {
      let that = this;
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      // return new Promise((resolve, reject) => {

      // });
      wx.getUserProfile({
        desc: "用于完善用户资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log('获取用户资料', res);
          this.isGetTel = true;
          this.userInfo = res.userInfo;
          // this.$store.commit("setUserInfo", res.userInfo);
          uni.setStorageSync("avatar", res.userInfo.avatarUrl);
          this.hasUserInfo = true;
          this.judgeToJump(appType);
        },
        fail: () => {
          console.log('拒绝');
          this.judgeToJump(appType);
        }
      });
    },

    //跳转用户协议
    toProtocol() {
      uni.navigateTo({
        url: "../protocol/service",
      });
    },
    toPrivacy() {
      uni.navigateTo({
        url: "../protocol/user",
      });
    },
  },
};
</script>

<style>
.content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #ffffff;
}

.userinfo-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}

.prop {
  box-sizing: border-box;
  padding: 40rpx;
  width: 80%;
  height: 100px;
  background: #333;
  position: fixed;
  top: 30%;
  left: 10%;
  color: #fff;
  font-size: 24rpx;
  z-index: 200;
  word-break: break-word;
}

.main {
  box-sizing: border-box;
  position: absolute;
  padding: 100rpx 70rpx 0;
  top: 450rpx;
  left: 0;
  width: 100%;
  /* height: 1082rpx; */
  min-height: 500rpx;
  background: #ffffff;
  border-radius: 50rpx 50rpx 30rpx 30rpx;
}

.title1 {
  color: #333;
  font-size: 48rpx;
  font-weight: bold;
}

.title2 {
  color: #aaa;
  font-size: 28rpx;
}

.login-type {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 24rpx 0 8rpx;
  font-size: 28rpx;
  color: #333;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.protocol {
  margin-top: 40rpx;
  width: 100%;
  padding-left: 40rpx;
  color: #686868;
  font-size: 28rpx;
}

.protocol > span {
  color: #1678ff;
}

.subscribe {
  width: 100%;
  margin-top: 40rpx;
  padding-left: 40rpx;
  color: #686868;
  font-size: 26rpx;
  height: 50rpx;
  display: flex;
  align-items: center;
}

.as-check {
  box-sizing: border-box;
  height: 30rpx;
  width: 30rpx;
  border: 1rpx solid #686868;
  text-align: center;
  line-height: 28rpx;
  margin-right: 20rpx;
  color: #1678ff;
}
</style>
