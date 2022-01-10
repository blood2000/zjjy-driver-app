  <template>
  <div class="main">
    <div class="zjjy-box" style="margin-top: 23rpx">
      <div class="input-item">
        <div class="title1"><span class="required">*</span> 车辆识别码</div>
        <input
          class="my-input"
          maxlength="32"
          placeholder="请输入车辆识别码"
          type="text"
          v-model="vehicleVCode"
          cursor-spacing="150"
        />
      </div>
      <div class="input-item">
        <div class="title1"><span class="required">*</span>车辆能源类型</div>
        <picker
          mode="selector"
          :range="energyTypeList"
          range-key="dictLabel"
          @change="change($event, 'energyType')"
        >
          <view class="uni-input-default">
            <span v-if="energyTypeIndex !== -1">{{
              energyTypeList[energyTypeIndex].dictLabel
            }}</span>
            <span v-else class="uni-input-placeholder">请选择车辆能源类型</span>
            <uni-icons type="forward" size="14"></uni-icons>
          </view>
          <!-- <view class="no-choose" v-if="noChoose">请选择</view> -->
        </picker>
      </div>
      <div class="input-item">
        <div class="title1">道路运输许可证号</div>
        <input
          class="my-input"
          maxlength="32"
          placeholder="请输入道路运输许可证号"
          type="text"
          v-model="loadNumber"
          cursor-spacing="150"
        />
      </div>

      <div class="input-item">
        <div class="title1">车身颜色</div>
        <picker
          mode="selector"
          :range="vehicleColorList"
          range-key="dictLabel"
          @change="change($event, 'vehicleColor')"
        >
          <view class="uni-input-default">
            <span v-if="vehicleColorIndex !== -1">{{
              vehicleColorList[vehicleColorIndex].dictLabel
            }}</span>
            <span v-else class="uni-input-placeholder">请选择车身颜色</span>
            <uni-icons type="forward" size="14"></uni-icons>
          </view>
          <!-- <view class="no-choose" v-if="noChoose">请选择</view> -->
        </picker>
      </div>

      <div class="input-item">
        <div class="title1">轴数</div>
        <picker
          mode="selector"
          range-key="dictLabel"
          :range="axlesList"
          @change="change($event, 'axles')"
        >
          <view class="uni-input-default">
            <span v-if="axlesIndex !== -1">{{
              axlesList[axlesIndex].dictLabel
            }}</span>
            <span v-else class="uni-input-placeholder">请选择轴数</span>
            <uni-icons type="forward" size="14"></uni-icons>
          </view>
          <!-- <view class="no-choose" v-if="noChoose">请选择</view> -->
        </picker>
      </div>
    </div>
    <div class="zjjy-box">
      <div class="photo-box">
        <div class="title2"><span class="required">*</span> 请上传行驶证</div>
        <div class="title-item">上传行驶证照片，图片大小不能超过3M</div>
        <div class="id-image">
          <div @click="upload('drivingFront')">
            <img
              class="image-size"
              v-if="drivingFront"
              :src="drivingFront"
              alt="图片"
            />
            <ImageDefault
              v-else
              title="上传行驶证"
              url="../../../static/order/driving.png"
            />
          </div>
          <div @click="upload('drivingBack')">
            <img
              class="image-size"
              v-if="drivingBack"
              :src="drivingBack"
              alt="图片"
            />
            <ImageDefault
              v-else
              title="上传行驶证副页"
              url="../../../static/order/driving_back.png"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="zjjy-box">
      <div class="photo-box">
        <div class="title2">请上传道路运输许可证</div>
        <div class="title-item">上传道路运输许可证照片，图片大小不能超过3M</div>
        <div class="id-image" @click="upload('load')">
          <template>
            <img class="image-size" v-if="load" :src="load" alt="图片" />
            <ImageDefault
              v-else
              title="上传道路运输许可证"
              url="../../../static/order/load.png"
            />
            <!-- 上传道路运输许可证 -->
          </template>
        </div>
      </div>
    </div>
    <div class="zjjy-box">
      <div class="photo-box">
        <div class="title2">车头正面照</div>
        <div class="title-item">上传驾驶证照片，图片大小不能超过3M</div>
        <div class="id-image" @click="upload('carFront')">
          <img class="image-size" v-if="carFront" :src="carFront" alt="图片" />
          <ImageDefault
            v-else
            title="上传车头正面照片"
            url="../../../static/order/car.png"
          />
        </div>
      </div>
    </div>
    <view class="bans" @click="submit">提交认证</view>
  </div>
