<!-- 关联司机账号 -->
<template>
  <div class="content">
    <!-- <div class="prompt-box">
      <uni-icons type="info" size="16" color="#db3555"></uni-icons>
      <span>系统未找到您的注册信息，请完善以下信息后进行操作</span>
    </div> -->
    <div class="main">
      <div class="zjjy-box">
        <div class="input-item">
          <div class="title2">手机号 <span class="required">*</span></div>
          <input
            class="my-input"
            maxlength="32"
            placeholder="请输入平台司机手机号"
            type="text"
            v-model="vehicleMsg.phone"
          />
        </div>
        <div class="input-item">
          <div class="title2">密码 <span class="required">*</span></div>
          <input
            class="my-input"
            maxlength="10"
            placeholder="请输入密码"
            type="password"
            v-model="vehicleMsg.password"
          />
        </div>
      </div>
      <div class="btn-box">
        <div class="as-btn" @click="submit">确认关联</div>
      </div>
    </div>
  </div>
</template>

<script>
import urlConfig from "../../config/urlConfig.js";
import { uniRequest } from "../../config/request.js";
import formFilter from "../../utils/filter";
export default {
  data() {
    return {
      password: "",
      vehicleMsg: {
        phone: "",
        password: "",
      },
    };
  },

  components: {},

  computed: {},

  onLoad() {},

  methods: {
    submit() {
      if (!this.vehicleMsg.phone) {
        uni.showToast({
          title: "请输入手机号",
          icon: "none",
          duration: 1500,
        });
        return;
      }
      const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      // console.log(phoneReg.test(this.vehicleMsg.phone))
      if (!phoneReg.test(this.vehicleMsg.phone)) {
        uni.showToast({
          title: "请输入正确手机号",
          icon: "none",
          duration: 1500,
        });
        return;
      }
      if (!this.vehicleMsg.password) {
        uni.showToast({
          title: "请输入密码",
          icon: "none",
          duration: 1500,
        });
        return;
      }
      const appType = uni.getStorageSync("appType");
      const phone = uni.getStorageSync("phone");
      let config = {
        url: "relateDriver",
        method: "POST",
        data: {
          loginPhoneNumber: phone,
          associationPhoneNumber: this.vehicleMsg.phone,
          password: this.vehicleMsg.password,
        },
      };
      if (appType === 5) {
        config.noToken = true;
      }

      uniRequest(config).then((res) => {
        console.log("司机关联", res);
        if (res.data.code === 200) {
          uni.setStorageSync("appType", "");
          let obj = {
            phone: this.vehicleMsg.phone,
          };
          this.$store.commit("setVehicleMsg", obj);
          // uni.setStorageSync("driverInfo", JSON.stringify(this.vehicleMsg));
          uni.setStorageSync("token", res.data.data.access_token);
          uni.redirectTo({
            url: "./index",
          });
        } else {
          uni.showModal({
            title: "提示",
            content: res.data.msg,
            showCancel: false,
          });
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.main {
  padding-top: 40rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


.btn-box {
  padding: 20rpx 0;
}
</style>