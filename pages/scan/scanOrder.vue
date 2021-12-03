<!-- 扫码接单 -->
<template>
  <div class="content">
    <FreightCard :typesFreight="typesFreight" :pageData="pageData" />
    <!-- 收货运输 -->
    <Receiving
      v-if="types === 1"
      @jumpTo="jumpTo"
      v-model="queryParams"
      :licenseNumbers="licenseNumbers"
    />
    <Shipments
      v-else
      @jumpTo="jumpTo"
      v-model="queryParams"
      :licenseNumbers="licenseNumbers"
    />
  </div>
</template>

<script>
import { uniRequest } from "../../config/request";
import FreightCard from "./components/freightCard";
import Receiving from "./components/receiving";
import Shipments from "./components/shipments";
export default {
  components: { FreightCard, Receiving, Shipments },
  data() {
    return {
      //订单信息
      queryParams: {
        netWeight: null, // 发货净重
        orderPlanCode: null,
        licenseNumber: null,
        vehicleCode: null,
        attachments: null,
        beforeWaybillCode: null,
      },
      types: 1,
      pageData: {},
      licenseNumbers: [],
    };
  },
  onLoad(options) {
    console.log("options", options);
    if (
      options &&
      JSON.stringify(options) !== "{}" &&
      JSON.parse(options.data).data
    ) {
      this.pageData = JSON.parse(options.data).data.currentScannerWaybill;
      console.log("JSON.parse(options.data)", JSON.parse(options.data));
      console.log("this.pageData", this.pageData);
      this.types = this.pageData.receiveType;
      this.queryParams.orderPlanCode = this.pageData.orderPlanCode;
      this.licenseNumbers = this.pageData.vehicles;
    }
  },
  methods: {
    setQueryParams(key, value) {
      this.queryParams[key] = value;
    },
    queryParamsToRequest() {
      return {
        orderPlanCode: queryParams.orderPlanCode, //货源计划Code 不能为null
        licenseNumber: queryParams.licenseNumber, //车牌 不能为null
        vehicleCode: queryParams.vehicleCode, //车辆Code 不能为null
        netWeight: queryParams.netWeight, //净重
        attachments: queryParams.attachments, //附件列表 属性包括url  attachmentCode type
        beforeWaybillCode: queryParams.beforeWaybillCode || null, //要更换的运单Code 如果是要更换运单 这个一定要带上
      };
    },
    jumpTo() {
      console.log("123", this.queryParams);
      const config = {
        url: "receiveOrder",
        method: "POST",
        data: this.queryParamsToRequest(),
      };
      uniRequest(config).then((res) => {
        console.log("接单 res", res);
        return;
        uni.navigateTo({
          url: `./orderSucceed?data=${JSON.stringify(res.data)}`,
        });
      });
    },
  },
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