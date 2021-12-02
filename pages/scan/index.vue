<!-- 扫码接单入口 -->
<template>
  <div class="contnet"></div>
</template>

<script>
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
    return;
    if (this.status === '0') {
      uni.redirectTo({
        url: "./scanOrder",
      });
    } else if (this.status === '1') {
      uni.navigateTo({
        url: "./changeDriverInfo",
      });
    } else if (this.status === '2') {
      uni.navigateTo({
        url: "./orderInfo",
      });
    }
  },

  onShow() {},

  methods: {},
};
</script>
<style lang='scss' scoped>
</style>