</template>


<script>
import { mapState } from "vuex";
import { uniRequest, uniUpload } from "../../config/request";
import ImageDefault from "./components/imageDefault.vue";
export default {
  components: { ImageDefault },
  data() {
    return {
      energyTypeList: [],
      energyTypeIndex: -1,
      vehicleColorList: [],
      vehicleColorIndex: -1,
      axlesList: [],
      axlesIndex: -1,
      QParams: null,
      vehicleVCode: null,
      energyType: null,
      loadNumber: null,
      vehicleColor: null,
      axles: null,
      drivingFront: null,
      drivingBack: null,
      load: null,
      carFront: null,
      isEdit: false,
    };
  },
  onLoad(options) {
    if (options && options.data) {
      this.QParams = JSON.parse(options.data).params;
      this.isEdit = JSON.parse(options.data).isEdit;
      console.log(" this.QParams ", this.isEdit, this.QParams);
    }
    this.init();
  },
  watch: {},
  computed: {
    ...mapState({
      vehicleMsg: (state) => state.user.vehicleMsg,
      userInfo: (state) => state.user.userInfo,
      scanInfo: (state) => state.user.scanInfo,
    }),
  },
  methods: {
    // 初始化
    async init() {
      // 能源
      const config = {
        url: "listByDictJyz",
        method: "POST",
        data: {
          dictType: "energyTypes",
        },
      };
      // 车辆颜色
      const config1 = {
        url: "listByDictJyz",
        method: "POST",
        data: {
          dictType: "licenseColor",
        },
      };
      // 轴数
      const config2 = {
        url: "listByDictJyz",
        method: "POST",
        data: {
          dictType: "axis_type",
        },
      };
      const [res1, res2, res3] = await Promise.all([
        uniRequest(config),
        uniRequest(config1),
        uniRequest(config2),
      ]);
      console.log(res1, res2, res3);
      this.energyTypeList = res1.data.data;
      this.vehicleColorList = res2.data.data;
      this.axlesList = res3.data.data;
      if (this.isEdit) this.editValue();
    },
    editValue() {
      const data = this.QParams;
      this.carFront = data.vehicleImg;
      if (data.travelLicenseBo) {
        if (data.travelLicenseBo.vehicleEnergyType) {
          this.energyTypeList.forEach((item, index) => {
            if (item.dictLabel === data.travelLicenseBo.vehicleEnergyType) {
              this.energyTypeIndex = index;
            }
          });
          this.energyType = data.travelLicenseBo.vehicleEnergyType;
        }
        if (data.travelLicenseBo.driverLicenseCarColor) {
          this.vehicleColorList.forEach((item, index) => {
            if (item.dictLabel === data.travelLicenseBo.driverLicenseCarColor) {
              this.vehicleColorIndex = index;
            }
          });
          this.vehicleColor = data.travelLicenseBo.driverLicenseCarColor;
        }
        if (data.travelLicenseBo.axesNumber) {
          this.axlesList.forEach((item, index) => {
            if (item.dictLabel === data.travelLicenseBo.axesNumber) {
              this.axlesIndex = index;
            }
          });
          this.axles = data.travelLicenseBo.axesNumber;
        }
        this.vehicleVCode = data.travelLicenseBo.chassisNumber;
        this.drivingFront = data.travelLicenseBo.driverOtherLicenseImage;
        this.drivingBack = data.travelLicenseBo.driverOtherLicenseBackImage;
      }

      if (data.roadLicenseBo) {
        this.loadNumber = data.roadLicenseBo.transportPermitNo;
        this.load = data.roadLicenseBo.transportPermitImage;
      }
    },
    // 上传图片 1获取本地图片
    upload(type) {
      const me = this;
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: function (res) {
          if (parseInt(res.tempFiles[0].size) > me.imageSize) {
            uni.showToast({
              title: "图片过大",
              duration: 2000,
            });
            return;
          }
          console.log("res image", res, res.tempFilePaths[0]);
          me.httpImage(res.tempFilePaths[0], type);
        },
      });
    },
    // 获取远程图片
    httpImage(localUrl, type) {
      const config = {
        url: "uploadFile",
        file: localUrl,
      };

      uni.showLoading();
      uniUpload(config).then((res) => {
        console.log("图片上传", res);
        if (res.code == 200) {
          this[type] = res.data.path;
          if (type === "carFront" || type === "load") {
            uni.hideLoading();
            return;
          }
          this.getOCR(this[type], type);
          //TODO...上传OCR识别
          //判断OCR权限是否过期
          // let autoToken = uni.getStorageSync("authToken");
          // if (autoToken) {
          //   autoToken = JSON.parse(autoToken);
          //   let now = new Date().getTime();
          //   let last = autoToken.time;
          //   let leap = now - last < 24 * 3600 * 1000;
          //   if (leap) {
          //     this.uploadOCR(this[type], type);
          //   } else {
          //     //过期重启获取OCR token
          //     this.autoOCR().then(() => {
          //       this.uploadOCR(this[type], type);
          //     });
          //   }
          // } else {
          //   //无OCR token
          //   this.autoOCR().then(() => {
          //     this.uploadOCR(this[type], type);
          //   });
          // }
        }
      });
    },
    //OCR
    getOCR(imageUrl, type) {
      const me = this;
      let side = {
        drivingFront: "front",
        drivingBack: "back",
      };
      let config = {
        url: "uploadOCR",
        method: "POST",
        contentType: "application/x-www-form-urlencoded",
        data: {
          imageUrl: imageUrl,
          side: side[type],
          type: 1,
        },
      };
      uniRequest(config).then((res) => {
        uni.hideLoading();
        console.log("服务端OCR识别", res);
        let resOCR = res.data;
        if (resOCR.code === 200) {
          let result = resOCR.data.result;
          if (
            me.QParams.driverLicenseCarNumber &&
            result.number !== me.QParams.driverLicenseCarNumber
          ) {
            uni.showModal({
              title: "提示",
              content: "前后车牌不一致，请重新上传行驶证",
              showCancel: false,
              success: (res) => {
                if (res.confirm) {
                  //点击确认
                  this[type] = "";
                }
              },
            });
           
            return;
          }
          const resultsFn = {
            drivingFront: me.drivingFrontFn,
            drivingBack: me.drivingBackFn,
          };
          resultsFn[type](result);
        } else {
          uni.showToast({
            title: "图片不合规",
            duration: 2000,
          });
        }
      });
    },
    // OCR识别：华为云
    uploadOCR(url, type) {
      const me = this;
      let side = {
        drivingFront: "front",
        drivingBack: "back",
      };
      console.log("side[type]", side[type]);
      const paths = {
        drivingFront: "vehicle-license",
        drivingBack: "vehicle-license",
        /** load: "transportation-license", */
      };
      let token = JSON.parse(uni.getStorageSync("authToken")).token;
      return new Promise((resolve, reject) => {
        uni.request({
          url:
            "https://ocr.cn-north-4.myhuaweicloud.com/v2/0c8cc49ff7800fe12fadc007e5c69530/ocr/" +
            paths[type],
          method: "POST",
          data: {
            url: url,
            side: side[type],
            // "return_verificationL": true,
          },
          header: {
            "X-Auth-Token": token,
            "Content-Type": "application/json",
          },
          success: (resOCR) => {
            console.log("OCR识别", resOCR);
            uni.hideLoading();

            if (resOCR.statusCode === 200) {
              let result = resOCR.data.result;
              if (result.number !== me.QParams.driverLicenseCarNumber) {
                uni.showModal({
                  title: "提示",
                  content: "前后车牌不一致，请重新上传行驶证",
                  showCancel: false,
                  success: (res) => {
                    if (res.confirm) {
                      //点击确认
                      this[type] = "";
                    }
                  },
                });
                // uni.showToast({
                //   title: "前后车牌不一致，请重新上传行驶证",
                //   duration: 2000,
                // });
                return;
              }
              const resultsFn = {
                drivingFront: me.drivingFrontFn,
                drivingBack: me.drivingBackFn,
              };
              resultsFn[type](result);
            } else {
              uni.showToast("该图片不合规");
            }
          },
          fail: () => {
            uni.hideLoading();
          },
        });
      });
    },
    //OCR鉴权
    autoOCR() {
      let params = {
        auth: {
          identity: {
            methods: ["password"],
            password: {
              user: {
                name: "ddcwl668", //替换为实际用户名
                password: "ddc753159", //替换为实际的用户密码
                domain: {
                  name: "ddcwl668", //替换为实际账号名
                },
              },
            },
          },
          scope: {
            project: {
              name: "cn-north-4", //替换为实际的project name，如cn-north-4
            },
          },
        },
      };
      return new Promise((resolve, reject) => {
        uni.request({
          url: "https://iam.cn-north-4.myhuaweicloud.com/v3/auth/tokens",
          method: "POST",
          data: params,
          header: {
            "Content-Type": "application/json",
          },
          success: (res) => {
            console.log("OCR获取token", res);
            if (res.header["X-Subject-Token"]) {
              let authToken = {
                token: res.header["X-Subject-Token"],
                time: new Date().getTime(),
              };
              uni.setStorageSync("authToken", JSON.stringify(authToken));
            }

            resolve(res);
          },
        });
      });
    },
    // 行驶证前面
    drivingFrontFn(obj) {
      this.vehicleVCode = obj.vin;
      const tmp = {
        // driverLicenseNo:obj,
        driverOtherLicenseImage: this.drivingFront,
        driverOtherLicenseImageContent: JSON.stringify(obj),
        driverLicenseCarNumber: obj.number,
        chassisNumber: obj.vin,
        driverIssueDate: obj.issue_date,
        registerDate: obj.register_date,
        vehicleType: obj.vehicle_type,
      };
      if (tmp.vehicleType) {
        this.QParams.vehicleType = tmp.vehicleType;
      }
      console.log("tmp front", tmp);
      if (this.isEdit) {
        tmp.code = this.QParams.code;
      }
      this.QParams.travelLicenseBo = {
        ...this.QParams.travelLicenseBo,
        ...tmp,
      };
    },
    // 行驶证副业
    drivingBackFn(obj) {
      console.log("parseInt(obj.approved_load)", parseInt(obj.approved_load));
      const tmp = {
        driverOtherLicenseBackImage: this.drivingBack,
        driverOtherLicenseBackImageContent: JSON.stringify(obj),
        vehicleTotalWeight: obj.gross_mass && parseInt(obj.gross_mass) + "",
        vehicleLoadWeight: obj.approved_load && parseInt(obj.approved_load),
      };
      console.log("tmp back", tmp);
      if (tmp.vehicleTotalWeight) {
        this.QParams.vehicleTotalWeight = tmp.vehicleTotalWeight;
      }
      if (tmp.vehicleLoadWeight) {
        this.QParams.vehicleLoadWeight = tmp.vehicleLoadWeight;
      }
      console.log(obj.dimension);
      const sizes = obj.dimension.split("×");
      console.log("sizes", sizes);
      if (sizes && sizes.length >= 2) {
        this.QParams.vehicleLength = sizes[0];
        this.QParams.vehicleWidth = sizes[1];
      }

      if (this.isEdit) {
        tmp.code = this.QParams.code;
      }
      this.QParams.travelLicenseBo = {
        ...this.QParams.travelLicenseBo,
        ...tmp,
      };
    },
    // 道路
    loadFn(obj) {
      this.loadNumber = obj.license_number;
      const tmp = {
        transportPermitImage: this.load,
        transportPermitImageContent: obj,
        transportPermitNo: obj.license_number,
        transportApprovedCapacity: obj.vehicle_weight,
        transportExpireTime: obj.issue_date,
        driverLicenseCarNumber: obj.vehicle_number,
        chassisNumber: null,
      };
      if (this.isEdit) {
        tmp.code = this.QParams.code;
      }
      this.QParams.roadLicenseBo = tmp;
    },
    // 参数赋值
    getQParams() {
      this.QParams.vehicleImg = this.carFront;
      this.QParams.travelLicenseBo.driverLicenseCarColor = this.vehicleColor;
      this.QParams.travelLicenseBo.vehicleEnergyType = this.energyType;
      this.QParams.travelLicenseBo.axesNumber = this.axles;
      this.QParams.travelLicenseBo.chassisNumber = this.vehicleVCode;
      this.QParams.roadLicenseBo.transportPermitNo = this.loadNumber;
      this.QParams.roadLicenseBo.driverOtherLicenseImageContent = "";
      this.QParams.roadLicenseBo.transportPermitImage = this.load;
      if (this.isEdit) {
        this.QParams.roadLicenseBo.code = this.QParams.code;
      }
      return this.QParams;
    },
    change(e, type) {
      console.log(e, type);
      const me = this;
      this.focus = false;
      const obj = {
        axles: () => {
          me.axlesIndex = Number(e.detail.value);
          me.axles = me.axlesList[me.axlesIndex].dictLabel;
        },
        vehicleColor: () => {
          me.vehicleColorIndex = Number(e.detail.value);
          me.vehicleColor = me.vehicleColorList[me.vehicleColorIndex].dictLabel;
        },
        energyType: () => {
          me.energyTypeIndex = Number(e.detail.value);
          me.energyType = me.energyTypeList[me.energyTypeIndex].dictLabel;
        },
      };

      obj[type]();
    },
    formValitor() {
      if (!this.vehicleVCode) {
        uni.showToast({
          title: "请输入车辆识别码",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.energyType) {
        uni.showToast({
          title: "请选择车辆能源类型",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      // if (!this.loadNumber) {
      //   uni.showToast({
      //     title: "请输入道路运输许可证号",
      //     icon: "none",
      //     duration: 1500,
      //   });
      //   return false;
      // }
      // if (!this.vehicleColor) {
      //   uni.showToast({
      //     title: "请选择车身颜色",
      //     icon: "none",
      //     duration: 1500,
      //   });
      //   return false;
      // }
      // if (!this.axles) {
      //   uni.showToast({
      //     title: "请选择轴数",
      //     icon: "none",
      //     duration: 1500,
      //   });
      //   return false;
      // }

      if (!this.drivingFront) {
        uni.showToast({
          title: "请选择上传行驶证",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.drivingBack) {
        uni.showToast({
          title: "请选择上传行驶证副页",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      // if (!this.load) {
      //   uni.showToast({
      //     title: "请选择上传道路运输许可证",
      //     icon: "none",
      //     duration: 1500,
      //   });
      //   return false;
      // }
      // if (!this.carFront) {
      //   uni.showToast({
      //     title: "请选择上传车头正面照片",
      //     icon: "none",
      //     duration: 1500,
      //   });
      //   return false;
      // }
      return true;
    },
    submit() {
      let leap = this.formValitor();
      console.log("leap", leap);
      if (!leap) return;
      const config = {
        url: "addVehicle",
        method: "POST",
        data: this.getQParams(),
      };
      console.log(this.getQParams());
      uniRequest(config).then((res) => {
        console.log("add res", res);
        if (res.data.code != 200) {
          return uni.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 1500,
          });
        } else {
          let content = this.isEdit ? "编辑成功" : "添加成功";
          uni.showModal({
            title: "提示",
            content: content,
            showCancel: false,
            success: (res) => {
              // uni.navigateTo({
              //   url: "./carList",
              // });
              if (this.scanInfo.code) {
                uni.redirectTo({
                  url: `../scan/index?code=${this.scanInfo.code}&type=${this.scanInfo.type}`,
                });
                // return;
              } else {
                uni.navigateBack({
                  delta: 2,
                });
              }
            },
          });
        }
      });
    },
  },

  beforeMount() {},
};
</script>
<style scoped lang="scss">
.main {
  overflow-y: auto;
  padding-bottom: 40rpx;
}
.photo-box {
  padding-top: 34rpx;
}
.title-item {
  margin-top: 16rpx;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: #979899;
  margin-bottom: 30rpx;
}
.id-image {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  & > img {
    width: 300rpx;
    height: 216rpx;
  }
}
.zjjy-box {
  width: 702rpx;
  padding: 16rpx 36rpx;
}
.bans {
  width: 92%;
  height: 90rpx;
  border-radius: 10rpx;
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;
  background: #2366f2;
  color: #ffffff;
  line-height: 90rpx;
  text-align: center;
  margin: 40rpx auto 0;
  // margin: 81rpx 24rpx;
  // margin-bottom: 160rpx;
}
.image-size {
  width: 300rpx;
  height: 216rpx;
}
</style>
