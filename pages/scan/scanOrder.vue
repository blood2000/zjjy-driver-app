<!-- 扫码接单 -->
<template>
  <div class="content">
    <FreightCard :typesFreight="typesFreight" />
    <!-- 收货运输 -->
    <Receiving v-if="types === 0" v-model="queryParams" />
    <Shipments v-if="types === 1"  v-model="queryParams"/>
  </div>
</template>

<script>
import FreightCard from "./components/freightCard";
import Receiving from "./components/receiving";
import Shipments from './components/shipments'
export default {
  components: { FreightCard, Receiving , Shipments},
  data() {
    return {
      //订单信息
      queryParams: {
        weight: "", // 发货净重
      },
      types:0,
      typesFreight:0
    };
  },
  methods: {},
};
</script>
<style lang='scss' scoped>
.content {
  overflow-y: auto;
  padding-top: 30rpx;
}

.padding-box {
  padding-top: 30rpx;
}

.unit {
  padding-left: 10rpx;
}

.close-icon {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  width: 32rpx;
  height: 32rpx;
  background: url("../../static/delete.png");
  background-size: 32rpx 32rpx;
}

.active {
  box-shadow: 2rpx 4rpx 20rpx 0 rgba(22, 15, 15, 0.6);
}
</style>