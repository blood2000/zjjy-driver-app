<template>
  <view class="content"> </view>
</template>

<script>
export default {
  data() {
    return {};
  },

  onLoad() {
    console.log("startPage load");
    // const token = uni.getStorageSync("token");
    // console.log('token', token)
    // if (!token) {
    //   uni.reLaunch({
    //     url: "../login/login", //跳转到登录页面--wx
    //   });
    // } else {
    //   const appType = uni.getStorageSync("appType");
    //   if (appType === 4) {
    //     uni.redirectTo({
    //       url: "../index/vehicle",
    //     });
    //   } else {
    //     uni.redirectTo({
    //       url: "../index/index",
    //     });
    //   }

    //   if (process.env.NODE_ENV !== "development") {
    //     plus.navigator.closeSplashscreen();
    //   }
    // }
  },

  methods: {},
};
</script>

<style>
</style>
