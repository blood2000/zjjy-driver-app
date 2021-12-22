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
    console.log("获取链接参数1111", options);
    const code = decodeURIComponent(options.code); // 获取到二维码原始链接内容
    const type = options.type;
    this.getOrderStatus(code, type);
  },

  onShow() {},

  methods: {
    getOrderStatus(code, type) {
      const config = {
        url: "scannerCodeOrOpenLink",
        method: "POST",
        data: {
          code: code,
          openType: type,
        },
      };
      console.log("11config", config);
      uniRequest(config).then((res) => {
        console.log("scannerCodeOrOpenLink", res);
        const obj = {
          200: () => {
            console.log("code ===", 200);
            uni.redirectTo({
              url: `./scanOrder?data=${JSON.stringify(res.data.data.currentScannerWaybill)}`,
            });
          },
          50001: () => {
            console.log("code ===", 50001);
            uni.redirectTo({
              url: `./orderInfo?data=${JSON.stringify(res.data.data.currentScannerWaybill)}`,
            });
          },
          50002: () => {
            console.log("code ===", 50002);
            uni.redirectTo({
              url: `./changeDriverInfo?data=${JSON.stringify(res.data.data)}`,
            });
          },
          50003: () => {
            console.log('允许卸货')
            uni.redirectTo({
              url: `./unload?data=${JSON.stringify(res.data.data.currentScannerWaybill)}&&isAllow=1`,
            });
          },
          50004: () => {
            console.log('不允许卸货');
            uni.redirectTo({
              url: `./unload?data=${JSON.stringify(res.data.data.currentScannerWaybill)}&&isAllow=0`,
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
        } else {
          obj[res.data.code]();
        }
        
      });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>