<template>
  <div>
    <div class="prompt-box box-paddy">
      <span
        >该线路为超好运结算线路，您的信息完整度不足，请补充如下信息后并联系客服进行审核，待审核完成后才可接单。</span
      >
    </div>
    <div class="info">
      <FreightCard :pageData="pageData" :typesFreight="typesFreight" />
      <div class="zjjy-box">
        <div class="photo-box">
          <div class="title2">
            <span class="required">*</span> 请上传身份证件
          </div>
          <div class="title-item">上传身份证照片，图片大小不能超过3M</div>
          <div class="id-image">
            <template>
              <img
                v-if="!idFront"
                src="../../static/order/id_renxiang.png"
                alt="图片"
                @click="upload('idFront')"
              />
              <img
                v-else
                :src="idFront"
                alt="图片"
                @click="upload('idFront')"
              />
            </template>
            <template>
              <img
                v-if="!idBack"
                src="../../static/order/id_guohui.png"
                alt="图片"
                @click="upload('idBack')"
              />
              <img v-else :src="idBack" alt="图片" @click="upload('idBack')" />
            </template>
          </div>
        </div>
        <div class="input-item">
          <div class="title1"><span class="required">*</span>姓名</div>
          <input
            class="my-input"
            maxlength="32"
            placeholder="请输入姓名"
            type="text"
            v-model="name"
            cursor-spacing="150"
          />
        </div>
        <div class="input-item">
          <div class="title1"><span class="required">*</span>身份证号</div>
          <input
            class="my-input"
            maxlength="32"
            placeholder="请输入身份证号"
            type="text"
            v-model="id"
            cursor-spacing="150"
          />
        </div>
        <div class="input-item">
          <div class="title1"><span class="required">*</span>生效日期</div>
          <view class="uni-list">
            <view class="uni-list-cell">
              <view class="uni-list-cell-db">
                <picker
                  mode="date"
                  :value="idStart"
                  @change="bindDateChange($event, 'idStart')"
                >
                  <view class="uni-input-default">
                    <span v-if="idStart">{{ idStart }}</span>
                    <span v-else class="uni-input-placeholder">请选择日期</span>
                    <uni-icons type="forward" size="14"></uni-icons>
                  </view>
                </picker>
              </view>
            </view>
          </view>
        </div>
        <div class="input-item" v-if="perpetualIndex !== 1">
          <div class="title1"><span class="required">*</span>失效日期</div>
          <view class="uni-list">
            <view class="uni-list-cell">
              <view class="uni-list-cell-db">
                <picker
                  mode="date"
                  :value="idEnd"
                  @change="bindDateChange($event, 'idEnd')"
                >
                  <view class="uni-input-default">
                    <span v-if="idEnd">{{ idEnd }}</span>
                    <span v-else class="uni-input-placeholder">请选择日期</span>
                    <uni-icons type="forward" size="14"></uni-icons>
                  </view>
                </picker>
              </view>
            </view>
          </view>
        </div>
        <div class="input-item">
          <div class="title1"><span class="required">*</span>长期有效</div>
          <picker
            mode="selector"
            :range="perpetualList"
            @change="changePerpetual($event, 'id')"
          >
            <view class="building-picker-btn">
              {{ perpetualList[perpetualIndex] }}
              <uni-icons type="forward" size="14"></uni-icons>
            </view>
            <!-- <view class="no-choose" v-if="noChoose">请选择</view> -->
          </picker>
        </div>
        <!-- <div class="input-item">
          <div class="title1"><span class="required">*</span>所在区域</div>
          <pick-regions limit="3" @getRegion="handleGetRegion">
            <view class="uni-input-default">
              <span v-if="regionName">{{ regionName }}</span>
              <span v-else class="uni-input-placeholder">支持自动识别</span>
              <uni-icons type="forward" size="14"></uni-icons>
            </view>
          </pick-regions>
        </div> -->
      </div>
      <div class="zjjy-box">
        <div class="photo-box">
          <div class="title2">
            <span class="required">*</span> 请上传驾驶证件
          </div>
          <div class="title-item">上传驾驶证照片，图片大小不能超过3M</div>
          <div class="id-image" @click="upload('driverFront')">
            <img v-if="driverFront" :src="driverFront" alt="图片" />
            <img v-else src="../../static/order/driver.png" alt="图片" />
          </div>
        </div>
        <div class="input-item">
          <div class="title1"><span class="empty"></span>驾驶证号</div>
          <input
            class="my-input"
            maxlength="32"
            placeholder="支持自动识别"
            type="text"
            v-model="driverNumber"
            cursor-spacing="150"
          />
        </div>
        <div class="input-item">
          <div class="title1">
            <span class="required">*</span>驾驶证发证机关
          </div>
          <input
            class="my-input"
            maxlength="32"
            placeholder="支持自动识别"
            type="text"
            v-model="driverOrg"
            cursor-spacing="150"
          />
        </div>
        <div class="input-item">
          <div class="title1"><span class="empty"></span>驾驶证类型</div>
          <!-- <input
            class="my-input"
            maxlength="32"
            placeholder="支持自动识别"
            type="text"
            v-model="driverType"
            cursor-spacing="150"
          /> -->
          <picker
            mode="selector"
            :range="driverPostList"
            @change="changeDriverPost"
          >
            <view class="uni-input-default">
              <span v-if="driverPostIndex !== -1">{{
                driverPostList[driverPostIndex]
              }}</span>
              <span v-else class="uni-input-placeholder">支持自动识别</span>
              <uni-icons type="forward" size="14"></uni-icons>
            </view>
          </picker>
        </div>
        <div class="input-item">
          <div class="title1"><span class="required">*</span>生效日期</div>
          <view class="uni-list">
            <view class="uni-list-cell">
              <view class="uni-list-cell-db">
                <picker
                  mode="date"
                  :value="driverStart"
                  @change="bindDateChange($event, 'driverStart')"
                >
                  <!-- <view class="uni-input">{{
                    driverStart ? driverStart : "请选择日期"
                  }}</view> -->
                  <view class="uni-input-default">
                    <span v-if="driverStart">{{ driverStart }}</span>
                    <span v-else class="uni-input-placeholder"
                      >支持自动识别</span
                    >
                    <uni-icons type="forward" size="14"></uni-icons>
                  </view>
                </picker>
              </view>
            </view>
          </view>
        </div>
        <div class="input-item" v-if="driverPerpetualIndex !== 1">
          <div class="title1"><span class="required">*</span>失效日期</div>
          <view class="uni-list">
            <view class="uni-list-cell">
              <view class="uni-list-cell-db">
                <picker
                  mode="date"
                  :value="driverEnd"
                  @change="bindDateChange($event, 'driverEnd')"
                >
                  <!-- <view class="uni-input">{{
                    driverEnd ? driverEnd : "请选择日期"
                  }}</view> -->
                  <view class="uni-input-default">
                    <span v-if="driverEnd">{{ driverEnd }}</span>
                    <span v-else class="uni-input-placeholder"
                      >支持自动识别</span
                    >
                    <uni-icons type="forward" size="14"></uni-icons>
                  </view>
                </picker>
              </view>
            </view>
          </view>
        </div>
        <div class="input-item">
          <div class="title1"><span class="required">*</span>长期有效</div>
          <picker
            mode="selector"
            :range="perpetualList"
            @change="changePerpetual($event, 'driver')"
          >
            <view class="building-picker-btn">
              {{ perpetualList[driverPerpetualIndex] }}
              <uni-icons type="forward" size="14"></uni-icons>
            </view>
          </picker>
        </div>
      </div>
      <div class="zjjy-box marginB">
        <div class="photo-box">
          <div class="title2">请上传从业资格证</div>
          <div class="title-item">上传从业资格证，图片大小不能超过3M</div>
          <div class="id-image" @click="upload('obtainFront')">
            <img v-if="obtainFront" :src="obtainFront" alt="图片" />
            <img v-else src="../../static/order/obtain.png" alt="图片" />
          </div>
        </div>
        <div class="input-item">
          <div class="title1">从业资格证号</div>
          <input
            class="my-input"
            maxlength="32"
            placeholder="请输入从业资格证号"
            type="text"
            v-model="obtainNumber"
            cursor-spacing="150"
          />
        </div>
        <div class="input-item">
          <div class="title1">从业资格证类型</div>
          <picker mode="selector" :range="loadList" @change="changeObtainType">
            <view class="uni-input-default">
              <span v-if="obtainTypeIndex !== -1">{{
                loadList[obtainTypeIndex]
              }}</span>
              <span v-else class="uni-input-placeholder">支持自动识别</span>
              <uni-icons type="forward" size="14"></uni-icons>
            </view>
          </picker>
        </div>
        <div class="input-item">
          <div class="title1">生效日期</div>
          <view class="uni-list">
            <view class="uni-list-cell">
              <view class="uni-list-cell-db">
                <picker
                  mode="date"
                  :value="obtainStart"
                  @change="bindDateChange($event, 'obtainStart')"
                >
                  <view class="uni-input-default">
                    <span v-if="obtainStart">{{ obtainStart }}</span>
                    <span v-else class="uni-input-placeholder">请选择日期</span>
                    <uni-icons type="forward" size="14"></uni-icons>
                  </view>
                </picker>
              </view>
            </view>
          </view>
        </div>
        <div class="input-item">
          <div class="title1">失效日期</div>
          <view class="uni-list">
            <view class="uni-list-cell">
              <view class="uni-list-cell-db">
                <picker
                  mode="date"
                  :value="obtainEnd"
                  @change="bindDateChange($event, 'obtainEnd')"
                >
                  <view class="uni-input-default">
                    <span v-if="obtainEnd">{{ obtainEnd }}</span>
                    <span v-else class="uni-input-placeholder">请选择日期</span>
                    <uni-icons type="forward" size="14"></uni-icons>
                  </view>
                </picker>
              </view>
            </view>
          </view>
        </div>
        <div class="input-item">
          <div class="title1">从业证办理省份名称</div>
          <pick-regions limit="1" @getRegion="handleGetRegion1">
            <view class="uni-input-default">
              <span v-if="regionName1">{{ regionName1 }}</span>
              <span v-else class="uni-input-placeholder">支持自动识别</span>
              <uni-icons type="forward" size="14"></uni-icons>
            </view>
          </pick-regions>
        </div>
      </div>
      <div class="group-submit">
        <div class="as-btn-flexItem-other as-btn-FFF" @click="jumpTo(0)">
          取消
        </div>
        <div class="as-btn-flexItem-other as-btn-blue" @click="jumpTo(1)">
          提交认证
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FreightCard from "./components/freightCard";
import { perpetualList, driverPostList, loadList } from "./config";
import pickRegions from "@/components/pick-regions/pick-regions.vue";
import { uniRequest, uniUpload } from "../../config/request";

