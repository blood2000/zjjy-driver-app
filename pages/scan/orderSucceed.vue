<template>
  <div>
    <div class="prompt-box box-paddy colorss">
      <span> {{promptMsg[promptIndex]}} </span>
    </div>
    <div class="zjjy-box margina">
      <div class="input-item">
        <div class="title1">当前账号</div>
        <div class="right-text">{{vehicleMsg.phone}}</div>
      </div>
      <div class="input-item">
        <div class="title1">车牌号</div>
        <div class="right-text">{{pageData.licenseNumber}}</div>
      </div>
      <div class="input-item">
        <div class="title1">运输路线</div>
        <div class="right-text flexss">
          <div
            :class="
              typesFreight === 1 ? 'address-text-shou' : 'address-text-fa'
            "
            class="address-text"
          >
            {{ typesFreight === 1 ? "收" : "发" }}
          </div>
          <div>{{ pageData.startAddress }}</div>
          <div class="address-to">到</div>
          <div>{{ pageData.endAddress }}</div>
        </div>
      </div>
      <div class="input-item">
        <div class="title1">货品类型</div>
        <div class="right-text">{{ pageData.goodsName }}</div>
      </div>
      <div class="input-item">
        <div class="title1">发货净重</div>
        <div class="right-text">{{ pageData.netWeight ? pageData.netWeight + '吨' : '-'}}</div>
      </div>
      <div class="input-item">
        <div class="title1">运输公司</div>
        <div class="right-text"> {{pageData.transName}} </div>
      </div>
    </div>
    <div class="btn-box fixed-bottom">
      <div class="as-btn" @click="jumpTo">关闭页面</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "orderSuccessd",
  data() {
    return {
      pageData: {},
      typesFreight: 0,
      promptMsg: {
        '0': '您已成功提交运单，请前往指定地点进行装卸货操作',
        '1': '您已成功卸货该运单'
      },
      promptIndex: '0'
    };
  },
   computed: {
    ...mapState({
      vehicleMsg: (state) => state.user.vehicleMsg,
      userInfo: (state) => state.user.userInfo,
      scanInfo: (state) => state.user.scanInfo
    }),
  },
  onLoad(options) {
    console.log("orderSuccessd", options);
    this.pageData = JSON.parse(options.data);
    this.promptIndex = options.orderType;  //0-接单, 1-卸货
    this.typesFreight = this.pageData.receiveType;
  },
  methods: {
    jumpTo() {
      this.$store.commit("setScanInfo", {});
      uni.navigateTo({
        url: "../index/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.margina {
  margin-top: 24rpx;
}
.colorss {
  background: rgba(36, 178, 180, 0.1) !important;
  color: #23ae89 !important;
  text-align: center !important;
}
.right-text {
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: #333333;
}
.flexss {
  display: flex;
  align-items: center;
}
.address-text {
  width: 36rpx;
  height: 34rpx;
  line-height: 34rpx;
  border-radius: 4rpx;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-right: 10rpx;
}
.address-to {
  padding: 0 10rpx;
}
.address-text-shou {
  background: #ffb739;
}
.address-text-fa {
  background: #24b2b4;
}
</style>