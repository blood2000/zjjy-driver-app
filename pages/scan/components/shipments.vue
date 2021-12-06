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
            range-key="licenseNumber"
          >
            <view class="uni-input-default">
              <span v-if="vehicleIndex !== -1">{{
                licenseNumbers[vehicleIndex].licenseNumber
              }}</span>
              <span v-else class="uni-input-placeholder">请选择</span>
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
      <div class="as-btn" @click="submit">确认接单</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      },
    },
    licenseNumbers:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      vehicleIndex: -1, // 车牌
      vehicleMsg: {
        vehicleCode: "",
        licenseNumber: "",
      },
    };
  },
  computed: {
    ...mapState({
      // licenseNumbers: (state) => state.user.licenseNumbers,
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
       this.vehicleIndex = Number(e.detail.value);
      this.vehicleMsg.vehicleCode =
        this.licenseNumbers[this.vehicleIndex].vehicleCode;
      this.vehicleMsg.licenseNumber =
        this.licenseNumbers[this.vehicleIndex].licenseNumber;
      // console.log("this.queryParams", this.queryParams);
    },
    addVehicle() {
      console.log("111");
      uni.navigateTo({
        url: "../car/addCar",
      });
      // this.$store.commit("setLicenseNumbers", "闽A888999");
    },
    submit() {
      if (!this.vehicleMsg.licenseNumber) {
        uni.showToast({
          title: "请选择车牌号",
          icon: "none",
          duration: 1500,
        });
        return;
      }
      let params = {
        licenseNumber: this.vehicleMsg.licenseNumber,
        vehicleCode: this.vehicleMsg.vehicleCode,
      }
      this.$emit("jumpTo", params);
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