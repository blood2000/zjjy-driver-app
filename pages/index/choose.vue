<!-- 选择创建方式 -->
<template>

  <div class="content">
    <div class="prompt-box">
      <uni-icons type="info" size="16" color="#db3555"></uni-icons>
      <span>系统未找到您的注册信息，请选择以下操作完善信息</span>
    </div>
    <div class="zjjy-box" @click="toVehicle">新建司机账号</div>
    <div class="zjjy-box" @click="toRelate">关联已有平台司机账号</div>
  </div>
</template>

<script>
import urlConfig from "../../config/urlConfig.js";
import { uniRequest } from "../../config/request.js";
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},
  onLoad() {
    // this.getDriverInfo();
  },

  methods: {
    
    toVehicle() {
      uni.navigateTo({
        url: "./vehicle",
      });
    },
    toRelate() {
      uni.navigateTo({
        url: "./relate",
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.content {
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
.prompt-box {
  margin-bottom: 40rpx;
}
.zjjy-box {
  height: 160rpx;
  line-height: 140rpx;
  text-align: center;
}
</style>