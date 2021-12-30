<!-- 提交车辆信息 -->
<template>
  <div class="content">
    
    <div class="main">
      <div class="zjjy-box">
        <div class="input-item">
          <div class="title2">姓名 <span class="required">*</span></div>
          <input
            class="my-input"
            maxlength="32"
            placeholder="请输入姓名"
            type="text"
            v-model="vehicleMsg.name"
            cursor-spacing="150"
          />
        </div>
        <div class="input-item">
          <div class="title2">车牌号 <span class="required">*</span></div>
          <input
            class="my-input"
            maxlength="10"
            placeholder="请输入车牌号"
            type="text"
            v-model="vehicleMsg.vehicleCode"
            cursor-spacing="150"
          />
        </div>
      </div>
    </div>
    <div class="btn-box fixed-bottom">
      <div class="as-btn" @click="submit">提交资料</div>
    </div>
  </div>
</template>

<script>
import urlConfig from "../../config/urlConfig.js";
import { uniRequest } from "../../config/request.js";
export default {
  data() {
    return {
      vehicleMsg: {
        name: "",
        vehicleCode: "",
      },
    };
  },

  components: {},

  computed: {},

  

  methods: {
    
    submit() {

      if (!this.vehicleMsg.name) {
        uni.showToast({
          title: "请输入姓名",
          icon: "none",
          duration: 1500,
        });
        return;
      }
      if (!this.vehicleMsg.vehicleCode) {
        uni.showToast({
          title: "请输入车牌号码",
          icon: "none",
          duration: 1500,
        });
        return;
      }
      const appType = uni.getStorageSync("appType");
      const phone = uni.getStorageSync("phone");
      let config = {
        url: "registerDriver",
        method: "POST",
        data: {
          appType: appType,
          phone: phone,
          name: this.vehicleMsg.name,
          licenseNumber: this.vehicleMsg.vehicleCode
        },
      };
      if (appType === 5) {
        config.noToken = true;
      }
      uniRequest(config).then((res) => {
        console.log("司机注册", res);
        if (res.data.code === 200) {
          uni.setStorageSync("appType", '');
          this.$store.commit("setVehicleMsg", this.vehicleMsg);
          // uni.setStorageSync("driverInfo", JSON.stringify(this.vehicleMsg));
          if (appType === 5) {
            uni.setStorageSync("token", res.data.data.access_token);
          }
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
}
</style>