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
                src="../../static/order/id_guohui.png"
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
                src="../../static/order/id_renxiang.png"
                alt="图片"
                @click="upload('idFront')"
              />
              <img v-else :src="idBack" alt="图片" @click="upload('idBack')" />
            </template>
          </div>
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
        <div class="input-item">
          <div class="title1"><span class="required">*</span>所在区域</div>
          <pick-regions limit="3" @getRegion="handleGetRegion">
            <!-- <div class="">{{ regionName ? regionName : "支持自动识别" }}</div> -->
            <view class="uni-input-default">
              <span v-if="regionName">{{ regionName }}</span>
              <span v-else class="uni-input-placeholder">支持自动识别</span>
              <uni-icons type="forward" size="14"></uni-icons>
              <uni-icons type="forward" size="14"></uni-icons>
            </view>
          </pick-regions>
        </div>
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
          <div class="title1">驾驶证号</div>
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
          <div class="title1">驾驶证类型</div>
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
            <!-- <div>{{ regionName1 ? regionName1 : "支持自动识别" }}</div> -->
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
import { uniRequest } from "../../config/request";

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
      // form
      idFront: null, // 国徽面
      idBack: null, // 人像面
      id: null, //  身份id
      idStart: null, // 生效时间
      idEnd: null, // 失效时间
      idPerpetual: false, // 是否有效
      driverFront: null, // 驾驶证照片
      driverNumber: null, // 驾驶证号
      driverOrg: null, // 机构
      driverType: null, // 类型
      driverStart: null, // 生效时间
      driverEnd: null, // 失效时间
      driverPerpetual: false, // 是否长期
      obtainFront: null, //从业资格证
      obtainNumber: null, //从业资格号
      obtainType: null, //驾驶证类型
      obtainStart: null, //生效时间
      obtainEnd: null, // 失效时间
      obtainProvince: null, //从业证办理省份名称
    };
  },
  onLoad(options) {
    this.dealPageData(JSON.parse(options.data));
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
      this.typesFreight = data && data.receiveType;
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
          const config = {
            url: "authDriverTeam",
            method: "PUT",
            data:this.formToRequest(),
          };
          uniRequest(config).then(res=>{
                if(res.code == 200){
                  this.successD()
                }
          });
        },
      };
      obj[type]();
    },
    formToRequest(){
      return {}
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
    httpImage(localUrl, type) {
      this[type] = localUrl;
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