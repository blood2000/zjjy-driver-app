<!-- 入场信息 -->
<template>
  <div class="content"></div>
</template>

<script>
import { mapState } from "vuex";
import MyModal from "../../components/MyModal.vue";
import { uniRequest } from "../../config/request.js";
export default {
  data() {
    return {};
  },

  components: {},

  computed: {
    ...mapState({
      vehicleMsg: (state) => state.user.vehicleMsg,
      userInfo: (state) => state.user.userInfo,
    }),
  },

  methods: {},
};
</script>
<style lang='scss' scoped>
</style>