<!-- 扫码接单 -->
<template>
  <div class="content">
    <FreightCard :typesFreight="types" :pageData="pageData" />
    <!-- 收货运输 -->
    <Receiving
      v-if="types === 1"
      @jumpTo="jumpTo"
      v-model="queryParams"
      :licenseNumbers="licenseNumbers"
      :dispatchers="dispatchers"
    />
    <Shipments
      v-if="types === 2"
      @jumpTo="jumpTo"
      v-model="queryParams"
      :licenseNumbers="licenseNumbers"
      :dispatchers="dispatchers"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
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
      types: 0,
      pageData: {},
      licenseNumbers: [],   //自有车牌号数组
      dispatchers: [],
    };
  },
  computed: {
    ...mapState({
      beforeWaybillCode: (state) => state.user.beforeWaybillCode,
    }),
  },
  onLoad(options) {
    console.log("options", options);
    this.pageData = JSON.parse(options.data);
    console.log("this.pageData", this.pageData);
    this.types = this.pageData.receiveType;
    this.queryParams.orderPlanCode = this.pageData.orderPlanCode;
    this.licenseNumbers = this.pageData.vehicles;  
    let that = this;
    this.dispatchers = this.pageData.teams;
    // this.dispatchers.push({
    //   teamCode: '', teamName: '无', vehicles: that.licenseNumbers
    // })
    console.log('调度者数组', this.dispatchers)
    // this.types = 2;
    // this.licenseNumbers = [];
    // this.dispatchers = [
    //   {teamCode: '000', teamName:'调度者00', vehicles: [{vehicleCode: '0000',licenseNumber: '闽A111111'}]},
    //   {teamCode: '111',teamName:'调度者11', vehicles: [{vehicleCode: '0000',licenseNumber: '闽A111111'},{vehicleCode: '1111',licenseNumber: '闽A787878'},]}
    // ];
  },
  methods: {
    setQueryParams(key, value) {
      this.queryParams[key] = value;
    },
    queryParamsToRequest() {
      return {
        orderPlanCode: this.queryParams.orderPlanCode, //货源计划Code 不能为null
        licenseNumber: this.queryParams.licenseNumber, //车牌 不能为null
        vehicleCode: this.queryParams.vehicleCode, //车辆Code 不能为null
        netWeight: this.queryParams.netWeight, //净重
        attachments: this.queryParams.attachments, //附件列表 属性包括url  attachmentCode type
        beforeWaybillCode: this.queryParams.beforeWaybillCode || null, //要更换的运单Code 如果是要更换运单 这个一定要带上
      };
    },

    jumpTo(params) {
      // console.log("接单的参数", this.queryParams);
      console.log("子组件传的参数", params);
      let data = params;
      data.orderPlanCode = this.queryParams.orderPlanCode;
      console.log('beforeWaybillCode', this.beforeWaybillCode)
      data.beforeWaybillCode = this.pageData.beforeWaybillCode || null;
      const config = {
        url: "receiveOrder",
        method: "POST",
        // data: this.queryParamsToRequest(),
        data: data,
      };
      uniRequest(config).then((res) => {
        console.log("接单 res", res);
        //清楚beforeWaybillCode
        if (res.data.code === 200) {
          uni.navigateTo({
            url: `./orderSucceed?data=${JSON.stringify(res.data.data)}&&orderType=0`,
          });
        } else {
          uni.showModal({
            title: "提示",
            content: res.data.msg,
            showCancel: false,
          });
        }
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