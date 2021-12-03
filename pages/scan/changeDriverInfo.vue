<template>
  <div class="content">
    <FreightCard :typesFreight="0" :pageData="pageData.ingWaybill" />
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
      pageData:{},
      typesFreight:0
    }
  },
  onLaunch(options) {
    this.pageData = JSON.parse(options.data)
    this.typesFreight = this.pageData.ingWaybill.receiveType
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