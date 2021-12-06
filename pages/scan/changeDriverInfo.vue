<template>
  <div class="content">
    <FreightCard :typesFreight="typesFreight" :title="title" :isCur='true' :pageData="pageData.ingWaybill" />
    <UpdateOrder :pageData="pageData.currentScannerWaybill" />
  </div>
</template>

<script>
import UpdateOrder from "./components/updateOrder";
import FreightCard from "./components/freightCard";

export default {
  components: { UpdateOrder, FreightCard },
  data(){
    return {
      title: '当前进行的运单',
      pageData:{},
      typesFreight:0
    }
  },
  onLoad(options) {
    this.pageData = JSON.parse(options.data)
    this.typesFreight = this.pageData.ingWaybill.receiveType;
    this.$store.commit('setBeforeWaybillCode', this.pageData.ingWaybill.waybillCode);
  },
  methods: {
    // jumpTo() {
    //   console.log("123");
    //   uni.navigateTo({
    //     url: "./orderInfo",
    //   });
    // },
  },
};
</script>
<style lang="scss" scoped>
.content {
  overflow-y: auto;
  padding-top: 30rpx;
}
</style>