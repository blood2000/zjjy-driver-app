<template>
  <div class="content">
    <FreightCard :typesFreight="0" />
    <UpdateOrder  />
  </div>
</template>

<script>
import UpdateOrder from "./components/updateOrder";
import FreightCard from "./components/freightCard";

export default {
      components: { UpdateOrder ,FreightCard },

      onLaunch() {},
  methods: {
    jumpTo() {
      console.log('123')
      uni.navigateTo({
        url: "./orderInfo",
      });

      
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  overflow-y: auto;
  padding-top: 30rpx;
}
</style>