<template>
  <div>
    <div class="zjjy-box">
      <div class="input-item">
        <div class="title1">调度者 <span class="required">*</span></div>
        <picker
          mode="selector"
          :range="dispatchers"
          @change="changeDispatch"
          range-key="teamName"
        >
          <view class="uni-input-default">
            <span v-if="dispatchIndex !== -1">
              {{ dispatchers[dispatchIndex].teamName }}
            </span>
            <span v-else class="uni-input-placeholder">请选择</span>
            <uni-icons type="forward" size="14"></uni-icons>
          </view>
        </picker>
      </div>
      <div class="input-item">
        <div class="title1">车牌号 <span class="required">*</span></div>
        <div class="vehicle-item">
          <!-- <picker
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
          </picker> -->
          <view class="uni-input-default" @click="openPickerModal">
            <span v-if="licenseNumber">
              {{ licenseNumber }}
            </span>
            <span v-if="!licenseNumber" class="uni-input-placeholder"
              >请选择</span
            >
            <uni-icons type="forward" size="14"></uni-icons>
          </view>
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
      <picker-modal
      :pickerData="licenseNumbers"
      :showModal="showPickerModal"
      @cancelModal="cancelPickerModal"
      @chooseVehicle="chooseVehicle"
    ></picker-modal>
    <div class="btn-box fixed-bottom">
      <div class="as-btn" @click="submit">确认接单</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PickerModal from "./PickerModal";
export default {
  components: { PickerModal },
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // licenseNumbers:{
    //   type:Array,
    //   default:[]
    // },
    dispatchers: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      licenseNumbers: [],
      licenseNumber: "", // 车牌
      showPickerModal: false,
      vehicleIndex: 0, 
      dispatchIndex: 0, //调度者索引
      vehicleMsg: {
        vehicleCode: "",
        licenseNumber: "",
        teamCode: "",
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
    // licenseNumbers: {
    //   get() {
    //     return this.dispatchers[this.dispatchIndex].vehicles;
    //   },
    //   set(value) {
    //     console.log('车牌计算属性修改', value)

    //   }
    // }
  },
  mounted() {
    this.licenseNumbers = this.dispatchers[this.dispatchIndex].vehicles;
  },
  watch: {
    dispatchers(val) {
      this.vehicleIndex = 0;
      this.licenseNumbers = val[this.dispatchIndex].vehicles;
      console.log('调度者下车辆', val[this.dispatchIndex])
    },
  },
  methods: {
    openPickerModal() {
      this.showPickerModal = true;
    },
    cancelPickerModal() {
      this.showPickerModal = false;
    },
    chooseVehicle(params) {
      console.log(params)
      this.licenseNumber = params.licenseNumber;
      this.vehicleMsg.vehicleCode = params.vehicleCode;
      this.vehicleMsg.licenseNumber = this.licenseNumber;

    },
    changeVehicle(e) {
      this.vehicleIndex = Number(e.detail.value);
      // this.vehicleMsg.vehicleCode =
      //   this.licenseNumbers[this.vehicleIndex].vehicleCode;
      // this.vehicleMsg.licenseNumber =
      //   this.licenseNumbers[this.vehicleIndex].licenseNumber;
      // console.log("this.queryParams", this.queryParams);
    },
    addVehicle() {
      console.log("111");
      uni.navigateTo({
        url: "../car/addCar",
      });
      // this.$store.commit("setLicenseNumbers", "闽A888999");
    },
    changeDispatch(e) {
      this.dispatchIndex = e.detail.value * 1;
      // this.vehicleMsg.teamName = this.dispatchers[this.dispatchIndex].teamName;
      // this.vehicleMsg.teamCode = this.dispatchers[this.dispatchIndex].teamCode;
      this.vehicleIndex = 0;
      this.licenseNumbers = this.dispatchers[this.dispatchIndex].vehicles;

    },
    submit() {
      // this.vehicleMsg.vehicleCode =
      //   this.licenseNumbers[this.vehicleIndex].vehicleCode;
      // this.vehicleMsg.licenseNumber =
      //   this.licenseNumbers[this.vehicleIndex].licenseNumber;
      this.vehicleMsg.teamCode = this.dispatchers[this.dispatchIndex].teamCode;
      console.log(this.vehicleMsg);
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
        teamCode: this.vehicleMsg.teamCode,
      };
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