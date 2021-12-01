<template>
  <div>
    <div class="zjjy-box">
      <div class="input-item">
        <div class="title1">车牌号 <span class="required">*</span></div>
        <div class="vehicle-item">
          <picker
            mode="selector"
            :range="licenseNumbers"
            @change="changeVehicle"
          >
            <view class="building-picker-btn">
              {{
                licenseNumbers[vehicleIndex]
                  ? licenseNumbers[vehicleIndex]
                  : "请选择"
              }}
              <uni-icons type="forward" size="14"></uni-icons>
            </view>
          </picker>
          <!-- <div class="add-vehicle" v-else @click="addVehicle">添加车牌</div> -->
          <img
            class="add_car"
            src="../../../static/order/add_vehicle.png"
            @click="addVehicle"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="btn-box fixed-bottom">
      <div class="as-btn" @click="$emit('jumpTo')">确认接单</div>
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
       console.log("111");
      uni.navigateTo({
        url: "../car/addCar",
      });
      // this.$store.commit("setLicenseNumbers", "闽A888999");
    },
  },
};
</script>

<style lang="scss" scoped>
.vehicle-item {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
}
.add_car {
  width: 52rpx;
  height: 52rpx;
  margin-left: 28rpx;
}
</style>