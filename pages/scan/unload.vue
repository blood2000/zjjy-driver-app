<!-- 扫码卸货 -->
<template>
  <div class="content">
    <FreightCard
      :typesFreight="typesFreight"
      :title="title"
      :pageData="pageData"
    />

    <div class="btn-box fixed-bottom" v-if="isAllow === 1">
      <div class="as-btn" @click="submit">确认卸货</div>
    </div>
    <div class="unload-prompt" v-else>称重未完成，请先完成称重再进行卸货</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { uniRequest } from "../../config/request";
import FreightCard from "./components/freightCard";

export default {
  components: { FreightCard},
  data() {
    return {
      //订单信息
      title: '本次扫码要卸货的运单',
      typesFreight: 1,
      pageData: {},
      isAllow: 0,
    };
  },

   computed: {
    ...mapState({
      vehicleMsg: (state) => state.user.vehicleMsg,
    }),
  },
  
  onLoad(options) {
    console.log("options", options);
    this.pageData = JSON.parse(options.data);
    console.log("this.pageData", this.pageData);
    this.typesFreight = this.pageData.receiveType;
    this.isAllow = options.isAllow * 1;
  },


  methods: {
    

    submit() {
      let data = {
        vehicleInfoCode: this.pageData.vehicleInfoCode,
        driverInfoCode: this.pageData.driverInfoCode,
        userCode: this.vehicleMsg.userCode,
      };
      
      const config = {
        url: "unload",
        method: "POST",
        // data: this.queryParamsToRequest(),
        data: data,
      };
      uniRequest(config).then((res) => {
        console.log("卸货res", res);
        //清楚beforeWaybillCode
        if (res.data.code === 200) {
          uni.navigateTo({
            url: `./orderSucceed?data=${JSON.stringify(res.data.data)}&&orderType=1`,
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

.unload-prompt {
  position: fixed;
  width: 100%;
  height: 120rpx;
  bottom: 0;
  left: 0;
  background: #ddd;
  line-height: 120rpx;
  text-align: center;
  color: #000;
  font-size: 28rpx;
}
</style>