<template>
  <div class="card">
    <img class="border" src="../../../static/order/border.png" alt="" />
    <img class="base" :src="url" alt="" />
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  width: 300rpx;
  height: 216rpx;
  background: #f3f8fc;
  padding: 18rpx;
  padding-bottom: 18rpx;
  position: relative;
  box-sizing: border-box;
}
.border {
  width: 264rpx;
  height: 150rpx;
  position: absolute;
  top: 18rpx;
  left: 18rpx;
}
.base {
  width: 264rpx;
  height: 150rpx;
}
.title {
  font-size: 20rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: #333333;
  text-align: center;
}
</style>