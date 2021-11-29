<!-- 弹窗组件 -->
<template>
  <div>
    <div class="zjjy-modal" @click="closeModal"></div>
    <div class="zjjy-modal-box">
      <div class="zjjy-modal-box-title">{{ title || "系统提示" }}</div>
      <div class="zjjy-modal-box-content">{{ content || "内容" }}</div>
      <slot></slot>
      <div class="zjjy-modal-btn-box">
        <div class="zjjy-modal-btn confirm-btn" @click="confirm">
          {{ confirmText || "确定" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  props: {
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    confirmText: {
      type: String,
      default: "",
    },
  },

  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    confirm() {
      this.$emit("confirmModal");
    },
  },
};
</script>
<style lang='scss' scoped>
.zjjy-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 101;
}

.zjjy-modal-box {
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  width: 90%;
  min-height: 200rpx;
  padding: 40rpx 30rpx 60rpx;
  background: #fff;
  border-radius: 20rpx;
  z-index: 102;
  &-title {
    font-size: 36rpx;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #000000;
    text-align: center;
  }
  &-content {
    padding: 30rpx 0;
    font-size: 28rpx;
    color: #333;
  }
}

.zjjy-modal-btn-box {
  box-sizing: border-box;

  height: 90rpx;
  display: flex;
  justify-content: center;
}

.zjjy-modal-btn {
  border-radius: 10rpx;
  line-height: 90rpx;
  font-size: 32rpx;
  margin-right: 30rpx;
  text-align: center;
}

.zjjy-modal-btn:last-child {
  margin-right: 0;
}

.confirm-btn {
  flex: 1;
  background: #2366f2;
  color: #fff;
}
</style>