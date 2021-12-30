  <template>
  <div class="page-carnumber-test">
    <div class="number-wrap">
      <CarNumber
        v-model="carNumber"
        :focus="focus"
        :current="current"
        :isDisabled="isEdit"
        @changeFocus="changeFocus"
        @changeCurrent="changeCurrent"
        @changeCurrentDel="changeCurrentDel"
        @changeCurrentAdd="changeCurrentAdd"
      />
    </div>
    <div class="zjjy-box">
      <div class="input-item">
        <div class="title1"><span class="required">*</span>车型</div>
        <picker
          mode="selector"
          :range="vehicleTypeList"
          range-key="dictLabel"
          @change="change($event, 'vehicleType')"
        >
          <view class="uni-input-default">
            <span v-if="vehicleTypeIndex !== -1">{{
              vehicleTypeList[vehicleTypeIndex].dictLabel
            }}</span>
            <span v-else class="uni-input-placeholder">请选择车型</span>
            <uni-icons type="forward" size="14"></uni-icons>
          </view>
          <!-- <view class="no-choose" v-if="noChoose">请选择</view> -->
        </picker>
      </div>
      <div class="input-item">
        <div class="title1"><span class="required">*</span>车长</div>
        <input
          class="my-input"
          maxlength="32"
          placeholder="请输入车长"
          type="text"
          @focus="inputFocus"
          v-model="vehicleLen"
          cursor-spacing="150"
        />
      </div>
      <div class="input-item">
        <div class="title1"><span class="required">*</span>车宽</div>
        <input
          class="my-input"
          maxlength="32"
          placeholder="请输入车宽"
          type="text"
          @focus="inputFocus"
          v-model="vehicleWidth"
          cursor-spacing="150"
        />
      </div>
    </div>

    <div class="zjjy-box">
      <div class="input-item">
        <div class="title1">
          <span class="required">*</span>车辆总重量（皮重）
        </div>
        <input
          class="my-input"
          maxlength="32"
          placeholder="请输入车辆重量"
          type="text"
          @focus="inputFocus"
          v-model="vehicleWeight"
          cursor-spacing="150"
        />
      </div>
      <div class="input-item">
        <div class="title1"><span class="required">*</span>车辆可载立方</div>
        <input
          class="my-input"
          maxlength="32"
          placeholder="请输入车辆可载立方"
          type="text"
          @focus="inputFocus"
          v-model="carCubic"
          cursor-spacing="150"
        />
      </div>
      <div class="input-item">
        <div class="title1"><span class="required"> </span>同步提交S认证</div>
        <!-- <radio
          ref="radio1"
          @click="change(null, 'radioValue')"
          v-model="radioValue"
        /> -->
        <checkbox
          :disabled="isEdit && radioValue"
          @click="handleRadioValue"
          :checked="radioValue"
          value="radioValue"
        />
      </div>
    </div>
    <view
      class="bans"
      :class="carNumber.length >= 7 ? 'bans-ok' : 'bans-no'"
      @click="add"
      >确认添加</view
    >
  </div>
</template>

