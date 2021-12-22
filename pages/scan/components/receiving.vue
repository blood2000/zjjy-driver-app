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
          <!-- <span class="add-vehicle"  @click="addVehicle">添加车牌</span> -->
          <img
            class="add_car"
            src="../../../static/order/add_vehicle.png"
            @click="addVehicle"
            alt=""
          />
        </div>
      </div>

      <div class="input-item">
        <div class="title1">发货净重 <span class="required">*</span></div>
        <input
          class="my-input"
          maxlength="32"
          placeholder="请输入发货净重"
          type="text"
          v-model="netWeight"
          cursor-spacing="150"
        />
        <span class="unit" style="padding-left: 9rpx">吨</span>
      </div>
    </div>
    <div class="zjjy-box padding-box">
      <div class="title1">上传磅单 <span>（最多上传9张图片）</span></div>
      <div class="zjjy-img-box">
        <!-- 用户上传图片，触发实现 -->
        <block v-for="(item, index) in imgSuccessList" :key="index">
          <div class="img-box" :class="activeIndex === index ? 'active' : ''">
            <div class="img">
              <img :src="item" alt="图片" />
            </div>
            <div class="close-icon" @click="deleteImg(index)"></div>
          </div>
        </block>
        <div
          v-if="imgSuccessList.length < 9"
          class="load-temp img-box"
          @click="importTem"
        >
          <uni-icons type="camera" color="#a2a2a2" size="30"></uni-icons>
        </div>
        <div class="no-img" v-if="!imgSuccessList && !edit">无</div>
      </div>
    </div>
    <div class="btn-box fixed-bottom">
      <!-- <div class="as-btn" @click="$emit('jumpTo')">确认接单</div> -->
      <div class="as-btn" @click="submit">确认接单</div>
    </div>
  </div>
</template>

<script>
import { uniUpload } from "../../../config/request.js";
import { mapState } from "vuex";

export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // licenseNumbers: {
    //   type: Array,
    //   default: [],
    // },
    dispatchers: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      licenseNumbers: [],  
      vehicleIndex: 0, // 车牌
      dispatchIndex: 0, //调度者索引
      imgSrcList: [], //图片列表
      imgSuccessList: [],
      activeIndex: -1, //图标选中下标
      netWeight: "", //净重
      vehicleMsg: {
        vehicleCode: "",
        licenseNumber: "",
        teamCode: "",
      },
      attachments: [], //图片资料
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

  watch: {
    dispatchers(val) {
      this.vehicleIndex = 0;
      this.licenseNumbers = val[this.dispatchIndex].vehicles;
      // console.log('调度者下车辆', val[this.dispatchIndex])
    },
  },

  methods: {
    changeVehicle(e) {
      this.vehicleIndex = Number(e.detail.value);
      console.log("this.queryParams", this.queryParams);
      this.queryParams.vehicleCode =
        this.licenseNumbers[this.vehicleIndex].vehicleCode;
      this.queryParams.licenseNumber =
        this.licenseNumbers[this.vehicleIndex].licenseNumber;
      // this.vehicleMsg.vehicleCode =
      //   this.licenseNumbers[this.vehicleIndex].vehicleCode;
      // this.vehicleMsg.licenseNumber =
      //   this.licenseNumbers[this.vehicleIndex].licenseNumber;
      // console.log("this.queryParams", this.queryParams);
    },
    changeDispatch(e) {
      this.dispatchIndex = e.detail.value * 1;
      // this.vehicleMsg.teamName = this.dispatchers[this.dispatchIndex].teamName;
      // this.vehicleMsg.teamCode = this.dispatchers[this.dispatchIndex].teamCode;
      this.vehicleIndex = 0;
      this.licenseNumbers = this.dispatchers[this.dispatchIndex].vehicles;
    },
    addVehicle() {
      console.log("111");
      uni.navigateTo({
        url: "../car/addCar",
      });
      // this.$store.commit("setLicenseNumbers", "闽A888999");
    },
    importTem() {
      uni.chooseImage({
        count: 9, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: (res) => {
          console.log("本地图片文件", res.tempFilePaths);
          this.imgSrcList = res.tempFilePaths;
          this.uploadImg();
        },
      });
    },
    // 上传图片
    async uploadImg() {
      let limitLen = 9 - this.imgSuccessList.length;
      let len =
        limitLen > this.imgSrcList.length ? this.imgSrcList.length : limitLen;
      uni.showLoading();
      for (let i = 0; i < len; i++) {
        const config = {
          url: "uploadFile",
          file: this.imgSrcList[i],
        };
        const res = await uniUpload(config);
        if (res.code == 200) {
          console.log("上传图片返回", res);
          this.attachments.push({
            url: res.data.path,
            attachmentCode: res.data.code,
            type: 1,
          });
          this.imgSuccessList.push(this.imgSrcList[i]);
        }
      }
      uni.hideLoading();
    },
    // 删除图片
    deleteImg(index) {
      this.imgSuccessList.splice(index, 1);
      this.attachments.splice(index, 1);
    },

    submit() {
      this.vehicleMsg.vehicleCode =
        this.licenseNumbers[this.vehicleIndex].vehicleCode;
      this.vehicleMsg.licenseNumber =
        this.licenseNumbers[this.vehicleIndex].licenseNumber;
      this.vehicleMsg.teamCode = this.dispatchers[this.dispatchIndex].teamCode;
      console.log(this.vehicleMsg, this.netWeight, this.attachments);
      if (!this.vehicleMsg.licenseNumber) {
        uni.showToast({
          title: "请选择车牌号",
          icon: "none",
          duration: 1500,
        });
        return;
      }
      if (!this.netWeight) {
        uni.showToast({
          title: "请输入净重",
          icon: "none",
          duration: 1500,
        });
        return;
      }
      if (this.attachments.length === 0) {
        uni.showToast({
          title: "请上传图片",
          icon: "none",
          duration: 1500,
        });
        return;
      }
      let params = {
        netWeight: this.netWeight, // 发货净重
        licenseNumber: this.vehicleMsg.licenseNumber,
        vehicleCode: this.vehicleMsg.vehicleCode,
        teamCode: this.vehicleMsg.teamCode,
        attachments: this.attachments,
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

.close-icon {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  width: 32rpx;
  height: 32rpx;
  background: url("../../../static/delete.png");
  background-size: 32rpx 32rpx;
}
</style>