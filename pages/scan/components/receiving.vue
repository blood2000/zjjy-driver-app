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
            <view class="uni-input-default">
              <span v-if="vehicleIndex !== -1">{{
                licenseNumbers[vehicleIndex]
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
          v-model="queryParams.weight"
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
            <div class="img" @click="imgPreview(index)">
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
        <!-- <div class="no-img" v-if="!imgSuccessList && !edit">无</div> -->
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
      vehicleIndex:-1, // 车牌
      imgSuccessList: [], //已上传的图片列表
      imgSrcList: [], //图片列表
      activeIndex: -1, //图标选中下标
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
    importTem() {
      uni.chooseImage({
        count: 9, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: (res) => {
          // console.log("本地图片文件", res.tempFiles);
          this.imgSrcList = res.tempFilePaths;
          this.uploadImg();
        },
      });
    },
    // 上传图片
    uploadImg() {
      let limitLen = 9 - this.imgSuccessList.length;
      let len =
        limitLen > this.imgSrcList.length ? this.imgSrcList.length : limitLen;

      uni.showLoading();
      for (let i = 0; i < len; i++) {
        this.imgSuccessList.push(this.imgSrcList[i]);
        uni.hideLoading();
      }
    },
    // 删除图片
    deleteImg(index) {
      this.imgSuccessList.splice(index, 1);
    },

    submit() {
      // if (this.imgSuccessList.length === 0) {
      //   uni.showToast({
      //     title: "请上传凭证!",
      //     duration: 1500,
      //     icon: "error",
      //   });
      //   return;
      // }
      this.$emit("jumpTo");
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