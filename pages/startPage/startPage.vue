<template>
  <view class="content"> </view>
</template>

<script>
export default {
  data() {
    return {};
  },

  onLoad(query) {
    console.log("startPage load");
    console.log("获取原始参数", query);
    const q = decodeURIComponent(query.q); // 获取到二维码原始链接内容
    console.log("获取链接参数", q, typeof q);
    if (q !== "undefined") {
      const tmp = this.getlocationParams(q);
      console.log("tmp 解码对象", tmp);
      if (tmp && tmp.code && tmp.type) {
        let obj = {
          code: tmp.code,
          type: tmp.type,
        };
        this.$store.commit("setScanInfo", obj);
      } else if (tmp && tmp.appointmentInfo) {
        let temp = {
          code: tmp.appointmentInfo,
        };
        this.$store.commit("setAppointment", temp);
      }
    } else if (query) {
      this.$store.commit("setScanInfo", query);
    }

    const token = uni.getStorageSync("token");
    const appType = uni.getStorageSync("appType");

    console.log("用户类型", appType);
    if (!token || appType === 4) {
      uni.reLaunch({
        url: "../login/login", //跳转到登录页面--wx
      });
    } else {
      uni.redirectTo({
        url: "../index/index",
      });

      if (process.env.NODE_ENV !== "development") {
        plus.navigator.closeSplashscreen();
      }
    }
  },

  methods: {
    // 获取url地址上参数
    getlocationParams(docval) {
      if (!docval) return null;
      const valStr = docval.split("?")[1];
      if (!valStr) return null;
      console.log("valStr", valStr);
      const tmp = valStr.split("&");
      if (!tmp) return null;
      console.log("valStr", tmp);
      const obj = {};
      if (!tmp || tmp.length == 0) return obj;
      tmp.forEach((element) => {
        const tmp1 = element.split("=");
        obj[tmp1[0]] = tmp1[1];
      });
      console.log("obj", obj);
      return obj;
    },
  },
};
</script>

<style>
</style>
