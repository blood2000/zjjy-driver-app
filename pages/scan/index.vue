<!-- 扫码接单入口 -->
<template>
  <div class="contnet"></div>
</template>

<script>
import { uniRequest } from "../../config/request";

export default {
  data() {
    return {
      status: "",
    };
  },

  components: {},

  computed: {},

  onLoad(options) {
    const code = decodeURIComponent(options.code); // 获取到二维码原始链接内容
    console.log("获取链接参数1111", code);
    this.getOrderStatus(code);
  },

  onShow() {},

  methods: {
    getOrderStatus(code) {
      const config = {
        url: "scannerCodeOrOpenLink",
        method: "POST",
        data: {
          code: code,
          openType: "1",
        },
      };
      console.log("config", config);
      uniRequest(config).then((res) => {
        console.log("scannerCodeOrOpenLink", res);
        const obj = {
          200: () => {
            console.log("code ===", 200);
            uni.redirectTo({
              url: `./scanOrder?data=${JSON.stringify(res.data)}`,
            });
          },
          50001: () => {
            console.log("code ===", 50001);
            uni.navigateTo({
              url: `./orderInfo?data=${JSON.stringify(res.data)}`,
            });
          },
          50002: () => {
            console.log("code ===", 50002);
            uni.navigateTo({
              url: `./changeDriverInfo?data=${JSON.stringify(res.data)}`,
            });
          },
        };
        if (res.data.code == 500) {
          uni.showModal({
            title: "提示",
            content: res.data.msg,
            showCancel: false,
            success: (res) => {
              console.log("res", res);
              this.$store.commit("setScanInfo", {});
              uni.navigateTo({
                url: `../index/index`,
              });
            },
          });
        }
        obj[res.data.code]();
      });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>