export default {
  components: { FreightCard, pickRegions },
  name: "orderInfo",
  data() {
    return {
      pageData: {},
      typesFreight: 0, //信息类型
      imageSize: 3145728, //上传图片限制
      perpetualList, //是否长期列表
      driverPostList,
      loadList,
      perpetualIndex: 0, //身份证是否长期
      driverPerpetualIndex: 0, //驾驶证是否长期
      driverPostIndex: -1,
      obtainTypeIndex: -1,
      region: [],
      region1: [],
      // idCard
      name: "",
      idFront: null, // 人像面
      idBack: null, // 国徽面
      id: null, //  身份id
      idStart: null, // 生效时间
      idEnd: null, // 失效时间
      idPerpetual: false, // 是否有效
      //driver
      driverFront: null, // 驾驶证照片
      driverNumber: null, // 驾驶证号
      driverOrg: null, // 机构
      driverType: null, // 类型
      driverStart: null, // 生效时间
      driverEnd: null, // 失效时间
      driverPerpetual: false, // 是否长期
      //从业
      obtainFront: null, //从业资格证
      obtainNumber: null, //从业资格号
      obtainType: null, //驾驶证类型
      obtainStart: null, //生效时间
      obtainEnd: null, // 失效时间
      obtainProvince: null, //从业证办理省份名称
    };
  },
  onLoad(options) {
    // this.dealPageData(JSON.parse(options.data));
    // console.log('司机认证页面options', this.pageData)
    this.dealPageData({
      endAddress: "富邦总部大楼",
      goodsName: "煤炭及制品",
      receiveType: 1,
      startAddress: "台江",
      transCompany: "超好运",
    });
  },
  computed: {
    regionName() {
      // 转为字符串
      return this.region.length === 1
        ? this.region[0].name
        : this.region.map((item) => item.name).join(" ");
    },
    regionName1() {
      // 转为字符串
      return this.region1.length === 1
        ? this.region1[0].name
        : this.region1.map((item) => item.name).join(" ");
    },
  },
  methods: {
    // 页面跳转赋值
    dealPageData(data) {
      this.pageData = data;
      this.typesFreight = data.receiveType;
    },
    // 认证成功执行
    successD() {
      uni.showModal({
        title: "提示",
        content: "已认证成功",
        showCancel: false,
        success: (res) => {
          console.log("res", res);
          uni.navigateTo({
            url: `./scanOrder?data=${JSON.stringify(me.pageData)}`,
          });
        },
      });
    },
    jumpTo(type) {
      const me = this;
      const obj = {
        0: () => {
          uni.navigateTo({
            url: "../index/index",
          });
        },
        1: () => {
          let leap = this.formValitor();
          if (!leap) return;
          const config = {
            url: "driverAuth",
            method: "POST",
            data: this.formToRequest(),
          };
          uniRequest(config).then((res) => {
            console.log("司机认证", res);
            if (res.code == 200) {
              this.successD();
            }
          });
        },
      };
      obj[type]();
    },
    formValitor() {
      if (!this.name) {
        uni.showToast({
          title: "请输入姓名",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.id) {
        uni.showToast({
          title: "请输入身份证号",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.idFront) {
        uni.showToast({
          title: "请上传身份证国徽面",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.idBack) {
        uni.showToast({
          title: "请上传身份证人像面",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.idStart) {
        uni.showToast({
          title: "请选择有效起始日期",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.idEnd) {
        uni.showToast({
          title: "请选择有效终止日期",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.idFront) {
        uni.showToast({
          title: "请上传身份证国徽面",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.driverFront) {
        uni.showToast({
          title: "请上传驾驶证照片",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.driverOrg) {
        uni.showToast({
          title: "请输入驾驶证发证机构",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.driverStart) {
        uni.showToast({
          title: "请选择驾驶证生效日期",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.driverEnd) {
        uni.showToast({
          title: "请选择驾驶证失效日期",
          icon: "none",
          duration: 1500,
        });
        return false;
      }

      return true;
    },
    formToRequest() {
      const idCard = {
        identificationBackimage: this.idBack,
        identificationBegintime: this.idStart,
        identificationEffective: this.idPerpetual,
        identificationEndTime: this.idEnd,
        identificationImage: this.idFront,
        identificationNumber: this.id,
        name: this.name,
      };
      // driverFront: null, // 驾驶证照片
      // driverNumber: null, // 驾驶证号
      // driverOrg: null, // 机构
      // driverType: null, // 类型
      // driverStart: null, // 生效时间
      // driverEnd: null, // 失效时间
      // driverPerpetual: false, // 是否长期
      const drivingLicense = {
        driverLicense: "",
        driverLicenseCarNumber: this.driverNumber,
        driverLicenseImage: this.driverFront,
        driverLicenseType: this.driverType,
        issuingOrganizations: this.driverOrg,
        validPeriodAlways: this.driverPerpetual,
        validPeriodFrom: this.driverStart,
        validPeriodTo: this.driverEnd,
        name: "",
      };
      // obtainFront: null, //从业资格证
      // obtainNumber: null, //从业资格号
      // obtainType: null, //类型
      // obtainStart: null, //生效时间
      // obtainEnd: null, // 失效时间
      // obtainProvince: null, //从业证办理省份名称
      const qualificationCertificateCard = {
        workLicense: "",
        workLicenseDueDate: "",
        workLicenseImage: "",
        workLicenseProvinceCode: "",
        workLicenseProvinceName: "",
      };

      return {
        idCard,
        drivingLicense,
      };
    },
    // 驾驶证
    changeDriverPost(e) {
      console.log("e", e);
      this.driverPostIndex = Number(e.detail.value);
    },
    // 从业
    changeObtainType(e) {
      console.log("e", e);
      this.obtainTypeIndex = Number(e.detail.value);
    },
    // 获取选择的地区
    handleGetRegion(region) {
      console.log("region", region);
      this.region = region;
    },
    // 获取选择的地区
    handleGetRegion1(region) {
      console.log("region", region);
      this.region1 = region;
    },

    // 是否长期有效
    changePerpetual(e, type) {
      console.log("e", e);
      this[type === "id" ? "perpetualIndex" : "driverPerpetualIndex"] = Number(
        e.detail.value
      );
    },
    // 日期选中
    bindDateChange(e, type) {
      this[type] = e.target.value;
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
    httpImage(url, type) {
      // this[type] = localUrl;
      const config = {
        url: "uploadFile",
        file: url,
      };
      uni.showLoading();
      uniUpload(config).then((res) => {
        console.log("图片上传", res);
        if (res.code == 200) {
          this[type] = res.data.path;
          //TODO...上传OCR识别
          //判断OCR权限是否过期
          let autoToken = uni.getStorageSync("authToken");
          if (autoToken) {
            autoToken = JSON.parse(autoToken);
            let now = new Date().getTime();
            let last = autoToken.time;
            let leap = now - last < 24 * 3600 * 1000;
            if (leap) {
              this.uploadOCR(this[type], type);
            } else {
              //过期重启获取OCR token
              this.autoOCR().then(() => {
                this.uploadOCR(this[type], type);
              });
            }
          } else {
            //无OCR token
            this.autoOCR().then(() => {
              this.uploadOCR(this[type], type);
            });
          }
        }
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

    // OCR识别：华为云
    uploadOCR(url, type) {
      let side = {
        idFront: "front",
        idBack: "back",
      };
      let token = JSON.parse(uni.getStorageSync("authToken")).token;
      return new Promise((resolve, reject) => {
        uni.request({
          url: "https://ocr.cn-north-4.myhuaweicloud.com/v2/0c8cc49ff7800fe12fadc007e5c69530/ocr/id-card",
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
              this.name = result.name;
              this.id = result.number;
              if (result.valid_from) {
                this.idStart = this.handleDate(result.valid_from);
              }
              if (result.valid_to) {
                this.idEnd = this.handleDate(result.valid_to);
                this.idEnd && (this.perpetualIndex = 0);
              }
            }
          },
          fail: () => {
            uni.hideLoading();
          },
        });
      });
    },
    handleDate(date) {
      if (date === "长期") {
        this.perpetualIndex = 1;
        return "";
      }

      let arr = date.split("-");
      if (arr.length === 3) {
        return date;
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  padding: 24rpx 0;
}
.box-paddy {
  padding: 23rpx 49rpx 21rpx 30rpx;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: #cc122b;
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
  padding: 0 16rpx;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  & > img {
    width: 300rpx;
    height: 216rpx;
  }
}
.marginB {
  margin-bottom: 30rpx;
}
.as-btn-flexItem-other {
  width: 310rpx;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 10rpx;
  font-family: PingFang SC;
  font-weight: bold;
  font-size: 32rpx;
  text-align: center;
  border-width: 1rpx !important;
}
.group-submit {
  padding: 0 26rpx;
  display: flex;
  justify-content: space-between;
  margin-bottom: 60rpx;
}
</style>