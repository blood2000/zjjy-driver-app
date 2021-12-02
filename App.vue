<script>
export default {
  onLaunch: function (options) {
    console.log("App Launch");
    const query = options.query; // 这个就是你的参数，是个json对象
    console.log("url scheme携带参数", options); // 场景值为 1065
    //TODONG: 把参数解析出来，传给指定页面

    if (JSON.stringify(options.query) === '{}') {
      
    }
    // if (options.query.token) {
    //   uni.redirectTo({
    //     url: options.path,
    //   });
    //   return;
    // }

    // return;
    const token = uni.getStorageSync("token");
    console.log(process.env.NODE_ENV);
    // 用于调试
    // uni.redirectTo({
    //   url: "pages/index/index",
    // });
    // return;
    if (!token) {
      uni.reLaunch({
        url: "pages/login/login", //跳转到登录页面--wx
        success() {
          // 手动关闭启动页(由于App.onLaunch方法和页面渲染是同时进行的，只有通过延长启动页的方法才能避免页面闪烁)
          if (process.env.NODE_ENV !== "development") {
            plus.navigator.closeSplashscreen();
          }
        },
      });
    } else {
      const appType = uni.getStorageSync("appType");
      console.log("用户类型", appType);
      if (appType === 4) {
        uni.redirectTo({
          url: "pages/index/vehicle",
        });
      } else {
        uni.redirectTo({
          url: "pages/index/index",
        });
      }

      if (process.env.NODE_ENV !== "development") {
        plus.navigator.closeSplashscreen();
      }
    }
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
@import "./common/login.css";
/* @import "./common/zjjy.css"; */
/*每个页面公共css */
page {
  height: 100%;
  background: #f2f2f2;
}
</style>
