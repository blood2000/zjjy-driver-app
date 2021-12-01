  <template>
  <div class="page-carnumber-test">
    <div class="number-wrap">
      <CarNumber
        v-model="carNumber"
        :focus="focus"
        :current="current"
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
          @change="change($event, 'vehicleType')"
        >
          <view class="building-picker-btn">
            {{
              vehicleTypeIndex === -1
                ? "请选择车型"
                : vehicleTypeList[vehicleTypeIndex]
            }}
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
        <checkbox  @click="handleRadioValue" value="radioValue" />
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
export default {
  components: {
    CarNumber,
  },
  data() {
    return {
      carNumber: "闽AAAAAA", //车牌
      focus: false, //车牌是否聚焦
      current: -1, //车牌当前选择
      vehicleTypeList: [],
      vehicleTypeIndex: -1,
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
    carNumber(num) {
      console.log(num);
    },
    focus() {
      if (!this.focus) {
        this.current = -1;
      }
    },
  },
  methods: {
    handleRadioValue(){
      this.focus = false;
      const me = this;
       me.radioValue = !me.radioValue;
    },
    change(e, type) {
      this.focus = false;
    },
    changeCurrent(val) {
      this.current = val;
    },
    changeCurrentDel() {
      this.current--;
    },
    changeCurrentAdd() {
      this.current++;
    },
    inputFocus() {
      this.focus = false;
    },
    changeFocus(val) {
      this.focus = val;
    },
    add() {
      console.log("add", this.radioValue);
      if (this.radioValue) {
        uni.navigateTo({
          url: "./approve",
        });
        return;
      }
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
