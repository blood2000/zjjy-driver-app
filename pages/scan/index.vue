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
    console.log(options.status);
    this.status = options.status;
    console.log('扫码接单状态', this.status)
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