<script>
import CarNumber from "@/components/codecook-carnumber/codecook-carnumber.vue";
import { uniRequest } from "../../config/request";
export default {
  components: {
    CarNumber,
  },
  data() {
    return {
      carNumber: "", //车牌
      isEdit: false, //是否是编辑
      focus: false, //车牌是否聚焦
      current: -1, //车牌当前选择
      vehicleTypeList: [], //车型列表
      vehicleTypeIndex: -1, //车型下标
      vehicleData: null,
      // 表单
      vehicleType: null,
      vehicleLen: null,
      vehicleWidth: null,
      vehicleWeight: null,
      carCubic: null,
      radioValue: false,
    };
  },
  watch: {
    carNumber(val) {
      console.log("watch carNumber", val);
      if (this.carNumber && this.carNumber.length >= 7 && !this.isEdit) {
        console.log("123");
        this.checkVehicle();
      }
    },
    focus() {
      if (!this.focus) {
        this.current = -1;
      }
    },
  },
  onLoad(options) {
    if (options && options.data) {
      this.isEdit = true;
      this.vehicleData = JSON.parse(options.data);
      console.log("this.vehicleData ", this.vehicleData);

      uni.setNavigationBarTitle({
        title: "修改车辆",
      });
    }
    this.init();
  },
  methods: {
    formValitor() {
      if (!this.carNumber) {
        uni.showToast({
          title: "请输入车牌",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.vehicleType) {
        uni.showToast({
          title: "请输入车型",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.vehicleLen) {
        uni.showToast({
          title: "请输入车长",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.vehicleWidth) {
        uni.showToast({
          title: "请输入车宽",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.vehicleWeight) {
        uni.showToast({
          title: "请输入车辆总重量",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.carCubic) {
        uni.showToast({
          title: "请输入车辆可载立方",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      return true;
    },
    // 开始执行请求
    init() {
      const config = {
        url: "listByDictJyz",
        method: "POST",
        data: {
          dictType: "vehicleClassification",
        },
      };
      uniRequest(config).then((res) => {
        console.log("res", res);
        this.vehicleTypeList = res.data.data;
        if (this.isEdit) this.editVehicle();
      });
    },
    // 编辑
    editVehicle() {
      const vehicleData = this.vehicleData;
      this.carNumber = vehicleData.driverLicenseCarNumber;
      // this.vehicleTypeIndex vehicleType
      if (!vehicleData) return;
      if (vehicleData.vehicleType) {
        this.vehicleTypeList.forEach((item, index) => {
          if (item.dictLabel === vehicleData.vehicleType) {
            this.vehicleTypeIndex = index;
          }
        });
        this.vehicleType = vehicleData.vehicleType;
      }
      this.vehicleWeight = vehicleData.vehicleTotalWeight;
      this.carCubic = vehicleData.vehicleLoadWeight;
      this.vehicleWidth = vehicleData.vehicleWidth;
      this.vehicleLen = vehicleData.vehicleLength;
      this.radioValue = vehicleData.isCertification === 1 ? true : false;
      console.log("this.radioValue", this.radioValue);
      if (this.radioValue) {
        this.radioValue;
      }
    },
    // 单选值改变
    handleRadioValue() {
      this.focus = false;
      const me = this;
      me.radioValue = !me.radioValue;
    },
    // 选择器change事件
    change(e, type) {
      const me = this;
      this.focus = false;
      const fns = {
        vehicleType: () => {
          console.log("vehicleType", e);
          me.vehicleTypeIndex = Number(e.detail.value);
          me.vehicleType = me.vehicleTypeList[me.vehicleTypeIndex].dictLabel;
        },
      };
      fns[type]();
    },
    // 当前值改变
    changeCurrent(val) {
      console.log("changeCurrent", val);
      this.current = val;
      console.log("this.current", this.current);
    },
    // 删除单选
    changeCurrentDel() {
      console.log("changeCurrentDel");
      this.current--;
    },
    // 前进
    changeCurrentAdd() {
      console.log("changeCurrentAdd");
      this.current++;
    },
    // 聚焦
    inputFocus() {
      console.log("inputFocus");
      this.focus = false;
    },
    changeFocus(val) {
      console.log("changeFocus", val);
      this.focus = val;
    },
    // 根据车牌绑定司机关系
    checkVehicle() {
      const me = this;
      // jyzVehicleExist
      const config = {
        url: "jyzVehicleExist",
        method: "GET",
        querys: { licenseNumber: me.carNumber },
      };
      uniRequest(config).then((ress) => {
        console.log("ress", ress);
        if (ress.data.code === 200) {
        } else {
          uni.showModal({
            title: "提示",
            content: ress.data.msg,
            // showCancel: false,
            success: (res) => {
              if (res.confirm) {
                const config = {
                  url: "driverLicenseNumberRel",
                  method: "GET",
                  querys: { licenseNumber: me.carNumber },
                };
                uniRequest(config).then((res) => {
                  console.log("检查车辆关系", res);
                  uni.navigateTo({
                    url: "./carList",
                  });
                });
              } else {
                me.carNumber = "";
                me.current = 0;
              }
            },
          });
        }
      });
    },
    // 请求参数集合
    getAddParams() {
      let obj = {
        driverLicenseCarNumber: this.carNumber,
        vehicleType: this.vehicleType,
        vehicleLength: this.vehicleLen,
        vehicleWidth: this.vehicleWidth,
        vehicleTotalWeight: this.vehicleWeight,
        isCertification: this.radioValue ? 1 : 0,
        vehicleLoadWeight: this.carCubic,
      };
      if(this.isEdit){
        obj ={...this.vehicleData,...obj} 
        
      }
      return obj
    },
    // 添加车辆
    add() {
      let leap = this.formValitor();
      console.log("leap", leap);
      if (!leap) return;
      if (this.carNumber.length < 7) return;
      console.log("add", this.radioValue);
      const params = this.getAddParams();
      if (this.isEdit) {
        params.code = this.vehicleData.code;
      }
      if (this.radioValue) {
        if (!this.isEdit) {
          params.travelLicenseBo = {};
          params.roadLicenseBo = {};
        }

        uni.navigateTo({
          // url: "./approve?&data=" + JSON.stringify(params),
          url: `./approve?data=${JSON.stringify({
            params,
            isEdit: this.isEdit,
          })}`,
        });
        return;
      }
      const config = {
        url: "addVehicle",
        method: "POST",
        data: params,
      };
      uniRequest(config).then((res) => {
        console.log("addres", res);
        if (res.data.code != 200) {
          uni.showToast({
            title: "请求错误",
            duration: 2000,
          });
          return;
        } else {
          const text = this.isEdit ? "修改" : "添加";
          uni.showModal({
            title: "提示",
            content: text + "成功",
            showCancel: false,
            success: (res) => {
              // uni.navigateTo({
              //   url: "./carList",
              // });
              uni.navigateBack({
                delta: 1,
              });
            },
          });
        }
      });
    },
  },
};
</script>
  <style scoped lang="scss">
.number-wrap {
  padding: 0 24rpx;
  padding-top: 29rpx;
  margin-bottom: 24rpx;
}
.bans {
  width: 702rpx;
  height: 90rpx;
  margin: 0 24rpx;
  border-radius: 10rpx;
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;

  line-height: 90rpx;
  text-align: center;
  margin-top: 81rpx;
}
.bans-ok {
  background: #2366f2;
  color: #ffffff;
}
.bans-no {
  background: #dbdcdd;
  color: #bfbfbf;
}
</style>
