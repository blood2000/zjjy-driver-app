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
    const q = decodeURIComponent(query.q); // 获取到二维码原始链接内容
    console.log("获取链接参数", q);
    if (q && q.split('?')[1]) {
      
      const paramsUrl = q.split('?')[1];
      const params = paramsUrl.split('=')[1];
      let obj = {
        code: params
      }
      this.$store.commit('setScanInfo', obj);
    }

    const token = uni.getStorageSync("token");
    
    if (!token) {
      uni.reLaunch({
        url: "../login/login", //跳转到登录页面--wx
        // success() {
        //   // 手动关闭启动页(由于App.onLaunch方法和页面渲染是同时进行的，只有通过延长启动页的方法才能避免页面闪烁)
        //   if (process.env.NODE_ENV !== "development") {
        //     plus.navigator.closeSplashscreen();
        //   }
        // },
      });
    } else {
      const appType = uni.getStorageSync("appType");
      console.log("用户类型", appType);
      if (appType === 4) {
        uni.redirectTo({
          url: "../index/vehicle",
        });
      } else {
        uni.redirectTo({
          url: "../index/index",
        });
      }

      if (process.env.NODE_ENV !== "development") {
        plus.navigator.closeSplashscreen();
      }
    }
  },

  methods: {
    
  },
};
</script>

<style>
</style>
