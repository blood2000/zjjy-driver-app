  <template>
  <div>
    <div class="zjjy-box">
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
          @change="change($event, 'energyType')"
        >
          <view class="building-picker-btn">
            {{
              energyTypeIndex === -1
                ? "请选择车辆能源类型"
                : energyTypeList[energyTypeIndex]
            }}
            <uni-icons type="forward" size="14"></uni-icons>
          </view>
          <!-- <view class="no-choose" v-if="noChoose">请选择</view> -->
        </picker>
      </div>
      <div class="input-item">
        <div class="title1">
          <span class="required">*</span> 道路运输许可证号
        </div>
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
        <div class="title1"><span class="required">*</span>车身颜色</div>
        <picker
          mode="selector"
          :range="vehicleColorList"
          @change="change($event, 'vehicleColor')"
        >
          <view class="building-picker-btn">
            {{
              vehicleColorIndex === -1
                ? "请选择车身颜色"
                : vehicleColorList[vehicleColorIndex]
            }}
            <uni-icons type="forward" size="14"></uni-icons>
          </view>
          <!-- <view class="no-choose" v-if="noChoose">请选择</view> -->
        </picker>
      </div>

      <div class="input-item">
        <div class="title1"><span class="required">*</span> 轴数</div>
        <picker
          mode="selector"
          :range="axlesList"
          @change="change($event, 'axles')"
        >
          <view class="building-picker-btn">
            {{ axlesIndex === -1 ? "请选择轴数" : axlesList[axlesIndex] }}
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
          <template @click="upload('drivingFront')">
            <img v-if="drivingFront" :src="drivingFront" alt="图片" />
            <ImageDefault
              v-else
              title="上传行驶证"
              url="../../../static/order/driving.png"
            />
          </template>
          <template @click="upload('drivingBack')">
            <img v-if="drivingBack" :src="drivingBack" alt="图片" />
            <ImageDefault
              v-else
              title="上传行驶证副页"
              url="../../../static/order/driving_back.png"
            />
          </template>
        </div>
      </div>
    </div>
    <div class="zjjy-box">
      <div class="photo-box">
        <div class="title2">
          <span class="required">*</span> 请上传道路运输许可证
        </div>
        <div class="title-item">上传道路运输许可证照片，图片大小不能超过3M</div>
        <div class="id-image" @click="upload('load')">
          <template>
            <img v-if="load" :src="load" alt="图片" />
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
        <div class="title2"><span class="required">*</span> 车头正面照</div>
        <div class="title-item">上传驾驶证照片，图片大小不能超过3M</div>
        <div class="id-image" @click="upload('carFront')">
          <img v-if="carFront" :src="carFront" alt="图片" />
          <ImageDefault
            v-else
            title="上传车头正面照片"
            url="../../../static/order/car.png"
          />
        </div>
      </div>
    </div>
       <view
      class="bans"
      @click="submit"
      >提交认证</view
    >
  </div>
</template>


<script>
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

      vehicleVCode: null,
      energyType: null,
      loadNumber: null,
      vehicleColor: null,
      axles: null,
      drivingFront: null,
      drivingBack: null,
      load: null,
      carFront: null,
    };
  },
  watch: {},
  methods: {
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
      this[type] = localUrl;
    },
    submit(){}
  },

  change(e, type) {
    this.focus = false;
  },
  beforeMount() {},
};
</script>
  <style scoped lang="scss">
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
  padding: 0 36rpx;
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
</style>
