<template>
  <div>
    <div class="toImage">
      <image
        style="width: 41rpx; height: 86rpx"
        src="../../../static/order/to.png"
        mode="scaleToFill"
      />
    </div>
    <div>
      <FreightCard :typesFreight="pageData.receiveType || 0" :pageData="pageData"/>
    </div>
    <div class="btn-box-two fixed-bottom">
      <div class="as-btn-flexItem as-btn-FFF" @click="closed">不更换</div>
      <div class="as-btn-flexItem as-btn-blue" @click="update">更换新运单</div>
    </div>
  </div>
</template>

<script>
import FreightCard from "./freightCard.vue";
import { mapState } from "vuex";

export default {
  components: { FreightCard },
  
  props: {
    pageData: {
      type: Object,
      default: {},
    },
    currentScannerWaybill: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState({
      licenseNumbers: (state) => state.user.licenseNumbers,
      beforeWaybillCode: (state) => state.user.beforeWaybillCode,
      userInfo: (state) => state.user.userInfo,
    }),
  },
  methods: {
    closed() {
      console.log("co");
      uni.navigateTo({
        url: "../index/index",
      });
    },
    update() {
      console.log("update");
      let data = {...this.pageData};
      data.beforeWaybillCode = this.beforeWaybillCode;
      uni.navigateTo({
        url: `./scanOrder?data=${JSON.stringify(data)}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.toImage {
  margin-top: 32rpx;
  text-align: center;
  width: 100%;
  margin-bottom: 38rpx;
}
</style>