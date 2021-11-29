<template>
  <div>
    <div class="zjjy-box">
      <div class="input-item">
        <div class="title1">车牌号 <span class="required">*</span></div>
        <picker
          mode="selector"
          :range="licenseNumbers"
          @change="changeVehicle"
          v-if="licenseNumbers.length > 0"
        >
          <view class="building-picker-btn">
            {{ licenseNumbers[vehicleIndex] }}
            <uni-icons type="forward" size="14"></uni-icons>
          </view>
          <view class="no-choose" v-if="noChoose">请选择</view>
        </picker>
        <div class="add-vehicle" v-else @click="addVehicle">添加车牌</div>
      </div>
    </div>
    <div class="btn-box fixed-bottom">
      <div class="as-btn" @click="submit">确认接单</div>
    </div>
  </div>
</template>

<script>
import urlConfig from "../../../config/urlConfig.js";
import { uniRequest, uniUpload } from "../../../config/request.js";
import { mapState } from "vuex";
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      vehicleIndex: 0, // 车牌
    };
  },
  computed: {
    ...mapState({
      licenseNumbers: (state) => state.user.licenseNumbers,
      userInfo: (state) => state.user.userInfo,
    }),
    queryParams: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    changeVehicle(e) {
      this.vehicleIndex = e.detail.value;
    },
    addVehicle() {
      this.$store.commit("setLicenseNumbers", "闽A888999");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>