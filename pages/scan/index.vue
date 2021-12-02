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
    const q = decodeURIComponent(options.q); // 获取到二维码原始链接内容
    console.log("获取链接参数", q);
    // this.getOrderStatus(q);
  },

  onShow() {},

  methods: {
    getOrderStatus(q) {
      const config = {
        url: "scannerCodeOrOpenLink",
        method: "POST",
        data: {
          code: "asdfas",
          openType: "1",
        },
      };
      uniRequest(config).then((res) => {
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
        obj[res.code]();
      });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>