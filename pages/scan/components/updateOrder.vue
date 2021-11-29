<template>
  <div>
    <div class="toImage">
      <image
      style="width:41rpx;height:86rpx"
       src="../../../static/order/to.png" 
       mode="scaleToFill" />
    </div>
    <div>
      <FreightCard :typesFreight="1" />
    </div>
    <div class="btn-box-two fixed-bottom">
      <div class="as-btn-flexItem as-btn-FFF" @click="submit">不更换</div>
      <div class="as-btn-flexItem as-btn-blue" @click="submit">更换新运单</div>
    </div>
  </div>
</template>

<script>
import FreightCard from "./freightCard.vue";
import { mapState } from "vuex";

export default {
  components: { FreightCard },
   computed: {
    ...mapState({
      licenseNumbers: (state) => state.user.licenseNumbers,
      userInfo: (state) => state.user.userInfo,
    })
  },
};
</script>

<style lang="scss" scoped>
.toImage{
    margin-top: 32rpx;
    text-align: center;
    width: 100%;
    margin-bottom: 38rpx;
}
</style>