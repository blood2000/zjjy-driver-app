<template>
  <div>
    <FreightCard :typesFreight="0" />
    <UpdateOrder @jumpTo="jumpTo" />
  </div>
</template>

<script>
import UpdateOrder from "./components/updateOrder";

export default {
      components: { UpdateOrder },

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
</style>