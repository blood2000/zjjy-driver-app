<!-- 扫码接单 -->
<template>
  <div class="content">
    <div class="zjjy-box order-box">
      <div class="zjjy-box-title">本次扫码要接的运单</div>
      <div class="zjjy-box-main">
        <div class="zjjy-box-main-floor">
          <div class="zjjy-floor-left status status1">收获运输</div>
          <div class="zjjy-floor-right addr">
            <div class="floor-start">五福洗煤厂</div>
            <div class="rotate-right">
              <uni-icons type="pulldown" size="24" color="#b9d0fd"></uni-icons>
            </div>
            <div class="floor-end">富邦总部大楼</div>
          </div>
        </div>
        <div class="zjjy-box-main-floor">
          <div class="zjjy-floor-left">商品类型</div>
          <div class="zjjy-floor-right">原煤</div>
        </div>
        <div class="zjjy-box-main-floor">
          <div class="zjjy-floor-left">运输公司</div>
          <div class="zjjy-floor-right">超好运</div>
        </div>
      </div>
    </div>
    <div class="zjjy-box">
      <div class="input-item" >
        <div class="title1">车牌号 <span class="required">*</span></div>
        <picker mode="selector" :range="licenseNumbers" @change="changeVehicle" v-if="licenseNumbers.length > 0">
          <view class="building-picker-btn">
            {{ licenseNumbers[vehicleIndex] }}
            <uni-icons type="forward" size="14"></uni-icons>
          </view>
          <view class="no-choose" v-if="noChoose">请选择</view>
        </picker>
        <div class="add-vehicle" v-else @click="addVehicle" >添加车牌</div>
      </div>
      
      <div class="input-item">
        <div class="title1">发货净重 <span class="required">*</span></div>
        <input
          class="my-input"
          maxlength="32"
          placeholder="请输入发货净重"
          type="text"
          v-model="orderInfo.weight"
          cursor-spacing="150"
        />
        <span class="unit">吨</span>
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
import urlConfig from "../../config/urlConfig.js";
import { uniRequest, uniUpload } from "../../config/request.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      orderInfo: {
        weight: "",
      },
      // licenseNumbers: [],
      vehicleIndex: 0,
      imgSuccessList: [], //已上传的图片列表
      imgSrcList: [],
      activeIndex: -1,
    };
  },

  components: {},

  computed: {
    ...mapState({
      licenseNumbers: (state) => state.user.licenseNumbers,
      userInfo: (state) => state.user.userInfo,
    }),
  },

  methods: {
    changeVehicle(e) {
      this.vehicleIndex = e.detail.value;
    },

    addVehicle() {
      
      this.$store.commit('setLicenseNumbers', '闽A888999');
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
        // const config = {
        //   url: "uploadImg",
        //   file: this.imgSrcList[i],
        // };
        // uniUpload(config)
        //   .then((res) => {
        //     uni.hideLoading();
        //     console.log("图片上传", res);
        //     this.imgSuccessList.push(res.data.code);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      }
    },
    // 删除图片
    deleteImg(index) {
      this.imgSuccessList.splice(index, 1);
    },



    submit() {

      if (this.imgSuccessList.length === 0) {
        uni.showToast({
          title: "请上传凭证!",
          duration: 1500,
          icon: "error",
        });
        return;
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.content {
  overflow-y: auto;
  padding-top: 30rpx;
}

.order-box {
  padding: 0;
}

.padding-box {
  padding-top: 30rpx;
}

.status {
  font-size: 24rpx;
  color: #fff;
  padding: 0 6rpx;
  transform: skewX(-10deg);
}

.status1 {
  background: #febe4d;
}

.status2 {
  background: #24b1b8;
}

.addr {
  width: 70%;
}

.rotate-right {
  width: 16%;
  text-align: center;
  transform: rotate(-90deg);
}

.floor-start,
.floor-end {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 42%;
}

.unit {
  padding-left: 10rpx;
}

.close-icon {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  width: 32rpx;
  height: 32rpx;
  background: url("../../static/delete.png");
  background-size: 32rpx 32rpx;
}

.active {
  box-shadow: 2rpx 4rpx 20rpx 0 rgba(22, 15, 15, 0.6);
}
</style>