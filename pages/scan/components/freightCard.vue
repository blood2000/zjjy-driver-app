<template>
  <div class="zjjy-box-freughtCard order-box">
    <div class="zjjy-box-title">本次扫码要接的运单</div>
    <div class="zjjy-box-main">
      <div class="zjjy-box-main-floor">
        <!-- :class="typesFreight ===0?'status1':'status2'" -->
        <div class="zjjy-floor-left status">
          <image :src="freightImage" alt="" />
        </div>
        <div class="zjjy-floor-right addr">
          <div class="floor-start">五福洗煤厂</div>
          <div class="rotate-right">
            <uni-icons type="pulldown" size="24" color="#b9d0fd"></uni-icons>
          </div>
          <div class="floor-end">富邦总部大楼</div>
        </div>
      </div>
      <div class="zjjy-box-main-floor">
        <div class="zjjy-floor-left">商品类型</div>
        <div class="zjjy-floor-right">原煤</div>
      </div>
      <div class="zjjy-box-main-floor">
        <div class="zjjy-floor-left">运输公司</div>
        <div class="zjjy-floor-right">
          <image style="width: 136rpx; height: 28rpx" :src="companyImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    typesFreight: {
      type: Number,
      default: 0,
    },
    pageData: {
      type: Object,
      default: {},
    },
  },
  computed: {
    freightImage() {
      return this.typesFreight === 0
        ? "../../../static/order/Receiving.png"
        : "../../../static/order/shipments.png";
    },
    companyImage() {
      return "../../../static/order/chy.png";
    },
  },
};
</script>

<style  scoped>
.rotate-right {
  width: 16%;
  text-align: center;
  transform: rotate(-90deg);
}
.floor-start,
.floor-end {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 42%;
}

.order-box {
  padding: 0;
}
.status {
  width: 127rpx;
  height: 36rpx;
}

.status1 {
  background: #febe4d;
}

.status2 {
  background: #24b1b8;
}
.addr {
  width: 70%;
}
</style>